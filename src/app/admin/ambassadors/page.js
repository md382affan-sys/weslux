'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminAmbassadors() {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAmbassador, setSelectedAmbassador] = useState(null);
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

    fetchAmbassadors(token);
  }, [router]);

  const fetchAmbassadors = async (token) => {
    try {
      const res = await fetch('/api/ambassador', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAmbassadors(data.ambassadors);
      }
    } catch (err) {
      console.error('Failed to fetch ambassadors');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!newStatus) return;
    
    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/ambassador/update-status/${selectedAmbassador._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus, statusNote })
      });
      
      const data = await res.json();
      if (data.success) {
        const updatedAmbassador = data.data;
        setAmbassadors(ambassadors.map(a => 
          a._id === updatedAmbassador._id ? updatedAmbassador : a
        ));
        setEditingStatus(false);
        setSelectedAmbassador(null);
        setNewStatus('');
        setStatusNote('');
      }
    } catch (err) {
      console.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Ambassador Applications</h3>
          <p className="text-sm text-gray-500 mt-1">Total: {ambassadors.length} applications</p>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading ambassadors...</p>
          </div>
        ) : ambassadors.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
            <p className="text-gray-600">No ambassador applications yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role Interest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Background</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ambassadors.map((ambassador) => (
                  <tr key={ambassador._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{ambassador.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{ambassador.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                        {ambassador.roleInterest}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-gray-600">{ambassador.background}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAmbassador(ambassador);
                          setNewStatus(ambassador.status || 'pending');
                          setStatusNote(ambassador.statusNote || '');
                          setEditingStatus(true);
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-opacity ${
                          (!ambassador.status || ambassador.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
                          ambassador.status === 'replied' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {!ambassador.status || ambassador.status === 'pending' ? 'Pending' : 
                         ambassador.status === 'replied' ? 'Replied' : 
                         ambassador.statusNote || 'Other'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(ambassador.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedAmbassador(ambassador);
                          setEditingStatus(false);
                        }}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm font-medium"
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
      {editingStatus && selectedAmbassador && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => {
          setEditingStatus(false);
          setSelectedAmbassador(null);
          setNewStatus('');
          setStatusNote('');
        }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Update Status</h3>
              <button
                onClick={() => {
                  setEditingStatus(false);
                  setSelectedAmbassador(null);
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
                <strong>Ambassador:</strong> {selectedAmbassador.fullName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {selectedAmbassador.email}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleStatusUpdate}
                  disabled={updating || (newStatus === 'other' && !statusNote)}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {updating ? 'Saving...' : 'Save Status'}
                </button>
                <button
                  onClick={() => {
                    setEditingStatus(false);
                    setSelectedAmbassador(null);
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
      {selectedAmbassador && !editingStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedAmbassador(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedAmbassador.fullName}</h2>
                  <p className="text-purple-100 mt-1">{selectedAmbassador.email}</p>
                </div>
                <button
                  onClick={() => setSelectedAmbassador(null)}
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
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-600">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{selectedAmbassador.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedAmbassador.email}</p>
                  </div>
                  {selectedAmbassador.phone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{selectedAmbassador.phone}</p>
                    </div>
                  )}
                  {selectedAmbassador.country && (
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium text-gray-900">{selectedAmbassador.country}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      (!selectedAmbassador.status || selectedAmbassador.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
                      selectedAmbassador.status === 'replied' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {!selectedAmbassador.status || selectedAmbassador.status === 'pending' ? 'Pending' : 
                       selectedAmbassador.status === 'replied' ? 'Replied' : 
                       selectedAmbassador.statusNote || 'Other'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Role & Background */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-pink-600">Role & Background</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Role Interest</p>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                      {selectedAmbassador.roleInterest}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Background</p>
                    <p className="font-medium text-gray-900">{selectedAmbassador.background}</p>
                  </div>
                </div>
              </div>

              {/* Experience & Skills */}
              {selectedAmbassador.experience && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500">Experience & Skills</h3>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium text-gray-900">{selectedAmbassador.experience}</p>
                  </div>
                </div>
              )}

              {/* Motivation */}
              {selectedAmbassador.motivation && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-pink-500">Motivation</h3>
                  <div>
                    <p className="text-sm text-gray-500">Why do you want to be an ambassador?</p>
                    <p className="font-medium text-gray-900">{selectedAmbassador.motivation}</p>
                  </div>
                </div>
              )}

              {/* Social Media */}
              {(selectedAmbassador.linkedin || selectedAmbassador.instagram || selectedAmbassador.twitter) && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-400">Social Media</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedAmbassador.linkedin && (
                      <div>
                        <p className="text-sm text-gray-500">LinkedIn</p>
                        <a href={selectedAmbassador.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                          {selectedAmbassador.linkedin}
                        </a>
                      </div>
                    )}
                    {selectedAmbassador.instagram && (
                      <div>
                        <p className="text-sm text-gray-500">Instagram</p>
                        <a href={selectedAmbassador.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                          {selectedAmbassador.instagram}
                        </a>
                      </div>
                    )}
                    {selectedAmbassador.twitter && (
                      <div>
                        <p className="text-sm text-gray-500">Twitter</p>
                        <a href={selectedAmbassador.twitter} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                          {selectedAmbassador.twitter}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Application Date */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Applied On</p>
                  <p className="font-medium text-gray-900">{new Date(selectedAmbassador.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
