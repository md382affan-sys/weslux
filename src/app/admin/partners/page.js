'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
