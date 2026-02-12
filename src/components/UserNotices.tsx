import { useState } from 'react';
import { LayoutDashboard, Map, FileText, MessageSquare, Bell, File, User, LogOut, Download, Calendar, AlertCircle, CheckCircle, IndianRupee, Eye } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  category: 'Inspection' | 'Alert' | 'Payment' | 'Certificate' | 'Compliance' | 'General';
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  plotId?: string;
  downloadable: boolean;
  statusColor: string;
}

interface UserNoticesProps {
  onNavigate: (page: 'user-dashboard' | 'user-plots' | 'user-raise-issue' | 'user-complaints' | 'user-notices') => void;
  onLogout: () => void;
}

const notices: Notice[] = [
  {
    id: 'NOT-2026-001',
    title: 'Annual Compliance Inspection Scheduled',
    category: 'Inspection',
    date: '2026-02-10',
    priority: 'High',
    description: 'Your plot CG-RAI-2024-0847 has been scheduled for annual compliance inspection on 15th February 2026 at 10:00 AM. Please ensure all necessary documents are available.',
    plotId: 'CG-RAI-2024-0847',
    downloadable: true,
    statusColor: '#0F4C5C'
  },
  {
    id: 'NOT-2026-002',
    title: 'Minor Boundary Discrepancy Detected',
    category: 'Alert',
    date: '2026-02-08',
    priority: 'High',
    description: 'Satellite monitoring has detected a minor boundary discrepancy on plot CG-RAI-2024-0848. Please review the attached report and submit clarification within 7 days.',
    plotId: 'CG-RAI-2024-0848',
    downloadable: true,
    statusColor: '#F9A825'
  },
  {
    id: 'NOT-2026-003',
    title: 'Quarterly Maintenance Fee Due',
    category: 'Payment',
    date: '2026-02-05',
    priority: 'Medium',
    description: 'Your quarterly maintenance fee of ₹15,000 is due by 28th February 2026. Please make the payment to avoid late charges.',
    plotId: 'CG-RAI-2024-0847',
    downloadable: false,
    statusColor: '#C62828'
  },
  {
    id: 'NOT-2026-004',
    title: 'Compliance Certificate Issued',
    category: 'Certificate',
    date: '2026-02-01',
    priority: 'Low',
    description: 'Your compliance certificate for plot CG-BHI-2024-0234 has been issued successfully. Download your certificate from the portal.',
    plotId: 'CG-BHI-2024-0234',
    downloadable: true,
    statusColor: '#2E7D32'
  },
  {
    id: 'NOT-2026-005',
    title: 'New Environmental Compliance Guidelines',
    category: 'General',
    date: '2026-01-28',
    priority: 'Medium',
    description: 'CSIDC has updated environmental compliance guidelines effective from 1st March 2026. All allottees must review and comply with the new norms.',
    downloadable: true,
    statusColor: '#0F4C5C'
  },
  {
    id: 'NOT-2026-006',
    title: 'Encroachment Complaint Resolution',
    category: 'Compliance',
    date: '2026-01-25',
    priority: 'Low',
    description: 'Your complaint regarding encroachment on adjacent plot has been resolved. The concerned party has been issued a notice and corrective action is underway.',
    plotId: 'CG-RAI-2024-0848',
    downloadable: false,
    statusColor: '#2E7D32'
  }
];

export default function UserNotices({ onNavigate, onLogout }: UserNoticesProps) {
  const [activePage] = useState('user-notices');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredNotices = notices.filter(notice => {
    if (categoryFilter !== 'All' && notice.category !== categoryFilter) return false;
    if (priorityFilter !== 'All' && notice.priority !== priorityFilter) return false;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Inspection': return Calendar;
      case 'Alert': return AlertCircle;
      case 'Payment': return IndianRupee;
      case 'Certificate': return CheckCircle;
      case 'Compliance': return FileText;
      default: return Bell;
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#F4F6F8' }}>
      {/* Left Sidebar */}
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
              onClick={() => onNavigate('user-plots')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100"
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-medium"
              style={{ backgroundColor: '#FFFFFF20' }}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white px-8 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7' }}>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>Notices & Updates</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>Official communications and alerts from CSIDC</p>
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
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Notices', value: notices.length, color: '#0F4C5C' },
                { label: 'High Priority', value: notices.filter(n => n.priority === 'High').length, color: '#C62828' },
                { label: 'This Month', value: notices.filter(n => new Date(n.date).getMonth() === 1).length, color: '#F9A825' },
                { label: 'Unread', value: 3, color: '#6B7C93' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded p-5"
                  style={{ border: '1px solid #DDE2E7', borderLeft: `4px solid ${stat.color}` }}
                >
                  <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: '#6B7C93' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg p-4 mb-6" style={{ border: '1px solid #DDE2E7' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded focus:outline-none"
                    style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                  >
                    <option>All</option>
                    <option>Inspection</option>
                    <option>Alert</option>
                    <option>Payment</option>
                    <option>Certificate</option>
                    <option>Compliance</option>
                    <option>General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Priority</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded focus:outline-none"
                    style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                  >
                    <option>All</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              {filteredNotices.map((notice, index) => {
                const IconComponent = getCategoryIcon(notice.category);
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden transition-all hover:shadow-md"
                    style={{ border: '1px solid #DDE2E7' }}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${notice.statusColor}15` }}
                        >
                          <IconComponent className="w-6 h-6" style={{ color: notice.statusColor }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold mb-1" style={{ color: '#2C3E50' }}>{notice.title}</h3>
                              <div className="flex items-center gap-3 text-xs" style={{ color: '#6B7C93' }}>
                                <span className="inline-block px-2 py-0.5 rounded" style={{ backgroundColor: `${notice.statusColor}15`, color: notice.statusColor }}>
                                  {notice.category}
                                </span>
                                <span>•</span>
                                <span>{new Date(notice.date).toLocaleDateString('en-IN')}</span>
                                {notice.plotId && (
                                  <>
                                    <span>•</span>
                                    <span>Plot: {notice.plotId}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            <span
                              className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: notice.priority === 'High' ? '#FEE' : notice.priority === 'Medium' ? '#FFF3E0' : '#F4F6F8',
                                color: notice.priority === 'High' ? '#C62828' : notice.priority === 'Medium' ? '#F57C00' : '#6B7C93'
                              }}
                            >
                              {notice.priority} Priority
                            </span>
                          </div>

                          <p className="text-sm mb-4 leading-relaxed" style={{ color: '#6B7C93' }}>
                            {notice.description}
                          </p>

                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: '#0F4C5C' }}>
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            {notice.downloadable && (
                              <button className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: '#0F4C5C' }}>
                                <Download className="w-4 h-4" />
                                Download PDF
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
