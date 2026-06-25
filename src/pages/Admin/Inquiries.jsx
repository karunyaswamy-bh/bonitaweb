import React, { useState } from 'react';
import useInquiries from '../../hooks/useInquiries';
import { exportInquiriesToCSV } from '../../utils/csvExport';
import { Download, Search, Trash2, Calendar } from 'lucide-react';

export default function Inquiries() {
  const { inquiries, loading, deleteInquiry } = useInquiries();
  const [searchTerm, setSearchTerm] = useState('');

  const handleExport = () => {
    if (!inquiries.length) return;
    exportInquiriesToCSV(inquiries);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this log entry?")) {
      try {
        await deleteInquiry(id);
      } catch (err) {
        console.error("Failed to delete inquiry log: ", err);
      }
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 border border-neutral-200 rounded shadow-premium">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-3 text-neutral-400" size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter logs by saree name..."
            className="w-full pl-9 pr-4 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>

        <button
          onClick={handleExport}
          disabled={!filteredInquiries.length}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-[#FAF6E6] px-5 py-2.5 rounded text-xs uppercase tracking-wider font-semibold shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} />
          Export to CSV
        </button>
      </div>

      <div className="bg-white border border-neutral-200 shadow-premium rounded overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="px-6 py-4">Inquiry ID</th>
                  <th className="px-6 py-4">Saree Product</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Browser UserAgent</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {filteredInquiries.map((inq) => {
                  const dateStr = inq.timestamp?.seconds 
                    ? new Date(inq.timestamp.seconds * 1000).toLocaleString('en-IN')
                    : 'N/A';

                  return (
                    <tr key={inq.id} className="hover:bg-neutral-50/40">
                      <td className="px-6 py-4 font-mono text-[10px] text-neutral-400 truncate max-w-[120px]">{inq.id}</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-neutral-900 block">{inq.productName}</span>
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">Product ID: {inq.productId}</span>
                      </td>
                      <td className="px-6 py-4 text-neutral-500 text-xs">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-neutral-400" />
                          {dateStr}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-500 text-xs truncate max-w-[200px]" title={inq.userAgent}>
                        {inq.userAgent}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Log"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-400">
            No inquiry logs found matching your query.
          </div>
        )}
      </div>
    </div>
  );
}
