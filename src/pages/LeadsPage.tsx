// src/pages/LeadsPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeadsByFormId } from "../api/facebookApi";
import type { Lead, LeadField } from "../types/facebookTypes";

const LeadsPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    const fetchLeads = async () => {
      try {
        const data = await getLeadsByFormId(formId);
        setLeads(data);
      } catch (err) {
        console.error("Failed to load leads", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [formId]);

  const normalizeLead = (lead: Lead) => {
    const fields: Record<string, string> = {};

    lead.field_data.forEach((fd: LeadField) => {
      let label = fd.name;

      if (fd.name === "FULL_NAME") label = "Full Name";
      else if (fd.name === "EMAIL") label = "Email";
      else if (fd.name === "PHONE") label = "Phone";
      else if (fd.name === "DOB") label = "Date of Birth";
      else if (/^\d+$/.test(fd.name)) label = `Custom ${fd.name}`;

      fields[label] = fd.values[0] || "";
    });

    return fields;
  };

  const goBack = () => navigate(-1);

  if (loading) return <div className="p-6 text-gray-600">Loading leads...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={goBack}
        className="mb-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        ← Back to Forms
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Leads for Form: {formId}
      </h1>

      {/* Mobile hint */}
      <div className="block lg:hidden bg-gray-50 p-3 rounded-md text-sm text-gray-700 mb-3">
        Swipe → to view full table
      </div>

      <div className="w-full overflow-x-auto border border-gray-200 rounded-xl shadow-sm relative">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-20">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase sticky left-0 bg-gray-100 z-30 border-r">
                Submitted
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Full Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                DOB
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Details
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => {
              const normalized = normalizeLead(lead);

              return (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Sticky first column */}
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 sticky left-0 bg-white z-20 border-r">
                    {new Date(lead.created_time).toLocaleString()}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {normalized["Full Name"] || "–"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {normalized["Email"] || "–"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {normalized["Phone"] || "–"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {normalized["Date of Birth"] || "–"}
                  </td>

                  {/* FULL DETAILS - WRAPPED + CLEAN LIST */}
                  <td className="px-4 py-3 text-sm text-gray-700 max-w-lg whitespace-normal wrap-break-word">
                    <ul className="list-disc pl-4 space-y-1">
                      {Object.entries(normalized)
                        .filter(
                          ([key]) =>
                            ![
                              "Full Name",
                              "Email",
                              "Phone",
                              "Date of Birth",
                            ].includes(key)
                        )
                        .map(([key, value]) => (
                          <li key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </li>
                        ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {leads.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            No leads found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsPage;
