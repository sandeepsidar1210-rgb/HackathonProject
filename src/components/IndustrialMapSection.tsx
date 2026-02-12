import { useState } from 'react';
import { Search, MapPin, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

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
    complianceRate: 72.4,
    status: 'high-risk',
    coordinates: { x: 58, y: 28 }
  },
  {
    id: 'IA004',
    name: 'Bilaspur Trade Center',
    district: 'Bilaspur',
    totalPlots: 243,
    occupied: 228,
    vacant: 15,
    encroachments: 4,
    unauthorizedConstruction: 3,
    complianceRate: 94.7,
    status: 'compliant',
    coordinates: { x: 65, y: 38 }
  },
  {
    id: 'IA005',
    name: 'Rajnandgaon Manufacturing Hub',
    district: 'Rajnandgaon',
    totalPlots: 198,
    occupied: 175,
    vacant: 23,
    encroachments: 11,
    unauthorizedConstruction: 7,
    complianceRate: 80.1,
    status: 'moderate',
    coordinates: { x: 38, y: 62 }
  },
  {
    id: 'IA006',
    name: 'Jagdalpur Industrial Estate',
    district: 'Bastar',
    totalPlots: 89,
    occupied: 84,
    vacant: 5,
    encroachments: 1,
    unauthorizedConstruction: 1,
    complianceRate: 97.8,
    status: 'compliant',
    coordinates: { x: 42, y: 82 }
  }
];

export default function IndustrialMapSection() {
  const [selectedArea, setSelectedArea] = useState<IndustrialArea | null>(industrialAreas[0]);
  const [hoveredArea, setHoveredArea] = useState<IndustrialArea | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [complianceFilter, setComplianceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHighRiskOnly, setShowHighRiskOnly] = useState(false);

  const districts = ['All Districts', 'Raipur', 'Durg', 'Korba', 'Bilaspur', 'Rajnandgaon', 'Bastar'];

  const filteredAreas = industrialAreas.filter(area => {
    if (selectedDistrict !== 'All Districts' && area.district !== selectedDistrict) return false;
    if (complianceFilter !== 'All' && area.status !== complianceFilter) return false;
    if (showHighRiskOnly && area.status !== 'high-risk') return false;
    if (searchQuery && !area.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'compliant': return '#2E7D32';
      case 'moderate': return '#F9A825';
      case 'high-risk': return '#C62828';
      default: return '#0F4C5C';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4" />;
      case 'moderate': return <AlertTriangle className="w-4 h-4" />;
      case 'high-risk': return <XCircle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-24" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DDE2E7' }}>
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#2C3E50' }}>Industrial Areas of Chhattisgarh</h2>
          <p className="text-lg" style={{ color: '#6B7C93' }}>Interactive GIS monitoring map with real-time compliance data</p>
        </div>

        {/* Filters - Single Row Above Map */}
        <div className="bg-white rounded-lg p-6 mb-8" style={{ border: '1px solid #DDE2E7' }}>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-2.5 rounded focus:outline-none transition-all"
                style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
              >
                {districts.map(district => (
                  <option key={district}>{district}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Compliance Status</label>
              <select
                value={complianceFilter}
                onChange={(e) => setComplianceFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded focus:outline-none transition-all"
                style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
              >
                <option>All</option>
                <option>Compliant</option>
                <option>Moderate</option>
                <option>High Risk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Search Area</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search industrial area..."
                  className="w-full pl-10 pr-4 py-2.5 rounded focus:outline-none transition-all"
                  style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>Quick Filter</label>
              <label className="flex items-center gap-3 px-4 py-2.5 cursor-pointer rounded" style={{ backgroundColor: '#F4F6F8' }}>
                <input
                  type="checkbox"
                  checked={showHighRiskOnly}
                  onChange={(e) => setShowHighRiskOnly(e.target.checked)}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: '#C62828' }}
                />
                <span className="text-sm" style={{ color: '#2C3E50' }}>High Risk Only</span>
              </label>
            </div>

            <div className="flex items-end">
              <button 
                className="w-full px-4 py-2.5 rounded font-medium text-white transition-colors"
                style={{ backgroundColor: '#0F4C5C' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Map and Collapsible Details - 80/20 Split */}
        <div className="grid grid-cols-12 gap-8">
          {/* Map Area - 80% */}
          <div className="col-span-9">
            <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #DDE2E7', height: '700px' }}>
              <div className="relative bg-gradient-to-br from-green-50 to-blue-50" style={{ height: '600px' }}>
                {/* Simplified Chhattisgarh Map Outline */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  {/* Simplified state boundary */}
                  <path
                    d="M 30 20 L 70 15 L 85 25 L 88 45 L 82 65 L 70 85 L 50 95 L 35 90 L 25 75 L 20 55 L 22 35 Z"
                    fill="#E8F5E9"
                    stroke="#1F3A5F"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  
                  {/* Grid lines */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={i * 10}
                      x2="100"
                      y2={i * 10}
                      stroke="#cbd5e1"
                      strokeWidth="0.2"
                      opacity="0.3"
                    />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={i * 10}
                      y1="0"
                      x2={i * 10}
                      y2="100"
                      stroke="#cbd5e1"
                      strokeWidth="0.2"
                      opacity="0.3"
                    />
                  ))}

                  {/* Industrial Area Markers */}
                  {filteredAreas.map((area) => {
                    const isSelected = selectedArea?.id === area.id;
                    const isHovered = hoveredArea?.id === area.id;
                    const markerSize = isSelected ? 8 : isHovered ? 6 : 4;
                    
                    return (
                      <g key={area.id}>
                        {/* Marker pulse effect for selected */}
                        {isSelected && (
                          <circle
                            cx={area.coordinates.x}
                            cy={area.coordinates.y}
                            r={markerSize + 2}
                            fill={getMarkerColor(area.status)}
                            opacity="0.2"
                          >
                            <animate
                              attributeName="r"
                              from={markerSize}
                              to={markerSize + 4}
                              dur="2s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              from="0.4"
                              to="0"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                        
                        {/* Main marker */}
                        <circle
                          cx={area.coordinates.x}
                          cy={area.coordinates.y}
                          r={markerSize}
                          fill={getMarkerColor(area.status)}
                          stroke="white"
                          strokeWidth="1"
                          className="cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredArea(area)}
                          onMouseLeave={() => setHoveredArea(null)}
                          onClick={() => setSelectedArea(area)}
                        />
                        
                        {/* Label for selected area */}
                        {isSelected && (
                          <text
                            x={area.coordinates.x}
                            y={area.coordinates.y - markerSize - 2}
                            textAnchor="middle"
                            className="text-[3px] font-medium fill-gray-900"
                          >
                            {area.name}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Hover Tooltip */}
                {hoveredArea && (
                  <div
                    className="absolute bg-white border border-gray-300 rounded shadow-lg p-3 pointer-events-none z-10"
                    style={{
                      left: `${hoveredArea.coordinates.x}%`,
                      top: `${hoveredArea.coordinates.y}%`,
                      transform: 'translate(-50%, -120%)'
                    }}
                  >
                    <div className="text-sm font-semibold text-gray-900 mb-1">{hoveredArea.name}</div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>Total Plots: {hoveredArea.totalPlots}</div>
                      <div>Active Violations: {hoveredArea.encroachments + hoveredArea.unauthorizedConstruction}</div>
                      <div className="flex items-center gap-1">
                        Compliance: 
                        <span style={{ color: getMarkerColor(hoveredArea.status) }} className="font-medium">
                          {hoveredArea.complianceRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded" style={{ border: '1px solid #DDE2E7' }}>
                  <div className="text-xs font-semibold mb-2" style={{ color: '#2C3E50' }}>Status Legend</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2E7D32' }} />
                      <span style={{ color: '#2C3E50' }}>Compliant (&gt;90%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F9A825' }} />
                      <span style={{ color: '#2C3E50' }}>Moderate (75-90%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C62828' }} />
                      <span style={{ color: '#2C3E50' }}>High Risk (&lt;75%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel - 20% */}
          <div className="col-span-3">
            {selectedArea ? (
              <div className="bg-white rounded p-6 sticky top-4" style={{ border: '1px solid #DDE2E7' }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#2C3E50' }}>{selectedArea.name}</h3>
                    <p className="text-sm" style={{ color: '#6B7C93' }}>{selectedArea.district} District</p>
                  </div>
                  <div
                    className="px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5"
                    style={{
                      backgroundColor: `${getMarkerColor(selectedArea.status)}15`,
                      color: getMarkerColor(selectedArea.status)
                    }}
                  >
                    {getStatusIcon(selectedArea.status)}
                    {selectedArea.status === 'compliant' ? 'Compliant' : 
                     selectedArea.status === 'moderate' ? 'Moderate' : 'High Risk'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm mb-2" style={{ color: '#6B7C93' }}>Compliance Rate</div>
                    <div className="flex items-end gap-2">
                      <div className="text-3xl font-bold" style={{ color: getMarkerColor(selectedArea.status) }}>
                        {selectedArea.complianceRate}%
                      </div>
                    </div>
                    <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${selectedArea.complianceRate}%`,
                          backgroundColor: getMarkerColor(selectedArea.status)
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                      <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Total Plots</div>
                      <div className="text-xl font-bold" style={{ color: '#2C3E50' }}>{selectedArea.totalPlots}</div>
                    </div>
                    <div className="p-3 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                      <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Occupied</div>
                      <div className="text-xl font-bold" style={{ color: '#2C3E50' }}>{selectedArea.occupied}</div>
                    </div>
                    <div className="p-3 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                      <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Vacant</div>
                      <div className="text-xl font-bold" style={{ color: '#2C3E50' }}>{selectedArea.vacant}</div>
                    </div>
                    <div className="p-3 rounded" style={{ backgroundColor: '#fee' }}>
                      <div className="text-xs mb-1" style={{ color: '#C62828' }}>Encroachments</div>
                      <div className="text-xl font-bold" style={{ color: '#C62828' }}>{selectedArea.encroachments}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded" style={{ backgroundColor: '#fff3e0', border: '1px solid #F9A825' }}>
                    <div className="text-xs mb-1" style={{ color: '#F57C00' }}>Unauthorized Construction</div>
                    <div className="text-2xl font-bold" style={{ color: '#F57C00' }}>{selectedArea.unauthorizedConstruction}</div>
                  </div>

                  <button 
                    className="w-full text-white py-2.5 rounded font-medium transition-colors"
                    style={{ backgroundColor: '#0F4C5C' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                  >
                    View Detailed Monitoring
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded p-6 text-center" style={{ border: '1px solid #DDE2E7', color: '#6B7C93' }}>
                Select an industrial area on the map to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}