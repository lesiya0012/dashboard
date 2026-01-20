"use client";

import {
  StarIcon,
  PencilIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Company() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Company");

  const tabs = ["Company", "More", "Interest", "Note", "Market data", "Misc"];

  useEffect(() => {
    async function loadCompany() {
      try {
        const res = await fetch("https://dashboard-sales-q5ql.onrender.com/api/company");
        if (!res.ok) throw new Error("Failed to load company data");
        const data = await res.json();
        setCompany(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCompany();
  }, []);

  if (loading)
    return <div className="p-4 text-sm text-gray-500">Loading company info…</div>;

  if (error)
    return <div className="p-4 text-sm text-red-600">{error}</div>;

  if (!company)
    return <div className="p-4 text-sm text-gray-500">No company data found</div>;

  return (
    <div className="p-4 mt-1 mr-4 ml-4 mb-3 bg-white border border-gray-200 rounded-xl shadow-sm text- overflow-hidden">
      {/* HEADER */}
      <div className="flex items-start justify-between px-4 pt-4">
        <div className="flex gap-3">
          <div className="h-11 w-11 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
            SC
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-gray-900">
                {company.name}
              </h1>
              <StarIcon className="h-4 w-4 text-orange-400" />
            </div>
            <p className="text-xs text-gray-500">{company.department}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
            <PencilIcon className="h-4 w-4 text-orange-600" />
          </button>
          <button className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center">
            <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="px-4 pb-1 mt-3 border-b border-gray-200">
        <div className="flex gap-4 text-xs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full transition ${
                activeTab === tab
                  ? "bg-teal-100 text-teal-700 font-medium"
                  : "text-black hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-4 text-xs min-h-[140px]">
        {activeTab === "Company" ? (
          <CompanyTab company={company} />
        ) : (
          <EmptyTab />
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-xs">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="rounded" />
            Stop
          </label>
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="rounded" />
            No mailings
          </label>
        </div>

        <p className="text-gray-400">
          Updated: {company.updated.date.split("T")[0]} {company.updated.by}
        </p>
      </div>
    </div>
  );
}

/* =======================
   TAB CONTENT COMPONENTS
======================= */

function CompanyTab({ company }) {
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-2">
      <Info label="Postal:" value={company.address} link />
      <Info label="Category:" value={company.category} />

      <Info label="Country:" value={company.country} />
      <Info label="Code:" value={company.code} />

      <Info
        label="Phone:"
        value={company.phones.number}
        sub={company.phones.label}
        link
      />
      <Info label="Number:" value={company.number} />

      <Info label="Webaddress:" value={company.website} link />
      <Info label="VAT No.:" value={company.vatNo} />

      <Info label="E-mail:" value={company.email} link />
      <Info label="Business:" value={company.business} />
    </div>
  );
}

function EmptyTab() {
  return (
    <div className="flex items-center justify-center h-28 text-gray-400">
      No data available
    </div>
  );
}

function Info({ label, value, link = false, sub }) {
  return (
    <div className="flex gap-3 truncate">
      <span className="w-24 text-gray-500">{label}</span>
      <div className="truncate">
        {link ? (
          <a href="#" className="text-blue-600 hover:underline">
            {value}
          </a>
        ) : (
          <span className="text-gray-900">{value}</span>
        )}
        {sub && <span className="ml-1 text-gray-400">{sub}</span>}
      </div>
    </div>
  );
}
