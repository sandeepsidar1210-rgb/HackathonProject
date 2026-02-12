import { useState } from 'react';
import { Satellite, Calendar, Layers, Download, RefreshCw, SlidersHorizontal, MapPin, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, TrendingDown, TrendingUp, Brain, Radio, Signal, Ruler, Building2, Bell } from 'lucide-react';

interface Plot {
  id: string;
  name: string;
  allottee: string;
  approvedArea: number;
  detectedArea: number;
  violationType: string;
  severity: 'high' | 'medium' | 'low' | 'none';
  coordinates: { x: number; y: number };
  ndviPrevious: number;
  ndviCurrent: number;
  ndbiPrevious: number;
  ndbiCurrent: number;
  approvedHeight: number;
  detectedHeight: number;
  zoningLimit: number;
  sensorId: string;
  lastSync: string;
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
    coordinates: { x: 35, y: 45 },
    ndviPrevious: 0.72,
    ndviCurrent: 0.18,
    ndbiPrevious: -0.20,
    ndbiCurrent: 0.45,
    approvedHeight: 12,
    detectedHeight: 18.4,
    zoningLimit: 15,
    sensorId: 'LDR-UR-204',
    lastSync: '12 Feb 2026 - 09:42 AM'
  },
  {
    id: 'CG-RAI-2024-0848',
    name: 'Plot 848',
    allottee: 'Modern Manufacturing Co.',
    approvedArea: 8000,
    detectedArea: 8050,
    violationType: 'Minor Deviation',
    severity: 'low',
    coordinates: { x: 45, y: 42 },
    ndviPrevious: 0.45,
    ndviCurrent: 0.42,
    ndbiPrevious: 0.10,
    ndbiCurrent: 0.12,
    approvedHeight: 15,
    detectedHeight: 14.8,
    zoningLimit: 18,
    sensorId: 'LDR-UR-205',
    lastSync: '12 Feb 2026 - 09:40 AM'
  },
  {
    id: 'CG-RAI-2024-0849',
    name: 'Plot 849',
    allottee: 'Steel Fabrication Works',
    approvedArea: 6500,
    detectedArea: 7800,
    violationType: 'Horizontal + Vertical Expansion',
    severity: 'high',
    coordinates: { x: 55, y: 48 },
    ndviPrevious: 0.68,
    ndviCurrent: 0.22,
    ndbiPrevious: -0.15,
    ndbiCurrent: 0.52,
    approvedHeight: 10,
    detectedHeight: 16.2,
    zoningLimit: 12,
    sensorId: 'LDR-UR-206',
    lastSync: '12 Feb 2026 - 09:38 AM'
  },
  {
    id: 'CG-RAI-2024-0850',
    name: 'Plot 850',
    allottee: 'Green Energy Systems',
    approvedArea: 7200,
    detectedArea: 7200,
    violationType: 'None',
    severity: 'none',
    coordinates: { x: 65, y: 35 },
    ndviPrevious: 0.50,
    ndviCurrent: 0.48,
    ndbiPrevious: 0.05,
    ndbiCurrent: 0.08,
    approvedHeight: 18,
    detectedHeight: 17.5,
    zoningLimit: 20,
    sensorId: 'LDR-UR-207',
    lastSync: '12 Feb 2026 - 09:45 AM'
  }
];

export default function Sentinel2MonitoringMap() {
  const [selectedBand, setSelectedBand] = useState<'truecolor' | 'ndvi' | 'ndbi' | 'ai' | 'lidar'>('truecolor');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(plots[0]);
  const [aiDetectionEnabled, setAiDetectionEnabled] = useState(true);

  const heightTrendData = [
    { date: 'Jan 2025', height: 12.0 },
    { date: 'Mar 2025', height: 12.1 },
    { date: 'Jun 2025', height: 14.2 },
    { date: 'Sep 2025', height: 16.8 },
    { date: 'Dec 2025', height: 17.9 },
    { date: 'Feb 2026', height: 18.4 }
  ];

  const maxHeight = Math.max(...heightTrendData.map(d => d.height));

  const getHeightViolationStatus = (plot: Plot) => {
    const deviation = plot.detectedHeight - plot.approvedHeight;
    const exceedsZoning = plot.detectedHeight > plot.zoningLimit;
    
    if (exceedsZoning) return 'critical';
    if (deviation > 2) return 'high';
    if (deviation > 0.5) return 'medium';
    return 'compliant';
  };

  const calculateRiskScore = (plot: Plot) => {
    const ndviChange = ((plot.ndviPrevious - plot.ndviCurrent) / plot.ndviPrevious) * 100;
    const ndbiChange = ((plot.ndbiCurrent - plot.ndbiPrevious) / Math.abs(plot.ndbiPrevious || 0.01)) * 100;
    const areaDeviation = ((plot.detectedArea - plot.approvedArea) / plot.approvedArea) * 100;
    const heightDeviation = ((plot.detectedHeight - plot.approvedHeight) / plot.approvedHeight) * 100;
    
    const riskScore = Math.min(100, Math.max(0, 
      (ndviChange * 0.2) + (ndbiChange * 0.2) + (areaDeviation * 0.3) + (heightDeviation * 0.3)
    ));
    
    return Math.round(riskScore);
  };

  const getComplianceStatus = (plot: Plot) => {
    const riskScore = calculateRiskScore(plot);
    const heightStatus = getHeightViolationStatus(plot);
    
    if (heightStatus === 'critical' || riskScore > 80) return 'Critical Violation';
    if (heightStatus === 'high' || riskScore > 60) return 'High Risk';
    if (heightStatus === 'medium' || riskScore > 40) return 'Moderate Risk';
    return 'Compliant';
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #DDE2E7' }}>
      {/* Header */}
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #DDE2E7', backgroundColor: '#0F4C5C' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#FFFFFF20' }}>
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Sentinel-2 Satellite Monitoring</h3>
              <p className="text-xs text-white opacity-75">Multi-Spectral Analysis with AI-Powered Change Detection</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
              style={{ backgroundColor: '#FFFFFF20', color: '#FFFFFF' }}
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6" style={{ backgroundColor: '#F4F6F8', borderBottom: '1px solid #DDE2E7' }}>
        <div className="grid grid-cols-2 gap-6">
          {/* Band Selection */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: '#2C3E50' }}>Satellite View Mode</label>
            <div className="flex gap-2">
              {[
                { id: 'truecolor', label: 'True Color', icon: Layers },
                { id: 'ndvi', label: 'NDVI', icon: TrendingDown },
                { id: 'ndbi', label: 'NDBI', icon: TrendingUp },
                { id: 'ai', label: 'AI Detection', icon: Brain },
                { id: 'lidar', label: '3D Height', icon: Ruler }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedBand(mode.id as any)}
                  className="flex-1 flex flex-col items-center gap-2 px-3 py-3 rounded text-xs font-medium transition-all"
                  style={{
                    backgroundColor: selectedBand === mode.id ? '#0F4C5C' : '#FFFFFF',
                    color: selectedBand === mode.id ? '#FFFFFF' : '#6B7C93',
                    border: `1px solid ${selectedBand === mode.id ? '#0F4C5C' : '#DDE2E7'}`
                  }}
                >
                  <mode.icon className="w-4 h-4" />
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Detection Toggle */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: '#2C3E50' }}>Advanced Features</label>
            <div className="flex gap-3">
              <button
                onClick={() => setAiDetectionEnabled(!aiDetectionEnabled)}
                className="flex items-center gap-3 px-4 py-3 rounded flex-1 transition-all"
                style={{
                  backgroundColor: aiDetectionEnabled ? '#0F4C5C' : '#FFFFFF',
                  color: aiDetectionEnabled ? '#FFFFFF' : '#6B7C93',
                  border: `1px solid ${aiDetectionEnabled ? '#0F4C5C' : '#DDE2E7'}`
                }}
              >
                <Brain className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-medium">AI Change Detection</div>
                  <div className="text-xs opacity-75">NDVI/NDBI Analysis</div>
                </div>
                <div className="ml-auto">
                  <div
                    className="w-10 h-5 rounded-full transition-colors relative"
                    style={{ backgroundColor: aiDetectionEnabled ? '#C6A75E' : '#DDE2E7' }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                      style={{ transform: aiDetectionEnabled ? 'translateX(22px)' : 'translateX(2px)' }}
                    />
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCompareMode(!compareMode)}
                className="flex items-center gap-3 px-4 py-3 rounded flex-1 transition-all"
                style={{
                  backgroundColor: compareMode ? '#0F4C5C' : '#FFFFFF',
                  color: compareMode ? '#FFFFFF' : '#6B7C93',
                  border: `1px solid ${compareMode ? '#0F4C5C' : '#DDE2E7'}`
                }}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-medium">Compare Mode</div>
                  <div className="text-xs opacity-75">Before/After</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-0" style={{ minHeight: '600px' }}>
        {/* Map View */}
        <div className="col-span-2 relative" style={{ backgroundColor: '#1a1a1a', borderRight: '1px solid #DDE2E7' }}>
          {/* Satellite Image */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: selectedBand === 'truecolor' 
                  ? 'linear-gradient(135deg, #2d5016 0%, #4a7c1f 25%, #8b7355 50%, #a89968 75%, #6b8e23 100%)'
                  : selectedBand === 'ndvi'
                  ? 'linear-gradient(135deg, #8b4513 0%, #cd853f 25%, #daa520 50%, #9acd32 75%, #228b22 100%)'
                  : selectedBand === 'ndbi'
                  ? 'linear-gradient(135deg, #006400 0%, #228b22 25%, #ffff00 50%, #ff8c00 75%, #ff0000 100%)'
                  : selectedBand === 'lidar'
                  ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 20%, #404040 40%, #5a5a5a 60%, #737373 80%, #8c8c8c 100%)'
                  : 'linear-gradient(135deg, #2d5016 0%, #8b4513 33%, #cd853f 66%, #228b22 100%)',
                opacity: selectedBand === 'ai' ? 0.7 : 1,
                position: 'relative'
              }}
            >
              {/* LiDAR Height Contours */}
              {selectedBand === 'lidar' && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${10 + i * 10}%`,
                        left: '10%',
                        right: '10%',
                        height: '1px',
                        backgroundColor: '#FFFFFF',
                        opacity: 0.15
                      }}
                    />
                  ))}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 rounded px-3 py-2 text-white text-xs">
                    <div className="font-medium mb-2">Elevation (meters)</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-3" style={{ backgroundColor: '#8c8c8c' }} />
                        <span>18-20m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-3" style={{ backgroundColor: '#5a5a5a' }} />
                        <span>12-18m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-3" style={{ backgroundColor: '#2d2d2d' }} />
                        <span>0-12m</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Plot Markers */}
              {plots.map((plot) => {
                const heightStatus = getHeightViolationStatus(plot);
                const showHeightViolation = selectedBand === 'lidar' && (heightStatus === 'critical' || heightStatus === 'high');
                
                return (
                  <div
                    key={plot.id}
                    onClick={() => setSelectedPlot(plot)}
                    className="absolute cursor-pointer transform transition-transform hover:scale-110"
                    style={{
                      left: `${plot.coordinates.x}%`,
                      top: `${plot.coordinates.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: showHeightViolation
                          ? '#C62828'
                          : selectedPlot?.id === plot.id
                          ? '#C6A75E'
                          : plot.severity === 'high'
                          ? '#C62828'
                          : plot.severity === 'medium'
                          ? '#F57C00'
                          : plot.severity === 'low'
                          ? '#F9A825'
                          : '#2E7D32',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    {selectedPlot?.id === plot.id && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black bg-opacity-80 text-white text-xs px-3 py-1 rounded">
                        {plot.id}
                      </div>
                    )}
                    {/* Height indicator for LiDAR view */}
                    {selectedBand === 'lidar' && showHeightViolation && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                        <div className="bg-red-600 text-white text-xs px-2 py-1 rounded font-medium whitespace-nowrap">
                          {plot.detectedHeight}m
                        </div>
                        <div
                          className="w-0.5 bg-red-600"
                          style={{ height: `${plot.detectedHeight * 2}px` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* AI Detection Overlay */}
            {aiDetectionEnabled && selectedBand === 'ai' && selectedPlot && (
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute rounded-lg"
                  style={{
                    left: `${selectedPlot.coordinates.x - 8}%`,
                    top: `${selectedPlot.coordinates.y - 8}%`,
                    width: '16%',
                    height: '16%',
                    border: '3px solid #C62828',
                    boxShadow: '0 0 20px rgba(198, 40, 40, 0.5)'
                  }}
                >
                  <div className="absolute -top-8 left-0 bg-red-600 text-white text-xs px-3 py-1 rounded font-medium">
                    AI: Vegetation → Built-up Detected
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 rounded px-4 py-3 text-white">
            <div className="text-xs font-medium mb-2">Status Legend</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C62828' }} />
                <span>High Violation</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F57C00' }} />
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F9A825' }} />
                <span>Low Risk</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2E7D32' }} />
                <span>Compliant</span>
              </div>
            </div>
          </div>

          {/* View Mode Indicator */}
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 rounded px-4 py-2 text-white">
            <div className="text-xs opacity-75">Current View</div>
            <div className="text-sm font-medium">
              {selectedBand === 'truecolor' && 'True Color (RGB)'}
              {selectedBand === 'ndvi' && 'NDVI - Vegetation Index'}
              {selectedBand === 'ndbi' && 'NDBI - Built-up Index'}
              {selectedBand === 'ai' && 'AI Change Detection'}
              {selectedBand === 'lidar' && '3D Height View (LiDAR)'}
            </div>
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="overflow-y-auto" style={{ maxHeight: '600px', backgroundColor: '#FFFFFF' }}>
          {selectedPlot ? (
            <div className="p-6">
              {/* Plot Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-lg" style={{ color: '#0F4C5C' }}>{selectedPlot.id}</h4>
                    <p className="text-sm" style={{ color: '#6B7C93' }}>{selectedPlot.allottee}</p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: selectedPlot.severity === 'high' || getHeightViolationStatus(selectedPlot) === 'critical' ? '#FEE' : 
                        selectedPlot.severity === 'medium' ? '#FFF3E0' : 
                        selectedPlot.severity === 'low' ? '#FFFDE7' : '#E8F5E9',
                      color: selectedPlot.severity === 'high' || getHeightViolationStatus(selectedPlot) === 'critical' ? '#C62828' : 
                        selectedPlot.severity === 'medium' ? '#F57C00' : 
                        selectedPlot.severity === 'low' ? '#F9A825' : '#2E7D32'
                    }}
                  >
                    {getComplianceStatus(selectedPlot)}
                  </span>
                </div>
              </div>

              {/* 3D Structural Compliance Section */}
              {selectedBand === 'lidar' && (
                <>
                  <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#0F4C5C', color: '#FFFFFF' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler className="w-5 h-5" />
                      <h5 className="font-semibold">3D Structural Compliance</h5>
                    </div>
                    <p className="text-xs opacity-90">Real-Time Height Verification Using IoT-Based LiDAR Sensors</p>
                  </div>

                  {/* Height Analysis */}
                  <div className="mb-6 p-4 rounded-lg" style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}>
                    <h5 className="font-semibold mb-4 text-sm" style={{ color: '#2C3E50' }}>Height Analysis</h5>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded bg-white" style={{ border: '1px solid #DDE2E7' }}>
                          <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Approved Height</div>
                          <div className="text-2xl font-bold" style={{ color: '#2E7D32' }}>{selectedPlot.approvedHeight}m</div>
                        </div>
                        <div className="p-3 rounded bg-white" style={{ border: '1px solid #DDE2E7' }}>
                          <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Detected Height (LiDAR)</div>
                          <div className="text-2xl font-bold" style={{ color: '#C62828' }}>{selectedPlot.detectedHeight}m</div>
                        </div>
                      </div>

                      <div className="p-3 rounded" style={{ backgroundColor: '#FFF3E0', border: '1px solid #F9A825' }}>
                        <div className="text-xs mb-1 font-medium" style={{ color: '#E65100' }}>Height Deviation</div>
                        <div className="text-2xl font-bold flex items-center gap-2" style={{ color: '#E65100' }}>
                          +{(selectedPlot.detectedHeight - selectedPlot.approvedHeight).toFixed(1)}m
                          <TrendingUp className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="p-3 rounded bg-white" style={{ border: '1px solid #DDE2E7' }}>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Zoning Limit</div>
                        <div className="text-xl font-bold" style={{ color: '#1F3A5F' }}>{selectedPlot.zoningLimit}m</div>
                      </div>
                    </div>
                  </div>

                  {/* 3D Building Preview */}
                  <div className="mb-6 p-4 rounded-lg" style={{ border: '1px solid #DDE2E7', backgroundColor: '#FFFFFF' }}>
                    <h5 className="font-semibold mb-4 text-sm" style={{ color: '#2C3E50' }}>3D Height Comparison</h5>
                    
                    <div className="relative h-48 flex items-end justify-center gap-8 px-4" style={{ backgroundColor: '#F4F6F8' }}>
                      {/* Approved Height */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-xs font-medium" style={{ color: '#2E7D32' }}>Approved</div>
                        <div
                          className="w-16 rounded-t-sm relative"
                          style={{
                            height: `${(selectedPlot.approvedHeight / maxHeight) * 140}px`,
                            backgroundColor: '#2E7D32',
                            border: '2px solid #1B5E20'
                          }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-green-700 px-2 py-1 rounded whitespace-nowrap">
                            {selectedPlot.approvedHeight}m
                          </div>
                        </div>
                      </div>

                      {/* Detected Height */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-xs font-medium" style={{ color: '#C62828' }}>Detected</div>
                        <div
                          className="w-16 rounded-t-sm relative"
                          style={{
                            height: `${(selectedPlot.detectedHeight / maxHeight) * 140}px`,
                            backgroundColor: '#C62828',
                            border: '2px solid #8B0000'
                          }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-red-700 px-2 py-1 rounded whitespace-nowrap">
                            {selectedPlot.detectedHeight}m
                          </div>
                          {/* Violation indicator */}
                          {selectedPlot.detectedHeight > selectedPlot.approvedHeight && (
                            <div
                              className="absolute left-0 right-0 bg-red-600 bg-opacity-50"
                              style={{
                                bottom: `${(selectedPlot.approvedHeight / selectedPlot.detectedHeight) * 100}%`,
                                top: 0,
                                border: '2px dashed #FFFFFF'
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Zoning Limit Line */}
                      <div
                        className="absolute left-0 right-0 border-t-2 border-dashed"
                        style={{
                          bottom: `${(selectedPlot.zoningLimit / maxHeight) * 140}px`,
                          borderColor: '#F9A825'
                        }}
                      >
                        <span className="absolute right-2 -top-3 text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: '#FFF3E0', color: '#F57C00' }}>
                          Zoning Limit: {selectedPlot.zoningLimit}m
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Compliance Result */}
                  <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FEE', border: '1px solid #C62828' }}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#C62828' }} />
                      <div>
                        <div className="font-semibold text-sm mb-1" style={{ color: '#C62828' }}>AI Compliance Result</div>
                        <div className="text-sm mb-2" style={{ color: '#C62828' }}>⚠ Height Limit Exceeded</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span style={{ color: '#6B7C93' }}>Risk Score: </span>
                            <span className="font-bold" style={{ color: '#C62828' }}>{calculateRiskScore(selectedPlot)} / 100</span>
                          </div>
                          <div>
                            <span style={{ color: '#6B7C93' }}>Confidence: </span>
                            <span className="font-bold" style={{ color: '#C62828' }}>High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Height Trend Graph */}
                  <div className="mb-6 p-4 rounded-lg" style={{ border: '1px solid #DDE2E7', backgroundColor: '#FFFFFF' }}>
                    <h5 className="font-semibold mb-4 text-sm" style={{ color: '#2C3E50' }}>Building Height Monitoring Over Time</h5>
                    
                    <div className="relative h-32">
                      {/* Graph */}
                      <svg className="w-full h-full">
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map((i) => (
                          <line
                            key={i}
                            x1="0"
                            y1={`${i * 25}%`}
                            x2="100%"
                            y2={`${i * 25}%`}
                            stroke="#DDE2E7"
                            strokeWidth="1"
                          />
                        ))}
                        
                        {/* Line chart */}
                        <polyline
                          points={heightTrendData.map((d, i) => 
                            `${(i / (heightTrendData.length - 1)) * 100}%,${100 - (d.height / 20) * 100}%`
                          ).join(' ')}
                          fill="none"
                          stroke="#C62828"
                          strokeWidth="2"
                        />
                        
                        {/* Data points */}
                        {heightTrendData.map((d, i) => (
                          <circle
                            key={i}
                            cx={`${(i / (heightTrendData.length - 1)) * 100}%`}
                            cy={`${100 - (d.height / 20) * 100}%`}
                            r="3"
                            fill="#C62828"
                          />
                        ))}
                      </svg>
                      
                      {/* X-axis labels */}
                      <div className="flex justify-between mt-2">
                        {heightTrendData.map((d, i) => (
                          <div key={i} className="text-xs" style={{ color: '#6B7C93' }}>{d.date}</div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 p-3 rounded flex items-center gap-2" style={{ backgroundColor: '#FFF3E0' }}>
                      <TrendingUp className="w-4 h-4" style={{ color: '#F57C00' }} />
                      <div className="text-xs" style={{ color: '#E65100' }}>
                        <span className="font-medium">Progressive Vertical Expansion Detected:</span> +6.4m in 13 months
                      </div>
                    </div>
                  </div>

                  {/* IoT Sensor Status */}
                  <div className="mb-6 p-4 rounded-lg" style={{ border: '1px solid #DDE2E7', backgroundColor: '#F4F6F8' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <Radio className="w-4 h-4" style={{ color: '#0F4C5C' }} />
                      <h5 className="font-semibold text-sm" style={{ color: '#2C3E50' }}>IoT Sensor Status</h5>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span style={{ color: '#6B7C93' }}>Sensor ID:</span>
                        <span className="font-medium" style={{ color: '#2C3E50' }}>{selectedPlot.sensorId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: '#6B7C93' }}>Last Sync:</span>
                        <span className="font-medium" style={{ color: '#2C3E50' }}>{selectedPlot.lastSync}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: '#6B7C93' }}>Signal Strength:</span>
                        <span className="font-medium flex items-center gap-1" style={{ color: '#2E7D32' }}>
                          <Signal className="w-4 h-4" />
                          Strong
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: '#6B7C93' }}>Calibration Status:</span>
                        <span className="font-medium flex items-center gap-1" style={{ color: '#2E7D32' }}>
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span style={{ color: '#6B7C93' }}>Status Indicator:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2E7D32' }} />
                          <span className="font-medium" style={{ color: '#2E7D32' }}>Active</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Automated Logic */}
                  <div className="mb-6 p-4 rounded-lg" style={{ border: '1px solid #DDE2E7', backgroundColor: '#FFFFFF' }}>
                    <h5 className="font-semibold mb-4 text-sm" style={{ color: '#2C3E50' }}>Automated Compliance Logic</h5>
                    
                    <div className="space-y-3 text-sm">
                      <div className="p-3 rounded" style={{ backgroundColor: '#FFF3E0' }}>
                        <div className="font-medium mb-1" style={{ color: '#E65100' }}>IF: Detected Height &gt; Approved Height</div>
                        <div style={{ color: '#6B7C93' }}>THEN: Flag as Vertical Expansion Violation</div>
                      </div>
                      
                      <div className="p-3 rounded" style={{ backgroundColor: '#FEE' }}>
                        <div className="font-medium mb-1" style={{ color: '#C62828' }}>IF: Detected Height &gt; Zoning Limit</div>
                        <div style={{ color: '#6B7C93' }}>THEN: Escalate to Legal Notice</div>
                      </div>
                    </div>
                  </div>

                  {/* Automated Alert Actions */}
                  <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#0F4C5C', color: '#FFFFFF' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Bell className="w-5 h-5" />
                      <h5 className="font-semibold text-sm">Automated Alert System</h5>
                    </div>
                    <div className="text-xs mb-4 opacity-90">Unauthorized Vertical Expansion Detected</div>
                    
                    <div className="space-y-2">
                      {[
                        { label: 'Generate Notice', icon: FileText },
                        { label: 'Schedule Physical Inspection', icon: Calendar },
                        { label: 'Notify Allottee', icon: Bell },
                        { label: 'Lock Further Construction Approval', icon: AlertTriangle }
                      ].map((action, idx) => (
                        <button
                          key={idx}
                          className="w-full flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium transition-colors text-left"
                          style={{ backgroundColor: '#FFFFFF20' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF30'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF20'}
                          onClick={() => alert(`Action: ${action.label}`)}
                        >
                          <action.icon className="w-4 h-4" />
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Combined Multi-Layer Analysis (Always Visible) */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#1F3A5F', color: '#FFFFFF' }}>
                <h5 className="font-semibold mb-4 text-sm flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Multi-Layer Compliance Analysis
                </h5>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Vegetation Change:</span>
                    <span className="font-medium flex items-center gap-1">
                      {Math.abs(selectedPlot.ndviCurrent - selectedPlot.ndviPrevious) > 0.3 ? (
                        <><AlertTriangle className="w-4 h-4" /> Detected</>
                      ) : (
                        <><CheckCircle className="w-4 h-4" /> Normal</>
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Built-up Expansion:</span>
                    <span className="font-medium flex items-center gap-1">
                      {Math.abs(selectedPlot.ndbiCurrent - selectedPlot.ndbiPrevious) > 0.3 ? (
                        <><AlertTriangle className="w-4 h-4" /> Detected</>
                      ) : (
                        <><CheckCircle className="w-4 h-4" /> Normal</>
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Height Violation:</span>
                    <span className="font-medium flex items-center gap-1">
                      {selectedPlot.detectedHeight > selectedPlot.approvedHeight ? (
                        <><AlertTriangle className="w-4 h-4" /> Detected</>
                      ) : (
                        <><CheckCircle className="w-4 h-4" /> Compliant</>
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4" style={{ borderTop: '1px solid #FFFFFF30' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs opacity-75">Overall Risk Score</span>
                    <span className="text-2xl font-bold" style={{ color: '#C6A75E' }}>
                      {calculateRiskScore(selectedPlot)} / 100
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-75">Compliance Status:</span>
                    <span className="font-semibold flex items-center gap-1">
                      {getComplianceStatus(selectedPlot) === 'Critical Violation' && '🚨 Critical Violation'}
                      {getComplianceStatus(selectedPlot) === 'High Risk' && '⚠️ High Risk'}
                      {getComplianceStatus(selectedPlot) === 'Moderate Risk' && '⚡ Moderate Risk'}
                      {getComplianceStatus(selectedPlot) === 'Compliant' && '✅ Compliant'}
                    </span>
                  </div>
                </div>
              </div>

              {/* NDVI/NDBI Details (shown when not in LiDAR mode) */}
              {selectedBand !== 'lidar' && (
                <div className="mt-6">
                  {/* NDVI Analysis */}
                  <div className="mb-4 p-4 rounded" style={{ border: '1px solid #DDE2E7' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium" style={{ color: '#2C3E50' }}>NDVI (Vegetation)</span>
                      <TrendingDown className="w-4 h-4" style={{ color: '#C62828' }} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Previous</div>
                        <div className="text-lg font-bold" style={{ color: '#2E7D32' }}>{selectedPlot.ndviPrevious.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Current</div>
                        <div className="text-lg font-bold" style={{ color: '#C62828' }}>{selectedPlot.ndviCurrent.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F4F6F8' }}>
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${Math.abs(selectedPlot.ndviCurrent - selectedPlot.ndviPrevious) * 100}%`,
                          backgroundColor: '#C62828'
                        }}
                      />
                    </div>
                    <div className="text-xs mt-2 flex items-center gap-1" style={{ color: '#C62828' }}>
                      <TrendingDown className="w-3 h-3" />
                      {(((selectedPlot.ndviPrevious - selectedPlot.ndviCurrent) / selectedPlot.ndviPrevious) * 100).toFixed(1)}% Vegetation Decline
                    </div>
                  </div>

                  {/* NDBI Analysis */}
                  <div className="p-4 rounded" style={{ border: '1px solid #DDE2E7' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium" style={{ color: '#2C3E50' }}>NDBI (Built-up)</span>
                      <TrendingUp className="w-4 h-4" style={{ color: '#F57C00' }} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Previous</div>
                        <div className="text-lg font-bold" style={{ color: '#6B7C93' }}>{selectedPlot.ndbiPrevious.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs mb-1" style={{ color: '#6B7C93' }}>Current</div>
                        <div className="text-lg font-bold" style={{ color: '#F57C00' }}>{selectedPlot.ndbiCurrent.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F4F6F8' }}>
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${Math.abs(selectedPlot.ndbiCurrent - selectedPlot.ndbiPrevious) * 100}%`,
                          backgroundColor: '#F57C00'
                        }}
                      />
                    </div>
                    <div className="text-xs mt-2 flex items-center gap-1" style={{ color: '#F57C00' }}>
                      <TrendingUp className="w-3 h-3" />
                      {selectedPlot.ndbiPrevious !== 0 
                        ? (((selectedPlot.ndbiCurrent - selectedPlot.ndbiPrevious) / Math.abs(selectedPlot.ndbiPrevious)) * 100).toFixed(1)
                        : ((selectedPlot.ndbiCurrent) * 100).toFixed(1)}% Built-up Increase
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center" style={{ color: '#6B7C93' }}>
              <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a plot on the map to view analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
