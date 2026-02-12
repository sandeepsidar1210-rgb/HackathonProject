import { useState } from 'react';
import { Satellite, MapPin, AlertTriangle, CheckCircle, Layers } from 'lucide-react';

interface IndustrialArea {
  id: string;
  name: string;
  district: string;
  totalPlots: number;
  occupied: number;
  vacant: number;
  encroachments: number;
  unauthorizedConstruction: number;
  complianceRate: number;
  status: 'compliant' | 'moderate' | 'high-risk';
  coordinates: { x: number; y: number };
}

const industrialAreas: IndustrialArea[] = [
  {
    id: 'IA001',
    name: 'Raipur Industrial Area',
    district: 'Raipur',
    totalPlots: 324,
    occupied: 298,
    vacant: 26,
    encroachments: 3,
    unauthorizedConstruction: 2,
    complianceRate: 98.5,
    status: 'compliant',
    coordinates: { x: 45, y: 55 }
  },
  {
    id: 'IA002',
    name: 'Bhilai Industrial Complex',
    district: 'Durg',
    totalPlots: 187,
    occupied: 165,
    vacant: 22,
    encroachments: 8,
    unauthorizedConstruction: 5,
    complianceRate: 83.2,
    status: 'moderate',
    coordinates: { x: 52, y: 48 }
  },
  {
    id: 'IA003',
    name: 'Korba Industrial Zone',
    district: 'Korba',
    totalPlots: 156,
    occupied: 142,
    vacant: 14,
    encroachments: 12,
    unauthorizedConstruction: 9,
    complianceRate: 74.8,
    status: 'high-risk',
    coordinates: { x: 38, y: 42 }
  }
];

export default function Sentinel2LandingMap() {
  const [selectedArea, setSelectedArea] = useState<IndustrialArea | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return '#2E7D32';
      case 'moderate': return '#F9A825';
      case 'high-risk': return '#C62828';
      default: return '#6B7C93';
    }
  };

  return (
    <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #DDE2E7', borderBottom: '1px solid #DDE2E7' }}>
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Satellite className="w-6 h-6" style={{ color: '#0F4C5C' }} />
            <h2 className="text-2xl font-bold" style={{ color: '#1F3A5F' }}>Sentinel-2 Satellite Monitoring</h2>
          </div>
          <p className="text-base" style={{ color: '#6B7C93' }}>
            Near Real-Time Industrial Land Monitoring Using Copernicus Sentinel-2 Data
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Satellite Imagery Viewer - Left Side */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #DDE2E7' }}>
              {/* Viewer Header */}
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#2C3E50' }}>Satellite Monitoring Panel</h3>
                  <p className="text-xs" style={{ color: '#6B7C93' }}>
                    Copernicus Sentinel-2 • 10m Resolution • Cloud Cover: 2.4%
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: '#1F3A5F' }}
                  >
                    <Layers className="w-3 h-3 inline mr-1" />
                    True Color (RGB)
                  </button>
                </div>
              </div>

              {/* Satellite Imagery Canvas */}
              <div className="relative" style={{ height: '500px' }}>
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ backgroundColor: '#A8B89E' }}>
                  {/* Satellite Imagery Pattern */}
                  <defs>
                    <pattern id="landingSatellitePattern" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                      <rect width="5" height="5" fill="#A8B89E" />
                      <rect x="0" y="0" width="2" height="2" fill="#98A88E" opacity="0.5" />
                    </pattern>
                    
                    <filter id="landingTextureNoise">
                      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
                      <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
                    </filter>
                  </defs>
                  
                  <rect width="100" height="100" fill="url(#landingSatellitePattern)" filter="url(#landingTextureNoise)" />
                  
                  {/* Industrial Area Markers */}
                  {industrialAreas.map((area) => (
                    <g
                      key={area.id}
                      onClick={() => setSelectedArea(area)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Area Boundary */}
                      <rect
                        x={area.coordinates.x - 6}
                        y={area.coordinates.y - 6}
                        width="12"
                        height="12"
                        fill={getStatusColor(area.status)}
                        opacity="0.15"
                      />
                      <rect
                        x={area.coordinates.x - 6}
                        y={area.coordinates.y - 6}
                        width="12"
                        height="12"
                        fill="transparent"
                        stroke={getStatusColor(area.status)}
                        strokeWidth="0.3"
                      />
                      
                      {/* Area Marker */}
                      <circle
                        cx={area.coordinates.x}
                        cy={area.coordinates.y}
                        r="1.2"
                        fill={getStatusColor(area.status)}
                      />
                      
                      {/* Label */}
                      <text
                        x={area.coordinates.x}
                        y={area.coordinates.y - 8}
                        fontSize="2.5"
                        textAnchor="middle"
                        fill="#2C3E50"
                        fontWeight="600"
                      >
                        {area.district}
                      </text>
                      
                      {/* Selection Pulse */}
                      {selectedArea?.id === area.id && (
                        <circle
                          cx={area.coordinates.x}
                          cy={area.coordinates.y}
                          r="2"
                          fill="none"
                          stroke={getStatusColor(area.status)}
                          strokeWidth="0.3"
                        >
                          <animate attributeName="r" from="2" to="6" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  ))}
                  
                  {/* North Arrow */}
                  <g transform="translate(8, 8)">
                    <path d="M 0,-3 L 1,0 L 0,3 L -1,0 Z" fill="#0F4C5C" />
                    <text x="0" y="5" fontSize="2" textAnchor="middle" fill="#2C3E50" fontWeight="600">N</text>
                  </g>
                  
                  {/* Scale Bar */}
                  <g transform="translate(85, 92)">
                    <line x1="0" y1="0" x2="10" y2="0" stroke="#2C3E50" strokeWidth="0.2" />
                    <line x1="0" y1="-0.5" x2="0" y2="0.5" stroke="#2C3E50" strokeWidth="0.2" />
                    <line x1="10" y1="-0.5" x2="10" y2="0.5" stroke="#2C3E50" strokeWidth="0.2" />
                    <text x="5" y="2.5" fontSize="1.5" textAnchor="middle" fill="#2C3E50">1km</text>
                  </g>
                </svg>

                {/* Status Legend - Bottom Left */}
                <div className="absolute bottom-6 left-6 bg-white rounded p-4 shadow-lg" style={{ border: '1px solid #DDE2E7' }}>
                  <div className="text-xs font-semibold mb-3" style={{ color: '#2C3E50' }}>Compliance Status</div>
                  <div className="space-y-2">
                    {[
                      { label: 'Compliant', color: '#2E7D32', icon: CheckCircle },
                      { label: 'Moderate Risk', color: '#F9A825', icon: AlertTriangle },
                      { label: 'High Risk', color: '#C62828', icon: AlertTriangle }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                        <item.icon className="w-3 h-3" style={{ color: item.color }} />
                        <span style={{ color: '#2C3E50' }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attribution Footer */}
                <div className="absolute bottom-6 right-6 bg-white/95 rounded px-3 py-2 text-xs max-w-sm" style={{ border: '1px solid #DDE2E7' }}>
                  <span style={{ color: '#6B7C93' }}>
                    Powered by <strong>Copernicus Sentinel-2 (ESA)</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Industrial Areas List - Right Side */}
          <div className="col-span-4">
            <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #DDE2E7', height: '100%' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}>
                <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Industrial Areas</h3>
                <p className="text-xs mt-1" style={{ color: '#6B7C93' }}>Click an area to view details</p>
              </div>

              <div className="p-4 space-y-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {industrialAreas.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setSelectedArea(area)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedArea?.id === area.id ? 'ring-2' : ''
                    }`}
                    style={{
                      border: '1px solid #DDE2E7',
                      backgroundColor: selectedArea?.id === area.id ? '#F4F6F8' : '#FFFFFF',
                      ringColor: getStatusColor(area.status)
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1" style={{ color: '#2C3E50' }}>
                          {area.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs" style={{ color: '#6B7C93' }}>
                          <MapPin className="w-3 h-3" />
                          {area.district}
                        </div>
                      </div>
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: area.status === 'compliant' ? '#E8F5E9' : 
                            area.status === 'moderate' ? '#FFF3E0' : '#FEE',
                          color: getStatusColor(area.status)
                        }}
                      >
                        {area.complianceRate}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                        <div style={{ color: '#6B7C93' }}>Total Plots</div>
                        <div className="font-bold" style={{ color: '#2C3E50' }}>{area.totalPlots}</div>
                      </div>
                      <div className="p-2 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                        <div style={{ color: '#6B7C93' }}>Occupied</div>
                        <div className="font-bold" style={{ color: '#2E7D32' }}>{area.occupied}</div>
                      </div>
                      {area.encroachments > 0 && (
                        <div className="p-2 rounded" style={{ backgroundColor: '#FEE' }}>
                          <div style={{ color: '#C62828' }}>Violations</div>
                          <div className="font-bold" style={{ color: '#C62828' }}>
                            {area.encroachments + area.unauthorizedConstruction}
                          </div>
                        </div>
                      )}
                      <div className="p-2 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                        <div style={{ color: '#6B7C93' }}>Vacant</div>
                        <div className="font-bold" style={{ color: '#6B7C93' }}>{area.vacant}</div>
                      </div>
                    </div>

                    {selectedArea?.id === area.id && (
                      <div className="mt-3 pt-3" style={{ borderTop: '1px solid #DDE2E7' }}>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span style={{ color: '#6B7C93' }}>Encroachments</span>
                            <span className="font-medium" style={{ color: area.encroachments > 0 ? '#C62828' : '#2E7D32' }}>
                              {area.encroachments}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span style={{ color: '#6B7C93' }}>Unauthorized</span>
                            <span className="font-medium" style={{ color: area.unauthorizedConstruction > 0 ? '#C62828' : '#2E7D32' }}>
                              {area.unauthorizedConstruction}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: Satellite,
              title: 'Sentinel-2 Integration',
              description: '10m resolution satellite imagery for precise monitoring',
              color: '#0F4C5C'
            },
            {
              icon: Layers,
              title: 'Multi-Spectral Analysis',
              description: 'RGB, NDVI, False Color Infrared band selection',
              color: '#1F3A5F'
            },
            {
              icon: AlertTriangle,
              title: 'Automated Detection',
              description: 'AI-powered encroachment and change detection',
              color: '#F9A825'
            },
            {
              icon: MapPin,
              title: 'Boundary Verification',
              description: 'Real-time comparison with approved plot boundaries',
              color: '#2E7D32'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: '#2C3E50' }}>{feature.title}</h4>
              <p className="text-sm" style={{ color: '#6B7C93' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
