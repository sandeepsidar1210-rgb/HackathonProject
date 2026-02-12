import { useState } from 'react';
import { LayoutDashboard, Map, FileText, MessageSquare, Bell, File, User, LogOut, Search, Eye, Filter } from 'lucide-react';

interface Complaint {
  complaintId: string;
  plotId: string;
  issueType: string;
  submissionDate: string;
  status: 'Submitted' | 'Under Review' | 'Inspection Scheduled' | 'Resolved' | 'Rejected';
  lastUpdated: string;
  statusColor: string;
}

interface UserComplaintsProps {
  onNavigate: (page: 'user-dashboard' | 'user-plots' | 'user-raise-issue' | 'user-complaints' | 'user-notices') => void;
  onLogout: () => void;
  onViewComplaint?: (complaintId: string) => void;
}

const complaints: Complaint[] = [
  {
    complaintId: 'CSIDC-2026-0142',
    plotId: 'CG-RAI-2024-0847',
    issueType: 'Incorrect Satellite Detection',
    submissionDate: '2026-02-10',
    status: 'Under Review',
    lastUpdated: '2 hours ago',
    statusColor: '#F9A825'
  },
  {
    complaintId: 'CSIDC-2026-0128',
    plotId: 'CG-RAI-2024-0848',
    issueType: 'Boundary Discrepancy',
    submissionDate: '2026-02-08',
    status: 'Inspection Scheduled',
    lastUpdated: '1 day ago',
    statusColor: '#0F4C5C'
  },
  {
    complaintId: 'CSIDC-2026-0095',
    plotId: 'CG-BHI-2024-0234',
    issueType: 'Utility Issue',
    submissionDate: '2026-02-01',
    status: 'Resolved',
    lastUpdated: '3 days ago',
    statusColor: '#2E7D32'
  },
  {
    complaintId: 'CSIDC-2026-0067',
    plotId: 'CG-RAI-2024-0847',
    issueType: 'Payment Dispute',
    submissionDate: '2026-01-25',
    status: 'Rejected',
    lastUpdated: '1 week ago',
    statusColor: '#C62828'
  },
  {
    complaintId: 'CSIDC-2026-0032',
    plotId: 'CG-RAI-2024-0848',
    issueType: 'Encroachment Complaint',
    submissionDate: '2026-01-15',
    status: 'Submitted',
    lastUpdated: '2 weeks ago',
    statusColor: '#6B7C93'
  }
];

export default function UserComplaints({ onNavigate, onLogout, onViewComplaint }: UserComplaintsProps) {
  const [activePage] = useState('user-complaints');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComplaints = complaints.filter(complaint => {
    if (statusFilter !== 'All' && complaint.status !== statusFilter) return false;
    if (searchQuery && !complaint.complaintId.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !complaint.plotId.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-medium"
              style={{ backgroundColor: '#FFFFFF20' }}
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
            <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>My Complaints</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>Track status of your submitted grievances</p>
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
            {/* Stats Summary */}
            <div className="grid grid-cols-5 gap-6 mb-8">
              {[
                { label: 'Total', value: complaints.length, color: '#0F4C5C' },
                { label: 'Under Review', value: complaints.filter(c => c.status === 'Under Review').length, color: '#F9A825' },
                { label: 'Scheduled', value: complaints.filter(c => c.status === 'Inspection Scheduled').length, color: '#0F4C5C' },
                { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, color: '#2E7D32' },
                { label: 'Rejected', value: complaints.filter(c => c.status === 'Rejected').length, color: '#C62828' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded p-4"
                  style={{ border: '1px solid #DDE2E7', borderLeft: `4px solid ${stat.color}` }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: '#6B7C93' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg p-4 mb-6" style={{ border: '1px solid #DDE2E7' }}>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Status Filter</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded focus:outline-none"
                    style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                  >
                    <option>All</option>
                    <option>Submitted</option>
                    <option>Under Review</option>
                    <option>Inspection Scheduled</option>
                    <option>Resolved</option>
                    <option>Rejected</option>
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
                      placeholder="Search by Complaint ID or Plot ID..."
                      className="w-full pl-10 pr-4 py-2.5 rounded focus:outline-none"
                      style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Complaints Table */}
            <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #DDE2E7' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0" style={{ backgroundColor: '#F4F6F8', borderBottom: '2px solid #DDE2E7' }}>
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>COMPLAINT ID</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>PLOT ID</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>ISSUE TYPE</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>SUBMISSION DATE</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>STATUS</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>LAST UPDATED</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold" style={{ color: '#6B7C93' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint, index) => (
                      <tr
                        key={index}
                        className="transition-colors cursor-pointer"
                        style={{ borderBottom: '1px solid #DDE2E7' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C08'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-medium" style={{ color: '#0F4C5C' }}>
                            {complaint.complaintId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#2C3E50' }}>{complaint.plotId}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#2C3E50' }}>{complaint.issueType}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#6B7C93' }}>
                            {new Date(complaint.submissionDate).toLocaleDateString('en-IN')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${complaint.statusColor}15`,
                              color: complaint.statusColor
                            }}
                          >
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: '#6B7C93' }}>{complaint.lastUpdated}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => onViewComplaint?.(complaint.complaintId)}
                            className="flex items-center gap-2 text-sm font-medium transition-colors"
                            style={{ color: '#0F4C5C' }}
                          >
                            <Eye className="w-4 h-4" />
                            View Details
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
