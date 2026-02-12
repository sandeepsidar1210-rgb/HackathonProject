import { useState } from 'react';
import { LayoutDashboard, Map, FileText, MessageSquare, Bell, File, User, LogOut, Search, Eye, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

interface Plot {
  plotId: string;
  industrialArea: string;
  zone: string;
  approvedArea: number;
  currentStatus: string;
  complianceRate: number;
  allotmentDate: string;
  statusColor: string;
}

interface UserMyPlotsProps {
  onNavigate: (page: 'user-dashboard' | 'user-plots' | 'user-raise-issue' | 'user-complaints' | 'user-notices') => void;
  onLogout: () => void;
  onViewPlotDetail?: (plotId: string) => void;
}

const plots: Plot[] = [
  {
    plotId: 'CG-RAI-2024-0847',
    industrialArea: 'Raipur Industrial Area',
    zone: 'Zone A',
    approvedArea: 5000,
    currentStatus: 'Active - Compliant',
    complianceRate: 94.5,
    allotmentDate: '2020-03-15',
    statusColor: '#2E7D32'
  },
  {
    plotId: 'CG-RAI-2024-0848',
    industrialArea: 'Raipur Industrial Area',
    zone: 'Zone A',
    approvedArea: 8000,
    currentStatus: 'Under Review',
    complianceRate: 88.2,
    allotmentDate: '2021-07-22',
    statusColor: '#F9A825'
  },
  {
    plotId: 'CG-BHI-2024-0234',
    industrialArea: 'Bhilai Industrial Complex',
    zone: 'Zone B',
    approvedArea: 6500,
    currentStatus: 'Active - Compliant',
    complianceRate: 96.8,
    allotmentDate: '2019-11-08',
    statusColor: '#2E7D32'
  }
];

export default function UserMyPlots({ onNavigate, onLogout, onViewPlotDetail }: UserMyPlotsProps) {
  const [activePage] = useState('user-plots');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlots = plots.filter(plot =>
    plot.plotId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plot.industrialArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#F4F6F8' }}>
      {/* Left Sidebar - Same as UserDashboard */}
      <aside className="w-64 flex-shrink-0 flex flex-col" style={{ backgroundColor: '#0F4C5C', color: '#FFFFFF' }}>
        <div className="p-6" style={{ borderBottom: '1px solid #FFFFFF20' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#FFFFFF20' }}>
              <span className="font-bold text-sm">CSIDC</span>
            </div>
            <div>
              <div className="font-semibold text-sm">Allottee Portal</div>
              <div className="text-xs opacity-75">Industry Dashboard</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            <button
              onClick={() => onNavigate('user-dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-medium"
              style={{ backgroundColor: '#FFFFFF20' }}
            >
              <Map className="w-5 h-5" />
              <span>My Plots</span>
            </button>

            <button
              onClick={() => onNavigate('user-raise-issue')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <FileText className="w-5 h-5" />
              <span>Raise Issue</span>
            </button>

            <button
              onClick={() => onNavigate('user-complaints')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <MessageSquare className="w-5 h-5" />
              <span>My Complaints</span>
            </button>

            <button
              onClick={() => onNavigate('user-notices')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
            >
              <Bell className="w-5 h-5" />
              <span>Notices & Updates</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100">
              <File className="w-5 h-5" />
              <span>Documents</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>
        </nav>

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
            <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>My Plots</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>View and manage your allotted industrial plots</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" style={{ color: '#6B7C93' }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#C62828' }} />
            </button>

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
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded p-6" style={{ border: '1px solid #DDE2E7', borderLeft: '4px solid #0F4C5C' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: '#0F4C5C15' }}>
                    <MapPin className="w-6 h-6" style={{ color: '#0F4C5C' }} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#1F3A5F' }}>{plots.length}</div>
                <div className="text-sm" style={{ color: '#6B7C93' }}>Total Allotted Plots</div>
              </div>

              <div className="bg-white rounded p-6" style={{ border: '1px solid #DDE2E7', borderLeft: '4px solid #2E7D32' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: '#2E7D3215' }}>
                    <CheckCircle className="w-6 h-6" style={{ color: '#2E7D32' }} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#2E7D32' }}>
                  {plots.filter(p => p.statusColor === '#2E7D32').length}
                </div>
                <div className="text-sm" style={{ color: '#6B7C93' }}>Compliant Plots</div>
              </div>

              <div className="bg-white rounded p-6" style={{ border: '1px solid #DDE2E7', borderLeft: '4px solid #F9A825' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: '#F9A82515' }}>
                    <AlertTriangle className="w-6 h-6" style={{ color: '#F9A825' }} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#F9A825' }}>
                  {plots.filter(p => p.statusColor === '#F9A825').length}
                </div>
                <div className="text-sm" style={{ color: '#6B7C93' }}>Under Review</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-4 mb-6" style={{ border: '1px solid #DDE2E7' }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Plot ID or Industrial Area..."
                  className="w-full pl-10 pr-4 py-2.5 rounded focus:outline-none"
                  style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                />
              </div>
            </div>

            {/* Plots Grid - Card Layout */}
            <div className="grid grid-cols-1 gap-6">
              {filteredPlots.map((plot, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden transition-all hover:shadow-md"
                  style={{ border: '1px solid #DDE2E7' }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold" style={{ color: '#0F4C5C' }}>{plot.plotId}</h3>
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${plot.statusColor}15`,
                              color: plot.statusColor
                            }}
                          >
                            {plot.currentStatus}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#6B7C93' }}>
                          <MapPin className="w-4 h-4" />
                          <span>{plot.industrialArea} • {plot.zone}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onViewPlotDetail?.(plot.plotId)}
                        className="flex items-center gap-2 px-4 py-2 rounded font-medium text-white transition-colors"
                        style={{ backgroundColor: '#0F4C5C' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                      <div>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Approved Area</div>
                        <div className="text-lg font-bold" style={{ color: '#2C3E50' }}>{plot.approvedArea.toLocaleString()} m²</div>
                      </div>

                      <div>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Allotment Date</div>
                        <div className="text-lg font-bold" style={{ color: '#2C3E50' }}>
                          {new Date(plot.allotmentDate).toLocaleDateString('en-IN')}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Compliance Rate</div>
                        <div className="flex items-center gap-2">
                          <div className="text-lg font-bold" style={{ color: plot.statusColor }}>
                            {plot.complianceRate}%
                          </div>
                        </div>
                        <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${plot.complianceRate}%`,
                              backgroundColor: plot.statusColor
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Status Indicator</div>
                        <div className="flex items-center gap-2 mt-2">
                          {plot.statusColor === '#2E7D32' ? (
                            <>
                              <CheckCircle className="w-5 h-5" style={{ color: '#2E7D32' }} />
                              <span className="text-sm font-medium" style={{ color: '#2E7D32' }}>No Issues</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-5 h-5" style={{ color: '#F9A825' }} />
                              <span className="text-sm font-medium" style={{ color: '#F9A825' }}>Under Review</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
