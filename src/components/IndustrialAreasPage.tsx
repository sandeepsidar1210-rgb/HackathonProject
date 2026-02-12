import { useState } from 'react';
import { LayoutDashboard, Map, AlertCircle, BarChart3, Settings, User, LogOut, Search, Bell, MapPin, Building2, TrendingUp, TrendingDown, Eye, Filter } from 'lucide-react';
import csidcLogo from 'figma:asset/ffa8c1ead3f4fef010b0bf27deab0aa98c2711aa.png';

interface IndustrialAreasPageProps {
  onNavigate: (page: 'dashboard' | 'violations' | 'reports' | 'industrial-areas' | 'settings') => void;
  onLogout: () => void;
}

interface IndustrialArea {
  id: string;
  name: string;
  district: string;
  region: string;
  totalPlots: number;
  occupiedPlots: number;
  vacantPlots: number;
  totalArea: number;
  violations: number;
  complianceRate: number;
  status: 'Excellent' | 'Good' | 'Needs Attention';
  lastInspection: string;
}

const industrialAreas: IndustrialArea[] = [
  {
    id: 'IA-RAI-001',
    name: 'Raipur Industrial Area',
    district: 'Raipur',
    region: 'Central',
    totalPlots: 324,
    occupiedPlots: 298,
    vacantPlots: 26,
    totalArea: 245000,
    violations: 5,
    complianceRate: 98.5,
    status: 'Excellent',
    lastInspection: '2026-02-08'
  },
  {
    id: 'IA-BHI-002',
    name: 'Bhilai Industrial Complex',
    district: 'Durg',
    region: 'Central',
    totalPlots: 187,
    occupiedPlots: 165,
    vacantPlots: 22,
    totalArea: 178000,
    violations: 13,
    complianceRate: 83.2,
    status: 'Good',
    lastInspection: '2026-02-06'
  },
  {
    id: 'IA-KOR-003',
    name: 'Korba Industrial Zone',
    district: 'Korba',
    region: 'North',
    totalPlots: 156,
    occupiedPlots: 142,
    vacantPlots: 14,
    totalArea: 132000,
    violations: 21,
    complianceRate: 74.8,
    status: 'Needs Attention',
    lastInspection: '2026-02-05'
  },
  {
    id: 'IA-DUR-004',
    name: 'Durg Manufacturing Zone',
    district: 'Durg',
    region: 'Central',
    totalPlots: 203,
    occupiedPlots: 189,
    vacantPlots: 14,
    totalArea: 156000,
    violations: 8,
    complianceRate: 92.1,
    status: 'Excellent',
    lastInspection: '2026-02-07'
  },
  {
    id: 'IA-BIL-005',
    name: 'Bilaspur Trade Center',
    district: 'Bilaspur',
    region: 'North',
    totalPlots: 145,
    occupiedPlots: 128,
    vacantPlots: 17,
    totalArea: 98000,
    violations: 6,
    complianceRate: 94.5,
    status: 'Excellent',
    lastInspection: '2026-02-04'
  },
  {
    id: 'IA-RAJ-006',
    name: 'Rajnandgaon Industrial Estate',
    district: 'Rajnandgaon',
    region: 'Central',
    totalPlots: 98,
    occupiedPlots: 82,
    vacantPlots: 16,
    totalArea: 67000,
    violations: 4,
    complianceRate: 95.9,
    status: 'Excellent',
    lastInspection: '2026-02-03'
  }
];

export default function IndustrialAreasPage({ onNavigate, onLogout }: IndustrialAreasPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All Districts');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAreas = industrialAreas.filter(area => {
    if (districtFilter !== 'All Districts' && area.district !== districtFilter) return false;
    if (statusFilter !== 'All' && area.status !== statusFilter) return false;
    if (searchQuery && !area.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !area.district.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return '#2E7D32';
      case 'Good': return '#F9A825';
      case 'Needs Attention': return '#C62828';
      default: return '#6B7C93';
    }
  };

  const totalPlots = industrialAreas.reduce((sum, area) => sum + area.totalPlots, 0);
  const totalViolations = industrialAreas.reduce((sum, area) => sum + area.violations, 0);
  const avgComplianceRate = (industrialAreas.reduce((sum, area) => sum + area.complianceRate, 0) / industrialAreas.length).toFixed(1);

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#F4F6F8' }}>
      {/* Left Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col" style={{ backgroundColor: '#0F4C5C', color: '#FFFFFF' }}>
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

        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100 hover:bg-white/10"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-medium"
              style={{ backgroundColor: '#FFFFFF20' }}
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
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100 hover:bg-white/10"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Reports & Analytics</span>
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100 hover:bg-white/10"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-8 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7' }}>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>Industrial Areas</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>Monitor all industrial zones across Chhattisgarh</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" style={{ color: '#6B7C93' }} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Industrial Areas', value: industrialAreas.length.toString(), icon: Map, color: '#0F4C5C' },
                { label: 'Total Plots', value: totalPlots.toLocaleString(), icon: Building2, color: '#1F3A5F' },
                { label: 'Active Violations', value: totalViolations.toString(), icon: AlertCircle, color: '#C62828' },
                { label: 'Avg. Compliance Rate', value: `${avgComplianceRate}%`, icon: TrendingUp, color: '#2E7D32' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded p-6" style={{ border: '1px solid #DDE2E7', borderLeft: `4px solid ${stat.color}` }}>
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

            {/* Filters */}
            <div className="bg-white rounded-lg p-6 mb-8" style={{ border: '1px solid #DDE2E7' }}>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>District</label>
                  <select
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded focus:outline-none"
                    style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                  >
                    <option>All Districts</option>
                    <option>Raipur</option>
                    <option>Durg</option>
                    <option>Korba</option>
                    <option>Bilaspur</option>
                    <option>Rajnandgaon</option>
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
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Needs Attention</option>
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
                      placeholder="Search by name or district..."
                      className="w-full pl-10 pr-4 py-2.5 rounded focus:outline-none"
                      style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Industrial Areas Grid */}
            <div className="grid grid-cols-2 gap-6">
              {filteredAreas.map((area) => (
                <div
                  key={area.id}
                  className="bg-white rounded-lg overflow-hidden transition-all hover:shadow-lg"
                  style={{ border: '1px solid #DDE2E7' }}
                >
                  <div className="p-6" style={{ borderBottom: '1px solid #DDE2E7' }}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1" style={{ color: '#0F4C5C' }}>{area.name}</h3>
                        <div className="flex items-center gap-2 text-sm" style={{ color: '#6B7C93' }}>
                          <MapPin className="w-4 h-4" />
                          {area.district}, {area.region} Region
                        </div>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: area.status === 'Excellent' ? '#E8F5E9' : 
                            area.status === 'Good' ? '#FFF3E0' : '#FEE',
                          color: getStatusColor(area.status)
                        }}
                      >
                        {area.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-3 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Total Plots</div>
                        <div className="text-xl font-bold" style={{ color: '#2C3E50' }}>{area.totalPlots}</div>
                      </div>
                      <div className="p-3 rounded" style={{ backgroundColor: '#E8F5E9' }}>
                        <div className="text-xs mb-1" style={{ color: '#2E7D32' }}>Occupied</div>
                        <div className="text-xl font-bold" style={{ color: '#2E7D32' }}>{area.occupiedPlots}</div>
                      </div>
                      <div className="p-3 rounded" style={{ backgroundColor: area.violations > 10 ? '#FEE' : '#F4F6F8' }}>
                        <div className="text-xs mb-1" style={{ color: area.violations > 10 ? '#C62828' : '#6B7C93' }}>Violations</div>
                        <div className="text-xl font-bold" style={{ color: area.violations > 10 ? '#C62828' : '#2C3E50' }}>
                          {area.violations}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span style={{ color: '#6B7C93' }}>Total Area:</span>
                        <span className="font-medium ml-2" style={{ color: '#2C3E50' }}>
                          {(area.totalArea / 1000).toFixed(1)}k m²
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#6B7C93' }}>Compliance:</span>
                        <span className="font-medium ml-2" style={{ color: '#2E7D32' }}>
                          {area.complianceRate}%
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span style={{ color: '#6B7C93' }}>Last Inspection:</span>
                        <span className="font-medium ml-2" style={{ color: '#2C3E50' }}>
                          {new Date(area.lastInspection).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4" style={{ backgroundColor: '#F4F6F8' }}>
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium text-white transition-colors"
                      style={{ backgroundColor: '#0F4C5C' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                      onClick={() => alert(`View details for ${area.name}`)}
                    >
                      <Eye className="w-4 h-4" />
                      View Area Details
                    </button>
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
