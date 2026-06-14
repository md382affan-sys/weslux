'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function MentorTrainingPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchApplications(token);
  }, [router]);

  const fetchApplications = async (token) => {
    try {
      const res = await fetch('/api/mentor-training/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setApplications(data.mentorTrainings);
      }
    } catch (err) {
      console.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'verified': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleStatusUpdate = async () => {
    if (!newStatus) return;
    
    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/mentor-training/update-status/${selectedApp._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus, statusNote })
      });
      
      const data = await res.json();
      if (data.success) {
        setApplications(applications.map(a => 
          a._id === data.data._id ? data.data : a
        ));
        setEditingStatus(false);
        setSelectedApp(null);
        setNewStatus('');
        setStatusNote('');
      }
    } catch (err) {
      console.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusClick = (app) => {
    setSelectedApp(app);
    setNewStatus(app.status || 'pending');
    setStatusNote(app.statusNote || '');
    setEditingStatus(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mentor Training Enrollments</h1>
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg">
            Total: {applications.length}
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No applications yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                  <th className="px-6 py-4 text-left font-bold">Name</th>
                  <th className="px-6 py-4 text-left font-bold">Email</th>
                  <th className="px-6 py-4 text-left font-bold">Country</th>
                  <th className="px-6 py-4 text-left font-bold">Profession</th>
                  <th className="px-6 py-4 text-left font-bold">Email Verified</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                  <th className="px-6 py-4 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-amber-50 transition-colors border-b`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{app.fullName}</td>
                    <td className="px-6 py-4 text-gray-700">{app.email}</td>
                    <td className="px-6 py-4 text-gray-700">{app.country}</td>
                    <td className="px-6 py-4 text-gray-700">{app.profession}</td>
                    <td className="px-6 py-4">
                      {app.emailVerified ? (
                        <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                           Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusClick(app)}
                        className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all hover:shadow-md ${getStatusColor(
                          app.status || 'pending'
                        )}`}
                      >
                        {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'Pending'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-all"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Details Modal */}
        {selectedApp && !editingStatus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-6 sticky top-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{selectedApp.fullName}</h2>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-600">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedApp.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedApp.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Age</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedApp.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Country</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedApp.country}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-600">
                    Professional Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Profession</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedApp.profession}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Years of Experience</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedApp.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expertise</p>
                      <p className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedApp.expertise}</p>
                    </div>
                  </div>
                </div>

                {/* Mentorship Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-600">
                    Mentorship Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Why do you want to be a mentor?</p>
                      <p className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedApp.whyMentor}</p>
                    </div>
                  </div>
                </div>

                {/* LinkedIn and Status */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-600">
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedApp.linkedin && (
                      <div>
                        <p className="text-sm text-gray-600">LinkedIn Profile</p>
                        <a
                          href={selectedApp.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold break-all"
                        >
                          {selectedApp.linkedin}
                        </a>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600">Email Verified</p>
                      <p className="text-lg font-semibold">
                        {selectedApp.emailVerified ? (
                          <span className="text-green-600"> Yes</span>
                        ) : (
                          <span className="text-yellow-600"> No</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Status</p>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                          selectedApp.status || 'pending'
                        )}`}
                      >
                        {selectedApp.status ? selectedApp.status.charAt(0).toUpperCase() + selectedApp.status.slice(1) : 'Pending'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Submitted</p>
                      <p className="text-lg font-semibold">
                        {new Date(selectedApp.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Note */}
                {selectedApp.statusNote && (
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Status Note</p>
                    <p className="text-gray-900">{selectedApp.statusNote}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    onClick={() => handleStatusClick(selectedApp)}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition-all"
                  >
                    Update Status
                  </button>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Update Modal */}
        {editingStatus && selectedApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-bold">Update Status</h3>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="Add any notes about this decision..."
                    rows="4"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleStatusUpdate}
                    disabled={updating}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition-all"
                  >
                    {updating ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    onClick={() => setEditingStatus(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
