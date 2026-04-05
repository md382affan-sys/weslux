'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);
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

    fetchDonations(token);
  }, [router]);

  const fetchDonations = async (token) => {
    try {
      const res = await fetch('/api/donation', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setDonations(data.donations);
      }
    } catch (err) {
      console.error('Failed to fetch donations');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!newStatus) return;
    
    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/donation/update-status/${selectedDonation._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus, statusNote })
      });
      
      const data = await res.json();
      if (data.success) {
        const updatedDonation = data.data;
        setDonations(donations.map(d => 
          d._id === updatedDonation._id ? updatedDonation : d
        ));
        setEditingStatus(false);
        setSelectedDonation(null);
        setNewStatus('');
        setStatusNote('');
      }
    } catch (err) {
      console.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-600">Total Donations</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{donations.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-600">Total Amount</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">€{totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-600">Monthly Donors</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {donations.filter(d => d.donationType === 'monthly').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Donation Records</h3>
          <p className="text-sm text-gray-500 mt-1">All donation submissions</p>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading donations...</p>
          </div>
        ) : donations.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-gray-600">No donations yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Anonymous</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {donation.anonymous ? 'Anonymous' : donation.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {donation.anonymous ? '***' : donation.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">
                      €{donation.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        donation.donationType === 'monthly' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {donation.donationType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {donation.anonymous ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDonation(donation);
                          setNewStatus(donation.status || 'pending');
                          setStatusNote(donation.statusNote || '');
                          setEditingStatus(true);
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-opacity ${
                          (!donation.status || donation.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
                          donation.status === 'replied' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {!donation.status || donation.status === 'pending' ? 'Pending' : 
                         donation.status === 'replied' ? 'Replied' : 
                         donation.statusNote || 'Other'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedDonation(donation);
                          setEditingStatus(false);
                        }}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 text-sm font-medium"
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
      {editingStatus && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => {
          setEditingStatus(false);
          setSelectedDonation(null);
          setNewStatus('');
          setStatusNote('');
        }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Update Status</h3>
              <button
                onClick={() => {
                  setEditingStatus(false);
                  setSelectedDonation(null);
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
                <strong>Donor:</strong> {selectedDonation.anonymous ? 'Anonymous' : selectedDonation.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Amount:</strong> €{selectedDonation.amount.toFixed(2)}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleStatusUpdate}
                  disabled={updating || (newStatus === 'other' && !statusNote)}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {updating ? 'Saving...' : 'Save Status'}
                </button>
                <button
                  onClick={() => {
                    setEditingStatus(false);
                    setSelectedDonation(null);
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
      {selectedDonation && !editingStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedDonation(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedDonation.anonymous ? 'Anonymous Donor' : selectedDonation.name}
                  </h2>
                  <p className="text-orange-100 mt-1">
                    {selectedDonation.anonymous ? 'Anonymous donation' : selectedDonation.email}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Donation Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-600">Donation Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-2xl font-bold text-green-600">€{selectedDonation.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Donation Type</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedDonation.donationType === 'monthly' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedDonation.donationType}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Anonymous</p>
                    <p className="font-medium text-gray-900">{selectedDonation.anonymous ? 'Yes' : 'No'}</p>
                  </div>
                  {selectedDonation.paymentMethod && (
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedDonation.paymentMethod}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      (!selectedDonation.status || selectedDonation.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
                      selectedDonation.status === 'replied' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {!selectedDonation.status || selectedDonation.status === 'pending' ? 'Pending' : 
                       selectedDonation.status === 'replied' ? 'Replied' : 
                       selectedDonation.statusNote || 'Other'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Donor Information */}
              {!selectedDonation.anonymous && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-600">Donor Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{selectedDonation.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{selectedDonation.email}</p>
                    </div>
                    {selectedDonation.phone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{selectedDonation.phone}</p>
                      </div>
                    )}
                    {selectedDonation.country && (
                      <div>
                        <p className="text-sm text-gray-500">Country</p>
                        <p className="font-medium text-gray-900">{selectedDonation.country}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Message */}
              {selectedDonation.message && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-500">Message</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedDonation.message}</p>
                  </div>
                </div>
              )}

              {/* Tax Receipt */}
              {selectedDonation.taxReceipt && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-500">Tax Receipt</h3>
                  <div>
                    <p className="text-sm text-gray-500">Tax Receipt Requested</p>
                    <p className="font-medium text-gray-900">{selectedDonation.taxReceipt ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              )}

              {/* Donation Date */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Donated On</p>
                  <p className="font-medium text-gray-900">{new Date(selectedDonation.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
