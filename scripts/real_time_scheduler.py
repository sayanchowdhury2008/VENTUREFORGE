"""
VentureForge Real-Time Scheduler - FIXED VERSION
Handles actual time-based automation with proper scheduling
"""

import asyncio
import asyncpg
import json
from datetime import datetime, timedelta, time
import schedule
import threading
import logging
from typing import List, Dict, Any
import time as time_module

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class RealTimeScheduler:
    def __init__(self, database_url: str):
        self.database_url = database_url
        self.running = False
        self.scheduler_thread = None
        
    async def get_jobs_ready_to_run(self) -> List[Dict[str, Any]]:
        """Get jobs that should run based on current time and date"""
        conn = await asyncpg.connect(self.database_url)
        
        try:
            current_time = datetime.now().time()
            current_date = datetime.now().date()
            current_datetime = datetime.now()
            
            # Query for jobs that are ready to run
            jobs = await conn.fetch("""
                SELECT j.*, u.email as user_email, u.name as user_name
                FROM research_jobs j
                LEFT JOIN users u ON j.user_id = u.id
                WHERE j.status = 'pending' 
                AND (
                    (j.frequency = 'one-time' AND j.created_at::date <= $1) OR
                    (j.frequency = 'daily' AND j.scheduled_time::time <= $2) OR
                    (j.frequency = 'weekly' AND j.next_run::date <= $1 AND j.scheduled_time::time <= $2) OR
                    (j.frequency = 'monthly' AND j.next_run::date <= $1 AND j.scheduled_time::time <= $2)
                )
                AND (j.last_run IS NULL OR j.last_run::date < $1 OR 
                     (j.frequency = 'daily' AND j.last_run < $3 - INTERVAL '23 hours'))
            """, current_date, current_time, current_datetime)
            
            return [dict(job) for job in jobs]
            
        except Exception as e:
            logger.error(f"Error fetching jobs: {e}")
            return []
        finally:
            await conn.close()
    
    async def update_job_status(self, job_id: int, status: str, next_run: datetime = None, success_probability: int = None):
        """Update job status, next run time, and last run timestamp"""
        conn = await asyncpg.connect(self.database_url)
        
        try:
            update_query = """
                UPDATE research_jobs 
                SET status = $1, last_run = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
            """
            params = [status]
            param_count = 2
            
            if next_run:
                update_query += f", next_run = ${param_count}"
                params.append(next_run.date())
                param_count += 1
                
            if success_probability is not None:
                update_query += f", success_probability = ${param_count}"
                params.append(success_probability)
                param_count += 1
                
            update_query += f" WHERE id = ${param_count}"
            params.append(job_id)
            
            await conn.execute(update_query, *params)
            logger.info(f"Updated job {job_id} status to {status}")
            
        except Exception as e:
            logger.error(f"Error updating job {job_id}: {e}")
        finally:
            await conn.close()
    
    def calculate_next_run(self, frequency: str, scheduled_time: str) -> datetime:
        """Calculate next run datetime based on frequency and scheduled time"""
        now = datetime.now()
        
        # Parse scheduled time
        try:
            time_parts = scheduled_time.split(':')
            scheduled_hour = int(time_parts[0])
            scheduled_minute = int(time_parts[1]) if len(time_parts) > 1 else 0
        except (ValueError, IndexError):
            scheduled_hour, scheduled_minute = 9, 0  # Default to 9:00 AM
        
        if frequency == 'daily':
            next_run = now.replace(hour=scheduled_hour, minute=scheduled_minute, second=0, microsecond=0)
            if next_run <= now:
                next_run += timedelta(days=1)
        elif frequency == 'weekly':
            next_run = now.replace(hour=scheduled_hour, minute=scheduled_minute, second=0, microsecond=0)
            next_run += timedelta(days=7)
        elif frequency == 'monthly':
            next_run = now.replace(hour=scheduled_hour, minute=scheduled_minute, second=0, microsecond=0)
            if now.month == 12:
                next_run = next_run.replace(year=now.year + 1, month=1)
            else:
                next_run = next_run.replace(month=now.month + 1)
        else:
            return None
            
        return next_run
    
    async def conduct_ai_research(self, job: Dict[str, Any]) -> Dict[str, Any]:
        """Simulate comprehensive AI research with realistic data"""
        
        # Simulate research time based on depth
        depth_time_map = {
            'quick': 2,
            'deep': 5,
            'expert': 8
        }
        research_time = depth_time_map.get(job.get('depth', 'deep'), 5)
        
        logger.info(f"Conducting {job.get('depth', 'deep')} research for: {job['title']}")
        await asyncio.sleep(research_time)  # Simulate AI processing time
        
        # Generate comprehensive research results
        research_results = {
            'market_analysis': {
                'market_size': f"${96 + (hash(job['title']) % 50)}B global market",
                'growth_rate': f"{20 + (hash(job['title']) % 15)}% YoY",
                'target_audience': 'Health-conscious millennials and Gen Z',
                'competition_level': 'High but fragmented',
                'market_trends': [
                    'AI personalization driving 340% higher engagement',
                    'Wearable integration becoming standard',
                    'Corporate wellness budgets up 45%',
                    'Mobile-first approach essential'
                ],
                'barriers_to_entry': 'Medium - requires AI expertise and user acquisition',
                'regulatory_environment': 'Moderate - health data privacy compliance required'
            },
            'solution_proposals': [
                {
                    'title': 'AI-Powered Core Solution',
                    'description': 'Comprehensive business solution with step-by-step implementation',
                    'features': [
                        'Personalized AI coaching engine',
                        'Real-time form correction',
                        'Social community features',
                        'Corporate wellness integration'
                    ],
                    'implementation_timeline': '6-8 months to MVP',
                    'estimated_cost': '$150K-250K development'
                }
            ],
            'infrastructure_blueprint': {
                'tech_stack': 'React Native, Node.js, PostgreSQL, TensorFlow',
                'architecture': 'Microservices with API Gateway',
                'cloud_services': 'AWS with auto-scaling',
                'estimated_costs': {
                    'development': '$200K',
                    'monthly_operations': '$8K-15K',
                    'scaling_costs': '$25K-50K at 100K users'
                },
                'timeline': '4-6 months to production-ready MVP'
            },
            'success_probability': min(95, max(60, 70 + (hash(job['title']) % 25))),
            'key_insights': [
                'Strong market demand for AI-powered personalization',
                'First-mover advantage in specific niche markets',
                'High user retention potential through community features',
                'Corporate wellness represents significant B2B opportunity'
            ],
            'risk_factors': [
                'High customer acquisition costs in competitive market',
                'Need for continuous AI model improvement',
                'Regulatory compliance for health data',
                'Dependency on wearable device partnerships'
            ],
            'recommendations': [
                'Focus on unique AI differentiation',
                'Build strong community features early',
                'Target corporate wellness market for stable revenue',
                'Implement freemium model to reduce entry barriers'
            ],
            'financial_projections': {
                'year_1': {'users': '50K', 'revenue': '$500K'},
                'year_2': {'users': '200K', 'revenue': '$2.4M'},
                'year_3': {'users': '500K', 'revenue': '$6M'}
            },
            'generated_at': datetime.now().isoformat(),
            'research_depth': job.get('depth', 'deep'),
            'confidence_level': min(95, max(75, 80 + (hash(job['title']) % 15)))
        }
        
        return research_results
    
    async def save_research_results(self, job_id: int, research_results: Dict[str, Any]):
        """Save comprehensive research results to database"""
        conn = await asyncpg.connect(self.database_url)
        
        try:
            await conn.execute("""
                INSERT INTO research_results (
                    job_id, 
                    market_analysis, 
                    solution_proposals, 
                    infrastructure_blueprint, 
                    success_metrics,
                    created_at
                ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
                ON CONFLICT (job_id) DO UPDATE SET
                    market_analysis = EXCLUDED.market_analysis,
                    solution_proposals = EXCLUDED.solution_proposals,
                    infrastructure_blueprint = EXCLUDED.infrastructure_blueprint,
                    success_metrics = EXCLUDED.success_metrics,
                    created_at = CURRENT_TIMESTAMP
            """, 
            job_id,
            json.dumps(research_results['market_analysis']),
            json.dumps(research_results['solution_proposals']),
            json.dumps(research_results['infrastructure_blueprint']),
            json.dumps({
                'success_probability': research_results['success_probability'],
                'confidence_level': research_results['confidence_level'],
                'key_insights': research_results['key_insights'],
                'recommendations': research_results['recommendations']
            })
            )
            
            logger.info(f"Saved research results for job {job_id}")
            
        except Exception as e:
            logger.error(f"Error saving research results for job {job_id}: {e}")
        finally:
            await conn.close()
    
    async def execute_research_job(self, job: Dict[str, Any]):
        """Execute a complete research job with all steps"""
        job_id = job['id']
        logger.info(f"🚀 Starting research job: {job['title']} (ID: {job_id})")
        
        try:
            # Update status to running
            await self.update_job_status(job_id, 'running')
            
            # Conduct AI research
            research_results = await self.conduct_ai_research(job)
            
            # Save research results
            await self.save_research_results(job_id, research_results)
            
            # Calculate next run time if recurring
            next_run = None
            final_status = 'completed'
            
            if job['frequency'] != 'one-time':
                next_run = self.calculate_next_run(job['frequency'], job.get('scheduled_time', '09:00'))
                final_status = 'pending'  # Keep as pending for next run
                logger.info(f"Next run scheduled for: {next_run}")
            
            # Update job with final status and results
            await self.update_job_status(
                job_id, 
                final_status, 
                next_run, 
                research_results['success_probability']
            )
            
            logger.info(f"✅ Research completed: {job['title']} (Success: {research_results['success_probability']}%)")
            
            # TODO: Send notification email to user
            if job.get('user_email'):
                logger.info(f"📧 Would send notification to: {job['user_email']}")
            
        except Exception as e:
            logger.error(f"❌ Error executing job {job_id}: {e}")
            await self.update_job_status(job_id, 'failed')
    
    async def run_scheduler_cycle(self):
        """Run one complete scheduler cycle"""
        try:
            logger.info("🔄 Running scheduler cycle...")
            
            # Get jobs ready to run
            ready_jobs = await self.get_jobs_ready_to_run()
            
            if ready_jobs:
                logger.info(f"📋 Found {len(ready_jobs)} jobs ready to execute")
                
                # Execute jobs concurrently (but limit concurrency)
                semaphore = asyncio.Semaphore(3)  # Max 3 concurrent jobs
                
                async def execute_with_semaphore(job):
                    async with semaphore:
                        await self.execute_research_job(job)
                
                tasks = [execute_with_semaphore(job) for job in ready_jobs]
                await asyncio.gather(*tasks, return_exceptions=True)
                
                logger.info(f"✅ Completed processing {len(ready_jobs)} jobs")
            else:
                logger.debug("📭 No jobs ready to execute")
                
        except Exception as e:
            logger.error(f"❌ Scheduler cycle error: {e}")
    
    def start_scheduler(self):
        """Start the real-time scheduler"""
        def scheduler_loop():
            """Main scheduler loop running in separate thread"""
            logger.info("🚀 Starting VentureForge Real-Time Scheduler")
            
            # Schedule the async function to run every minute
            schedule.every(1).minutes.do(
                lambda: asyncio.run(self.run_scheduler_cycle())
            )
            
            self.running = True
            
            while self.running:
                try:
                    schedule.run_pending()
                    time_module.sleep(10)  # Check every 10 seconds
                except Exception as e:
                    logger.error(f"Scheduler loop error: {e}")
                    time_module.sleep(60)  # Wait a minute before retrying
        
        # Start scheduler in daemon thread
        self.scheduler_thread = threading.Thread(target=scheduler_loop, daemon=True)
        self.scheduler_thread.start()
        
        logger.info("✅ Real-time scheduler started successfully")
        return self.scheduler_thread
    
    def stop_scheduler(self):
        """Stop the scheduler gracefully"""
        logger.info("🛑 Stopping scheduler...")
        self.running = False
        schedule.clear()
        
        if self.scheduler_thread and self.scheduler_thread.is_alive():
            self.scheduler_thread.join(timeout=5)
        
        logger.info("✅ Scheduler stopped")

# Global scheduler instance
_global_scheduler = None

def start_real_time_scheduler(database_url: str):
    """Start the global real-time scheduler"""
    global _global_scheduler
    
    if _global_scheduler is None:
        _global_scheduler = RealTimeScheduler(database_url)
        return _global_scheduler.start_scheduler()
    else:
        logger.warning("Scheduler already running")
        return None

def stop_real_time_scheduler():
    """Stop the global scheduler"""
    global _global_scheduler
    
    if _global_scheduler:
        _global_scheduler.stop_scheduler()
        _global_scheduler = None

async def test_scheduler():
    """Test function for the scheduler"""
    DATABASE_URL = "postgresql://postgres:password@localhost:5432/ventureforge"
    
    scheduler = RealTimeScheduler(DATABASE_URL)
    
    # Test getting ready jobs
    jobs = await scheduler.get_jobs_ready_to_run()
    logger.info(f"Found {len(jobs)} jobs ready to run")
    
    # Test running one cycle
    await scheduler.run_scheduler_cycle()

if __name__ == "__main__":
    # Test the enhanced scheduler
    asyncio.run(test_scheduler())
    print("✅ Enhanced scheduler test completed!")
