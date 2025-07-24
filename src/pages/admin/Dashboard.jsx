import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { logout, isAuthenticated } from "../../utils/auth";
import { toast } from "react-toastify";
import { blogApi } from "../../utils/blogApi";
import { careerApi } from "../../utils/careerApi";
import { portfolioApi } from "../../utils/portfolioApi";
import { clientApi } from "../../utils/clientApi";
import { contactApi } from "../../utils/contactApi";
import { teamApi } from "../../utils/teamApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [stats, setStats] = useState({
    blogs: {
      total: 0,
      published: 0,
      drafts: 0,
      featured: 0,
      totalViews: "0",
      totalLikes: "0",
      thisMonth: 0,
    },
    careers: {
      total: 0,
      active: 0,
      paused: 0,
      closed: 0,
      totalApplications: 0,
      totalViews: "0",
      thisMonth: 0,
    },
    portfolio: {
      total: 0,
      completed: 0,
      inProgress: 0,
      onHold: 0,
      featured: 0,
      totalViews: "0",
      thisMonth: 0,
    },
    clients: {
      total: 0,
      completed: 0,
      inProgress: 0,
      onHold: 0,
      totalViews: "0",
      thisMonth: 0,
    },
    contacts: {
      total: 0,
      new: 0,
      contacted: 0,
      inProgress: 0,
      closed: 0,
      thisMonth: 0,
    },
    team: {
      total: 0,
      active: 0,
      inactive: 0,
      thisMonth: 0,
    },
    overview: {
      totalViews: "0",
      totalUsers: "0",
      conversionRate: "0%",
      avgSessionTime: "0m 0s",
    },
  });

  useEffect(() => {
    const { user: authUser, isAuth } = isAuthenticated();
    // console.log("Dashboard auth check:", { authUser, isAuth });

    if (authUser) {
      setUser(authUser);
      setIsLoading(false);
      loadDashboardStats();

      // Set up auto-refresh every 5 minutes
      const refreshInterval = setInterval(() => {
        loadDashboardStats();
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearInterval(refreshInterval);
    } else {
      console.error("No authenticated user found in Dashboard");
      setIsLoading(false);
    }
  }, [navigate]);

  const loadDashboardStats = async () => {
    setIsLoadingStats(true);
    setError("");

    try {
      // Load stats from all APIs in parallel
      const [
        blogStats,
        careerStats,
        portfolioStats,
        clientStats,
        contactStats,
        teamStats,
      ] = await Promise.allSettled([
        blogApi
          .getStats()
          .catch(() => ({
            totalBlogs: 0,
            publishedBlogs: 0,
            draftBlogs: 0,
            featuredBlogs: 0,
          })),
        careerApi
          .getStats()
          .catch(() => ({
            totalCareers: 0,
            activeCareers: 0,
            pausedCareers: 0,
            closedCareers: 0,
          })),
        portfolioApi
          .getStats()
          .catch(() => ({
            totalProjects: 0,
            completedProjects: 0,
            inProgressProjects: 0,
            featuredProjects: 0,
          })),
        clientApi
          .getStats()
          .catch(() => ({ totalClients: 0, activeClients: 0 })),
        contactApi
          .getStats()
          .catch(() => ({
            overview: {
              total: 0,
              new: 0,
              contacted: 0,
              inProgress: 0,
              closed: 0,
            },
            thisMonth: 0,
          })),
        teamApi
          .getStats()
          .catch(() => ({
            overview: { total: 0, active: 0, inactive: 0 },
            thisMonthMembers: 0,
          })),
      ]);

      // Process blog stats
      const blogData = blogStats.status === "fulfilled" ? blogStats.value : {};
      const careerData =
        careerStats.status === "fulfilled" ? careerStats.value : {};
      const portfolioData =
        portfolioStats.status === "fulfilled" ? portfolioStats.value : {};
      const clientData =
        clientStats.status === "fulfilled" ? clientStats.value : {};
      const contactData =
        contactStats.status === "fulfilled" ? contactStats.value : {};
      const teamData = teamStats.status === "fulfilled" ? teamStats.value : {};

      setStats((prevStats) => ({
        ...prevStats,
        blogs: {
          total: blogData.totalBlogs || 0,
          published: blogData.publishedBlogs || 0,
          drafts: blogData.draftBlogs || 0,
          featured: blogData.featuredBlogs || 0,
          totalViews: formatNumber(blogData.totalViews || 0),
          totalLikes: formatNumber(blogData.totalLikes || 0),
          thisMonth: blogData.thisMonthBlogs || 0,
        },
        careers: {
          total: careerData.overview?.total || 0,
          active: careerData.overview?.active || 0,
          paused: careerData.overview?.paused || 0,
          closed: careerData.overview?.closed || 0,
          totalApplications: careerData.totalApplications || 0,
          totalViews: formatNumber(careerData.totalViews || 0),
          thisMonth: careerData.thisMonthCareers || 0,
        },
        portfolio: {
          total: portfolioData.totalProjects || 0,
          completed: portfolioData.completedProjects || 0,
          inProgress: portfolioData.inProgressProjects || 0,
          onHold: portfolioData.onHoldProjects || 0,
          featured: portfolioData.featuredProjects || 0,
          totalViews: formatNumber(portfolioData.totalViews || 0),
          thisMonth: portfolioData.thisMonthProjects || 0,
        },
        clients: {
          total: clientData.totalClients || 0,
          completed: clientData.activeClients || 0,
          inProgress: 0,
          onHold: 0,
          totalViews: formatNumber(clientData.totalViews || 0),
          thisMonth: clientData.thisMonthClients || 0,
        },
        contacts: {
          total: contactData.overview?.total || 0,
          new: contactData.overview?.new || 0,
          contacted: contactData.overview?.contacted || 0,
          inProgress: contactData.overview?.inProgress || 0,
          closed: contactData.overview?.closed || 0,
          thisMonth: contactData.thisMonth || 0,
        },
        team: {
          total: teamData.overview?.total || 0,
          active: teamData.overview?.active || 0,
          inactive: teamData.overview?.inactive || 0,
          thisMonth: teamData.thisMonthMembers || 0,
        },
        overview: {
          totalViews: formatNumber(
            (blogData.totalViews || 0) +
              (careerData.totalViews || 0) +
              (portfolioData.totalViews || 0) +
              (clientData.totalViews || 0)
          ),
          totalUsers: formatNumber(
            (blogData.totalUsers || 0) + (careerData.totalUsers || 0)
          ),
          conversionRate: calculateConversionRate(
            careerData.totalApplications || 0,
            careerData.totalViews || 0
          ),
          avgSessionTime: "4m 32s", // This would come from analytics
        },
      }));
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
      setError(
        "Failed to load dashboard statistics. Some data may be unavailable."
      );
    } finally {
      setIsLoadingStats(false);
      setLastUpdated(new Date());
    }
  };

  // Helper function to format numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Helper function to calculate conversion rate
  const calculateConversionRate = (applications, views) => {
    if (views === 0) return "0%";
    return ((applications / views) * 100).toFixed(1) + "%";
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleRefreshStats = () => {
    loadDashboardStats();
    toast.info("Dashboard statistics refreshed");
  };

  const dashboardCards = [
    {
      id: "blogs",
      title: "Blog Management",
      description: "Create, edit, and manage blog posts",
      icon: "FileText",
      color: "bg-blue-500",
      count: stats.blogs.total,
      route: "/admin/blogs",
    },
    {
      id: "careers",
      title: "Career Management",
      description: "Manage job openings and applications",
      icon: "Users",
      color: "bg-green-500",
      count: stats.careers.total,
      route: "/admin/careers",
    },
    {
      id: "portfolio",
      title: "Portfolio Management",
      description: "Showcase and manage project portfolio",
      icon: "Briefcase",
      color: "bg-purple-500",
      count: stats.portfolio.total,
      route: "/admin/portfolio",
    },
    {
      id: "clients",
      title: "Client Management",
      description: "Add and manage your clients and their logos",
      icon: "Building2",
      color: "bg-yellow-500",
      count: stats.clients.total,
      route: "/admin/clients",
    },
    {
      id: "contacts",
      title: "Contact Management",
      description: "Manage contact inquiries and project requests",
      icon: "Mail",
      color: "bg-indigo-500",
      count: stats.contacts.total,
      route: "/admin/contacts",
    },
    {
      id: "team",
      title: "Team Management",
      description: "Add and manage team members and their profiles",
      icon: "UserCheck",
      color: "bg-orange-500",
      count: stats.team.total,
      route: "/admin/team",
    },
  ];

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <img
                  src="/Kayease-logo.png"
                  alt="Kayease Logo"
                  className="h-8"
                />
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-xl font-semibold text-slate-800">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefreshStats}
                disabled={isLoadingStats}
                iconName={isLoadingStats ? "Loader2" : "RefreshCw"}
                iconPosition="left"
                iconSize={14}
                className={isLoadingStats && ""}
              >
                Refresh
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-slate-700 hover:text-primary transition-colors duration-300">
                  <Link to={"/"}>Home </Link>
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                iconName="LogOut"
                iconPosition="left"
                iconSize={14}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Welcome back, {user.name}!
              </h2>
              <p className="text-slate-600">
                Manage your content and monitor your website's performance from
                this dashboard.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {isLoadingStats && (
                <div className="flex items-center space-x-2 text-slate-600">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span className="text-sm">Loading statistics...</span>
                </div>
              )}
              {lastUpdated && !isLoadingStats && (
                <div className="text-sm text-slate-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <Icon
                  name="AlertTriangle"
                  size={20}
                  className="text-yellow-600 mr-3"
                />
                <p className="text-yellow-800">{error}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefreshStats}
                  className="ml-auto text-yellow-600 hover:text-yellow-700"
                  iconName="RefreshCw"
                  iconSize={14}
                >
                  Retry
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Content Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Blog Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
            {isLoadingStats && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                <Icon
                  name="Loader2"
                  size={20}
                  className="animate-spin text-primary"
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Blog Posts</h3>
                  <p className="text-2xl font-bold text-slate-800">
                    {stats.blogs.total}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin/blogs")}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Manage
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Published</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.blogs.published}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-600">Drafts</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.blogs.drafts}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600">Featured</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.blogs.featured}
                </span>
              </div>
            </div>
          </div>

          {/* Career Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
            {isLoadingStats && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                <Icon
                  name="Loader2"
                  size={20}
                  className="animate-spin text-primary"
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Job Openings</h3>
                  <p className="text-2xl font-bold text-slate-800">
                    {stats.careers.total}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin/careers")}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Manage
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Active</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.careers.active}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-600">Paused</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.careers.paused}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-slate-600">Closed</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.careers.closed}
                </span>
              </div>
            </div>
          </div>

          {/* Portfolio Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
            {isLoadingStats && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                <Icon
                  name="Loader2"
                  size={20}
                  className="animate-spin text-primary"
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon
                    name="Briefcase"
                    size={20}
                    className="text-purple-600"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Portfolio Projects
                  </h3>
                  <p className="text-2xl font-bold text-slate-800">
                    {stats.portfolio.total}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin/portfolio")}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Manage
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Completed</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.portfolio.completed}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600">In Progress</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.portfolio.inProgress}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-600">On Hold</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.portfolio.onHold}
                </span>
              </div>
            </div>
          </div>

          {/* Client Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
            {isLoadingStats && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                <Icon
                  name="Loader2"
                  size={20}
                  className="animate-spin text-primary"
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon
                    name="Building2"
                    size={20}
                    className="text-purple-600"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Clients</h3>
                  <p className="text-2xl font-bold text-slate-800">
                    {stats.clients.total}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin/clients")}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Manage
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Completed</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.clients.completed}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600">In Progress</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.clients.inProgress}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-600">On Hold</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.clients.onHold}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
            {isLoadingStats && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                <Icon
                  name="Loader2"
                  size={20}
                  className="animate-spin text-primary"
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Icon name="Mail" size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Contact Inquiries
                  </h3>
                  <p className="text-2xl font-bold text-slate-800">
                    {stats.contacts.total}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin/contacts")}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Manage
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600">New</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.contacts.new}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-600">Contacted</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.contacts.contacted}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600">In Progress</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.contacts.inProgress}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Closed</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.contacts.closed}
                </span>
              </div>
            </div>
          </div>

          {/* Team Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
            {isLoadingStats && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                <Icon
                  name="Loader2"
                  size={20}
                  className="animate-spin text-primary"
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Icon name="UserCheck" size={20} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Team Members</h3>
                  <p className="text-2xl font-bold text-slate-800">
                    {stats.team.total}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin/team")}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Manage
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Active</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.team.active}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-slate-600">Inactive</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.team.inactive}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600">Added This Month</span>
                </div>
                <span className="font-medium text-slate-800">
                  {stats.team.thisMonth}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Content Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Quick Actions
            </h3>
            <div className="space-y-4">
              <Button
                variant="default"
                className="cta-button text-white font-medium w-full"
                onClick={() => navigate("/admin/blogs/create")}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Create New Blog Post
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/careers/create")}
                  iconName="UserPlus"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full"
                >
                  Add Job Opening
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/portfolio/new")}
                  iconName="Briefcase"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full"
                >
                  Add Project
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-green-500 hover:text-white border border-green-500 shadow-none"
                  onClick={() => navigate("/admin/clients/new")}
                  iconName="UserPlus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Add Client
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-green-500 hover:text-white border border-green-500 shadow-none"
                  onClick={() => navigate("/admin/team/create")}
                  iconName="UserPlus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Add Member
                </Button>
              </div>
            </div>
          </div>

          {/* Content Management Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Content Management
            </h3>
            <div className="space-y-4">
              {dashboardCards.map((card) => (
                <div
                  key={card.id}
                  className="group flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-primary/30 hover:shadow-sm transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(card.route)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon name={card.icon} size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">
                        {card.title}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-slate-800">
                      {card.count}
                    </span>
                    <Icon
                      name="ArrowRight"
                      size={16}
                      className="text-slate-400 group-hover:text-primary transition-colors duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
