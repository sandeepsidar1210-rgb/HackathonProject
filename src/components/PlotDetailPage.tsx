import { useState } from 'react';
import { ArrowLeft, Download, FileText, Calendar, AlertTriangle, CheckCircle, XCircle, LogOut, Settings, User } from 'lucide-react';

interface PlotDetailPageProps {
  plotId: string;
  onNavigate: (page: 'dashboard' | 'violations' | 'reports' | 'industrial-areas' | 'settings') => void;
  onLogout: () => void;
}

export default function PlotDetailPage({ plotId, onNavigate, onLogout }: PlotDetailPageProps) {
  const [activeNav, setActiveNav] = useState('violations');

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'dashboard') {
      onNavigate('dashboard');
    } else if (nav === 'violations') {
      onNavigate('violations');
    } else if (nav === 'reports') {
      onNavigate('reports');
    } else if (nav === 'industrial-areas') {
      onNavigate('industrial-areas');
    } else if (nav === 'settings') {
      onNavigate('settings');
    }
  };

  // Mock data for the selected plot
  const plotData = {
    id: plotId,
    allottee: 'Sai Industries Pvt. Ltd.',
    industrialArea: 'Raipur Industrial Area',
    approvedArea: 5000,
    detectedArea: 6200,
    deviation: 1200,
    violationType: 'Unauthorized Extension',
    severity: 'High',
    detectionDate: '2026-02-09',
    lastInspectionDate: '2025-12-15',
    leasePaymentStatus: 'Paid',
    waterChargesStatus: 'Paid',
    industryStatus: 'Running',
    coordinates: '21.2514° N, 81.6296° E'
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
                  <div className="text-xs text-gray-600">Plot Details</div>
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
                <button
                  onClick={() => handleNavClick('industrial-areas')}
                  className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                    activeNav === 'industrial-areas'
                      ? 'bg-[#0B3C5D] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Industrial Areas
                </button>
                <button
                  onClick={() => handleNavClick('settings')}
                  className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                    activeNav === 'settings'
                      ? 'bg-[#0B3C5D] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
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
        {/* Back Button */}
        <button
          onClick={() => onNavigate('violations')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Violations</span>
        </button>

        {/* Plot Header */}
        <div className="bg-white rounded border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{plotData.id}</h1>
              <p className="text-gray-600">{plotData.allottee}</p>
              <p className="text-sm text-gray-500 mt-1">{plotData.industrialArea}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-red-50 border border-red-200 text-red-600 font-medium">
                <AlertTriangle className="w-4 h-4" />
                {plotData.severity} Severity
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Approved Area</div>
              <div className="text-xl font-bold text-gray-900">{plotData.approvedArea.toLocaleString()}</div>
              <div className="text-xs text-gray-500">square meters</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Detected Area</div>
              <div className="text-xl font-bold text-gray-900">{plotData.detectedArea.toLocaleString()}</div>
              <div className="text-xs text-gray-500">square meters</div>
            </div>
            <div className="p-4 bg-red-50 rounded border border-red-200">
              <div className="text-xs text-red-600 mb-1">Deviation</div>
              <div className="text-xl font-bold text-red-600">+{plotData.deviation.toLocaleString()}</div>
              <div className="text-xs text-red-500">
                {((plotData.deviation / plotData.approvedArea) * 100).toFixed(1)}% over approved
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">Coordinates</div>
              <div className="text-sm font-medium text-gray-900">{plotData.coordinates}</div>
            </div>
          </div>
        </div>

        {/* Imagery Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Reference Map */}
          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Reference Allotment Map</h3>
              <p className="text-xs text-gray-600 mt-0.5">Approved boundary (Last updated: Jan 2024)</p>
            </div>
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50" style={{ height: '400px' }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {/* Grid */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <g key={i}>
                    <line x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#cbd5e1" strokeWidth="0.3" />
                    <line x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#cbd5e1" strokeWidth="0.3" />
                  </g>
                ))}
                
                {/* Approved boundary */}
                <rect
                  x="25"
                  y="25"
                  width="50"
                  height="50"
                  fill="transparent"
                  stroke="#0B3C5D"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <rect
                  x="25"
                  y="25"
                  width="50"
                  height="50"
                  fill="#0B3C5D"
                  opacity="0.1"
                />
                
                {/* Labels */}
                <text x="50" y="50" textAnchor="middle" className="text-[4px] fill-gray-700 font-medium">
                  Approved Area
                </text>
                <text x="50" y="55" textAnchor="middle" className="text-[3px] fill-gray-600">
                  5000 sq.m
                </text>
              </svg>
              
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded text-xs">
                <div className="font-medium text-gray-900">Approved Boundary</div>
              </div>
            </div>
          </div>

          {/* Satellite Image */}
          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Latest Satellite Image</h3>
              <p className="text-xs text-gray-600 mt-0.5">Captured: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="relative bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700" style={{ height: '400px' }}>
              {/* Simulated satellite view */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-gray-500 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${Math.random() * 2 + 1}px`,
                      height: `${Math.random() * 2 + 1}px`,
                    }}
                  />
                ))}
              </div>
              
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {/* Detected boundary (larger) */}
                <rect
                  x="24"
                  y="24"
                  width="54"
                  height="54"
                  fill="transparent"
                  stroke="#C0392B"
                  strokeWidth="1.5"
                />
                <rect
                  x="24"
                  y="24"
                  width="54"
                  height="54"
                  fill="#C0392B"
                  opacity="0.2"
                />

                {/* Approved boundary overlay (dashed) */}
                <rect
                  x="25"
                  y="25"
                  width="50"
                  height="50"
                  fill="transparent"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                  opacity="0.6"
                />
              </svg>
              
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded text-xs">
                <div className="font-medium text-gray-900">Detected Area</div>
              </div>
              
              <div className="absolute bottom-3 left-3 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded text-xs text-white">
                <div className="font-medium">Violation Detected: +{plotData.deviation} sq.m</div>
              </div>
            </div>
          </div>
        </div>

        {/* Superimposed Comparison */}
        <div className="bg-white rounded border border-gray-200 overflow-hidden mb-6">
          <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Superimposed Comparison View</h3>
            <p className="text-xs text-gray-600 mt-0.5">Red overlay indicates deviation zones</p>
          </div>
          <div className="relative bg-gray-100" style={{ height: '400px' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Grid background */}
              {Array.from({ length: 20 }).map((_, i) => (
                <g key={i}>
                  <line x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="#e2e8f0" strokeWidth="0.2" />
                  <line x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="#e2e8f0" strokeWidth="0.2" />
                </g>
              ))}

              {/* Approved boundary (green) */}
              <rect
                x="25"
                y="25"
                width="50"
                height="50"
                fill="#27AE60"
                opacity="0.15"
                stroke="#27AE60"
                strokeWidth="1"
                strokeDasharray="2,2"
              />

              {/* Detected boundary (full) */}
              <rect
                x="24"
                y="24"
                width="54"
                height="54"
                fill="transparent"
                stroke="#0B3C5D"
                strokeWidth="1"
              />

              {/* Deviation zones (red overlay) */}
              {/* Top deviation */}
              <rect x="24" y="24" width="54" height="1" fill="#C0392B" opacity="0.6" />
              {/* Bottom deviation */}
              <rect x="24" y="77" width="54" height="1" fill="#C0392B" opacity="0.6" />
              {/* Left deviation */}
              <rect x="24" y="24" width="1" height="54" fill="#C0392B" opacity="0.6" />
              {/* Right deviation */}
              <rect x="77" y="24" width="1" height="54" fill="#C0392B" opacity="0.6" />
              
              {/* Deviation area highlights */}
              <rect x="75" y="24" width="3" height="54" fill="#C0392B" opacity="0.4" />
              <rect x="24" y="75" width="54" height="3" fill="#C0392B" opacity="0.4" />

              {/* Labels */}
              <text x="50" y="50" textAnchor="middle" className="text-[3px] fill-gray-700 font-medium">
                Approved: 5000 sq.m
              </text>
              <text x="50" y="54" textAnchor="middle" className="text-[3px] fill-gray-700">
                Detected: 6200 sq.m
              </text>
            </svg>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded border border-gray-200">
              <div className="text-xs font-semibold text-gray-900 mb-2">Legend</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-3 border-2 border-green-600 border-dashed bg-green-500/20" />
                  <span className="text-gray-700">Approved Boundary</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-3 border-2 border-[#0B3C5D] bg-transparent" />
                  <span className="text-gray-700">Detected Boundary</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-3 bg-red-600/60" />
                  <span className="text-gray-700">Deviation Zone</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Panel */}
        <div className="bg-white rounded border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Compliance Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900">Lease Payment</div>
                <div className="text-xs text-green-700 mt-1">{plotData.leasePaymentStatus} - Up to date</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900">Water Charges</div>
                <div className="text-xs text-green-700 mt-1">{plotData.waterChargesStatus} - Current</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded border border-blue-200">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900">Industry Status</div>
                <div className="text-xs text-blue-700 mt-1">{plotData.industryStatus} - Active</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded border border-orange-200">
              <Calendar className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900">Last Inspection</div>
                <div className="text-xs text-orange-700 mt-1">
                  {new Date(plotData.lastInspectionDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C0392B] text-white rounded font-medium hover:bg-[#C0392B]/90 transition-colors">
              <FileText className="w-4 h-4" />
              Generate Legal Notice
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF9933] text-white rounded font-medium hover:bg-[#FF9933]/90 transition-colors">
              <Calendar className="w-4 h-4" />
              Schedule Inspection
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0B3C5D] text-white rounded font-medium hover:bg-[#0B3C5D]/90 transition-colors">
              <Download className="w-4 h-4" />
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}