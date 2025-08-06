"""
VentureForge Research Scheduler
Handles automated research job scheduling with time-based execution
"""

import asyncio
import asyncpg
import json
from datetime import datetime, timedelta
import schedule
import time
from threading import Thread
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ResearchScheduler:
    def __init__(self, database_url):
        self.database_url = database_url
        self.running = False
        
    async def get_pending_jobs(self):
        """Get jobs that are ready to run"""
        conn = await asyncpg.connect(self.database_url)
        
        try:
            # Get jobs that should run now
            current_time = datetime.now().strftime('%H:%M')
            current_date = datetime.now().date()
            
            jobs = await conn.fetch("""
                SELECT * FROM research_jobs 
                WHERE status = 'pending' 
                AND (
                    (frequency = 'daily' AND scheduled_time <= $1) OR
                    (frequency = 'weekly' AND next_run <= $2 AND scheduled_time <= $1) OR
                    (frequency = 'monthly' AND next_run <= $2 AND scheduled_time <= $1) OR
                    (frequency = 'one-time' AND created_at::date <= $2)
                )
            """, current_time, current_date)
            
            return [dict(job) for job in jobs]
            
        finally:
            await conn.close()
    
    async def update_job_status(self, job_id, status, next_run=None):
        """Update job status and next run time"""
        conn = await asyncpg.connect(self.database_url)
        
        try:
            if next_run:
                await conn.execute("""
                    UPDATE research_jobs 
                    SET status = $1, next_run = $2, updated_at = CURRENT_TIMESTAMP 
                    WHERE id = $3
                """, status, next_run, job_id)
            else:
                await conn.execute("""
                    UPDATE research_jobs 
                    SET status = $1, updated_at = CURRENT_TIMESTAMP 
                    WHERE id = $2
                """, status, job_id)
                
        finally:
            await conn.close()
    
    def calculate_next_run(self, frequency, current_date):
        """Calculate next run date based on frequency"""
        if frequency == 'daily':
            return current_date + timedelta(days=1)
        elif frequency == 'weekly':
            return current_date + timedelta(weeks=1)
        elif frequency == 'monthly':
            # Add one month
            if current_date.month == 12:
                return current_date.replace(year=current_date.year + 1, month=1)
            else:
                return current_date.replace(month=current_date.month + 1)
        else:
            return None
    
    async def execute_research_job(self, job):
        """Execute a research job"""
        logger.info(f"Executing research job: {job['title']}")
        
        try:
            # Update status to running
            await self.update_job_status(job['id'], 'running')
            
            # Simulate AI research (in real implementation, call AI service)
            await asyncio.sleep(2)  # Simulate processing time
            
            # Generate mock research results
            research_results = {
                'market_analysis': {
                    'market_size': '$96B global market',
                    'growth_rate': '25% YoY',
                    'target_audience': 'Health-conscious millennials',
                    'competition_level': 'High but fragmented'
                },
                'success_probability': 75 + (hash(job['title']) % 25),  # Deterministic but varied
                'key_insights': [
                    'Strong market demand for AI personalization',
                    'Opportunity in underserved premium segment',
                    'First-mover advantage in specific niche'
                ],
                'recommendations': [
                    'Focus on unique AI differentiation',
                    'Build strong community features',
                    'Target specific user segments first'
                ],
                'generated_at': datetime.now().isoformat()
            }
            
            # Save results to database
            conn = await asyncpg.connect(self.database_url)
            try:
                await conn.execute("""
                    INSERT INTO research_results (job_id, market_analysis, solution_proposals, infrastructure_blueprint, success_metrics)
                    VALUES ($1, $2, $3, $4, $5)
                """, 
                job['id'],
                json.dumps(research_results['market_analysis']),
                json.dumps([{'title': 'AI-Powered Solution', 'description': 'Comprehensive business solution'}]),
                json.dumps({'tech_stack': 'Modern web technologies', 'estimated_cost': '$150K'}),
                json.dumps({'success_probability': research_results['success_probability']})
                )
            finally:
                await conn.close()
            
            # Calculate next run time
            next_run = None
            if job['frequency'] != 'one-time':
                next_run = self.calculate_next_run(job['frequency'], datetime.now().date())
            
            # Update job status to completed and set next run
            await self.update_job_status(
                job['id'], 
                'completed' if job['frequency'] == 'one-time' else 'pending',
                next_run
            )
            
            logger.info(f"Research job completed: {job['title']} (Success: {research_results['success_probability']}%)")
            
        except Exception as e:
            logger.error(f"Error executing job {job['id']}: {e}")
            await self.update_job_status(job['id'], 'failed')
    
    async def run_scheduler_cycle(self):
        """Run one cycle of the scheduler"""
        try:
            pending_jobs = await self.get_pending_jobs()
            
            if pending_jobs:
                logger.info(f"Found {len(pending_jobs)} jobs to execute")
                
                # Execute jobs concurrently
                tasks = [self.execute_research_job(job) for job in pending_jobs]
                await asyncio.gather(*tasks, return_exceptions=True)
            
        except Exception as e:
            logger.error(f"Scheduler cycle error: {e}")
    
    def start_scheduler(self):
        """Start the scheduler in a separate thread"""
        def scheduler_thread():
            # Schedule the async function to run every minute
            schedule.every(1).minutes.do(lambda: asyncio.run(self.run_scheduler_cycle()))
            
            self.running = True
            logger.info("Research scheduler started")
            
            while self.running:
                schedule.run_pending()
                time.sleep(1)
        
        thread = Thread(target=scheduler_thread, daemon=True)
        thread.start()
        return thread
    
    def stop_scheduler(self):
        """Stop the scheduler"""
        self.running = False
        logger.info("Research scheduler stopped")

# Global scheduler instance
scheduler = None

def start_research_scheduler(database_url):
    """Start the global research scheduler"""
    global scheduler
    scheduler = ResearchScheduler(database_url)
    return scheduler.start_scheduler()

def stop_research_scheduler():
    """Stop the global research scheduler"""
    global scheduler
    if scheduler:
        scheduler.stop_scheduler()

if __name__ == "__main__":
    # Test the scheduler
    DATABASE_URL = "postgresql://postgres:password@localhost:5432/ventureforge"
    
    async def test_scheduler():
        scheduler = ResearchScheduler(DATABASE_URL)
        await scheduler.run_scheduler_cycle()
    
    asyncio.run(test_scheduler())
    print("✅ Scheduler test completed!")
