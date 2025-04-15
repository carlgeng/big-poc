import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NeedsPage from './pages/NeedsPage';
import InnovationsPage from './pages/InnovationsPage';
import VotingPage from './pages/VotingPage';
import YearbookPage from './pages/YearbookPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NeedDetailPage from './pages/NeedDetailPage';
import CreateNeedPage from './pages/CreateNeedPage';
import EditNeedPage from './pages/EditNeedPage';
import InnovationDetailPage from './pages/InnovationDetailPage';
import CreateInnovationPage from './pages/CreateInnovationPage';
import ProfilePage from './pages/ProfilePage';
import BlockchainStatusPage from './pages/BlockchainStatusPage';
import AdminUsersPage from './pages/AdminUsersPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/needs" element={<NeedsPage />} />
      <Route path="/needs/:id" element={<NeedDetailPage />} />
      <Route
        path="/needs/create"
        element={
          <ProtectedRoute>
            <CreateNeedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/needs/edit/:id"
        element={
          <ProtectedRoute>
            <EditNeedPage />
          </ProtectedRoute>
        }
      />
      <Route path="/innovations" element={<InnovationsPage />} />
      <Route path="/innovations/:id" element={<InnovationDetailPage />} />
      <Route
        path="/innovations/create"
        element={
          <ProtectedRoute>
            <CreateInnovationPage />
          </ProtectedRoute>
        }
      />
      <Route path="/voting" element={<VotingPage />} />
      <Route path="/yearbook" element={<YearbookPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blockchain-status"
        element={
          <ProtectedRoute>
            <BlockchainStatusPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsersPage />
          </AdminRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;