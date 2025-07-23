import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { contactApi } from '../../utils/contactApi';
import { toast } from 'react-toastify';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    projectType: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState({});
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadContacts();
    loadStats();
  }, [filters]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await contactApi.getAll(filters);
      setContacts(response.contacts);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error loading contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await contactApi.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      await contactApi.update(contactId, { status: newStatus });
      toast.success('Contact status updated successfully');
      loadContacts();
      loadStats();
    } catch (error) {
      console.error('Error updating contact status:', error);
      toast.error('Failed to update contact status');
    }
  };

  const handlePriorityUpdate = async (contactId, newPriority) => {
    try {
      await contactApi.update(contactId, { priority: newPriority });
      toast.success('Contact priority updated successfully');
      loadContacts();
    } catch (error) {
      console.error('Error updating contact priority:', error);
      toast.error('Failed to update contact priority');
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    if (selectedContacts.length === 0) {
      toast.warning('Please select contacts to update');
      return;
    }

    try {
      await contactApi.bulkUpdate(selectedContacts, { status });
      toast.success(`${selectedContacts.length} contacts updated successfully`);
      setSelectedContacts([]);
      loadContacts();
      loadStats();
    } catch (error) {
      console.error('Error bulk updating contacts:', error);
      toast.error('Failed to update contacts');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedContacts.length === 0) {
      toast.warning('Please select contacts to delete');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedContacts.length} contacts? This action cannot be undone.`)) {
      return;
    }

    try {
      await contactApi.bulkDelete(selectedContacts);
      toast.success(`${selectedContacts.length} contacts deleted successfully`);
      setSelectedContacts([]);
      loadContacts();
      loadStats();
    } catch (error) {
      console.error('Error bulk deleting contacts:', error);
      toast.error('Failed to delete contacts');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedContacts(contacts.map(contact => contact._id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleSelectContact = (contactId, checked) => {
    if (checked) {
      setSelectedContacts(prev => [...prev, contactId]);
    } else {
      setSelectedContacts(prev => prev.filter(id => id !== contactId));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      'quoted': 'bg-orange-100 text-orange-800',
      'closed': 'bg-green-100 text-green-800',
      'archived': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-slate-600 hover:text-primary">
                <Icon name="ArrowLeft" size={20} />
              </Link>
              <h1 className="text-xl font-semibold text-slate-800">Contact Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={loadContacts}
                disabled={loading}
                iconName={loading ? "Loader2" : "RefreshCw"}
                iconPosition="left"
                iconSize={14}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon name="Inbox" className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.overview?.total || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon name="Mail" className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">New</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.overview?.new || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon name="MessageSquare" className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Contacted</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.overview?.contacted || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon name="Clock" className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">In Progress</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.overview?.inProgress || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon name="Check" className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Closed</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.overview?.closed || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="text"
              placeholder="Search contacts..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              iconName="Search"
            />
            
            <Select
              placeholder="All Statuses"
              options={contactApi.getStatusOptions()}
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            
            <Select
              placeholder="All Priorities"
              options={contactApi.getPriorityOptions()}
              value={filters.priority}
              onChange={(value) => handleFilterChange('priority', value)}
            />
            
            <Select
              placeholder="All Project Types"
              options={contactApi.getProjectTypeOptions()}
              value={filters.projectType}
              onChange={(value) => handleFilterChange('projectType', value)}
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedContacts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkStatusUpdate('contacted')}
                  iconName="Mail"
                  iconSize={14}
                >
                  Mark Contacted
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkStatusUpdate('in-progress')}
                  iconName="Clock"
                  iconSize={14}
                >
                  Mark In Progress
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkStatusUpdate('closed')}
                  iconName="Check"
                  iconSize={14}
                >
                  Mark Closed
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                  iconName="Trash2"
                  iconSize={14}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <Icon name="Loader2" className="animate-spin h-8 w-8 mx-auto mb-4 text-primary" />
              <p className="text-slate-600">Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="Inbox" className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No contacts found</h3>
              <p className="text-slate-600">No contact inquiries match your current filters.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedContacts.length === contacts.length && contacts.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-slate-300 text-primary focus:ring-primary"
                        />
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Budget
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Read
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact._id)}
                            onChange={(e) => handleSelectContact(contact._id, e.target.checked)}
                            className="rounded border-slate-300 text-primary focus:ring-primary"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-slate-900">{contact.name}</div>
                            <div className="text-sm text-slate-500">{contact.email}</div>
                            <div className="text-sm text-slate-500">{contact.phone}</div>
                            {contact.company && (
                              <div className="text-sm text-slate-500">{contact.company}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {contactApi.formatContactData(contact).projectTypeLabel}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {contactApi.formatContactData(contact).budgetLabel}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={contact.status}
                            onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                            className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(contact.status)}`}
                          >
                            {contactApi.getStatusOptions().map(status => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={contact.priority}
                            onChange={(e) => handlePriorityUpdate(contact._id, e.target.value)}
                            className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getPriorityColor(contact.priority)}`}
                          >
                            {contactApi.getPriorityOptions().map(priority => (
                              <option key={priority.value} value={priority.value}>
                                {priority.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                            contact.isRead 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            <Icon name={contact.isRead ? "CheckCircle" : "Circle"} size={12} />
                            <span>{contact.isRead ? 'Read' : 'Unread'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {formatDate(contact.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedContact(contact);
                                setShowContactModal(true);
                              }}
                              iconName="Eye"
                              iconSize={14}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(`mailto:${contact.email}`)}
                              iconName="Mail"
                              iconSize={14}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(`tel:${contact.phone}`)}
                              iconName="Phone"
                              iconSize={14}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!pagination.hasPrevPage}
                      onClick={() => handleFilterChange('page', pagination.currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!pagination.hasNextPage}
                      onClick={() => handleFilterChange('page', pagination.currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-700">
                        Showing{' '}
                        <span className="font-medium">
                          {(pagination.currentPage - 1) * pagination.limit + 1}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
                          {Math.min(pagination.currentPage * pagination.limit, pagination.totalContacts)}
                        </span>{' '}
                        of{' '}
                        <span className="font-medium">{pagination.totalContacts}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handleFilterChange('page', page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              page === pagination.currentPage
                                ? 'z-10 bg-primary border-primary text-white'
                                : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Contact Detail Modal */}
      {showContactModal && selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => {
            setShowContactModal(false);
            setSelectedContact(null);
          }}
          onUpdate={loadContacts}
        />
      )}
    </div>
  );
};

// Enhanced Contact Detail Modal Component
const ContactDetailModal = ({ contact, onClose, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMarkAsRead = async () => {
    try {
      setIsUpdating(true);
      await contactApi.markAsRead(contact._id, !contact.isRead);
      toast.success(`Contact marked as ${contact.isRead ? 'unread' : 'read'}`);
      onUpdate();
    } catch (error) {
      console.error('Error updating contact read status:', error);
      toast.error('Failed to update contact status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReplyToClient = () => {
    const subject = `Re: ${contactApi.formatContactData(contact).projectTypeLabel} Project Inquiry`;
    const body = `Hi ${contact.name},\n\nThank you for your interest in our services.\n\nBest regards,\nKayease Team`;
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const handleCallClient = () => {
    window.open(`tel:${contact.phone}`);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      'new': 'bg-blue-50 text-blue-700 border-blue-200',
      'contacted': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'in-progress': 'bg-purple-50 text-purple-700 border-purple-200',
      'quoted': 'bg-orange-50 text-orange-700 border-orange-200',
      'closed': 'bg-green-50 text-green-700 border-green-200',
      'archived': 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getPriorityBadgeColor = (priority) => {
    const colors = {
      'low': 'bg-gray-50 text-gray-700 border-gray-200',
      'medium': 'bg-blue-50 text-blue-700 border-blue-200',
      'high': 'bg-orange-50 text-orange-700 border-orange-200',
      'urgent': 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[priority] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Contact Details</h2>
              <p className="text-primary-100 text-sm">
                Received {new Date(contact.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Read Status Indicator */}
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${
                contact.isRead 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}>
                <Icon name={contact.isRead ? "CheckCircle" : "Circle"} size={12} />
                <span>{contact.isRead ? 'Read' : 'Unread'}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
                iconName="X"
                iconSize={20}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          <div className="p-6 space-y-8">
            {/* Status and Priority Badges */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-3">
                <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadgeColor(contact.status)}`}>
                  <Icon name="Tag" size={14} className="inline mr-2" />
                  {contact.status.charAt(0).toUpperCase() + contact.status.slice(1).replace('-', ' ')}
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getPriorityBadgeColor(contact.priority)}`}>
                  <Icon name="Flag" size={14} className="inline mr-2" />
                  {contact.priority.charAt(0).toUpperCase() + contact.priority.slice(1)} Priority
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAsRead}
                  loading={isUpdating}
                  iconName={contact.isRead ? "Eye" : "EyeOff"}
                  iconSize={16}
                  className="text-slate-600 hover:text-primary border-slate-300"
                >
                  Mark as {contact.isRead ? 'Unread' : 'Read'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCallClient}
                  iconName="Phone"
                  iconSize={16}
                  className="text-green-600 hover:text-green-700 border-green-300 hover:bg-green-50"
                >
                  Call Client
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleReplyToClient}
                  iconName="Mail"
                  iconSize={16}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Reply to Client
                </Button>
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="User" size={16} className="text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">Full Name</p>
                      <p className="text-base text-slate-900 font-medium">{contact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Mail" size={16} className="text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">Email Address</p>
                      <p className="text-base text-slate-900 break-all">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Phone" size={16} className="text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">Phone Number</p>
                      <p className="text-base text-slate-900">{contact.phone}</p>
                    </div>
                  </div>
                  {contact.company && (
                    <div className="flex items-start space-x-3">
                      <Icon name="Building2" size={16} className="text-slate-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Company</p>
                        <p className="text-base text-slate-900">{contact.company}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Information */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Briefcase" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Project Details</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Code" size={16} className="text-primary/70 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">Project Type</p>
                      <p className="text-base text-slate-900 font-medium">
                        {contactApi.formatContactData(contact).projectTypeLabel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="DollarSign" size={16} className="text-primary/70 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">Budget Range</p>
                      <p className="text-base text-slate-900 font-medium">
                        {contactApi.formatContactData(contact).budgetLabel}
                      </p>
                    </div>
                  </div>
                  {contact.timeline && (
                    <div className="flex items-start space-x-3">
                      <Icon name="Calendar" size={16} className="text-primary/70 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Timeline</p>
                        <p className="text-base text-slate-900 font-medium">
                          {contactApi.formatContactData(contact).timelineLabel}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="MessageSquare" size={20} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Project Description</h3>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>

            {/* Technical Information */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon name="Info" size={20} className="text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Technical Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-slate-600 mb-1">Source</p>
                  <p className="text-slate-900">{contact.source || 'Website'}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-600 mb-1">IP Address</p>
                  <p className="text-slate-900 font-mono text-xs">{contact.ipAddress || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-600 mb-1">Submitted</p>
                  <p className="text-slate-900">{new Date(contact.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="text-sm text-slate-500">
              Contact ID: <span className="font-mono text-xs">{contact._id}</span>
            </div>
            <Button variant="outline" onClick={onClose} className="font-medium">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;