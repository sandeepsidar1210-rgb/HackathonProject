import { useState } from 'react';
import { Satellite, Map, Layers, ZoomIn, ZoomOut, Maximize2, X, MapPin, Calendar, FileText } from 'lucide-react';

interface Plot {
  id: string;
  name: string;
  allottee: string;
  approvedArea: number;
  detectedArea: number;
  violationType: string;
  severity: 'high' | 'medium' | 'low' | 'none';
  coordinates: { x: number; y: number };
}

const plots: Plot[] = [
  {
    id: 'CG-RAI-2024-0847',
    name: 'Plot 847',
    allottee: 'Sai Industries Pvt. Ltd.',
    approvedArea: 5000,
    detectedArea: 6200,
    violationType: 'Unauthorized Extension',
    severity: 'high',
    coordinates: { x: 35, y: 45 }
  },
  {
    id: 'CG-RAI-2024-0848',
    name: 'Plot 848',
    allottee: 'Modern Manufacturing Co.',
    approvedArea: 8000,
    detectedArea: 8050,
    violationType: 'Minor Deviation',
    severity: 'low',
    coordinates: { x: 45, y: 42 }
  },
  {
    id: 'CG-RAI-2024-0849',
    name: 'Plot 849',
    allottee: 'Tech Solutions Ltd.',
    approvedArea: 4500,
    detectedArea: 5800,
    violationType: 'Encroachment',
    severity: 'high',
    coordinates: { x: 52, y: 48 }
  },
  {
    id: 'CG-RAI-2024-0850',
    name: 'Plot 850',
    allottee: 'Green Energy Corp.',
    approvedArea: 6000,
    detectedArea: 6000,
    violationType: 'Compliant',
    severity: 'none',
    coordinates: { x: 38, y: 55 }
  },
  {
    id: 'CG-RAI-2024-0851',
    name: 'Plot 851',
    allottee: 'Industrial Goods Mfg.',
    approvedArea: 7200,
    detectedArea: 7650,
    violationType: 'Minor Deviation',
    severity: 'medium',
    coordinates: { x: 48, y: 52 }
  },
  {
    id: 'CG-RAI-2024-0852',
    name: 'Plot 852',
    allottee: 'Chemical Processing Ltd.',
    approvedArea: 5500,
    detectedArea: 5500,
    violationType: 'Compliant',
    severity: 'none',
    coordinates: { x: 42, y: 38 }
  }
];

export default function MonitoringMap() {
  const [viewMode, setViewMode] = useState<'satellite' | 'boundary' | 'heatmap'>('satellite');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#C62828';
      case 'medium': return '#F9A825';
      case 'low': return '#3498DB';
      case 'none': return '#2E7D32';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="bg-white rounded overflow-hidden" style={{ border: '1px solid #DDE2E7' }}>
      {/* Top Controls Bar */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7' }}>
        <div>
          <h3 className="font-semibold mb-1" style={{ color: '#2C3E50' }}>GIS Monitoring View</h3>
          <p className="text-sm" style={{ color: '#6B7C93' }}>Raipur Industrial Area - Live Satellite Analysis</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('satellite')}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium text-sm transition-all ${
              viewMode === 'satellite' ? 'text-white' : ''
            }`}
            style={viewMode === 'satellite' ? 
              { backgroundColor: '#0F4C5C', color: '#FFFFFF' } : 
              { backgroundColor: '#F4F6F8', color: '#6B7C93' }
            }
          >
            <Satellite className="w-4 h-4" />
            Satellite
          </button>
          <button
            onClick={() => setViewMode('boundary')}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium text-sm transition-all ${
              viewMode === 'boundary' ? 'text-white' : ''
            }`}
            style={viewMode === 'boundary' ? 
              { backgroundColor: '#0F4C5C', color: '#FFFFFF' } : 
              { backgroundColor: '#F4F6F8', color: '#6B7C93' }
            }
          >
            <Map className="w-4 h-4" />
            Boundary
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium text-sm transition-all ${
              viewMode === 'heatmap' ? 'text-white' : ''
            }`}
            style={viewMode === 'heatmap' ? 
              { backgroundColor: '#0F4C5C', color: '#FFFFFF' } : 
              { backgroundColor: '#F4F6F8', color: '#6B7C93' }
            }
          >
            <Layers className="w-4 h-4" />
            Heatmap
          </button>
        </div>

        {/* Map Controls */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-50 transition-colors" style={{ border: '1px solid #DDE2E7' }}>
            <ZoomIn className="w-4 h-4" style={{ color: '#6B7C93' }} />
          </button>
          <button className="p-2 rounded hover:bg-gray-50 transition-colors" style={{ border: '1px solid #DDE2E7' }}>
            <ZoomOut className="w-4 h-4" style={{ color: '#6B7C93' }} />
          </button>
          <button className="p-2 rounded hover:bg-gray-50 transition-colors" style={{ border: '1px solid #DDE2E7' }}>
            <Maximize2 className="w-4 h-4" style={{ color: '#6B7C93' }} />
          </button>
        </div>
      </div>

      {/* Large Map Area - 70-80% Screen Height */}
      <div className="relative" style={{ height: '600px' }}>
        {/* Map Canvas */}
        <div className="w-full h-full" style={{ backgroundColor: '#E8F1F5' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Grid Background */}
            {viewMode === 'boundary' && (
              <>
                {[...Array(20)].map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1="0"
                    y1={i * 5}
                    x2="100"
                    y2={i * 5}
                    stroke="#0F4C5C"
                    strokeWidth="0.1"
                    opacity="0.3"
                  />
                ))}
                {[...Array(20)].map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={i * 5}
                    y1="0"
                    x2={i * 5}
                    y2="100"
                    stroke="#0F4C5C"
                    strokeWidth="0.1"
                    opacity="0.3"
                  />
                ))}
              </>
            )}

            {/* Satellite Imagery Simulation */}
            {viewMode === 'satellite' && (
              <>
                <rect width="100" height="100" fill="url(#satellitePattern)" />
                <defs>
                  <pattern id="satellitePattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <rect width="10" height="10" fill="#B8C5D0" />
                    <rect x="0" y="0" width="5" height="5" fill="#A8B5C0" opacity="0.3" />
                    <rect x="5" y="5" width="5" height="5" fill="#A8B5C0" opacity="0.3" />
                  </pattern>
                </defs>
              </>
            )}

            {/* Heatmap Mode */}
            {viewMode === 'heatmap' && (
              <>
                {plots.map((plot, i) => (
                  <circle
                    key={`heat-${i}`}
                    cx={plot.coordinates.x}
                    cy={plot.coordinates.y}
                    r="8"
                    fill={getSeverityColor(plot.severity)}
                    opacity="0.2"
                  />
                ))}
              </>
            )}

            {/* Plot Markers */}
            {plots.map((plot, index) => (
              <g
                key={plot.id}
                onClick={() => setSelectedPlot(plot)}
                style={{ cursor: 'pointer' }}
              >
                {/* Plot Boundary */}
                <rect
                  x={plot.coordinates.x - 3}
                  y={plot.coordinates.y - 3}
                  width="6"
                  height="6"
                  fill={selectedPlot?.id === plot.id ? getSeverityColor(plot.severity) : 'transparent'}
                  stroke={getSeverityColor(plot.severity)}
                  strokeWidth="0.3"
                  opacity={selectedPlot?.id === plot.id ? 0.3 : 0.8}
                />
                
                {/* Plot Marker */}
                <circle
                  cx={plot.coordinates.x}
                  cy={plot.coordinates.y}
                  r="1"
                  fill={getSeverityColor(plot.severity)}
                />
                
                {/* Pulse Effect for Selected Plot */}
                {selectedPlot?.id === plot.id && (
                  <circle
                    cx={plot.coordinates.x}
                    cy={plot.coordinates.y}
                    r="2"
                    fill="none"
                    stroke={getSeverityColor(plot.severity)}
                    strokeWidth="0.2"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      from="2"
                      to="5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            ))}

            {/* Reference Points */}
            <text x="5" y="8" fontSize="3" fill="#2C3E50" opacity="0.7">N ↑</text>
            <text x="85" y="95" fontSize="2.5" fill="#6B7C93">Scale: 1:5000</text>
          </svg>
        </div>

        {/* Legend - Bottom Left */}
        <div className="absolute bottom-6 left-6 bg-white rounded-lg p-4 shadow-lg" style={{ border: '1px solid #DDE2E7' }}>
          <div className="text-xs font-semibold mb-3" style={{ color: '#2C3E50' }}>Violation Severity</div>
          <div className="space-y-2">
            {[
              { label: 'Compliant', color: '#2E7D32' },
              { label: 'Low Risk', color: '#3498DB' },
              { label: 'Medium Risk', color: '#F9A825' },
              { label: 'High Risk', color: '#C62828' }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                <span style={{ color: '#2C3E50' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Details Panel - Slides in from Right */}
        {selectedPlot && (
          <div
            className="absolute top-0 right-0 h-full bg-white shadow-2xl"
            style={{ width: '400px', borderLeft: '1px solid #DDE2E7' }}
          >
            <div className="h-full flex flex-col">
              {/* Panel Header */}
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #DDE2E7' }}>
                <h4 className="font-semibold" style={{ color: '#2C3E50' }}>Plot Details</h4>
                <button
                  onClick={() => setSelectedPlot(null)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" style={{ color: '#6B7C93' }} />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Plot ID Badge */}
                <div className="inline-block px-3 py-1 rounded-full mb-4" style={{ backgroundColor: '#0F4C5C15' }}>
                  <span className="text-sm font-medium" style={{ color: '#0F4C5C' }}>{selectedPlot.id}</span>
                </div>

                {/* Severity Badge */}
                <div className="mb-6">
                  <span
                    className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: selectedPlot.severity === 'high' ? '#FEE' : 
                        selectedPlot.severity === 'medium' ? '#FFF3E0' : 
                        selectedPlot.severity === 'low' ? '#E3F2FD' : '#E8F5E9',
                      color: getSeverityColor(selectedPlot.severity)
                    }}
                  >
                    {selectedPlot.severity === 'none' ? 'Compliant' : `${selectedPlot.severity.toUpperCase()} RISK`}
                  </span>
                </div>

                {/* Plot Information */}
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Allottee</div>
                    <div className="font-medium" style={{ color: '#2C3E50' }}>{selectedPlot.allottee}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Violation Type</div>
                    <div className="font-medium" style={{ color: '#2C3E50' }}>{selectedPlot.violationType}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                      <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Approved Area</div>
                      <div className="text-lg font-bold" style={{ color: '#2C3E50' }}>{selectedPlot.approvedArea} m²</div>
                    </div>
                    <div className="p-3 rounded" style={{ backgroundColor: '#F4F6F8' }}>
                      <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Detected Area</div>
                      <div className="text-lg font-bold" style={{ color: selectedPlot.detectedArea > selectedPlot.approvedArea ? '#C62828' : '#2E7D32' }}>
                        {selectedPlot.detectedArea} m²
                      </div>
                    </div>
                  </div>

                  {selectedPlot.detectedArea !== selectedPlot.approvedArea && (
                    <div className="p-3 rounded" style={{ backgroundColor: '#FFF3E0', border: '1px solid #F9A825' }}>
                      <div className="text-xs mb-1" style={{ color: '#F57C00' }}>Area Deviation</div>
                      <div className="text-xl font-bold" style={{ color: '#F57C00' }}>
                        +{selectedPlot.detectedArea - selectedPlot.approvedArea} m²
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded font-medium text-white transition-colors"
                    style={{ backgroundColor: '#0F4C5C' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3f4a'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C5C'}
                  >
                    <FileText className="w-4 h-4" />
                    Generate Notice
                  </button>
                  
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded font-medium transition-colors"
                    style={{ border: '1px solid #0F4C5C', color: '#0F4C5C', backgroundColor: 'white' }}
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Inspection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
