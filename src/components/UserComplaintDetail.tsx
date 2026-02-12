import { useState } from 'react';
import { LayoutDashboard, Map, FileText, MessageSquare, Bell, File, User, LogOut, Download, Send, CheckCircle, Clock, Calendar, MapPin, ArrowLeft } from 'lucide-react';

interface UserComplaintDetailProps {
  onNavigate: (page: 'user-dashboard' | 'user-plots' | 'user-raise-issue' | 'user-complaints' | 'user-notices') => void;
  onLogout: () => void;
  complaintId: string;
}

export default function UserComplaintDetail({ onNavigate, onLogout, complaintId }: UserComplaintDetailProps) {
  const [message, setMessage] = useState('');

  // Mock complaint data
  const complaint = {
    id: 'CSIDC-2026-0142',
    plotId: 'CG-RAI-2024-0847',
    plotName: 'Raipur Industrial Area - Zone A',
    issueType: 'Incorrect Satellite Detection',
    description: 'The satellite monitoring system has incorrectly flagged an unauthorized construction on our plot. However, the structure in question is an approved warehouse that was constructed as per the sanctioned plan submitted in 2022. We have attached the approved construction drawings and completion certificate for your reference.',
    submissionDate: '2026-02-10',
    status: 'Under Review',
    statusColor: '#F9A825',
    assignedOfficer: 'Rajesh Kumar (Regional Officer)',
    attachedFiles: [
      'Approved_Construction_Plan.pdf',
      'Completion_Certificate.pdf',
      'Site_Photograph.jpg'
    ]
  };

  const timeline = [
    {
      title: 'Complaint Submitted',
      date: '2026-02-10, 10:30 AM',
      description: 'Your grievance has been successfully registered in the system',
      icon: CheckCircle,
      color: '#2E7D32',
      completed: true
    },
    {
      title: 'Assigned to Officer',
      date: '2026-02-10, 02:15 PM',
      description: 'Complaint assigned to Rajesh Kumar (Regional Officer) for review',
      icon: User,
      color: '#2E7D32',
      completed: true
    },
    {
      title: 'Under Review',
      date: '2026-02-11, 09:00 AM',
      description: 'Officer is reviewing the submitted documents and complaint details',
      icon: Clock,
      color: '#F9A825',
      completed: false
    },
    {
      title: 'Inspection Scheduled',
      date: 'Pending',
      description: 'Site inspection will be scheduled after initial review',
      icon: Calendar,
      color: '#6B7C93',
      completed: false
    },
    {
      title: 'Resolution',
      date: 'Pending',
      description: 'Final decision and resolution will be communicated',
      icon: CheckCircle,
      color: '#6B7C93',
      completed: false
    }
  ];

  const messages = [
    {
      sender: 'Rajesh Kumar (Officer)',
      message: 'Thank you for submitting your grievance. I have received your documents and will review them shortly.',
      timestamp: '2026-02-10, 03:30 PM',
      isOfficer: true
    },
    {
      sender: 'You',
      message: 'Thank you. Please let me know if you need any additional information or documents.',
      timestamp: '2026-02-10, 04:15 PM',
      isOfficer: false
    },
    {
      sender: 'Rajesh Kumar (Officer)',
      message: 'I have reviewed the documents. The construction appears to be legitimate. I will schedule an on-site inspection within the next 3 working days to verify the details.',
      timestamp: '2026-02-11, 10:00 AM',
      isOfficer: true
    }
  ];

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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white px-8 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('user-complaints')}
              className="p-2 rounded hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#6B7C93' }} />
            </button>
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>Complaint Details</h1>
              <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>Complaint ID: {complaint.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" style={{ color: '#6B7C93' }} />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Complaint Info & Timeline */}
              <div className="col-span-2 space-y-8">
                {/* Complaint Info */}
                <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #DDE2E7' }}>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-2" style={{ color: '#2C3E50' }}>Complaint Information</h2>
                      <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#6B7C93' }}>
                        <MapPin className="w-4 h-4" />
                        <span>{complaint.plotName}</span>
                      </div>
                    </div>
                    <span
                      className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${complaint.statusColor}15`,
                        color: complaint.statusColor
                      }}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Plot ID</div>
                      <div className="font-medium" style={{ color: '#2C3E50' }}>{complaint.plotId}</div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Issue Type</div>
                      <div className="font-medium" style={{ color: '#2C3E50' }}>{complaint.issueType}</div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Submission Date</div>
                      <div className="font-medium" style={{ color: '#2C3E50' }}>
                        {new Date(complaint.submissionDate).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Assigned Officer</div>
                      <div className="font-medium" style={{ color: '#2C3E50' }}>{complaint.assignedOfficer}</div>
                    </div>
                  </div>

                  <div className="pt-6" style={{ borderTop: '1px solid #DDE2E7' }}>
                    <div className="text-xs mb-2" style={{ color: '#6B7C93' }}>Description</div>
                    <p className="text-sm leading-relaxed" style={{ color: '#2C3E50' }}>
                      {complaint.description}
                    </p>
                  </div>

                  <div className="pt-6" style={{ borderTop: '1px solid #DDE2E7' }}>
                    <div className="text-sm font-medium mb-3" style={{ color: '#2C3E50' }}>Attached Files</div>
                    <div className="space-y-2">
                      {complaint.attachedFiles.map((filename, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded hover:bg-gray-50 transition-colors"
                          style={{ border: '1px solid #DDE2E7' }}
                        >
                          <div className="flex items-center gap-3">
                            <File className="w-5 h-5" style={{ color: '#0F4C5C' }} />
                            <span className="text-sm" style={{ color: '#2C3E50' }}>{filename}</span>
                          </div>
                          <button className="p-1 rounded hover:bg-gray-100">
                            <Download className="w-4 h-4" style={{ color: '#6B7C93' }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-lg p-6" style={{ border: '1px solid #DDE2E7' }}>
                  <h2 className="text-lg font-semibold mb-6" style={{ color: '#2C3E50' }}>Progress Timeline</h2>
                  <div className="space-y-6">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: item.completed ? `${item.color}15` : '#F4F6F8',
                              border: `2px solid ${item.color}`
                            }}
                          >
                            <item.icon className="w-5 h-5" style={{ color: item.color }} />
                          </div>
                          {index < timeline.length - 1 && (
                            <div
                              className="w-0.5 h-12 mt-2"
                              style={{
                                backgroundColor: item.completed ? item.color : '#DDE2E7'
                              }}
                            />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="font-medium mb-1" style={{ color: item.completed ? '#2C3E50' : '#6B7C93' }}>
                            {item.title}
                          </div>
                          <div className="text-xs mb-2" style={{ color: '#6B7C93' }}>{item.date}</div>
                          <div className="text-sm" style={{ color: '#6B7C93' }}>{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Message Thread */}
              <div className="col-span-1">
                <div className="bg-white rounded-lg flex flex-col sticky top-0" style={{ border: '1px solid #DDE2E7', height: '800px' }}>
                  <div className="px-6 py-4" style={{ borderBottom: '1px solid #DDE2E7' }}>
                    <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Communication</h3>
                    <p className="text-xs mt-1" style={{ color: '#6B7C93' }}>Chat with assigned officer</p>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.isOfficer ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.isOfficer ? '' : ''
                          }`}
                          style={{
                            backgroundColor: msg.isOfficer ? '#F4F6F8' : '#0F4C5C15',
                            border: msg.isOfficer ? '1px solid #DDE2E7' : '1px solid #0F4C5C30'
                          }}
                        >
                          <div className="text-xs font-medium mb-1" style={{ color: msg.isOfficer ? '#0F4C5C' : '#0F4C5C' }}>
                            {msg.sender}
                          </div>
                          <p className="text-sm mb-2" style={{ color: '#2C3E50' }}>{msg.message}</p>
                          <div className="text-xs" style={{ color: '#6B7C93' }}>{msg.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4" style={{ borderTop: '1px solid #DDE2E7' }}>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 rounded focus:outline-none"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      />
                      <button
                        className="px-4 py-2 rounded text-white transition-colors"
                        style={{ backgroundColor: '#0F4C5C' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
