import { useState } from 'react';
import { LayoutDashboard, Map, FileText, MessageSquare, Bell, File, User, LogOut, Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface UserRaiseIssueProps {
  onNavigate: (page: 'user-dashboard' | 'user-plots' | 'user-raise-issue' | 'user-complaints' | 'user-notices') => void;
  onLogout: () => void;
}

export default function UserRaiseIssue({ onNavigate, onLogout }: UserRaiseIssueProps) {
  const [activePage] = useState('user-raise-issue');
  const [selectedPlot, setSelectedPlot] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate complaint ID
    const complaintId = `CSIDC-2026-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    setGeneratedId(complaintId);
    setShowSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedPlot('');
      setIssueCategory('');
      setDescription('');
      setContactEmail('');
      setContactPhone('');
    }, 5000);
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-medium"
              style={{ backgroundColor: '#FFFFFF20' }}
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
            <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>Raise a Grievance / Report an Issue</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>Submit your concerns and we'll address them promptly</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" style={{ color: '#6B7C93' }} />
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
            {/* Success Message */}
            {showSuccess && (
              <div 
                className="rounded-lg p-6 mb-8 animate-fade-in"
                style={{ backgroundColor: '#E8F5E9', border: '1px solid #2E7D32' }}
              >
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#2E7D32' }} />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: '#1B5E20' }}>
                      Your grievance has been registered successfully!
                    </h3>
                    <p className="text-sm mb-2" style={{ color: '#2E7D32' }}>
                      Complaint ID: <span className="font-mono font-bold">{generatedId}</span>
                    </p>
                    <p className="text-sm" style={{ color: '#2E7D32' }}>
                      Our team will review your complaint and contact you within 2-3 business days.
                      You can track the status in the "My Complaints" section.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Alert */}
            <div 
              className="rounded-lg p-4 mb-8"
              style={{ backgroundColor: '#E3F2FD', border: '1px solid #0F4C5C' }}
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0F4C5C' }} />
                <div className="text-sm" style={{ color: '#0F4C5C' }}>
                  <strong>Note:</strong> Please provide accurate information and supporting documents for faster resolution.
                  All complaints are processed within 7 working days.
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg p-8" style={{ border: '1px solid #DDE2E7' }}>
                <div className="space-y-6">
                  {/* Select Plot */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>
                      Select Plot <span style={{ color: '#C62828' }}>*</span>
                    </label>
                    <select
                      value={selectedPlot}
                      onChange={(e) => setSelectedPlot(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded focus:outline-none transition-all"
                      style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                    >
                      <option value="">Select a plot...</option>
                      <option value="CG-RAI-2024-0847">CG-RAI-2024-0847 - Raipur Industrial Area</option>
                      <option value="CG-RAI-2024-0848">CG-RAI-2024-0848 - Raipur Industrial Area</option>
                      <option value="CG-BHI-2024-0234">CG-BHI-2024-0234 - Bhilai Industrial Complex</option>
                    </select>
                  </div>

                  {/* Issue Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>
                      Issue Category <span style={{ color: '#C62828' }}>*</span>
                    </label>
                    <select
                      value={issueCategory}
                      onChange={(e) => setIssueCategory(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded focus:outline-none transition-all"
                      style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                    >
                      <option value="">Select category...</option>
                      <option value="boundary">Boundary Discrepancy</option>
                      <option value="satellite">Incorrect Satellite Detection</option>
                      <option value="encroachment">Encroachment Complaint</option>
                      <option value="utility">Utility Issue</option>
                      <option value="payment">Payment Dispute</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>
                      Description <span style={{ color: '#C62828' }}>*</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={6}
                      placeholder="Please provide detailed information about your issue..."
                      className="w-full px-4 py-3 rounded focus:outline-none transition-all resize-none"
                      style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                    />
                    <div className="text-xs mt-1" style={{ color: '#6B7C93' }}>
                      Minimum 50 characters required
                    </div>
                  </div>

                  {/* File Upload Section */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>
                        Upload Documents (Optional)
                      </label>
                      <div 
                        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all hover:bg-gray-50"
                        style={{ borderColor: '#DDE2E7' }}
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#6B7C93' }} />
                        <div className="text-sm font-medium mb-1" style={{ color: '#2C3E50' }}>
                          Click to upload documents
                        </div>
                        <div className="text-xs" style={{ color: '#6B7C93' }}>
                          PDF, DOC, DOCX up to 10MB
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>
                        Upload Images (Optional)
                      </label>
                      <div 
                        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all hover:bg-gray-50"
                        style={{ borderColor: '#DDE2E7' }}
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#6B7C93' }} />
                        <div className="text-sm font-medium mb-1" style={{ color: '#2C3E50' }}>
                          Click to upload images
                        </div>
                        <div className="text-xs" style={{ color: '#6B7C93' }}>
                          JPG, PNG up to 5MB
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="pt-6" style={{ borderTop: '1px solid #DDE2E7' }}>
                    <h3 className="font-semibold mb-4" style={{ color: '#2C3E50' }}>Contact Details</h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>
                          Email Address <span style={{ color: '#C62828' }}>*</span>
                        </label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          required
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-3 rounded focus:outline-none transition-all"
                          style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>
                          Phone Number <span style={{ color: '#C62828' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-3 rounded focus:outline-none transition-all"
                          style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid #DDE2E7' }}>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded font-medium text-white transition-colors"
                      style={{ backgroundColor: '#0F4C5C' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                    >
                      Submit Grievance
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlot('');
                        setIssueCategory('');
                        setDescription('');
                        setContactEmail('');
                        setContactPhone('');
                      }}
                      className="px-8 py-3 rounded font-medium transition-colors"
                      style={{ border: '1px solid #DDE2E7', color: '#6B7C93', backgroundColor: 'white' }}
                    >
                      Clear Form
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
