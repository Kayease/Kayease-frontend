import React from "react";
import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import Blog from "pages/blog";
import BlogDetail from "pages/blog/BlogDetail";
import Contact from "pages/contact";
import Portfolio from "pages/portfolio";
import Services from "pages/services";
import About from "pages/about";
import Careers from "pages/careers";
import CareersFixed from "pages/careers/CareersFixed";
import Login from "pages/auth/Login";
import Dashboard from "pages/admin/Dashboard";
import BlogManagement from "pages/admin/BlogManagement";
import BlogForm from "pages/admin/BlogForm";
import CareerManagement from "pages/admin/CareerManagement";
import CareerForm from "pages/admin/CareerForm";
import PortfolioManagement from "pages/admin/Portfolio";
import PortfolioForm from "pages/admin/PortfolioForm";
import PortfolioDetail from "pages/PortfolioDetail";
import ClientForm from "pages/admin/ClientForm";
import ClientList from "pages/admin/ClientList";
import TestData from "pages/TestData";
import SimpleCareerTest from "pages/SimpleCareerTest";
import NotFound from "pages/NotFound";
import Header from "components/ui/Header";
import Footer from "components/ui/Footer";
import ProtectedRoute from "components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = ["/login"].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!isAuthPage && !isAdminPage && <Header />}
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<CareersFixed />} />
        <Route path="/careers-old" element={<Careers />} />
        <Route path="/test-data" element={<TestData />} />
        <Route path="/simple-career-test" element={<SimpleCareerTest />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <BlogManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs/create"
          element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs/edit/:id"
          element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/careers"
          element={
            <ProtectedRoute>
              <CareerManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/careers/create"
          element={
            <ProtectedRoute>
              <CareerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/careers/edit/:id"
          element={
            <ProtectedRoute>
              <CareerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/portfolio"
          element={
            <ProtectedRoute>
              <PortfolioManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/portfolio/new"
          element={
            <ProtectedRoute>
              <PortfolioForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/portfolio/edit/:id"
          element={
            <ProtectedRoute>
              <PortfolioForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clients"
          element={
            <ProtectedRoute>
              <ClientList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clients/new"
          element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clients/:id/edit"
          element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      {!isAuthPage && !isAdminPage && <Footer />}
    </ErrorBoundary>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default Routes;
