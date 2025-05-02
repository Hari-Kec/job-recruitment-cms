import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ui/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Jobs from './pages/dashboard/Jobs';
import JobForm from './pages/dashboard/JobForm';
import Applications from './pages/dashboard/Applications';
import Companies from './pages/dashboard/Companies';
import CompanyForm from './pages/dashboard/CompanyForm';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Jobs />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="jobs/new" element={<JobForm />} />
              <Route path="jobs/:id/edit" element={<JobForm />} />
              <Route path="applications" element={<Applications />} />
              <Route path="companies" element={<Companies />} />
              <Route path="companies/new" element={<CompanyForm />} />
              <Route path="companies/:id/edit" element={<CompanyForm />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;