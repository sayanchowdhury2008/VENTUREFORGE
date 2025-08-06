"""
VentureForge Backend Setup Script
This script sets up the FastAPI backend with PostgreSQL database
"""

import asyncio
import asyncpg
import os
from datetime import datetime

# Database configuration
DATABASE_URL = "postgresql://postgres:password@localhost:5432/ventureforge"

async def create_database():
    """Create the VentureForge database and tables"""
    
    # Connect to PostgreSQL
    conn = await asyncpg.connect("postgresql://postgres:password@localhost:5432/postgres")
    
    # Create database if it doesn't exist
    try:
        await conn.execute("CREATE DATABASE ventureforge")
        print("✅ Database 'ventureforge' created successfully")
    except asyncpg.DuplicateDatabaseError:
        print("ℹ️ Database 'ventureforge' already exists")
    
    await conn.close()
    
    # Connect to the ventureforge database
    conn = await asyncpg.connect(DATABASE_URL)
    
    # Create users table
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            subscription VARCHAR(50) DEFAULT 'free',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create research_jobs table
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS research_jobs (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            job_type VARCHAR(50) NOT NULL,
            frequency VARCHAR(50) NOT NULL,
            depth VARCHAR(50) NOT NULL,
            status VARCHAR(50) DEFAULT 'pending',
            success_probability INTEGER DEFAULT 0,
            research_data JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create research_results table
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS research_results (
            id SERIAL PRIMARY KEY,
            job_id INTEGER REFERENCES research_jobs(id) ON DELETE CASCADE,
            market_analysis JSONB,
            solution_proposals JSONB,
            infrastructure_blueprint JSONB,
            success_metrics JSONB,
            pdf_path VARCHAR(255),
            video_path VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create indexes for better performance
    await conn.execute("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)")
    await conn.execute("CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON research_jobs(user_id)")
    await conn.execute("CREATE INDEX IF NOT EXISTS idx_jobs_status ON research_jobs(status)")
    await conn.execute("CREATE INDEX IF NOT EXISTS idx_results_job_id ON research_results(job_id)")
    
    print("✅ All tables and indexes created successfully")
    
    # Insert sample data
    await conn.execute("""
        INSERT INTO users (email, name, password_hash, subscription) 
        VALUES ($1, $2, $3, $4) 
        ON CONFLICT (email) DO NOTHING
    """, "demo@ventureforge.com", "Demo User", "hashed_password", "pro")
    
    print("✅ Sample user data inserted")
    
    await conn.close()
    print("🚀 Database setup completed successfully!")

if __name__ == "__main__":
    asyncio.run(create_database())
