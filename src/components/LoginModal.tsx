import { useState } from 'react';
import { X, Eye, EyeOff, AlertCircle } from 'lucide-react';
import csidcLogo from 'figma:asset/ffa8c1ead3f4fef010b0bf27deab0aa98c2711aa.png';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: { userId: string; password: string; role: string; userType: 'admin' | 'user' }) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Regional Officer');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'user'>('admin');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!userId || !password) {
      setError('Please enter both User ID and Password');
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ userId, password, role, userType });
      // Reset form
      setUserId('');
      setPassword('');
      setRole(userType === 'admin' ? 'Regional Officer' : 'Industry Allottee');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded shadow-xl w-full max-w-md mx-4" style={{ borderColor: '#DDE2E7', borderWidth: '1px' }}>
        {/* Header */}
        <div className="px-6 py-4" style={{ borderBottomColor: '#DDE2E7', borderBottomWidth: '1px' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#0F4C5C' }}>
                <img src={csidcLogo} alt="CSIDC Logo" className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold" style={{ color: '#2C3E50' }}>
                  {userType === 'admin' ? 'Authorized Access' : 'Allottee Portal'}
                </h2>
                <p className="text-xs" style={{ color: '#6B7C93' }}>CSIDC Monitoring Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs mt-2 font-medium" style={{ color: '#C6A75E' }}>
            {userType === 'admin' ? 'For Official Use Only' : 'Industry Allottee Login'}
          </p>
        </div>

        {/* User Type Toggle */}
        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 gap-2 p-1 rounded" style={{ backgroundColor: '#F4F6F8' }}>
            <button
              type="button"
              onClick={() => {
                setUserType('admin');
                setRole('Regional Officer');
              }}
              className={`py-2 px-4 rounded font-medium text-sm transition-all ${
                userType === 'admin' ? 'text-white shadow-sm' : ''
              }`}
              style={userType === 'admin' ? 
                { backgroundColor: '#0F4C5C', color: '#FFFFFF' } : 
                { color: '#6B7C93' }
              }
            >
              Government Officer
            </button>
            <button
              type="button"
              onClick={() => {
                setUserType('user');
                setRole('Industry Allottee');
              }}
              className={`py-2 px-4 rounded font-medium text-sm transition-all ${
                userType === 'user' ? 'text-white shadow-sm' : ''
              }`}
              style={userType === 'user' ? 
                { backgroundColor: '#0F4C5C', color: '#FFFFFF' } : 
                { color: '#6B7C93' }
              }
            >
              Industry Allottee
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* User ID */}
            <div>
              <label htmlFor="userId" className="block text-sm font-medium mb-1.5" style={{ color: '#2C3E50' }}>
                User ID / Official Email
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-3 py-2 rounded focus:outline-none focus:border-transparent"
                style={{ border: '1px solid #DDE2E7', focusRing: '2px solid #0F4C5C' }}
                placeholder="Enter your user ID"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: '#2C3E50' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded focus:outline-none focus:border-transparent pr-10"
                  style={{ border: '1px solid #DDE2E7' }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1.5" style={{ color: '#2C3E50' }}>
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded focus:outline-none focus:border-transparent"
                style={{ border: '1px solid #DDE2E7' }}
              >
                <option>Regional Officer</option>
                <option>State Admin</option>
                <option>Inspection Officer</option>
                <option>Legal Department</option>
              </select>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded"
                  style={{ accentColor: '#0F4C5C' }}
                />
                <span className="text-sm" style={{ color: '#2C3E50' }}>Remember Me</span>
              </label>
              <button
                type="button"
                className="text-sm hover:underline"
                style={{ color: '#0F4C5C' }}
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 text-white py-2.5 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#0F4C5C' }}
              onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#0d3f4a')}
              onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#0F4C5C')}
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded font-medium transition-colors"
              style={{ border: '1px solid #0F4C5C', color: '#0F4C5C', backgroundColor: 'white' }}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-3 rounded-b" style={{ borderTopColor: '#DDE2E7', borderTopWidth: '1px', backgroundColor: '#F4F6F8' }}>
          <p className="text-xs text-center" style={{ color: '#6B7C93' }}>
            Unauthorized access is prohibited and will be prosecuted under applicable laws.
          </p>
        </div>
      </div>
    </div>
  );
}