"""
VentureForge FastAPI Backend
Production-ready API with Google AI integration
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
import asyncpg
import asyncio
import json
import os
from datetime import datetime, timedelta
from contextlib import asynccontextmanager

# Import our enhanced modules
from pdf_generator_fixed import generate_pdf_report
from real_time_scheduler import start_real_time_scheduler

# Configure Google AI
GOOGLE_API_KEY = "AIzaSyCeaXYO6RHiFy4YmVGnaN7qXMwm7Qt1bSQ"
genai.configure(api_key=GOOGLE_API_KEY)

# Database configuration
DATABASE_URL = "postgresql://postgres:password@localhost:5432/ventureforge"
JWT_SECRET = "your-secret-key-here"
JWT_ALGORITHM = "HS256"

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class JobCreate(BaseModel):
    title: str
    description: str
    job_type: str
    frequency: str
    depth: str

class ResearchJob(BaseModel):
    id: int
    title: str
    description: str
    job_type: str
    frequency: str
    depth: str
    status: str
    success_probability: int
    created_at: datetime

class ResearchResult(BaseModel):
    market_analysis: Dict[str, Any]
    solution_proposals: List[Dict[str, Any]]
    infrastructure_blueprint: Dict[str, Any]
    success_probability: int

# Database connection pool
db_pool = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_pool
    # Startup
    db_pool = await asyncpg.create_pool(DATABASE_URL, min_size=5, max_size=20)
    
    # Start the enhanced real-time scheduler
    start_real_time_scheduler(DATABASE_URL)
    
    yield
    # Shutdown
    await db_pool.close()

# Add this after the existing imports and before the app creation
# Start the research scheduler
start_research_scheduler(DATABASE_URL)

app = FastAPI(
    title="VentureForge API",
    description="AI-powered platform for ambitious entrepreneurs",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# AI Research Engine
class AIResearchEngine:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def conduct_research(self, title: str, description: str, job_type: str, depth: str) -> ResearchResult:
        """Conduct AI-powered research using Google's Gemini model"""
        
        # Create research prompt based on job type
        if job_type == "validation":
            prompt = f"""
            As an expert business analyst, conduct comprehensive market validation for this business idea:
            
            Title: {title}
            Description: {description}
            Research Depth: {depth}
            
            Provide a detailed JSON response with:
            1. Market Analysis:
               - Market size (TAM, SAM, SOM)
               - Target audience analysis
               - Market trends and growth potential
               - Competitive landscape
               - Entry barriers
            
            2. Problem Validation:
               - Problem severity (1-10)
               - Market demand evidence
               - Customer pain points
               - Existing solutions analysis
            
            3. Success Probability:
               - Overall score (0-100)
               - Key success factors
               - Risk factors
               - Recommendations
            
            Format as valid JSON with clear structure.
            """
        
        elif job_type == "solution":
            prompt = f"""
            As an expert business strategist, develop a complete solution for this business idea:
            
            Title: {title}
            Description: {description}
            Research Depth: {depth}
            
            Provide a detailed JSON response with:
            1. Business Model:
               - Revenue streams
               - Value proposition
               - Customer segments
               - Key partnerships
            
            2. Solution Architecture:
               - Core features and functionality
               - User experience flow
               - Technology requirements
               - Development roadmap
            
            3. Go-to-Market Strategy:
               - Launch plan
               - Marketing channels
               - Pricing strategy
               - Customer acquisition
            
            4. Success Probability and metrics
            
            Format as valid JSON.
            """
        
        else:  # infrastructure
            prompt = f"""
            As an expert technical architect, design complete infrastructure for this business:
            
            Title: {title}
            Description: {description}
            Research Depth: {depth}
            
            Provide a detailed JSON response with:
            1. Technology Stack:
               - Frontend technologies
               - Backend frameworks
               - Database solutions
               - Cloud services
            
            2. Architecture Blueprint:
               - System architecture diagram description
               - Microservices breakdown
               - API design
               - Security considerations
            
            3. Deployment Strategy:
               - CI/CD pipeline
               - Infrastructure as Code
               - Monitoring and logging
               - Scaling strategy
            
            4. Cost Estimates:
               - Development costs
               - Infrastructure costs
               - Operational expenses
            
            5. Success Probability based on technical feasibility
            
            Format as valid JSON.
            """
        
        try:
            response = self.model.generate_content(prompt)
            
            # Parse the AI response
            result_text = response.text
            
            # Extract JSON from response (handle potential markdown formatting)
            if "\`\`\`json" in result_text:
                json_start = result_text.find("\`\`\`json") + 7
                json_end = result_text.find("\`\`\`", json_start)
                result_text = result_text[json_start:json_end].strip()
            
            try:
                result_data = json.loads(result_text)
            except json.JSONDecodeError:
                # Fallback: create structured response
                result_data = {
                    "market_analysis": {"summary": result_text[:500]},
                    "solution_proposals": [{"title": "AI Generated Solution", "description": result_text[500:1000]}],
                    "infrastructure_blueprint": {"overview": result_text[1000:1500]},
                    "success_probability": 75
                }
            
            return ResearchResult(
                market_analysis=result_data.get("market_analysis", {}),
                solution_proposals=result_data.get("solution_proposals", []),
                infrastructure_blueprint=result_data.get("infrastructure_blueprint", {}),
                success_probability=result_data.get("success_probability", 75)
            )
            
        except Exception as e:
            print(f"AI Research Error: {e}")
            # Return fallback result
            return ResearchResult(
                market_analysis={"error": "Research temporarily unavailable"},
                solution_proposals=[{"title": "Manual Review Required", "description": "Please try again later"}],
                infrastructure_blueprint={"status": "Pending AI analysis"},
                success_probability=50
            )

research_engine = AIResearchEngine()

# API Routes
@app.post("/api/auth/register")
async def register(user: UserCreate):
    async with db_pool.acquire() as conn:
        # Check if user exists
        existing_user = await conn.fetchrow("SELECT id FROM users WHERE email = $1", user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Hash password
        password_hash = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        # Create user
        user_id = await conn.fetchval(
            "INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id",
            user.email, user.name, password_hash
        )
        
        # Generate JWT token
        token = jwt.encode(
            {"user_id": user_id, "exp": datetime.utcnow() + timedelta(days=30)},
            JWT_SECRET,
            algorithm=JWT_ALGORITHM
        )
        
        return {"token": token, "user": {"id": user_id, "email": user.email, "name": user.name}}

@app.post("/api/auth/login")
async def login(user: UserLogin):
    async with db_pool.acquire() as conn:
        db_user = await conn.fetchrow(
            "SELECT id, email, name, password_hash, subscription FROM users WHERE email = $1",
            user.email
        )
        
        if not db_user or not bcrypt.checkpw(user.password.encode('utf-8'), db_user['password_hash'].encode('utf-8')):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Generate JWT token
        token = jwt.encode(
            {"user_id": db_user['id'], "exp": datetime.utcnow() + timedelta(days=30)},
            JWT_SECRET,
            algorithm=JWT_ALGORITHM
        )
        
        return {
            "token": token,
            "user": {
                "id": db_user['id'],
                "email": db_user['email'],
                "name": db_user['name'],
                "subscription": db_user['subscription']
            }
        }

@app.get("/api/jobs")
async def get_jobs(user_id: int = Depends(get_current_user)):
    async with db_pool.acquire() as conn:
        jobs = await conn.fetch(
            "SELECT * FROM research_jobs WHERE user_id = $1 ORDER BY created_at DESC",
            user_id
        )
        return [dict(job) for job in jobs]

@app.post("/api/jobs")
async def create_job(job: JobCreate, background_tasks: BackgroundTasks, user_id: int = Depends(get_current_user)):
    async with db_pool.acquire() as conn:
        job_id = await conn.fetchval(
            """INSERT INTO research_jobs (user_id, title, description, job_type, frequency, depth, status)
               VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING id""",
            user_id, job.title, job.description, job.job_type, job.frequency, job.depth
        )
        
        # Add background task to process the job
        background_tasks.add_task(process_research_job, job_id)
        
        return {"id": job_id, "status": "created"}

@app.post("/api/jobs/{job_id}/run")
async def run_job(job_id: int, background_tasks: BackgroundTasks, user_id: int = Depends(get_current_user)):
    async with db_pool.acquire() as conn:
        # Verify job ownership
        job = await conn.fetchrow(
            "SELECT * FROM research_jobs WHERE id = $1 AND user_id = $2",
            job_id, user_id
        )
        
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        # Update status to running
        await conn.execute(
            "UPDATE research_jobs SET status = 'running', updated_at = CURRENT_TIMESTAMP WHERE id = $1",
            job_id
        )
        
        # Add background task
        background_tasks.add_task(process_research_job, job_id)
        
        return {"status": "running"}

async def process_research_job(job_id: int):
    """Background task to process research job with AI"""
    async with db_pool.acquire() as conn:
        # Get job details
        job = await conn.fetchrow("SELECT * FROM research_jobs WHERE id = $1", job_id)
        if not job:
            return
        
        try:
            # Conduct AI research
            result = await research_engine.conduct_research(
                job['title'], job['description'], job['job_type'], job['depth']
            )
            
            # Save results
            await conn.execute(
                """INSERT INTO research_results (job_id, market_analysis, solution_proposals, infrastructure_blueprint, success_metrics)
                   VALUES ($1, $2, $3, $4, $5)""",
                job_id,
                json.dumps(result.market_analysis),
                json.dumps(result.solution_proposals),
                json.dumps(result.infrastructure_blueprint),
                json.dumps({"success_probability": result.success_probability})
            )
            
            # Update job status
            await conn.execute(
                """UPDATE research_jobs 
                   SET status = 'completed', success_probability = $1, updated_at = CURRENT_TIMESTAMP 
                   WHERE id = $2""",
                result.success_probability, job_id
            )
            
        except Exception as e:
            print(f"Job processing error: {e}")
            # Update job status to failed
            await conn.execute(
                "UPDATE research_jobs SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE id = $1",
                job_id
            )

@app.get("/api/jobs/{job_id}/results")
async def get_job_results(job_id: int, user_id: int = Depends(get_current_user)):
    async with db_pool.acquire() as conn:
        # Verify job ownership
        job = await conn.fetchrow(
            "SELECT * FROM research_jobs WHERE id = $1 AND user_id = $2",
            job_id, user_id
        )
        
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        # Get results
        result = await conn.fetchrow(
            "SELECT * FROM research_results WHERE job_id = $1",
            job_id
        )
        
        if not result:
            raise HTTPException(status_code=404, detail="Results not found")
        
        return {
            "job": dict(job),
            "results": {
                "market_analysis": json.loads(result['market_analysis']),
                "solution_proposals": json.loads(result['solution_proposals']),
                "infrastructure_blueprint": json.loads(result['infrastructure_blueprint']),
                "success_metrics": json.loads(result['success_metrics'])
            }
        }

@app.get("/api/dashboard/stats")
async def get_dashboard_stats(user_id: int = Depends(get_current_user)):
    async with db_pool.acquire() as conn:
        stats = await conn.fetchrow(
            """SELECT 
                COUNT(*) as total_jobs,
                COUNT(*) FILTER (WHERE status = 'running') as active_jobs,
                COUNT(*) FILTER (WHERE status = 'completed') as completed_jobs,
                COALESCE(AVG(success_probability) FILTER (WHERE success_probability > 0), 0) as avg_success_rate
               FROM research_jobs WHERE user_id = $1""",
            user_id
        )
        
        return {
            "total_jobs": stats['total_jobs'],
            "active_jobs": stats['active_jobs'],
            "completed_jobs": stats['completed_jobs'],
            "avg_success_rate": round(stats['avg_success_rate'])
        }

# Add this new endpoint after the existing endpoints
@app.get("/api/jobs/{job_id}/download-pdf")
async def download_pdf_report(job_id: int):
    async with db_pool.acquire() as conn:
        # Get job details
        job = await conn.fetchrow("SELECT * FROM research_jobs WHERE id = $1", job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        # Get research results
        result = await conn.fetchrow("SELECT * FROM research_results WHERE job_id = $1", job_id)
        
        # Generate enhanced PDF
        job_data = {
            'title': job['title'],
            'description': job['description'],
            'successProbability': job['success_probability'] or 75
        }
        
        research_data = None
        if result:
            research_data = {
                'market_analysis': json.loads(result['market_analysis']),
                'solution_proposals': json.loads(result['solution_proposals']),
                'infrastructure_blueprint': json.loads(result['infrastructure_blueprint'])
            }
        
        # Generate proper PDF using enhanced generator
        pdf_content = generate_pdf_report(job_data, research_data)
        
        # Return proper PDF response
        filename = f"{job['title'].replace(' ', '_').replace('/', '_')}_VentureForge_Report.pdf"
        
        return Response(
            content=pdf_content,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}",
                "Content-Type": "application/pdf"
            }
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
