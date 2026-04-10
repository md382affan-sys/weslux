'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ExportButton from '@/components/admin/ExportButton';
import { exportVolunteersToExcel } from '@/lib/exportToExcel';

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchVolunteers(token);
  }, [router]);

  const fetchVolunteers = async (token) => {
    try {
      const res = await fetch('/api/volunteer', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setVolunteers(data.volunteers);
      }
    } catch (err) {
      console.error('Failed to fetch volunteers');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!newStatus) return;
    
    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/volunteer/update-status/${selectedVolunteer._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus, statusNote })
      });
      
      const data = await res.json();
      if (data.success) {
        const updatedVolunteer = data.data;
        setVolunteers(volunteers.map(v => 
          v._id === updatedVolunteer._id ? updatedVolunteer : v
        ));
        setEditingStatus(false);
        setSelectedVolunteer(null);
        setNewStatus('');
        setStatusNote('');
      }
    } catch (err) {
      console.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleExport = () => {
    setExporting(true);
    try {
      exportVolunteersToExcel(volunteers);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Volunteer Applications</h3>
              <p className="text-sm text-gray-500 mt-1">Total: {volunteers.length} applications</p>
            </div>
            <ExportButton 
              onClick={handleExport}
              disabled={volunteers.length === 0}
              loading={exporting}
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading volunteers...</p>
          </div>
        ) : volunteers.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <p className="text-gray-600">No volunteer applications yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {volunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {volunteer.firstName} {volunteer.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{volunteer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{volunteer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {volunteer.volunteerRole}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVolunteer(volunteer);
                          setNewStatus(volunteer.status || 'pending');
                          setStatusNote(volunteer.statusNote || '');
                          setEditingStatus(true);
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-opacity ${
                          (!volunteer.status || volunteer.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
                          volunteer.status === 'replied' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {!volunteer.status || volunteer.status === 'pending' ? 'Pending' : 
                         volunteer.status === 'replied' ? 'Replied' : 
                         volunteer.statusNote || 'Other'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(volunteer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedVolunteer(volunteer);
                          setEditingStatus(false);
                        }}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm font-medium"
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
      </div>

      {/* Status Update Modal */}
      {editingStatus && selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => {
          setEditingStatus(false);
          setSelectedVolunteer(null);
          setNewStatus('');
          setStatusNote('');
        }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Update Status</h3>
              <button
                onClick={() => {
                  setEditingStatus(false);
                  setSelectedVolunteer(null);
                  setNewStatus('');
                  setStatusNote('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Volunteer:</strong> {selectedVolunteer.firstName} {selectedVolunteer.lastName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {selectedVolunteer.email}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="replied">Replied</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {newStatus === 'other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Status Note</label>
                  <input
                    type="text"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="Enter custom status..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleStatusUpdate}
                  disabled={updating || (newStatus === 'other' && !statusNote)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {updating ? 'Saving...' : 'Save Status'}
                </button>
                <button
                  onClick={() => {
                    setEditingStatus(false);
                    setSelectedVolunteer(null);
                    setNewStatus('');
                    setStatusNote('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedVolunteer && !editingStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVolunteer(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedVolunteer.firstName} {selectedVolunteer.lastName}</h2>
                  <p className="text-green-100 mt-1">{selectedVolunteer.email}</p>
                </div>
                <button
                  onClick={() => setSelectedVolunteer(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-600">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.firstName} {selectedVolunteer.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Volunteer Role</p>
                    <p className="font-medium text-gray-900 capitalize">{selectedVolunteer.volunteerRole}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      (selectedVolunteer.status || 'pending') === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      (selectedVolunteer.status || 'pending') === 'replied' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {(selectedVolunteer.status || 'pending') === 'pending' ? 'Pending' : 
                       (selectedVolunteer.status || 'pending') === 'replied' ? 'Replied' : 
                       selectedVolunteer.statusNote || 'Other'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-600">Professional Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Profession</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.profession}</p>
                  </div>
                  {selectedVolunteer.company && (
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium text-gray-900">{selectedVolunteer.company}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expertise</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.expertise}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.availability}</p>
                  </div>
                  {selectedVolunteer.linkedin && (
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      <a href={selectedVolunteer.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                        View Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-600">Professional Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Profession</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.profession}</p>
                  </div>
                  {selectedVolunteer.company && (
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium text-gray-900">{selectedVolunteer.company}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expertise</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.expertise}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-medium text-gray-900">{selectedVolunteer.availability}</p>
                  </div>
                  {selectedVolunteer.linkedin && (
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      <a href={selectedVolunteer.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                        View Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Motivation */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">Motivation</h3>
                <p className="font-medium text-gray-900">{selectedVolunteer.motivation}</p>
              </div>

              {/* Application Date */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Applied On</p>
                  <p className="font-medium text-gray-900">{new Date(selectedVolunteer.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
