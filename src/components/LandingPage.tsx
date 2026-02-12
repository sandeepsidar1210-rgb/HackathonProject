import { MapPin, Shield, Satellite, FileText, ChevronRight, Menu, Phone, Mail } from 'lucide-react';
import Sentinel2LandingMap from './Sentinel2LandingMap';
import csidcLogo from 'figma:asset/ffa8c1ead3f4fef010b0bf27deab0aa98c2711aa.png';

interface LandingPageProps {
  onLoginClick: () => void;
  onNavigate: (page: 'landing' | 'dashboard') => void;
}

export default function LandingPage({ onLoginClick, onNavigate }: LandingPageProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F6F8' }}>
      {/* Slim Government Header */}
      <header className="text-white" style={{ backgroundColor: '#0F4C5C', height: '64px' }}>
        <div className="max-w-[1600px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded flex items-center justify-center bg-white p-1.5">
              <img src={csidcLogo} alt="CSIDC Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-semibold text-white text-base">CSIDC Monitoring Portal</div>
              <div className="text-xs opacity-90">Government of Chhattisgarh</div>
            </div>
          </div>

          {/* Right: Navigation & Login */}
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6 text-sm">
              <button onClick={() => scrollToSection('home')} className="hover:opacity-80 transition-opacity cursor-pointer">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:opacity-80 transition-opacity cursor-pointer">About</button>
              <button onClick={() => scrollToSection('monitoring')} className="hover:opacity-80 transition-opacity cursor-pointer">Monitoring</button>
              <button onClick={() => scrollToSection('contact')} className="hover:opacity-80 transition-opacity cursor-pointer">Contact</button>
            </nav>
            <button
              onClick={onLoginClick}
              className="px-6 py-2 rounded font-medium text-sm transition-colors"
              style={{ backgroundColor: '#C6A75E', color: '#FFFFFF' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b39654'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C6A75E'}
            >
              Officer Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Split Layout */}
      <section id="home" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DDE2E7' }}>
        <div className="max-w-[1600px] mx-auto px-8 py-16">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#0F4C5C10', border: '1px solid #0F4C5C30' }}>
                <Satellite className="w-4 h-4" style={{ color: '#0F4C5C' }} />
                <span className="text-sm font-medium" style={{ color: '#0F4C5C' }}>Satellite-Based Monitoring System</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4 leading-tight" style={{ color: '#2C3E50' }}>
                Automated Industrial Land<br />Monitoring & Compliance System
              </h1>
              
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#6B7C93' }}>
                Advanced GIS-based monitoring platform for real-time detection of encroachments, 
                unauthorized construction, and compliance violations across Chhattisgarh's industrial areas.
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={onLoginClick}
                  className="flex items-center gap-2 px-8 py-3 rounded font-medium transition-colors"
                  style={{ backgroundColor: '#0F4C5C', color: '#FFFFFF' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                >
                  Access Dashboard
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection('monitoring')}
                  className="px-8 py-3 rounded font-medium transition-colors"
                  style={{ border: '1px solid #0F4C5C', color: '#0F4C5C', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C10'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  View Industrial Areas
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8" style={{ borderTop: '1px solid #DDE2E7' }}>
                <div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#0F4C5C' }}>1,247</div>
                  <div className="text-sm" style={{ color: '#6B7C93' }}>Total Plots</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#2E7D32' }}>89.3%</div>
                  <div className="text-sm" style={{ color: '#6B7C93' }}>Compliance Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#C62828' }}>47</div>
                  <div className="text-sm" style={{ color: '#6B7C93' }}>Active Violations</div>
                </div>
              </div>
            </div>

            {/* Right: Map Preview Graphic */}
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#F4F6F8', border: '1px solid #DDE2E7' }}>
              <div className="aspect-[4/3] relative">
                {/* Map Preview Illustration */}
                <svg viewBox="0 0 600 450" className="w-full h-full">
                  {/* Background */}
                  <rect width="600" height="450" fill="#E8F1F5" />
                  
                  {/* State outline */}
                  <path
                    d="M 100 80 L 280 60 L 420 90 L 500 140 L 520 240 L 480 340 L 380 400 L 240 420 L 140 380 L 80 280 L 90 160 Z"
                    fill="#FFFFFF"
                    stroke="#1F3A5F"
                    strokeWidth="2"
                  />
                  
                  {/* Industrial zones - color coded */}
                  <circle cx="180" cy="150" r="24" fill="#2E7D32" opacity="0.3" />
                  <circle cx="180" cy="150" r="8" fill="#2E7D32" />
                  
                  <circle cx="320" cy="180" r="28" fill="#F9A825" opacity="0.3" />
                  <circle cx="320" cy="180" r="8" fill="#F9A825" />
                  
                  <circle cx="400" cy="260" r="20" fill="#C62828" opacity="0.3" />
                  <circle cx="400" cy="260" r="8" fill="#C62828" />
                  
                  <circle cx="220" cy="280" r="18" fill="#2E7D32" opacity="0.3" />
                  <circle cx="220" cy="280" r="8" fill="#2E7D32" />
                  
                  <circle cx="300" cy="320" r="22" fill="#F9A825" opacity="0.3" />
                  <circle cx="300" cy="320" r="8" fill="#F9A825" />
                  
                  {/* Grid lines */}
                  {[...Array(8)].map((_, i) => (
                    <line
                      key={`h${i}`}
                      x1="60"
                      y1={60 + i * 50}
                      x2="540"
                      y2={60 + i * 50}
                      stroke="#0F4C5C"
                      strokeWidth="0.5"
                      opacity="0.2"
                    />
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <line
                      key={`v${i}`}
                      x1={60 + i * 50}
                      y1="60"
                      x2={60 + i * 50}
                      y2="410"
                      stroke="#0F4C5C"
                      strokeWidth="0.5"
                      opacity="0.2"
                    />
                  ))}
                </svg>

                {/* Overlay UI Elements */}
                <div className="absolute top-4 left-4 bg-white rounded px-3 py-2 text-xs font-medium" style={{ color: '#2C3E50', border: '1px solid #DDE2E7' }}>
                  Live Monitoring Active
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white rounded p-3" style={{ border: '1px solid #DDE2E7' }}>
                  <div className="text-xs font-semibold mb-2" style={{ color: '#2C3E50' }}>Status</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2E7D32' }} />
                      <span style={{ color: '#2C3E50' }}>Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F9A825' }} />
                      <span style={{ color: '#2C3E50' }}>Moderate</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C62828' }} />
                      <span style={{ color: '#2C3E50' }}>High Risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Map Section - Full Width Dominant */}
      <section id="monitoring">
        <Sentinel2LandingMap />
      </section>

      {/* Key Features - Grid Layout */}
      <section id="about" className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#2C3E50' }}>System Capabilities</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7C93' }}>
              Comprehensive monitoring and compliance management built for efficient governance
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: Satellite,
                title: 'Satellite Monitoring',
                description: 'Real-time satellite imagery analysis for automated detection of land use violations',
                color: '#0F4C5C'
              },
              {
                icon: MapPin,
                title: 'GIS Mapping',
                description: 'Precise geographic information system integration for accurate boundary verification',
                color: '#1F3A5F'
              },
              {
                icon: Shield,
                title: 'Compliance Tracking',
                description: 'Automated compliance monitoring with instant alerts for violations and encroachments',
                color: '#C6A75E'
              },
              {
                icon: FileText,
                title: 'Automated Reporting',
                description: 'Generate comprehensive violation reports and legal notices automatically',
                color: '#C62828'
              },
              {
                icon: Shield,
                title: 'Multi-level Access',
                description: 'Role-based access control for officers, admins, inspection teams, and legal departments',
                color: '#F9A825'
              },
              {
                icon: Satellite,
                title: 'Historical Analysis',
                description: 'Track changes over time with historical satellite imagery comparison and trends',
                color: '#2E7D32'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded p-8 transition-all hover:shadow-lg"
                style={{ border: '1px solid #DDE2E7', borderLeft: `4px solid ${feature.color}` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${feature.color}15` }}>
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: '#2C3E50' }}>{feature.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6B7C93' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12" style={{ backgroundColor: '#0F4C5C', color: '#FFFFFF' }}>
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="grid grid-cols-4 gap-12 mb-8">
            <div>
              <div className="font-semibold mb-4 text-lg">CSIDC</div>
              <p className="text-sm opacity-90 leading-relaxed">
                Chhattisgarh State Industrial Development Corporation
              </p>
            </div>
            
            <div>
              <div className="font-semibold mb-4">Quick Links</div>
              <ul className="space-y-2 text-sm opacity-90">
                <li><a href="#" className="hover:opacity-100 transition-opacity">About CSIDC</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Industrial Areas</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Policies</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Downloads</a></li>
              </ul>
            </div>
            
            <div>
              <div className="font-semibold mb-4">Support</div>
              <ul className="space-y-2 text-sm opacity-90">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Help Center</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Documentation</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <div className="font-semibold mb-4">Contact</div>
              <div className="space-y-3 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 771 XXX XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@csidc.gov.in</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 text-sm opacity-75 text-center" style={{ borderTop: '1px solid #FFFFFF20' }}>
            © 2024 Chhattisgarh State Industrial Development Corporation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}