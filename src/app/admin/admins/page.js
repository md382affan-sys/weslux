'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminsPage() {
  const [admin, setAdmin] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setAdmin(payload);
      
      if (payload.role === 'super_admin') {
        fetchAdmins(token);
      } else {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    // Filter admins based on search query
    if (searchQuery.trim() === '') {
      setFilteredAdmins(admins);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = admins.filter(adm => 
        adm.name.toLowerCase().includes(query) ||
        adm.email.toLowerCase().includes(query) ||
        adm.role.toLowerCase().includes(query)
      );
      setFilteredAdmins(filtered);
    }
  }, [searchQuery, admins]);

  const fetchAdmins = async (token) => {
    try {
      const res = await fetch('/api/admin/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(data.admins);
        setFilteredAdmins(data.admins);
      }
    } catch (err) {
      console.error('Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      const res = await fetch('/api/admin/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        alert('Admin created successfully!');
        setFormData({ email: '', password: '', name: '' });
        setShowCreateForm(false);
        fetchAdmins(token);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to create admin');
    }
  };

  const handleEditAdmin = (adm) => {
    setEditingAdmin(adm);
    setFormData({ name: adm.name, email: adm.email, password: '' });
    setShowCreateForm(false);
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      const res = await fetch(`/api/admin/update/${editingAdmin._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        alert('Admin updated successfully!');
        setFormData({ email: '', password: '', name: '' });
        setEditingAdmin(null);
        fetchAdmins(token);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to update admin');
    }
  };

  const handleDeleteAdmin = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    
    try {
      const res = await fetch(`/api/admin/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await res.json();
      if (data.success) {
        alert('Admin deleted successfully!');
        fetchAdmins(token);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to delete admin');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Manage Admins</h3>
              <p className="text-sm text-gray-500 mt-1">Create and manage admin accounts</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search admins..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
              <button
                onClick={() => {
                  setShowCreateForm(!showCreateForm);
                  setEditingAdmin(null);
                  setFormData({ email: '', password: '', name: '' });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap"
              >
                {showCreateForm ? 'Cancel' : '+ Create Admin'}
              </button>
            </div>
          </div>
        </div>

        {showCreateForm && (
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <form onSubmit={handleCreateAdmin} className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="md:col-span-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Create Admin
              </button>
            </form>
          </div>
        )}

        {editingAdmin && (
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4">Edit Admin: {editingAdmin.name}</h4>
            <form onSubmit={handleUpdateAdmin} className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New Password (optional)"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingAdmin(null);
                  setFormData({ email: '', password: '', name: '' });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    {searchQuery ? 'No admins found matching your search.' : 'No admins found.'}
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((adm) => (
                  <tr key={adm._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{adm.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{adm.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        adm.role === 'super_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {adm.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(adm.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {adm.role !== 'super_admin' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditAdmin(adm)}
                            className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAdmin(adm._id, adm.name)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
