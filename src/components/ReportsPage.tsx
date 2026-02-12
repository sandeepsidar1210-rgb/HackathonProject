import { useState } from 'react';
import { Download, FileText, Calendar, TrendingUp, LogOut, Settings, User, PieChart, BarChart3 } from 'lucide-react';
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsPageProps {
  onNavigate: (page: 'dashboard' | 'violations' | 'reports' | 'industrial-areas' | 'settings') => void;
  onLogout: () => void;
}

const violationTypeData = [
  { name: 'Unauthorized Extension', value: 28, color: '#C0392B' },
  { name: 'Encroachment', value: 35, color: '#E74C3C' },
  { name: 'Boundary Violation', value: 18, color: '#FF9933' },
  { name: 'Minor Deviation', value: 19, color: '#F4D03F' }
];

const regionComplianceData = [
  { region: 'Raipur', compliance: 98.5, violations: 8 },
  { region: 'Bhilai', compliance: 83.2, violations: 13 },
  { region: 'Korba', compliance: 72.4, violations: 21 },
  { region: 'Bilaspur', compliance: 94.7, violations: 7 },
  { region: 'Rajnandgaon', compliance: 80.1, violations: 18 },
  { region: 'Jagdalpur', compliance: 97.8, violations: 2 }
];

const trendData = [
  { month: 'Aug', encroachments: 12, unauthorized: 8 },
  { month: 'Sep', encroachments: 15, unauthorized: 11 },
  { month: 'Oct', encroachments: 18, unauthorized: 14 },
  { month: 'Nov', encroachments: 22, unauthorized: 17 },
  { month: 'Dec', encroachments: 28, unauthorized: 19 },
  { month: 'Jan', encroachments: 35, unauthorized: 23 },
  { month: 'Feb', encroachments: 31, unauthorized: 21 }
];

export default function ReportsPage({ onNavigate, onLogout }: ReportsPageProps) {
  const [activeNav, setActiveNav] = useState('reports');
  const [dateRange, setDateRange] = useState('last-6-months');

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'dashboard') {
      onNavigate('dashboard');
    } else if (nav === 'violations') {
      onNavigate('violations');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Government Header Bar */}
      <div className="bg-[#0B3C5D] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span>Government of Chhattisgarh</span>
            <span className="text-gray-300">|</span>
            <span>CSIDC Monitoring Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Officer: Rajesh Kumar</span>
            <span className="text-gray-300">|</span>
            <span className="text-[#FF9933]">Regional Officer</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 py-4">
                <div className="w-10 h-10 bg-[#0B3C5D] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CSIDC</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">CSIDC Admin</div>
                  <div className="text-xs text-gray-600">Reports & Analytics</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                    activeNav === 'dashboard'
                      ? 'bg-[#0B3C5D] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('violations')}
                  className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                    activeNav === 'violations'
                      ? 'bg-[#0B3C5D] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Violations
                </button>
                <button
                  onClick={() => handleNavClick('reports')}
                  className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                    activeNav === 'reports'
                      ? 'bg-[#0B3C5D] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Reports
                </button>
                <button className="px-4 py-2 rounded font-medium text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Settings
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Reports & Analytics</h1>
            <p className="text-sm text-gray-600">Comprehensive violation trends and compliance statistics</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]"
            >
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="last-year">Last Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0B3C5D] text-white rounded font-medium hover:bg-[#0B3C5D]/90 transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#C0392B]" />
              </div>
              <TrendingUp className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">47</div>
            <div className="text-sm text-gray-600">Total Violations</div>
            <div className="mt-2 text-xs text-red-600">+12% from last month</div>
          </div>

          <div className="bg-white rounded border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                <PieChart className="w-5 h-5 text-[#FF9933]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">6</div>
            <div className="text-sm text-gray-600">Affected Regions</div>
            <div className="mt-2 text-xs text-gray-500">Across Chhattisgarh</div>
          </div>

          <div className="bg-white rounded border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#0B3C5D]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">89.3%</div>
            <div className="text-sm text-gray-600">Avg. Compliance</div>
            <div className="mt-2 text-xs text-green-600">+1.2% improvement</div>
          </div>

          <div className="bg-white rounded border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#27AE60]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">23</div>
            <div className="text-sm text-gray-600">Inspections Pending</div>
            <div className="mt-2 text-xs text-orange-600">Action required</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Violation Types Pie Chart */}
          <div className="bg-white rounded border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">Violation Types Distribution</h3>
                <p className="text-xs text-gray-600 mt-1">Breakdown by violation category</p>
              </div>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={violationTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {violationTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {violationTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                  <div className="text-xs text-gray-700">{item.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Region-wise Compliance Bar Chart */}
          <div className="bg-white rounded border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">Region-wise Compliance</h3>
                <p className="text-xs text-gray-600 mt-1">Compliance percentage by industrial area</p>
              </div>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionComplianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="region" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="compliance" fill="#0B3C5D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#0B3C5D] rounded" />
                <span>Compliance %</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Line Chart */}
        <div className="bg-white rounded border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Violation Trend Over Time</h3>
              <p className="text-xs text-gray-600 mt-1">Monthly trend of encroachments and unauthorized construction</p>
            </div>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="encroachments"
                stroke="#C0392B"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Encroachments"
              />
              <Line
                type="monotone"
                dataKey="unauthorized"
                stroke="#FF9933"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Unauthorized Construction"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#C0392B]" />
              <span>Encroachments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#FF9933]" />
              <span>Unauthorized Construction</span>
            </div>
          </div>
        </div>

        {/* Report Generation */}
        <div className="bg-white rounded border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Generate Custom Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]">
                <option>Comprehensive Violations</option>
                <option>Regional Summary</option>
                <option>Compliance Analysis</option>
                <option>Inspection Schedule</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date From</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date To</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0B3C5D] text-white rounded font-medium hover:bg-[#0B3C5D]/90 transition-colors">
              <Download className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}