import { useState } from 'react';
import { LayoutDashboard, Map, FileText, MessageSquare, Bell, File, User, LogOut, AlertCircle, CheckCircle, Clock, IndianRupee, Download } from 'lucide-react';
import csidcLogo from 'figma:asset/ffa8c1ead3f4fef010b0bf27deab0aa98c2711aa.png';

interface UserDashboardProps {
  onNavigate: (page: 'user-dashboard' | 'user-plots' | 'user-raise-issue' | 'user-complaints' | 'user-notices') => void;
  onLogout: () => void;
}

export default function UserDashboard({ onNavigate, onLogout }: UserDashboardProps) {
  const [activePage, setActivePage] = useState('user-dashboard');

  const handleNavClick = (page: 'user-dashboard' | 'user-plots' | 'user-raise-issue' | 'user-complaints' | 'user-notices') => {
    setActivePage(page);
    onNavigate(page);
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#F4F6F8' }}>
      {/* Left Sidebar - Fixed */}
      <aside className="w-64 flex-shrink-0 flex flex-col" style={{ backgroundColor: '#0F4C5C', color: '#FFFFFF' }}>
        {/* Sidebar Header */}
        <div className="p-6" style={{ borderBottom: '1px solid #FFFFFF20' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#FFFFFF20' }}>
              <img src={csidcLogo} alt="CSIDC Logo" className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Allottee Portal</div>
              <div className="text-xs opacity-75">Industry Dashboard</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            <button
              onClick={() => handleNavClick('user-dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
                activePage === 'user-dashboard' ? 'font-medium' : 'opacity-75 hover:opacity-100'
              }`}
              style={activePage === 'user-dashboard' ? { backgroundColor: '#FFFFFF20' } : {}}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => handleNavClick('user-plots')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
                activePage === 'user-plots' ? 'font-medium' : 'opacity-75 hover:opacity-100'
              }`}
              style={activePage === 'user-plots' ? { backgroundColor: '#FFFFFF20' } : {}}
            >
              <Map className="w-5 h-5" />
              <span>My Plots</span>
            </button>

            <button
              onClick={() => handleNavClick('user-raise-issue')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
                activePage === 'user-raise-issue' ? 'font-medium' : 'opacity-75 hover:opacity-100'
              }`}
              style={activePage === 'user-raise-issue' ? { backgroundColor: '#FFFFFF20' } : {}}
            >
              <FileText className="w-5 h-5" />
              <span>Raise Issue</span>
            </button>

            <button
              onClick={() => handleNavClick('user-complaints')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
                activePage === 'user-complaints' ? 'font-medium' : 'opacity-75 hover:opacity-100'
              }`}
              style={activePage === 'user-complaints' ? { backgroundColor: '#FFFFFF20' } : {}}
            >
              <MessageSquare className="w-5 h-5" />
              <span>My Complaints</span>
            </button>

            <button
              onClick={() => handleNavClick('user-notices')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
                activePage === 'user-notices' ? 'font-medium' : 'opacity-75 hover:opacity-100'
              }`}
              style={activePage === 'user-notices' ? { backgroundColor: '#FFFFFF20' } : {}}
            >
              <Bell className="w-5 h-5" />
              <span>Notices & Updates</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <File className="w-5 h-5" />
              <span>Documents</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer - User Profile */}
        <div className="p-4" style={{ borderTop: '1px solid #FFFFFF20' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C6A75E' }}>
              <User className="w-5 h-5" style={{ color: '#FFFFFF' }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Sai Industries</div>
              <div className="text-xs opacity-75">Plot Allottee</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors"
            style={{ backgroundColor: '#FFFFFF15' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF25'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF15'}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white px-8 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7' }}>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>Dashboard Overview</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>Welcome to Industry Allottee Portal</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" style={{ color: '#6B7C93' }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#C62828' }} />
            </button>

            {/* Profile Dropdown */}
            <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0F4C5C' }}>
                <User className="w-4 h-4" style={{ color: '#FFFFFF' }} />
              </div>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* KPI Cards - Grid of 4 */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                {
                  icon: Map,
                  label: 'Total Allotted Plots',
                  value: '3',
                  subtext: 'Raipur & Bhilai zones',
                  color: '#0F4C5C',
                  accentColor: '#0F4C5C'
                },
                {
                  icon: MessageSquare,
                  label: 'Active Complaints',
                  value: '2',
                  subtext: '1 under review',
                  color: '#F9A825',
                  accentColor: '#F9A825'
                },
                {
                  icon: CheckCircle,
                  label: 'Compliance Status',
                  value: '94.5%',
                  subtext: 'Good standing',
                  color: '#2E7D32',
                  accentColor: '#2E7D32'
                },
                {
                  icon: IndianRupee,
                  label: 'Pending Payments',
                  value: '₹0',
                  subtext: 'All cleared',
                  color: '#6B7C93',
                  accentColor: '#1F3A5F'
                }
              ].map((kpi, index) => (
                <div
                  key={index}
                  className="bg-white rounded p-6 transition-all hover:shadow-md"
                  style={{ border: '1px solid #DDE2E7', borderLeft: `4px solid ${kpi.accentColor}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                      <kpi.icon className="w-6 h-6" style={{ color: kpi.color }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#1F3A5F' }}>{kpi.value}</div>
                  <div className="text-sm mb-1" style={{ color: '#6B7C93' }}>{kpi.label}</div>
                  <div className="text-xs" style={{ color: '#6B7C93' }}>{kpi.subtext}</div>
                </div>
              ))}
            </div>

            {/* Two Column Layout - Recent Updates */}
            <div className="grid grid-cols-2 gap-8">
              {/* Latest Notices */}
              <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #DDE2E7' }}>
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}>
                  <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Latest Notices</h3>
                  <button className="text-sm font-medium" style={{ color: '#0F4C5C' }}>View All →</button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Annual Compliance Inspection Scheduled',
                        date: '2026-02-10',
                        type: 'Inspection',
                        status: 'info'
                      },
                      {
                        title: 'Minor Boundary Discrepancy Detected',
                        date: '2026-02-08',
                        type: 'Alert',
                        status: 'warning'
                      },
                      {
                        title: 'Payment Due Reminder - Plot CG-RAI-2024-0847',
                        date: '2026-02-05',
                        type: 'Payment',
                        status: 'info'
                      },
                      {
                        title: 'Compliance Certificate Issued',
                        date: '2026-02-01',
                        type: 'Certificate',
                        status: 'success'
                      }
                    ].map((notice, index) => (
                      <div
                        key={index}
                        className="p-4 rounded transition-all hover:shadow-sm"
                        style={{ border: '1px solid #DDE2E7' }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{
                              backgroundColor: notice.status === 'success' ? '#2E7D32' : 
                                notice.status === 'warning' ? '#F9A825' : '#0F4C5C'
                            }}
                          />
                          <div className="flex-1">
                            <div className="font-medium text-sm mb-1" style={{ color: '#2C3E50' }}>
                              {notice.title}
                            </div>
                            <div className="flex items-center gap-3 text-xs" style={{ color: '#6B7C93' }}>
                              <span>{notice.type}</span>
                              <span>•</span>
                              <span>{new Date(notice.date).toLocaleDateString('en-IN')}</span>
                            </div>
                          </div>
                          <button className="p-1 rounded hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" style={{ color: '#6B7C93' }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Complaint Updates */}
              <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #DDE2E7' }}>
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}>
                  <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Recent Complaint Updates</h3>
                  <button 
                    onClick={() => handleNavClick('user-complaints')}
                    className="text-sm font-medium" 
                    style={{ color: '#0F4C5C' }}
                  >
                    View All →
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        id: 'CSIDC-2026-0142',
                        title: 'Incorrect Satellite Detection',
                        plot: 'CG-RAI-2024-0847',
                        status: 'Under Review',
                        statusColor: '#F9A825',
                        lastUpdate: '2 hours ago'
                      },
                      {
                        id: 'CSIDC-2026-0128',
                        title: 'Boundary Discrepancy',
                        plot: 'CG-RAI-2024-0848',
                        status: 'Inspection Scheduled',
                        statusColor: '#0F4C5C',
                        lastUpdate: '1 day ago'
                      },
                      {
                        id: 'CSIDC-2026-0095',
                        title: 'Utility Connection Issue',
                        plot: 'CG-BHI-2024-0234',
                        status: 'Resolved',
                        statusColor: '#2E7D32',
                        lastUpdate: '3 days ago'
                      }
                    ].map((complaint, index) => (
                      <div
                        key={index}
                        className="p-4 rounded transition-all hover:shadow-sm cursor-pointer"
                        style={{ border: '1px solid #DDE2E7' }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-medium text-sm mb-1" style={{ color: '#2C3E50' }}>
                              {complaint.title}
                            </div>
                            <div className="text-xs mb-2" style={{ color: '#6B7C93' }}>
                              {complaint.id} • Plot: {complaint.plot}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${complaint.statusColor}15`,
                              color: complaint.statusColor
                            }}
                          >
                            {complaint.status}
                          </span>
                          <span className="text-xs" style={{ color: '#6B7C93' }}>
                            Updated {complaint.lastUpdate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-3 gap-6">
              <button
                onClick={() => handleNavClick('user-plots')}
                className="bg-white rounded-lg p-6 text-left transition-all hover:shadow-md"
                style={{ border: '1px solid #DDE2E7' }}
              >
                <Map className="w-8 h-8 mb-3" style={{ color: '#0F4C5C' }} />
                <div className="font-semibold mb-1" style={{ color: '#2C3E50' }}>View My Plots</div>
                <div className="text-sm" style={{ color: '#6B7C93' }}>Access plot details and compliance status</div>
              </button>

              <button
                onClick={() => handleNavClick('user-raise-issue')}
                className="bg-white rounded-lg p-6 text-left transition-all hover:shadow-md"
                style={{ border: '1px solid #DDE2E7' }}
              >
                <FileText className="w-8 h-8 mb-3" style={{ color: '#F9A825' }} />
                <div className="font-semibold mb-1" style={{ color: '#2C3E50' }}>Raise a Grievance</div>
                <div className="text-sm" style={{ color: '#6B7C93' }}>Report issues or discrepancies</div>
              </button>

              <button
                className="bg-white rounded-lg p-6 text-left transition-all hover:shadow-md"
                style={{ border: '1px solid #DDE2E7' }}
              >
                <File className="w-8 h-8 mb-3" style={{ color: '#1F3A5F' }} />
                <div className="font-semibold mb-1" style={{ color: '#2C3E50' }}>Download Documents</div>
                <div className="text-sm" style={{ color: '#6B7C93' }}>Access allotment letters and certificates</div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}