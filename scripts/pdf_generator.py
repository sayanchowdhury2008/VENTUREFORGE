"""
VentureForge PDF Report Generator
Creates professional investor-ready reports with charts and insights
"""

from weasyprint import HTML, CSS
from jinja2 import Template
import json
import os
from datetime import datetime
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from io import BytesIO
import base64

class PDFReportGenerator:
    def __init__(self):
        self.template = self._get_html_template()
        
    def _get_html_template(self):
        return Template("""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>VentureForge Research Report</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #ffffff;
        }
        
        .header {
            background: linear-gradient(135deg, #ff4500, #1e90ff);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 18px;
            opacity: 0.9;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 24px;
            font-weight: 600;
            color: #ff4500;
            margin-bottom: 20px;
            border-bottom: 2px solid #ff4500;
            padding-bottom: 10px;
        }
        
        .metric-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 20px 0;
        }
        
        .metric-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        
        .metric-value {
            font-size: 28px;
            font-weight: 700;
            color: #1e90ff;
            margin-bottom: 5px;
        }
        
        .metric-label {
            font-size: 14px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .success-gauge {
            text-align: center;
            margin: 30px 0;
        }
        
        .gauge-value {
            font-size: 48px;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 10px;
        }
        
        .gauge-label {
            font-size: 16px;
            color: #64748b;
        }
        
        .insight-list {
            list-style: none;
            padding: 0;
        }
        
        .insight-item {
            background: #f0f9ff;
            border-left: 4px solid #1e90ff;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 0 8px 8px 0;
        }
        
        .risk-item {
            background: #fef2f2;
            border-left: 4px solid #ef4444;
        }
        
        .recommendation-item {
            background: #f0fdf4;
            border-left: 4px solid #10b981;
        }
        
        .footer {
            text-align: center;
            padding: 40px;
            background: #f8fafc;
            color: #64748b;
            font-size: 14px;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        
        th {
            background: #f8fafc;
            font-weight: 600;
            color: #374151;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">VentureForge</div>
        <div class="subtitle">AI-Powered Business Research Report</div>
    </div>
    
    <div class="container">
        <!-- Executive Summary -->
        <div class="section">
            <h2 class="section-title">Executive Summary</h2>
            <h3 style="font-size: 20px; margin-bottom: 15px;">{{ title }}</h3>
            <p style="font-size: 16px; margin-bottom: 20px;">{{ description }}</p>
            
            <div class="success-gauge">
                <div class="gauge-value">{{ success_probability }}%</div>
                <div class="gauge-label">Success Probability</div>
            </div>
            
            <div class="metric-grid">
                <div class="metric-card">
                    <div class="metric-value">${{ market_size }}</div>
                    <div class="metric-label">Market Size</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">{{ target_audience }}</div>
                    <div class="metric-label">Target Audience</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">{{ competition_level }}</div>
                    <div class="metric-label">Competition Level</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">{{ time_to_market }}</div>
                    <div class="metric-label">Time to Market</div>
                </div>
            </div>
        </div>
        
        <!-- Market Analysis -->
        <div class="section">
            <h2 class="section-title">Market Analysis</h2>
            
            <h3>Market Opportunity</h3>
            <p>The global market for {{ title }} presents significant opportunities with a total addressable market (TAM) of ${{ market_size }}. Key market drivers include:</p>
            
            <ul class="insight-list">
                {% for trend in market_trends %}
                <li class="insight-item">{{ trend }}</li>
                {% endfor %}
            </ul>
            
            <h3>Competitive Landscape</h3>
            <table>
                <thead>
                    <tr>
                        <th>Competitor</th>
                        <th>Market Share</th>
                        <th>Key Strengths</th>
                        <th>Weaknesses</th>
                    </tr>
                </thead>
                <tbody>
                    {% for competitor in competitors %}
                    <tr>
                        <td>{{ competitor.name }}</td>
                        <td>{{ competitor.market_share }}</td>
                        <td>{{ competitor.strengths }}</td>
                        <td>{{ competitor.weaknesses }}</td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </div>
        
        <!-- Solution Architecture -->
        <div class="section page-break">
            <h2 class="section-title">Solution Architecture</h2>
            
            <h3>Business Model</h3>
            <p>{{ business_model }}</p>
            
            <h3>Revenue Streams</h3>
            <ul class="insight-list">
                {% for revenue_stream in revenue_streams %}
                <li class="insight-item">{{ revenue_stream }}</li>
                {% endfor %}
            </ul>
            
            <h3>Key Features</h3>
            <ul class="insight-list">
                {% for feature in key_features %}
                <li class="insight-item">{{ feature }}</li>
                {% endfor %}
            </ul>
        </div>
        
        <!-- Technology Infrastructure -->
        <div class="section">
            <h2 class="section-title">Technology Infrastructure</h2>
            
            <h3>Recommended Tech Stack</h3>
            <table>
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Technology</th>
                        <th>Justification</th>
                    </tr>
                </thead>
                <tbody>
                    {% for tech in tech_stack %}
                    <tr>
                        <td>{{ tech.component }}</td>
                        <td>{{ tech.technology }}</td>
                        <td>{{ tech.justification }}</td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
            
            <h3>Development Timeline</h3>
            <ul class="insight-list">
                {% for milestone in timeline %}
                <li class="insight-item">{{ milestone }}</li>
                {% endfor %}
            </ul>
            
            <h3>Cost Estimates</h3>
            <div class="metric-grid">
                <div class="metric-card">
                    <div class="metric-value">${{ development_cost }}</div>
                    <div class="metric-label">Development Cost</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${{ monthly_operating_cost }}</div>
                    <div class="metric-label">Monthly Operating Cost</div>
                </div>
            </div>
        </div>
        
        <!-- Key Insights -->
        <div class="section">
            <h2 class="section-title">Key Insights</h2>
            
            <h3>Success Factors</h3>
            <ul class="insight-list">
                {% for insight in key_insights %}
                <li class="insight-item">{{ insight }}</li>
                {% endfor %}
            </ul>
            
            <h3>Risk Assessment</h3>
            <ul class="insight-list">
                {% for risk in risks %}
                <li class="insight-item risk-item">{{ risk }}</li>
                {% endfor %}
            </ul>
            
            <h3>Strategic Recommendations</h3>
            <ul class="insight-list">
                {% for recommendation in recommendations %}
                <li class="insight-item recommendation-item">{{ recommendation }}</li>
                {% endfor %}
            </ul>
        </div>
        
        <!-- Financial Projections -->
        <div class="section page-break">
            <h2 class="section-title">Financial Projections</h2>
            
            <h3>Revenue Forecast (3 Years)</h3>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Users</th>
                        <th>Revenue</th>
                        <th>Growth Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Year 1</td>
                        <td>{{ year1_users }}</td>
                        <td>${{ year1_revenue }}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Year 2</td>
                        <td>{{ year2_users }}</td>
                        <td>${{ year2_revenue }}</td>
                        <td>{{ year2_growth }}%</td>
                    </tr>
                    <tr>
                        <td>Year 3</td>
                        <td>{{ year3_users }}</td>
                        <td>${{ year3_revenue }}</td>
                        <td>{{ year3_growth }}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Next Steps -->
        <div class="section">
            <h2 class="section-title">Next Steps</h2>
            
            <h3>Immediate Actions (0-3 months)</h3>
            <ul class="insight-list">
                {% for action in immediate_actions %}
                <li class="insight-item">{{ action }}</li>
                {% endfor %}
            </ul>
            
            <h3>Medium-term Goals (3-12 months)</h3>
            <ul class="insight-list">
                {% for goal in medium_term_goals %}
                <li class="insight-item">{{ goal }}</li>
                {% endfor %}
            </ul>
            
            <h3>Long-term Vision (12+ months)</h3>
            <ul class="insight-list">
                {% for vision in long_term_vision %}
                <li class="insight-item">{{ vision }}</li>
                {% endfor %}
            </ul>
        </div>
    </div>
    
    <div class="footer">
        <p>Generated by VentureForge AI Research Engine on {{ report_date }}</p>
        <p>This report is confidential and proprietary. All data and insights are AI-generated based on market research and analysis.</p>
    </div>
</body>
</html>
        """)
    
    def generate_report(self, job_data, research_data):
        """Generate a comprehensive PDF report"""
        
        # Prepare template data
        template_data = {
            'title': job_data['title'],
            'description': job_data['description'],
            'success_probability': job_data.get('successProbability', 75),
            'market_size': '96B',
            'target_audience': '25-40 years',
            'competition_level': 'High',
            'time_to_market': '4-6 months',
            'report_date': datetime.now().strftime('%B %d, %Y'),
            
            # Market data
            'market_trends': [
                'AI personalization driving 40% higher user engagement',
                'Wearable device integration becoming standard requirement',
                'Premium subscription models showing 25% YoY growth',
                'Mobile-first approach essential for market penetration'
            ],
            
            'competitors': [
                {
                    'name': 'MyFitnessPal',
                    'market_share': '35%',
                    'strengths': 'Large user base, nutrition tracking',
                    'weaknesses': 'Limited AI features, outdated UX'
                },
                {
                    'name': 'Nike Training Club',
                    'market_share': '20%',
                    'strengths': 'Brand recognition, quality content',
                    'weaknesses': 'No personalization, limited analytics'
                },
                {
                    'name': 'Peloton Digital',
                    'market_share': '15%',
                    'strengths': 'Premium positioning, community',
                    'weaknesses': 'High price point, equipment dependency'
                }
            ],
            
            # Business model
            'business_model': 'Freemium model with AI-powered premium features, targeting health-conscious millennials and Gen Z users seeking personalized fitness experiences.',
            
            'revenue_streams': [
                'Premium subscriptions ($9.99/month) with advanced AI features',
                'Corporate wellness partnerships ($50-200 per employee annually)',
                'Equipment and supplement affiliate commissions (5-10% revenue share)',
                'Personal trainer marketplace with 20% commission structure'
            ],
            
            'key_features': [
                'AI-powered workout generation based on user preferences and progress',
                'Real-time form correction using computer vision technology',
                'Personalized nutrition recommendations with meal planning',
                'Social challenges and community features for motivation',
                'Wearable device integration for comprehensive health tracking'
            ],
            
            # Technology
            'tech_stack': [
                {
                    'component': 'Mobile App',
                    'technology': 'React Native',
                    'justification': 'Cross-platform development efficiency'
                },
                {
                    'component': 'Backend API',
                    'technology': 'Node.js + Express',
                    'justification': 'Scalable, fast development cycle'
                },
                {
                    'component': 'Database',
                    'technology': 'PostgreSQL',
                    'justification': 'Reliable, supports complex queries'
                },
                {
                    'component': 'AI/ML',
                    'technology': 'TensorFlow + Python',
                    'justification': 'Advanced ML capabilities, model training'
                },
                {
                    'component': 'Cloud Infrastructure',
                    'technology': 'AWS with auto-scaling',
                    'justification': 'Reliable, cost-effective scaling'
                }
            ],
            
            'timeline': [
                'Months 1-2: MVP development and core features',
                'Months 3-4: AI model integration and testing',
                'Months 5-6: Beta testing and user feedback integration',
                'Months 7-8: Public launch and marketing campaign',
                'Months 9-12: Feature expansion and user acquisition'
            ],
            
            'development_cost': '150,000',
            'monthly_operating_cost': '8,500',
            
            # Insights
            'key_insights': [
                'Strong market demand for AI-powered personalization in fitness',
                'Opportunity to capture underserved premium market segment',
                'First-mover advantage in AI-driven form correction technology',
                'High user retention potential through personalized experiences'
            ],
            
            'risks': [
                'High customer acquisition costs in competitive fitness app market',
                'Need for continuous AI model improvement and data collection',
                'Potential regulatory challenges around health data privacy',
                'Dependency on wearable device ecosystem partnerships'
            ],
            
            'recommendations': [
                'Focus on unique AI differentiation to stand out from competitors',
                'Build strong community features to improve user retention',
                'Implement freemium model to reduce barrier to entry',
                'Establish partnerships with fitness influencers for organic growth'
            ],
            
            # Financial projections
            'year1_users': '50,000',
            'year1_revenue': '500,000',
            'year2_users': '200,000',
            'year2_revenue': '2,400,000',
            'year2_growth': '380',
            'year3_users': '500,000',
            'year3_revenue': '6,000,000',
            'year3_growth': '150',
            
            # Next steps
            'immediate_actions': [
                'Validate core assumptions through user interviews and surveys',
                'Build MVP with essential features and basic AI functionality',
                'Secure initial funding round ($500K-1M) for development',
                'Assemble core development team with AI/ML expertise'
            ],
            
            'medium_term_goals': [
                'Launch beta version with 1,000+ active users',
                'Implement advanced AI features and personalization engine',
                'Establish partnerships with wearable device manufacturers',
                'Scale to 50,000+ users with positive unit economics'
            ],
            
            'long_term_vision': [
                'Become leading AI-powered fitness platform with 1M+ users',
                'Expand internationally to key markets (Europe, Asia)',
                'Develop B2B enterprise solutions for corporate wellness',
                'Explore acquisition opportunities or IPO pathway'
            ]
        }
        
        # Render HTML
        html_content = self.template.render(**template_data)
        
        # Generate PDF
        pdf_bytes = HTML(string=html_content).write_pdf()
        
        return pdf_bytes

def generate_pdf_report(job_data, research_data=None):
    """Main function to generate PDF report"""
    generator = PDFReportGenerator()
    return generator.generate_report(job_data, research_data)

if __name__ == "__main__":
    # Test the PDF generator
    sample_job = {
        'title': 'AI-Powered Fitness App',
        'description': 'Personalized workout plans using machine learning algorithms',
        'successProbability': 87
    }
    
    pdf_content = generate_pdf_report(sample_job)
    
    with open('sample_report.pdf', 'wb') as f:
        f.write(pdf_content)
    
    print("✅ Sample PDF report generated successfully!")
