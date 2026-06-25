import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Sidebar from './components/Common/Sidebar';
import Navbar from './components/Common/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Inquiries from './pages/Inquiries';
import Collections from './pages/Collections';
import Settings from './pages/Settings';

function AdminLayout({ children }) {
  return (
    <div className="flex bg-[#FAFAFA] min-h-screen text-neutral-800">
      <Sidebar />
      <div className="flex-grow flex flex-col min-h-screen overflow-hidden">
        <Navbar />
        <main className="flex-grow p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/products" element={
            <ProtectedRoute>
              <AdminLayout>
                <Products />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/inquiries" element={
            <ProtectedRoute>
              <AdminLayout>
                <Inquiries />
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/collections" element={
            <ProtectedRoute>
              <AdminLayout>
                <Collections />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
