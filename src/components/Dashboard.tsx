import { useState } from 'react';
import { MapPin, AlertTriangle, Building2, Layers, LogOut, FileText, Settings, User, Search, Bell, LayoutDashboard, Map, AlertCircle, BarChart3, X, ChevronRight } from 'lucide-react';
import Sentinel2MonitoringMap from './Sentinel2MonitoringMap';
import csidcLogo from 'figma:asset/ffa8c1ead3f4fef010b0bf27deab0aa98c2711aa.png';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'violations' | 'reports' | 'industrial-areas' | 'settings') => void;
  onLogout: () => void;
}

export default function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [dismissedAlert, setDismissedAlert] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New Violation Detected',
      message: 'Plot CG-RAI-2024-0847 flagged for unauthorized construction',
      time: '2 hours ago',
      type: 'alert',
      unread: true
    },
    {
      id: 2,
      title: 'Inspection Scheduled',
      message: 'Field inspection scheduled for Korba Industrial Zone',
      time: '5 hours ago',
      type: 'info',
      unread: true
    },
    {
      id: 3,
      title: 'Compliance Notice Sent',
      message: 'Legal notice issued to Plot CG-KOR-2024-0234',
      time: '1 day ago',
      type: 'success',
      unread: false
    },
    {
      id: 4,
      title: 'Report Generated',
      message: 'Monthly compliance report ready for download',
      time: '2 days ago',
      type: 'info',
      unread: false
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would trigger search functionality
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleKPIClick = (kpiLabel: string) => {
    if (kpiLabel === 'Active Violations' || kpiLabel === 'Unauthorized Construction') {
      onNavigate('violations');
    } else if (kpiLabel === 'Compliance Rate') {
      onNavigate('reports');
    }
  };

  const handleViolationClick = (plotId: string) => {
    // In a real app, this would navigate to the plot detail page
    alert(`Viewing details for ${plotId}`);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F4F6F8' }}>
      {/* Left Sidebar - Fixed */}
      <aside className="w-64 flex-shrink-0 flex flex-col fixed h-screen" style={{ backgroundColor: '#0F4C5C', color: '#FFFFFF' }}>
        {/* Sidebar Header */}
        <div className="p-6" style={{ borderBottom: '1px solid #FFFFFF20' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center bg-white p-1.5">
              <img src={csidcLogo} alt="CSIDC Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-semibold text-sm">CSIDC Admin</div>
              <div className="text-xs opacity-75">Monitoring Portal</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-medium"
              style={{ backgroundColor: '#FFFFFF20' }}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100 hover:bg-white/10"
              onClick={() => onNavigate('industrial-areas')}
            >
              <Map className="w-5 h-5" />
              <span>Industrial Areas</span>
            </button>

            <button
              onClick={() => onNavigate('violations')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100 hover:bg-white/10"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Violations</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">47</span>
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100 hover:bg-white/10"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Reports & Analytics</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100 hover:bg-white/10"
              onClick={() => onNavigate('settings')}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
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
              <div className="text-sm font-medium">Rajesh Kumar</div>
              <div className="text-xs opacity-75">Regional Officer</div>
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
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Bar */}
        <header className="bg-white px-8 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7' }}>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>Dashboard Overview</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>Real-time monitoring and compliance tracking</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plots, areas..."
                className="pl-10 pr-4 py-2 rounded w-80 focus:outline-none focus:ring-2"
                style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
              />
            </form>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className="relative p-2 rounded hover:bg-gray-50 transition-colors"
              >
                <Bell className="w-5 h-5" style={{ color: '#6B7C93' }} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#C62828' }} />
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50" style={{ border: '1px solid #DDE2E7' }}>
                  <div className="p-4" style={{ borderBottom: '1px solid #DDE2E7' }}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Notifications</h3>
                      <button onClick={() => setShowNotifications(false)}>
                        <X className="w-4 h-4" style={{ color: '#6B7C93' }} />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        style={{ borderBottom: '1px solid #DDE2E7' }}
                        onClick={() => {
                          alert(`Notification: ${notif.title}`);
                          setShowNotifications(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#0F4C5C' }} />
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-sm mb-1" style={{ color: '#2C3E50' }}>
                              {notif.title}
                            </div>
                            <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>
                              {notif.message}
                            </div>
                            <div className="text-xs" style={{ color: '#95A5A6' }}>
                              {notif.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center" style={{ borderTop: '1px solid #DDE2E7' }}>
                    <button className="text-sm font-medium" style={{ color: '#0F4C5C' }}>
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="p-2 rounded hover:bg-gray-50 transition-colors"
              >
                <User className="w-5 h-5" style={{ color: '#6B7C93' }} />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50" style={{ border: '1px solid #DDE2E7' }}>
                  <div className="p-4" style={{ borderBottom: '1px solid #DDE2E7' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C6A75E' }}>
                        <User className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div>
                        <div className="font-semibold" style={{ color: '#2C3E50' }}>Rajesh Kumar</div>
                        <div className="text-xs" style={{ color: '#6B7C93' }}>Regional Officer</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button 
                      className="w-full text-left px-4 py-2 rounded hover:bg-gray-50 text-sm transition-colors"
                      onClick={() => {
                        alert('View Profile');
                        setShowProfile(false);
                      }}
                    >
                      View Profile
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 rounded hover:bg-gray-50 text-sm transition-colors"
                      onClick={() => {
                        onNavigate('settings');
                        setShowProfile(false);
                      }}
                    >
                      Settings
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 rounded hover:bg-gray-50 text-sm transition-colors"
                      onClick={() => {
                        alert('Help & Support');
                        setShowProfile(false);
                      }}
                    >
                      Help & Support
                    </button>
                  </div>
                  <div className="p-2" style={{ borderTop: '1px solid #DDE2E7' }}>
                    <button 
                      className="w-full text-left px-4 py-2 rounded hover:bg-red-50 text-sm transition-colors flex items-center gap-2"
                      style={{ color: '#C62828' }}
                      onClick={() => {
                        setShowProfile(false);
                        onLogout();
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* KPI Cards - Grid of 5 */}
            <div className="grid grid-cols-5 gap-6 mb-8">
              {[
                {
                  icon: MapPin,
                  label: 'Total Plots',
                  value: '1,247',
                  change: '+12 this month',
                  changeType: 'positive',
                  color: '#0F4C5C',
                  accentColor: '#C6A75E'
                },
                {
                  icon: AlertTriangle,
                  label: 'Active Violations',
                  value: '47',
                  change: '+3 this week',
                  changeType: 'negative',
                  color: '#C62828',
                  accentColor: '#C62828'
                },
                {
                  icon: Building2,
                  label: 'Unauthorized Construction',
                  value: '23',
                  change: '-2 resolved',
                  changeType: 'positive',
                  color: '#F57C00',
                  accentColor: '#F9A825'
                },
                {
                  icon: Layers,
                  label: 'Vacant Plots',
                  value: '156',
                  change: 'Unchanged',
                  changeType: 'neutral',
                  color: '#6B7C93',
                  accentColor: '#1F3A5F'
                },
                {
                  icon: FileText,
                  label: 'Compliance Rate',
                  value: '89.3%',
                  change: '+1.2% increase',
                  changeType: 'positive',
                  color: '#2E7D32',
                  accentColor: '#2E7D32'
                }
              ].map((kpi, index) => (
                <div
                  key={index}
                  onClick={() => handleKPIClick(kpi.label)}
                  className="bg-white rounded p-6 transition-all hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
                  style={{ border: '1px solid #DDE2E7', borderLeft: `4px solid ${kpi.accentColor}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                      <kpi.icon className="w-6 h-6" style={{ color: kpi.color }} />
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: '#DDE2E7' }} />
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#1F3A5F' }}>{kpi.value}</div>
                  <div className="text-sm mb-2" style={{ color: '#6B7C93' }}>{kpi.label}</div>
                  <div
                    className="text-xs font-medium"
                    style={{
                      color: kpi.changeType === 'positive' ? '#2E7D32' : kpi.changeType === 'negative' ? '#C62828' : '#6B7C93'
                    }}
                  >
                    {kpi.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Alert Banner */}
            {!dismissedAlert && (
              <div className="rounded-lg p-5 mb-8" style={{ backgroundColor: '#FFF3E0', border: '1px solid #F9A825' }}>
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 flex-shrink-0" style={{ color: '#F57C00' }} />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1" style={{ color: '#E65100' }}>Action Required</h3>
                    <p className="text-sm" style={{ color: '#E65100' }}>
                      3 new high-priority violations detected in Korba Industrial Zone requiring immediate inspection. 
                      Legal notices pending for 12 unauthorized constructions.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('violations')}
                    className="px-6 py-2 rounded font-medium text-sm text-white transition-colors flex-shrink-0"
                    style={{ backgroundColor: '#F57C00' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E65100'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F57C00'}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setDismissedAlert(true)}
                    className="p-1 rounded hover:bg-orange-100 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" style={{ color: '#F57C00' }} />
                  </button>
                </div>
              </div>
            )}

            {/* Large Monitoring Map */}
            <div className="mb-8">
              <Sentinel2MonitoringMap />
            </div>

            {/* Recent Violations Table */}
            <div className="bg-white rounded" style={{ border: '1px solid #DDE2E7' }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7' }}>
                <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Recent Violations</h3>
                <button 
                  onClick={() => onNavigate('violations')}
                  className="text-sm font-medium hover:underline flex items-center gap-1" 
                  style={{ color: '#0F4C5C' }}
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#F4F6F8', borderBottom: '1px solid #DDE2E7' }}>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: '#6B7C93' }}>PLOT ID</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: '#6B7C93' }}>LOCATION</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: '#6B7C93' }}>VIOLATION TYPE</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: '#6B7C93' }}>SEVERITY</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: '#6B7C93' }}>DETECTED</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: '#6B7C93' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'CG-RAI-2024-0847', location: 'Raipur Industrial Area', type: 'Encroachment', severity: 'High', detected: '2 hours ago', status: 'Pending' },
                      { id: 'CG-KOR-2024-0234', location: 'Korba Industrial Zone', type: 'Unauthorized Construction', severity: 'High', detected: '5 hours ago', status: 'Notice Issued' },
                      { id: 'CG-BHI-2024-0456', location: 'Bhilai Complex', type: 'Boundary Deviation', severity: 'Medium', detected: '1 day ago', status: 'Under Review' },
                      { id: 'CG-DUR-2024-0789', location: 'Durg Industrial Estate', type: 'Vacant Plot Misuse', severity: 'Low', detected: '2 days ago', status: 'Assigned' },
                      { id: 'CG-RAI-2024-0932', location: 'Raipur Zone B', type: 'Encroachment', severity: 'Medium', detected: '3 days ago', status: 'Inspection Scheduled' }
                    ].map((violation, index) => (
                      <tr
                        key={index}
                        onClick={() => handleViolationClick(violation.id)}
                        className="hover:bg-opacity-50 transition-colors cursor-pointer"
                        style={{ borderBottom: '1px solid #DDE2E7' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C08'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-sm hover:underline" style={{ color: '#0F4C5C' }}>{violation.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#2C3E50' }}>{violation.location}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#2C3E50' }}>{violation.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: violation.severity === 'High' ? '#FEE' : violation.severity === 'Medium' ? '#FFF3E0' : '#E8F5E9',
                              color: violation.severity === 'High' ? '#C62828' : violation.severity === 'Medium' ? '#F57C00' : '#2E7D32'
                            }}
                          >
                            {violation.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#6B7C93' }}>{violation.detected}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#6B7C93' }}>{violation.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}