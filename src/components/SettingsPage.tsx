import { useState } from 'react';
import { LayoutDashboard, Map, AlertCircle, BarChart3, Settings, User, LogOut, Bell, Shield, Key, MapPin, FileText, Save, Camera } from 'lucide-react';
import csidcLogo from 'figma:asset/ffa8c1ead3f4fef010b0bf27deab0aa98c2711aa.png';

interface SettingsPageProps {
  onNavigate: (page: 'dashboard' | 'violations' | 'reports' | 'industrial-areas' | 'settings') => void;
  onLogout: () => void;
}

export default function SettingsPage({ onNavigate, onLogout }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences'>('profile');
  const [savedMessage, setSavedMessage] = useState(false);

  // Profile settings
  const [fullName, setFullName] = useState('Rajesh Kumar');
  const [email, setEmail] = useState('rajesh.kumar@csidc.gov.in');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [designation, setDesignation] = useState('Regional Officer');
  const [department, setDepartment] = useState('Land Monitoring Division');
  const [region, setRegion] = useState('Central Chhattisgarh');

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [highViolationAlerts, setHighViolationAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);

  // Preference settings
  const [defaultView, setDefaultView] = useState('dashboard');
  const [itemsPerPage, setItemsPerPage] = useState('25');
  const [mapProvider, setMapProvider] = useState('Sentinel-2');
  const [language, setLanguage] = useState('English');

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

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
              onClick={() => onNavigate('industrial-areas')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all opacity-75 hover:opacity-100 hover:bg-white/10"
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-medium"
              style={{ backgroundColor: '#FFFFFF20' }}
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
            <h1 className="text-xl font-bold" style={{ color: '#2C3E50' }}>Settings</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7C93' }}>Manage your account and system preferences</p>
          </div>

          {savedMessage && (
            <div className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
              ✓ Settings saved successfully
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-8" style={{ borderBottom: '2px solid #DDE2E7' }}>
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'preferences', label: 'Preferences', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors"
                  style={{
                    color: activeTab === tab.id ? '#0F4C5C' : '#6B7C93',
                    borderBottom: activeTab === tab.id ? '2px solid #0F4C5C' : '2px solid transparent',
                    marginBottom: '-2px'
                  }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="max-w-3xl">
                <div className="bg-white rounded-lg p-8" style={{ border: '1px solid #DDE2E7' }}>
                  <h3 className="text-lg font-semibold mb-6" style={{ color: '#2C3E50' }}>Profile Information</h3>

                  {/* Profile Photo */}
                  <div className="flex items-center gap-6 mb-8 pb-8" style={{ borderBottom: '1px solid #DDE2E7' }}>
                    <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C6A75E' }}>
                      <User className="w-12 h-12" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2" style={{ color: '#2C3E50' }}>Profile Photo</h4>
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors"
                        style={{ border: '1px solid #0F4C5C', color: '#0F4C5C' }}
                        onClick={() => alert('Upload photo feature - Coming soon')}
                      >
                        <Camera className="w-4 h-4" />
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Designation</label>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Department</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Region</label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      >
                        <option>Central Chhattisgarh</option>
                        <option>North Chhattisgarh</option>
                        <option>South Chhattisgarh</option>
                        <option>All Regions</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-8">
                    <button
                      className="px-6 py-2.5 rounded text-sm font-medium transition-colors"
                      style={{ border: '1px solid #DDE2E7', color: '#6B7C93' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium text-white transition-colors"
                      style={{ backgroundColor: '#0F4C5C' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="max-w-3xl">
                <div className="bg-white rounded-lg p-8" style={{ border: '1px solid #DDE2E7' }}>
                  <h3 className="text-lg font-semibold mb-6" style={{ color: '#2C3E50' }}>Security Settings</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      />
                    </div>

                    <div className="pt-4" style={{ borderTop: '1px solid #DDE2E7' }}>
                      <h4 className="font-medium mb-4" style={{ color: '#2C3E50' }}>Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between p-4 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                        <div>
                          <div className="font-medium text-sm" style={{ color: '#2C3E50' }}>Enable 2FA</div>
                          <div className="text-xs mt-1" style={{ color: '#6B7C93' }}>Add an extra layer of security to your account</div>
                        </div>
                        <button
                          className="px-4 py-2 rounded text-sm font-medium transition-colors"
                          style={{ border: '1px solid #0F4C5C', color: '#0F4C5C' }}
                          onClick={() => alert('2FA setup - Coming soon')}
                        >
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-8">
                    <button
                      className="px-6 py-2.5 rounded text-sm font-medium transition-colors"
                      style={{ border: '1px solid #DDE2E7', color: '#6B7C93' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium text-white transition-colors"
                      style={{ backgroundColor: '#0F4C5C' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                    >
                      <Key className="w-4 h-4" />
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="max-w-3xl">
                <div className="bg-white rounded-lg p-8" style={{ border: '1px solid #DDE2E7' }}>
                  <h3 className="text-lg font-semibold mb-6" style={{ color: '#2C3E50' }}>Notification Preferences</h3>

                  <div className="space-y-6">
                    {[
                      { label: 'Email Notifications', description: 'Receive updates via email', state: emailNotifications, setState: setEmailNotifications },
                      { label: 'SMS Notifications', description: 'Receive updates via SMS', state: smsNotifications, setState: setSmsNotifications },
                      { label: 'High Violation Alerts', description: 'Immediate alerts for high-severity violations', state: highViolationAlerts, setState: setHighViolationAlerts },
                      { label: 'Weekly Reports', description: 'Receive weekly compliance summary reports', state: weeklyReports, setState: setWeeklyReports },
                      { label: 'System Updates', description: 'Notifications about system maintenance and updates', state: systemUpdates, setState: setSystemUpdates }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded" style={{ border: '1px solid #DDE2E7' }}>
                        <div>
                          <div className="font-medium" style={{ color: '#2C3E50' }}>{item.label}</div>
                          <div className="text-sm mt-1" style={{ color: '#6B7C93' }}>{item.description}</div>
                        </div>
                        <button
                          onClick={() => item.setState(!item.state)}
                          className="relative w-12 h-6 rounded-full transition-colors"
                          style={{ backgroundColor: item.state ? '#0F4C5C' : '#DDE2E7' }}
                        >
                          <div
                            className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                            style={{ transform: item.state ? 'translateX(26px)' : 'translateX(4px)' }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium text-white transition-colors"
                      style={{ backgroundColor: '#0F4C5C' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                    >
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="max-w-3xl">
                <div className="bg-white rounded-lg p-8" style={{ border: '1px solid #DDE2E7' }}>
                  <h3 className="text-lg font-semibold mb-6" style={{ color: '#2C3E50' }}>System Preferences</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Default View</label>
                      <select
                        value={defaultView}
                        onChange={(e) => setDefaultView(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      >
                        <option value="dashboard">Dashboard</option>
                        <option value="violations">Violations</option>
                        <option value="industrial-areas">Industrial Areas</option>
                        <option value="reports">Reports</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Items Per Page</label>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Satellite Map Provider</label>
                      <select
                        value={mapProvider}
                        onChange={(e) => setMapProvider(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      >
                        <option value="Sentinel-2">Copernicus Sentinel-2</option>
                        <option value="Landsat">Landsat 8/9</option>
                        <option value="ISRO">ISRO Cartosat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                      >
                        <option value="English">English</option>
                        <option value="Hindi">हिंदी (Hindi)</option>
                        <option value="Chhattisgarhi">छत्तीसगढ़ी (Chhattisgarhi)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium text-white transition-colors"
                      style={{ backgroundColor: '#0F4C5C' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                    >
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
