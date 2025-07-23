import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { portfolioApi } from "../../utils/portfolioApi";

const Portfolio = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stats, setStats] = useState(null);

  // Filters and pagination
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    status: "all",
    featured: "",
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [pagination, setPagination] = useState(null);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "web-dev", name: "Web Development" },
    { id: "mobile", name: "Mobile Development" },
    { id: "ecommerce", name: "E-commerce" },
    { id: "saas", name: "SaaS" },
    { id: "healthcare", name: "Healthcare" },
    { id: "fintech", name: "Fintech" },
    { id: "education", name: "Education" },
    { id: "other", name: "Other" },
  ];

  const statusOptions = [
    { id: "all", name: "All Status" },
    { id: "completed", name: "Completed" },
    { id: "in-progress", name: "In Progress" },
    { id: "on-hold", name: "On Hold" },
  ];

  useEffect(() => {
    loadPortfolios();
    loadStats();
  }, [filters]);

  const loadPortfolios = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await portfolioApi.getAll(filters);
      setPortfolios(response.portfolios || []);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error loading portfolios:", error);
      setError("Failed to load portfolio projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await portfolioApi.getStats();
      setStats(response);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === portfolios.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(portfolios.map((p) => p._id));
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this portfolio project? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await portfolioApi.delete(id);
      await loadPortfolios();
      await loadStats();
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      setError("Failed to delete portfolio project. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;

    if (
      !confirm(
        `Are you sure you want to delete ${selectedItems.length} portfolio projects? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await portfolioApi.bulkDelete(selectedItems);
      setSelectedItems([]);
      await loadPortfolios();
      await loadStats();
    } catch (error) {
      console.error("Error bulk deleting portfolios:", error);
      setError("Failed to delete portfolio projects. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await portfolioApi.toggleFeatured(id);
      await loadPortfolios();
      await loadStats();
    } catch (error) {
      console.error("Error toggling featured status:", error);
      setError("Failed to update featured status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      "in-progress": {
        color: "bg-blue-100 text-blue-800",
        label: "In Progress",
      },
      "on-hold": { color: "bg-yellow-100 text-yellow-800", label: "On Hold" },
    };

    const config = statusConfig[status] || {
      color: "bg-gray-100 text-gray-800",
      label: status,
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin")}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-xl font-semibold text-slate-800">
                Project Management
              </h1>
            </div>
            <Button
              variant="default"
              className="cta-button text-white font-medium"
              onClick={() => navigate("/admin/portfolio/new")}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Create New Project
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon name="Briefcase" size={24} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.totalProjects}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Icon
                    name="CheckCircle"
                    size={24}
                    className="text-green-600"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.completedProjects}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Icon name="Clock" size={24} className="text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.inProgressProjects}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Icon name="Star" size={24} className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Featured</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.featuredProjects}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {statusOptions.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Featured
              </label>
              <select
                value={filters.featured}
                onChange={(e) => handleFilterChange("featured", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">All Projects</option>
                <option value="true">Featured Only</option>
                <option value="false">Non-Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <Icon
                name="AlertCircle"
                size={20}
                className="text-red-500 mr-3"
              />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Portfolio Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <Icon
                  name="Loader2"
                  size={20}
                  className="animate-spin text-primary"
                />
                <span className="text-slate-600">
                  Loading portfolio projects...
                </span>
              </div>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="text-center py-12">
              <Icon
                name="Briefcase"
                size={48}
                className="mx-auto text-slate-400 mb-4"
              />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No portfolio projects found
              </h3>
              <p className="text-slate-600 mb-4">
                Get started by creating your first portfolio project.
              </p>
              <Button
                variant="default"
                className="cta-button text-white font-medium"
                onClick={() => navigate("/admin/portfolio/new")}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Add New Project
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedItems.length === portfolios.length &&
                            portfolios.length > 0
                          }
                          onChange={handleSelectAll}
                          className="h-4 w-4 text-primary focus:ring-primary/20 border-slate-300 rounded"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {portfolios.map((portfolio) => (
                      <tr key={portfolio._id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(portfolio._id)}
                            onChange={() => handleSelectItem(portfolio._id)}
                            className="h-4 w-4 text-primary focus:ring-primary/20 border-slate-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={portfolio.mainImage}
                                alt={portfolio.title}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900">
                                {portfolio.title}
                              </div>
                              <div className="text-sm text-slate-500 line-clamp-1">
                                {portfolio.excerpt}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {portfolio.clientName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {getCategoryName(portfolio.category)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(portfolio.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleFeatured(portfolio._id)}
                            className={`p-1 rounded-full ${
                              portfolio.featured
                                ? "text-yellow-500 hover:text-yellow-600"
                                : "text-slate-300 hover:text-yellow-500"
                            }`}
                          >
                            <Icon
                              name="Star"
                              size={16}
                              fill={
                                portfolio.featured ? "currentColor" : "none"
                              }
                            />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                navigate(
                                  `/admin/portfolio/edit/${portfolio._id}`
                                )
                              }
                              iconName="Edit"
                              iconSize={14}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(portfolio._id)}
                              disabled={isDeleting}
                              iconName="Trash2"
                              iconSize={14}
                              className="text-red-600 hover:text-red-700"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="bg-white px-4 py-3 border-t border-slate-200 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <Button
                        variant="outline"
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                        disabled={!pagination.hasPrevPage}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                        disabled={!pagination.hasNextPage}
                      >
                        Next
                      </Button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-700">
                          Showing{" "}
                          <span className="font-medium">
                            {(pagination.currentPage - 1) *
                              pagination.itemsPerPage +
                              1}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium">
                            {Math.min(
                              pagination.currentPage * pagination.itemsPerPage,
                              pagination.totalItems
                            )}
                          </span>{" "}
                          of{" "}
                          <span className="font-medium">
                            {pagination.totalItems}
                          </span>{" "}
                          results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <Button
                            variant="outline"
                            onClick={() =>
                              handlePageChange(pagination.currentPage - 1)
                            }
                            disabled={!pagination.hasPrevPage}
                            className="rounded-r-none"
                          >
                            Previous
                          </Button>

                          {Array.from(
                            { length: Math.min(5, pagination.totalPages) },
                            (_, i) => {
                              const pageNum = i + 1;
                              return (
                                <Button
                                  key={pageNum}
                                  variant={
                                    pageNum === pagination.currentPage
                                      ? "default"
                                      : "outline"
                                  }
                                  onClick={() => handlePageChange(pageNum)}
                                  className="rounded-none"
                                >
                                  {pageNum}
                                </Button>
                              );
                            }
                          )}

                          <Button
                            variant="outline"
                            onClick={() =>
                              handlePageChange(pagination.currentPage + 1)
                            }
                            disabled={!pagination.hasNextPage}
                            className="rounded-l-none"
                          >
                            Next
                          </Button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
