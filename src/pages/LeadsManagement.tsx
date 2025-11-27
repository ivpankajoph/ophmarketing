import { useState, useEffect } from 'react';
import { Search, Send, CheckSquare, Square, RefreshCw, Filter, Download } from 'lucide-react';

const API_CONFIG = {
  leadgen: {
    baseUrl: 'https://graph.facebook.com/v18.0',
    pageId: '118584934681142',
    accessToken: 'EAAO1YPeIbdABQFvvsvpLjZCzC9ODpZBRMIZC3IXHyZClDi3j6zn5QmeBfdftYA0ZCtbPKestApmDbMZBIgqy13XdWHNOBjIOZCvw1GDGfc0tdhXJvnWpAZCuZCdEbapXkxeT3mMZCAu51qOVSL7mZBPxV7SA44ZBICzd0H5BFeDLO4TwkZBRGgVq326W5JBoJUltPkSqjNHjwL4oZD'
  },
  whatsapp: {
    baseUrl: 'https://graph.facebook.com/v22.0',
    phoneNumberId: '848441401690739',
    accessToken: 'EAAO1YPeIbdABQLWnxKjcrFUDDiAgK23ZANTwxB2RKYxOUFlFpz31d0i0eVq3gk5ZBSCBs3jYgTZABd5bZBx0gwZCitx34AEZCiKPb8ZBQRYTetwp7GJEoQyj2kpR5VoZAJiQKVcu3tBwLXnhiKfND5d6ulD1So2GH1nt01FhIEYHf1qtRWooThmoDlgAZCHA8JQZDZD',
    templateName: 'awards_marketing'
  }
};

export default function LeadsManager() {
  const [forms, setForms] = useState<any[]>([]);
  const [selectedForm, setSelectedForm] = useState<any | null>(null);
  const [allLeads, setAllLeads] = useState<any[]>([]); // Accumulates all fetched leads
  const [leads, setLeads] = useState<any[]>([]); // Current page leads
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sentMessages, setSentMessages] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    // Re-filter whenever any relevant state changes
    filterLeads();
  }, [searchTerm, allLeads, statusFilter, sentMessages]);

  const fetchForms = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${API_CONFIG.leadgen.baseUrl}/${API_CONFIG.leadgen.pageId}/leadgen_forms?access_token=${API_CONFIG.leadgen.accessToken}`
      );
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      setForms(data.data || []);
    } catch (err) {
      setError(`Failed to fetch forms: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async (urlOrFormId: string, isPagination = false) => {
    setLoading(true);
    if (!isPagination) {
      // Reset on initial load
      setAllLeads([]);
      setLeads([]);
      setFilteredLeads([]);
      setSelectedLeads(new Set());
      setNextUrl(null);
      setPrevUrl(null);
    }
    setError('');

    try {
      const finalUrl = urlOrFormId.startsWith('http')
        ? urlOrFormId
        : `${API_CONFIG.leadgen.baseUrl}/${urlOrFormId}/leads?access_token=${API_CONFIG.leadgen.accessToken}`;

      const response = await fetch(finalUrl);
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const processedLeads = (data.data || []).map((lead: any) => {
        const fieldMap: Record<string, string> = {};
        (lead.field_data || []).forEach((field: any) => {
          const key = String(field.name);
          const value = Array.isArray(field.values) && field.values.length ? String(field.values[0]) : '';
          fieldMap[key] = value;
        });

        return {
          id: lead.id,
          created_time: lead.created_time,
          name: fieldMap.FULL_NAME || fieldMap.full_name || 'N/A',
          email: fieldMap.EMAIL || fieldMap.email || 'N/A',
          phone: fieldMap.PHONE || fieldMap.phone || 'N/A',
          dob: fieldMap.DOB || fieldMap.dob || 'N/A',
          field0: fieldMap['0'] || 'N/A',
          field1: fieldMap['1'] || 'N/A',
          field2: fieldMap['2'] || 'N/A',
          field3: fieldMap['3'] || 'N/A',
          rawData: fieldMap
        };
      });

      // Update current page
      setLeads(processedLeads);

      // Accumulate all leads (for search/filter across pages)
      const newAllLeads = isPagination ? [...allLeads, ...processedLeads] : processedLeads;
      setAllLeads(newAllLeads);

      // Update pagination URLs
      setNextUrl(data.paging?.next || null);
      setPrevUrl(data.paging?.previous || null);
    } catch (err) {
      setError(`Failed to fetch leads: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = allLeads;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.phone.toLowerCase().includes(term) ||
        lead.field1.toLowerCase().includes(term)
      );
    }

    if (statusFilter === 'sent') {
      filtered = filtered.filter(lead => sentMessages.has(lead.id));
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter(lead => !sentMessages.has(lead.id));
    }

    setFilteredLeads(filtered);
  };

  const toggleSelectLead = (leadId: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
    }
  };

  const sendWhatsAppMessage = async (lead: any) => {
    const phone = lead.phone.replace(/\D/g, '');

    const payload = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: API_CONFIG.whatsapp.templateName,
        language: {
          code: "en"
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                parameter_name: "name",
                text: lead.name
              }
            ]
          }
        ]
      }
    };

    const response = await fetch(
      `${API_CONFIG.whatsapp.baseUrl}/${API_CONFIG.whatsapp.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.whatsapp.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data;
  };

  const handleSendMessages = async () => {
    if (selectedLeads.size === 0) {
      setError('Please select at least one lead');
      return;
    }

    setSending(true);
    setError('');
    setSuccess('');

    const leadsToSend = allLeads.filter(lead => selectedLeads.has(lead.id));
    let successCount = 0;
    let failCount = 0;
    const newSentMessages = new Set(sentMessages);

    for (const lead of leadsToSend) {
      try {
        await sendWhatsAppMessage(lead);
        successCount++;
        newSentMessages.add(lead.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (err) {
        failCount++;
        console.error(`Failed to send to ${lead.name}:`, err);
      }
    }

    setSentMessages(newSentMessages);
    setSending(false);
    setSuccess(`Messages sent: ${successCount} successful, ${failCount} failed`);
    setSelectedLeads(new Set());
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'DOB', 'Field 0', 'Field 1', 'Field 2', 'Field 3', 'Created Time', 'Status'];
    const rows = allLeads
      .filter(lead => {
        // Apply current filters to export only visible leads
        let matches = true;
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          matches = matches && (
            lead.name.toLowerCase().includes(term) ||
            lead.email.toLowerCase().includes(term) ||
            lead.phone.toLowerCase().includes(term) ||
            lead.field1.toLowerCase().includes(term)
          );
        }
        if (statusFilter === 'sent') matches = matches && sentMessages.has(lead.id);
        if (statusFilter === 'pending') matches = matches && !sentMessages.has(lead.id);
        return matches;
      })
      .map(lead => [
        lead.name,
        lead.email,
        lead.phone,
        lead.dob,
        lead.field0,
        lead.field1,
        lead.field2,
        lead.field3,
        new Date(lead.created_time).toLocaleString(),
        sentMessages.has(lead.id) ? 'Sent' : 'Pending'
      ]);

    const csv = [headers, ...rows].map(row =>
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePageChange = (url: string) => {
    fetchLeads(url, true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Facebook Leads Manager</h1>
            <p className="text-blue-100">Manage leads and send WhatsApp messages</p>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}

          {/* Forms Selection */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Select Lead Form</h2>
              <button
                onClick={fetchForms}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {forms.map(form => (
                <div
                  key={form.id}
                  onClick={() => {
                    setSelectedForm(form);
                    fetchLeads(form.id);
                  }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedForm?.id === form.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800 mb-2 truncate">{form.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded ${
                      form.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {form.status}
                    </span>
                    <span className="text-gray-500">{form.locale}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leads Section */}
          {selectedForm && (
            <div className="p-6">
              {/* Controls */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name, email, phone, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="text-gray-400 w-5 h-5" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Leads</option>
                      <option value="pending">Pending</option>
                      <option value="sent">Sent</option>
                    </select>
                  </div>

                  {/* Export */}
                  <button
                    onClick={exportToCSV}
                    disabled={allLeads.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleSelectAll}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {selectedLeads.size === filteredLeads.length ? (
                        <CheckSquare className="w-5 h-5" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                      Select All
                    </button>
                    <span className="text-gray-600">
                      {selectedLeads.size} of {filteredLeads.length} selected
                    </span>
                  </div>

                  <button
                    onClick={handleSendMessages}
                    disabled={selectedLeads.size === 0 || sending}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className={`w-4 h-4 ${sending ? 'animate-pulse' : ''}`} />
                    {sending ? 'Sending...' : `Send to ${selectedLeads.size} Lead${selectedLeads.size !== 1 ? 's' : ''}`}
                  </button>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => prevUrl && handlePageChange(prevUrl)}
                    disabled={!prevUrl || loading}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <span className="text-gray-600">
                    Showing {leads.length} of {allLeads.length} fetched leads
                  </span>
                  <button
                    onClick={() => nextUrl && handlePageChange(nextUrl)}
                    disabled={!nextUrl || loading}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              {loading ? (
                <div className="text-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
                  <p className="text-gray-600">Loading leads...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {searchTerm || statusFilter !== 'all' ? 'No leads match your filters' : 'No leads found'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Select
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          DOB
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Occupation
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLeads.map(lead => (
                        <tr
                          key={lead.id}
                          className={`hover:bg-gray-50 ${sentMessages.has(lead.id) ? 'bg-green-50' : ''}`}
                        >
                          <td className="px-4 py-3">
                            <button
                              onClick={() => toggleSelectLead(lead.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              {selectedLeads.has(lead.id) ? (
                                <CheckSquare className="w-5 h-5" />
                              ) : (
                                <Square className="w-5 h-5" />
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              sentMessages.has(lead.id)
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {sentMessages.has(lead.id) ? 'Sent' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {lead.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {lead.email}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {lead.phone}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {lead.dob}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                            {lead.field0}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {lead.field1}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(lead.created_time).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}