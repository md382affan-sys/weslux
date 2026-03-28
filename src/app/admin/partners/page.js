'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const res = await fetch('/api/partner', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setPartners(data.data);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPartners = filter === 'all' 
    ? partners 
    : partners.filter(p => p.partnerCategory === filter);

  const getCategoryBadge = (category) => {
    const badges = {
      companies: 'bg-green-100 text-green-800',
      schools: 'bg-blue-100 text-blue-800',
      government: 'bg-purple-100 text-purple-800',
      cso: 'bg-orange-100 text-orange-800'
    };
    return badges[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Applications</h1>
          <p className="text-gray-600">Manage partnership applications from organizations</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({partners.length})
          </button>
          <button
            onClick={() => setFilter('companies')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'companies'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Companies ({partners.filter(p => p.partnerCategory === 'companies').length})
          </button>
          <button
            onClick={() => setFilter('schools')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'schools'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Schools ({partners.filter(p => p.partnerCategory === 'schools').length})
          </button>
          <button
            onClick={() => setFilter('government')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'government'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Government ({partners.filter(p => p.partnerCategory === 'government').length})
          </button>
          <button
            onClick={() => setFilter('cso')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'cso'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            CSO ({partners.filter(p => p.partnerCategory === 'cso').length})
          </button>
        </div>

        {/* Partners Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : filteredPartners.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No partner applications found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Person
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPartners.map((partner) => (
                    <tr key={partner._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{partner.organization}</div>
                        <div className="text-sm text-gray-500">{partner.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{partner.fullName}</div>
                        <div className="text-sm text-gray-500">{partner.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadge(partner.partnerCategory)}`}>
                          {partner.partnerCategory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {partner.organizationType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(partner.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedPartner(partner)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
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
      </div>

      {/* Detail Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPartner(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className={`sticky top-0 text-white p-6 rounded-t-xl ${
              selectedPartner.partnerCategory === 'companies' ? 'bg-gradient-to-r from-green-600 to-emerald-600' :
              selectedPartner.partnerCategory === 'schools' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' :
              selectedPartner.partnerCategory === 'government' ? 'bg-gradient-to-r from-purple-600 to-violet-600' :
              'bg-gradient-to-r from-orange-600 to-amber-600'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedPartner.organization}</h2>
                  <p className="text-white/90 mt-1">{selectedPartner.email}</p>
                </div>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Organization Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">Organization Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Organization Name</p>
                    <p className="font-medium text-gray-900">{selectedPartner.organization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadge(selectedPartner.partnerCategory)}`}>
                      {selectedPartner.partnerCategory}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Organization Type</p>
                    <p className="font-medium text-gray-900">{selectedPartner.organizationType}</p>
                  </div>
                  {selectedPartner.website && (
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a href={selectedPartner.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                        {selectedPartner.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Person */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-600">Contact Person</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{selectedPartner.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedPartner.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedPartner.phone}</p>
                  </div>
                  {selectedPartner.position && (
                    <div>
                      <p className="text-sm text-gray-500">Position</p>
                      <p className="font-medium text-gray-900">{selectedPartner.position}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Partnership Details */}
              {selectedPartner.partnershipInterest && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-600">Partnership Details</h3>
                  <div>
                    <p className="text-sm text-gray-500">Partnership Interest</p>
                    <p className="font-medium text-gray-900">{selectedPartner.partnershipInterest}</p>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {selectedPartner.message && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-600">Additional Message</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedPartner.message}</p>
                  </div>
                </div>
              )}

              {/* Application Date */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Applied On</p>
                  <p className="font-medium text-gray-900">{new Date(selectedPartner.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
