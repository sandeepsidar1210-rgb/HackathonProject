import { useState } from 'react';
import { LayoutDashboard, Map, AlertCircle, BarChart3, Settings, User, LogOut, Search, Bell, Filter, Eye, Calendar, MapPin, Download, AlertTriangle } from 'lucide-react';
import csidcLogo from 'figma:asset/ffa8c1ead3f4fef010b0bf27deab0aa98c2711aa.png';

interface Violation {
  plotId: string;
  industrialArea: string;
  violationType: string;
  severity: 'High' | 'Medium' | 'Low';
  detectionDate: string;
  status: 'Pending' | 'Under Review' | 'Notice Issued' | 'Resolved';
  allottee: string;
  deviation: number;
}

interface ViolationsPageProps {
  onNavigate: (page: 'dashboard' | 'violations' | 'reports' | 'plot-detail' | 'industrial-areas' | 'settings') => void;
  onLogout: () => void;
  onViewPlot: (plotId: string) => void;
}

const violations: Violation[] = [
  {
    plotId: 'CG-RAI-2024-0847',
    industrialArea: 'Raipur Industrial Area',
    violationType: 'Unauthorized Extension',
    severity: 'High',
    detectionDate: '2026-02-09',
    status: 'Pending',
    allottee: 'Sai Industries Pvt. Ltd.',
    deviation: 1200
  },
  {
    plotId: 'CG-KOR-2024-0234',
    industrialArea: 'Korba Industrial Zone',
    violationType: 'Encroachment',
    severity: 'High',
    detectionDate: '2026-02-08',
    status: 'Notice Issued',
    allottee: 'Mineral Processing Corp.',
    deviation: 2400
  },
  {
    plotId: 'CG-BIL-2024-0456',
    industrialArea: 'Bilaspur Trade Center',
    violationType: 'Minor Deviation',
    severity: 'Low',
    detectionDate: '2026-02-07',
    status: 'Under Review',
    allottee: 'Tech Solutions Ltd.',
    deviation: 150
  },
  {
    plotId: 'CG-RAI-2024-0932',
    industrialArea: 'Raipur Zone B',
    violationType: 'Boundary Deviation',
    severity: 'Medium',
    detectionDate: '2026-02-06',
    status: 'Under Review',
    allottee: 'Modern Manufacturing Co.',
    deviation: 800
  },
  {
    plotId: 'CG-DUR-2024-0789',
    industrialArea: 'Durg Industrial Estate',
    violationType: 'Vacant Plot Misuse',
    severity: 'Medium',
    detectionDate: '2026-02-05',
    status: 'Pending',
    allottee: 'Green Energy Corp.',
    deviation: 500
  }
];

export default function ViolationsPage({ onNavigate, onLogout, onViewPlot }: ViolationsPageProps) {
  const [activePage, setActivePage] = useState('violations');
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredViolations = violations.filter(violation => {
    if (severityFilter !== 'All' && violation.severity !== severityFilter) return false;
    if (statusFilter !== 'All' && violation.status !== statusFilter) return false;
    if (searchQuery && !violation.plotId.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !violation.allottee.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return '#C62828';
      case 'Medium': return '#F9A825';
      case 'Low': return '#3498DB';
      default: return '#6B7C93';
    }
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate('industrial-areas')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <Map className="w-5 h-5" />
              <span>Industrial Areas</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-medium"
              style={{ backgroundColor: '#FFFFFF20' }}
            >
              <AlertCircle className="w-5 h-5" />
              <span>Violations</span>
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Reports & Analytics</span>
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer - User Profile */}
        <div className="p-4" style={{ borderBottom: '1px solid #FFFFFF20' }}>
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white px-8 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7' }}>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>Violations Management</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>Monitor and manage land use violations across all industrial areas</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" style={{ color: '#6B7C93' }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#C62828' }} />
            </button>

            <button
              className="flex items-center gap-2 px-6 py-2 rounded font-medium text-white transition-colors"
              style={{ backgroundColor: '#0F4C5C' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Stats Summary Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Violations', value: violations.length, color: '#0F4C5C', icon: AlertCircle },
                { label: 'High Severity', value: violations.filter(v => v.severity === 'High').length, color: '#C62828', icon: AlertTriangle },
                { label: 'Pending Action', value: violations.filter(v => v.status === 'Pending').length, color: '#F9A825', icon: AlertCircle },
                { label: 'Resolved', value: violations.filter(v => v.status === 'Resolved').length, color: '#2E7D32', icon: AlertCircle }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded p-6"
                  style={{ border: '1px solid #DDE2E7', borderLeft: `4px solid ${stat.color}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#1F3A5F' }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: '#6B7C93' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-lg p-6 mb-8" style={{ border: '1px solid #DDE2E7' }}>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Region</label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded focus:outline-none"
                    style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                  >
                    <option>All Regions</option>
                    <option>Raipur</option>
                    <option>Korba</option>
                    <option>Bilaspur</option>
                    <option>Durg</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Severity</label>
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded focus:outline-none"
                    style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                  >
                    <option>All</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded focus:outline-none"
                    style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                  >
                    <option>All</option>
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option>Notice Issued</option>
                    <option>Resolved</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Plot ID or Allottee"
                      className="w-full pl-10 pr-4 py-2.5 rounded focus:outline-none"
                      style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Violations Table - Full Width */}
            <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #DDE2E7' }}>
              {/* Sticky Table Header */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0" style={{ backgroundColor: '#F4F6F8', borderBottom: '2px solid #DDE2E7' }}>
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>PLOT ID</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>INDUSTRIAL AREA</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>ALLOTTEE</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>VIOLATION TYPE</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>DEVIATION</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>SEVERITY</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>STATUS</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>DETECTED</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredViolations.map((violation, index) => (
                      <tr
                        key={index}
                        className="transition-colors cursor-pointer"
                        style={{ borderBottom: '1px solid #DDE2E7' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C08'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-sm" style={{ color: '#0F4C5C' }}>{violation.plotId}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#2C3E50' }}>{violation.industrialArea}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#2C3E50' }}>{violation.allottee}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#2C3E50' }}>{violation.violationType}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium" style={{ color: '#C62828' }}>+{violation.deviation} m²</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: violation.severity === 'High' ? '#FEE' : 
                                violation.severity === 'Medium' ? '#FFF3E0' : '#E3F2FD',
                              color: getSeverityColor(violation.severity)
                            }}
                          >
                            {violation.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#6B7C93' }}>{violation.status}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#6B7C93' }}>
                            {new Date(violation.detectionDate).toLocaleDateString('en-IN')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => onViewPlot(violation.plotId)}
                            className="flex items-center gap-2 text-sm font-medium transition-colors"
                            style={{ color: '#0F4C5C' }}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
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