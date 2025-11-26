// src/pages/LeadFormsPage.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLeadForms } from "../api/facebookApi";
import type { LeadForm } from "../types/facebookTypes";

// Lucide Icons
import { ClipboardList, Languages, CheckCircle, Circle } from "lucide-react";
import Loader from "../components/Loader";

const LeadFormsPage = () => {
  const [forms, setForms] = useState<LeadForm[]>([]); // Initialize with empty array and add type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getLeadForms();
        // Ensure data is an array
        setForms(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Failed to load forms", err);
        setError("Failed to load forms. Please try again.");
        setForms([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) return <Loader/>;

  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ClipboardList className="w-8 h-8" />
        Facebook Lead Forms
      </h1>

      {forms.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No lead forms found.
        </div>
      ) : (
        <div className="space-y-4">
          {forms.map((form) => (
            <Link
              key={form.id}
              to={`/leads/${form.id}`}
              className="block p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white"
            >
              {/* Form Name */}
              <div className="text-xl font-semibold text-blue-600 mb-2">
                {form.name}
              </div>

              {/* Status + Locale */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {/* Status */}
                <span className="flex items-center gap-1">
                  {form.status === "ACTIVE" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400" />
                  )}
                  {form.status}
                </span>

                {/* Locale */}
                <span className="flex items-center gap-1">
                  <Languages className="w-4 h-4" />
                  {form.locale}
                </span>
              </div>

              {/* ID */}
              <div className="text-xs text-gray-400 mt-2">ID: {form.id}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadFormsPage;
