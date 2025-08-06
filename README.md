# VentureForge 🚀

**Forge Your Billion-Dollar Venture** - An AI-powered platform designed specifically for ambitious entrepreneurs to automate scheduled deep research, validate business ideas, generate complete solutions with development infrastructure, and assess success probabilities.

## 🌟 Features

- **AI-Powered Research**: Deep market analysis using Google's Gemini AI
- **Success Probability Scoring**: Data-driven validation with 0-100% success metrics
- **Complete Solution Generation**: Step-by-step business plans and infrastructure blueprints
- **Automated Workflows**: Schedule recurring research jobs with customizable frequency
- **Investor-Ready Reports**: Professional PDF generation and promo videos
- **Real-time Dashboard**: Track your ideas with beautiful analytics and progress indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/ventureforge.git
cd ventureforge
\`\`\`

2. **Install frontend dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up the database**
\`\`\`bash
python scripts/setup_backend.py
\`\`\`

4. **Start the development servers**
\`\`\`bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
python scripts/backend_api.py
\`\`\`

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Docker Setup (Recommended for Production)

\`\`\`bash
docker-compose up -d
\`\`\`

## 🎯 Usage

1. **Sign Up**: Create your entrepreneur account
2. **Create Research Job**: Define your business idea with title and description
3. **Select Research Type**: Choose from Validation, Solution, or Infrastructure
4. **Set Frequency**: One-time, Daily, Weekly, or Monthly research
5. **Launch**: Let AI analyze your idea and generate comprehensive reports
6. **Download Results**: Get investor-ready PDFs and promo videos

## 🏗️ Architecture

### Frontend
- **Next.js 14+** with App Router
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **TanStack Query** for data fetching
- **TypeScript** for type safety

### Backend
- **FastAPI** with async/await
- **PostgreSQL** with asyncpg
- **Google Gemini AI** for research
- **JWT Authentication**
- **Background Tasks** with Celery

### Infrastructure
- **Docker** containerization
- **Redis** for caching and task queues
- **PostgreSQL** for data persistence
- **Nginx** for production deployment

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

\`\`\`env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/ventureforge

# Google AI
GOOGLE_API_KEY=your_google_api_key_here

# JWT
JWT_SECRET=your_secret_key_here

# Redis
REDIS_URL=redis://localhost:6379

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
\`\`\`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Research Jobs
- `GET /api/jobs` - List user's research jobs
- `POST /api/jobs` - Create new research job
- `POST /api/jobs/{id}/run` - Execute research job
- `GET /api/jobs/{id}/results` - Get research results

### Dashboard
- `GET /api/dashboard/stats` - Get user statistics

## 🎨 Design System

### Colors
- **Primary Orange**: #FF4500 (Energy, Innovation)
- **Secondary Blue**: #1E90FF (Trust, Reliability)
- **Dark Theme**: Slate grays for professional look

### Typography
- **Font**: Inter (Clean, modern, readable)
- **Hierarchy**: Bold headings, medium body text

### Components
- **Cards**: Glassmorphism effect with subtle borders
- **Buttons**: Gradient backgrounds with hover animations
- **Progress**: Animated gauges and progress bars

## 🚀 Deployment

### Production Deployment

1. **Build the application**
\`\`\`bash
npm run build
\`\`\`

2. **Deploy with Docker**
\`\`\`bash
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

3. **Set up SSL** (recommended)
\`\`\`bash
# Using Let's Encrypt with Certbot
certbot --nginx -d yourdomain.com
\`\`\`

### Scaling Considerations
- Use Redis Cluster for high availability
- Implement database read replicas
- Add CDN for static assets
- Use load balancers for multiple instances

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google AI for Gemini API
- Vercel for hosting platform
- shadcn/ui for component library
- Framer Motion for animations

---

**Built with ❤️ for ambitious entrepreneurs worldwide**

*Ready to forge your billion-dollar venture? Start your journey today!*
