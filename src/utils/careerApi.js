const API_BASE_URL= import.meta.env.VITE_BACKEND_URL;
// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const careerApi = {
  // Get all careers with optional filters
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const url = `${API_BASE_URL}/api/careers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  // Get career by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/careers/${id}`);
    return handleResponse(response);
  },

  // Get career by slug
  getBySlug: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/api/careers/slug/${slug}`);
    return handleResponse(response);
  },

  // Create new career
  create: async (careerData) => {
    const response = await fetch(`${API_BASE_URL}/api/careers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(careerData),
    });
    return handleResponse(response);
  },

  // Update career
  update: async (id, careerData) => {
    const response = await fetch(`${API_BASE_URL}/api/careers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(careerData),
    });
    return handleResponse(response);
  },

  // Delete career
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/careers/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Toggle active status
  toggleActive: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/careers/${id}/toggle-status`, {
      method: 'PATCH',
    });
    return handleResponse(response);
  },

  // Get career statistics
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/api/careers/stats/overview`);
    return handleResponse(response);
  },

  // Bulk delete careers
  bulkDelete: async (ids) => {
    const response = await fetch(`${API_BASE_URL}/api/careers/bulk/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    });
    return handleResponse(response);
  },

  // Get active careers
  getActive: async (limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/api/careers?status=active&limit=${limit}&sortBy=createdAt&sortOrder=desc`);
    return handleResponse(response);
  },

  // Get recent careers
  getRecent: async (limit = 5) => {
    const response = await fetch(`${API_BASE_URL}/api/careers?limit=${limit}&sortBy=createdAt&sortOrder=desc`);
    return handleResponse(response);
  },

  // Search careers
  search: async (query, filters = {}) => {
    const searchFilters = { ...filters, search: query };
    return this.getAll(searchFilters);
  },

  // Get applications for a career
  getApplications: async (careerId, filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const url = `${API_BASE_URL}/api/careers/${careerId}/applications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  // Submit application
  submitApplication: async (careerId, applicationData) => {
    const response = await fetch(`${API_BASE_URL}/api/careers/${careerId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    return handleResponse(response);
  }
};

export default careerApi;