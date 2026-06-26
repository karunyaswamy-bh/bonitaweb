import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Customer Layout & Pages
import CustomerNavbar from './components/Common/Navbar';
import CustomerFooter from './components/Common/Footer';
import FloatingWhatsApp from './components/Common/FloatingWhatsApp';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';

// Admin Layout & Pages
import AdminSidebar from './components/Admin/Sidebar';
import AdminNavbar from './components/Admin/Navbar';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';
import Inquiries from './pages/Admin/Inquiries';
import Collections from './pages/Admin/Collections';
import Settings from './pages/Admin/Settings';

function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-cream text-neutral-charcoal">
      <CustomerNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <CustomerFooter />
      <FloatingWhatsApp />
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="flex bg-[#FAFAFA] min-h-screen text-neutral-800">
      <AdminSidebar />
      <div className="flex-grow flex flex-col min-h-screen overflow-hidden">
        <AdminNavbar />
        <main className="flex-grow p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Customer Facing Routes */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Login (Isolated View) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Protected Workspace Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="collections" element={<Collections />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
