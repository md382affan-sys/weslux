'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [stats, setStats] = useState({ contacts: 0, volunteers: 0, ambassadors: 0, donations: 0 });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
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
      }
      fetchStats(token);
    } catch (err) {
      router.push('/admin/login');
    }
  }, [router]);

  const fetchStats = async (token) => {
    try {
      const [contacts, volunteers, ambassadors, donations] = await Promise.all([
        fetch('/api/contact', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/volunteer', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/ambassador', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/donation', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const [contactsData, volunteersData, ambassadorsData, donationsData] = await Promise.all([
        contacts.json(), volunteers.json(), ambassadors.json(), donations.json()
      ]);

      setStats({
        contacts: contactsData.contacts?.length || 0,
        volunteers: volunteersData.volunteers?.length || 0,
        ambassadors: ambassadorsData.ambassadors?.length || 0,
        donations: donationsData.donations?.length || 0
      });
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  const fetchAdmins = async (token) => {
    try {
      const res = await fetch('/api/admin/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(data.admins);
      }
    } catch (err) {
      console.error('Failed to fetch admins');
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

  return (
    <AdminLayout>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/admin/contacts">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contact Forms</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.contacts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/volunteers">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Volunteers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.volunteers}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/ambassadors">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ambassadors</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.ambassadors}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/donations">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Donations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.donations}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Super Admin Section */}
      {admin?.role === 'super_admin' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Manage Admins</h3>
                <p className="text-sm text-gray-500 mt-1">Create and manage admin accounts</p>
              </div>
              <button
                onClick={() => {
                  setShowCreateForm(!showCreateForm);
                  setEditingAdmin(null);
                  setFormData({ email: '', password: '', name: '' });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                {showCreateForm ? 'Cancel' : '+ Create Admin'}
              </button>
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
                {admins.map((adm) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
