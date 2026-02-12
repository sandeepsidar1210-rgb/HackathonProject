import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ViolationsPage from './components/ViolationsPage';
import PlotDetailPage from './components/PlotDetailPage';
import ReportsPage from './components/ReportsPage';
import IndustrialAreasPage from './components/IndustrialAreasPage';
import SettingsPage from './components/SettingsPage';
import LoginModal from './components/LoginModal';
import UserDashboard from './components/UserDashboard';
import UserMyPlots from './components/UserMyPlots';
import UserRaiseIssue from './components/UserRaiseIssue';
import UserComplaints from './components/UserComplaints';
import UserComplaintDetail from './components/UserComplaintDetail';
import UserNotices from './components/UserNotices';

type Page = 'landing' | 'dashboard' | 'violations' | 'plot-detail' | 'reports' | 'industrial-areas' | 'settings' |
            'user-dashboard' | 'user-plots' | 'user-raise-issue' | 'user-complaints' | 
            'user-complaint-detail' | 'user-notices';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'user'>('admin');
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>(null);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);

  const handleLogin = (credentials: { userId: string; password: string; role: string; userType: 'admin' | 'user' }) => {
    // Mock authentication logic
    if (credentials.userId && credentials.password) {
      setIsAuthenticated(true);
      setUserType(credentials.userType);
      setIsLoginModalOpen(false);
      
      // Navigate based on user type
      if (credentials.userType === 'admin') {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('user-dashboard');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('admin');
    setCurrentPage('landing');
  };

  const navigateToPage = (page: Page) => {
    if ((page === 'dashboard' || page === 'user-dashboard') && !isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      setCurrentPage(page);
    }
  };

  const navigateToPlotDetail = (plotId: string) => {
    setSelectedPlotId(plotId);
    setCurrentPage('plot-detail');
  };

  const navigateToComplaintDetail = (complaintId: string) => {
    setSelectedComplaintId(complaintId);
    setCurrentPage('user-complaint-detail');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F6F8' }}>
      {currentPage === 'landing' && (
        <LandingPage 
          onLoginClick={() => setIsLoginModalOpen(true)}
          onNavigate={navigateToPage}
        />
      )}
      
      {/* Admin Portal Pages */}
      {currentPage === 'dashboard' && isAuthenticated && userType === 'admin' && (
        <Dashboard 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'violations' && isAuthenticated && userType === 'admin' && (
        <ViolationsPage 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
          onViewPlot={navigateToPlotDetail}
        />
      )}
      
      {currentPage === 'plot-detail' && isAuthenticated && userType === 'admin' && selectedPlotId && (
        <PlotDetailPage 
          plotId={selectedPlotId}
          onNavigate={navigateToPage}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'reports' && isAuthenticated && userType === 'admin' && (
        <ReportsPage 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'industrial-areas' && isAuthenticated && userType === 'admin' && (
        <IndustrialAreasPage 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'settings' && isAuthenticated && userType === 'admin' && (
        <SettingsPage 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
        />
      )}

      {/* User Portal Pages */}
      {currentPage === 'user-dashboard' && isAuthenticated && userType === 'user' && (
        <UserDashboard 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'user-plots' && isAuthenticated && userType === 'user' && (
        <UserMyPlots 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
          onViewPlotDetail={navigateToPlotDetail}
        />
      )}

      {currentPage === 'user-raise-issue' && isAuthenticated && userType === 'user' && (
        <UserRaiseIssue 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'user-complaints' && isAuthenticated && userType === 'user' && (
        <UserComplaints 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
          onViewComplaint={navigateToComplaintDetail}
        />
      )}

      {currentPage === 'user-complaint-detail' && isAuthenticated && userType === 'user' && selectedComplaintId && (
        <UserComplaintDetail 
          complaintId={selectedComplaintId}
          onNavigate={navigateToPage}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'user-notices' && isAuthenticated && userType === 'user' && (
        <UserNotices 
          onNavigate={navigateToPage}
          onLogout={handleLogout}
        />
      )}

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}