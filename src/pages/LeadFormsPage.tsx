// src/pages/LeadFormsPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLeadForms } from '../api/facebookApi';
import type { LeadForm } from '../types/facebookTypes';

// Lucide Icons
import { ClipboardList, Languages, CheckCircle, Circle } from "lucide-react";

const LeadFormsPage = () => {
  const [forms, setForms] = useState<LeadForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getLeadForms();
        setForms(data);
      } catch (err) {
        console.error('Failed to load forms', err);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading forms...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Facebook Lead Forms
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {forms.map((form) => (
          <Link
            key={form.id}
            to={`/leads/${form.id}`}
            className="block bg-white border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-colors"
          >
            {/* Form Name */}
            <div className="flex items-center gap-2">
              <ClipboardList size={18} className="text-gray-700" />
              <span className="font-semibold text-gray-900">{form.name}</span>
            </div>

            {/* Status + Locale */}
            <div className="mt-3 text-sm text-gray-700 flex items-center gap-3">

              {/* Status */}
              <span
                className={`px-2 py-0.5 rounded text-xs inline-flex items-center gap-1 ${
                  form.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {form.status === "ACTIVE" ? (
                  <CheckCircle size={14} />
                ) : (
                  <Circle size={14} />
                )}
                {form.status}
              </span>

              {/* Locale */}
              <span className="inline-flex items-center gap-1 text-gray-600">
                <Languages size={14} />
                {form.locale}
              </span>
            </div>

            {/* ID */}
            <div className="mt-3 text-xs text-gray-500">ID: {form.id}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeadFormsPage;
