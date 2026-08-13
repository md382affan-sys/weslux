'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
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
    fetchInternships(token);
  }, [router]);

  const fetchInternships = async (token) => {
    try {
      const res = await fetch('/api/internship', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setInternships(data.internships);
      }
    } catch (err) {
      console.error('Failed to fetch internship applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!newStatus) return;
    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/internship/update-status/${selected._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus, statusNote })
      });
      const data = await res.json();
      if (data.success) {
        const updated = data.data;
        setInternships(internships.map(i => i._id === updated._id ? updated : i));
        setEditingStatus(false);
        setSelected(null);
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
          <h3 className="text-lg font-bold text-gray-900">Internship Applications</h3>
          <p className="text-sm text-gray-500 mt-1">Total: {internships.length} applications</p>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        ) : internships.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <p className="text-gray-600">No internship applications yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">University</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {internships.map((internship) => (
                  <tr key={internship._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{internship.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{internship.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{internship.university}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize text-gray-600">{internship.internshipType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(internship.documents || []).length > 0 ? (
                        <a
                          href={internship.documents[0].driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View ({internship.documents.length})
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(internship);
                          setNewStatus(internship.status || 'pending');
                          setStatusNote(internship.statusNote || '');
                          setEditingStatus(true);
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-opacity ${
                          (!internship.status || internship.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
                          internship.status === 'replied' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {!internship.status || internship.status === 'pending' ? 'Pending' :
                         internship.status === 'replied' ? 'Replied' :
                         internship.statusNote || 'Other'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(internship.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => { setSelected(internship); setEditingStatus(false); }}
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
      {editingStatus && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => { setEditingStatus(false); setSelected(null); }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Update Status</h3>
              <button onClick={() => { setEditingStatus(false); setSelected(null); }} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2"><strong>Applicant:</strong> {selected.fullName}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {selected.email}</p>
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
                <button onClick={() => { setEditingStatus(false); setSelected(null); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && !editingStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selected.fullName}</h2>
                  <p className="text-green-100 mt-1">{selected.email}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-600">Applicant Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{selected.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selected.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">University/College</p>
                    <p className="font-medium text-gray-900">{selected.university}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Major/Field of Study</p>
                    <p className="font-medium text-gray-900">{selected.major}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Internship Type</p>
                    <p className="font-medium text-gray-900 capitalize">{selected.internshipType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      (selected.status || 'pending') === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      (selected.status || 'pending') === 'replied' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {(selected.status || 'pending') === 'pending' ? 'Pending' :
                       (selected.status || 'pending') === 'replied' ? 'Replied' :
                       selected.statusNote || 'Other'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-600">Skills & Motivation</h3>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Skills & Qualifications</p>
                <p className="font-medium text-gray-900">{selected.skills}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Why interested</p>
                <p className="font-medium text-gray-900">{selected.motivation}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-500">Documents</h3>
                {(selected.documents || []).length > 0 ? (
                  <ul className="space-y-2">
                    {selected.documents.map((doc, idx) => (
                      <li key={idx}>
                        <a
                          href={doc.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {doc.fileName || 'Download document'}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No documents uploaded.</p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Applied On</p>
                <p className="font-medium text-gray-900">{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}