"use client";
import { useEffect, useState } from "react";
import {
  CheckIcon,
  XMarkIcon,
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiFunnelLight } from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsArrowDown } from "react-icons/bs";
import AddSale from "../components/Addsale";
import ConfirmModal from "../components/ConfirmModal";
import SalePreview from "../pages/SalePreview";

/* =======================\
   STATUS CONFIG (IMAGE MATCH)
======================= */

const STATUS = {
  Open: {
    text: "Open",
    icon: "€",
    cls: "bg-teal-100 text-teal-700 border-teal-200",
  },
  Lost: {
    text: "Lost",
    icon: <XMarkIcon className="h-3 w-3" />,
    cls: "bg-red-100 text-red-600 border-red-200",
  },
  Sold: {
    text: "Sold",
    icon: <CheckIcon className="h-3 w-3" />,
    cls: "bg-teal-100 text-teal-700 border-teal-200",
  },
  Stalled: {
    text: "Stalled",
    icon: <ChevronDownIcon className="h-3 w-3" />,
    cls: "bg-orange-100 text-orange-600 border-orange-200",
  },
};

export default function Sales({previewSale, setPreviewSale}) {
  const [sales, setSales] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Sales");
  const tabs = ["Activities", "Contacts", "Projects", "Sales","Requests"];
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showAddSale, setShowAddSale] = useState(false);
  const [message, setMessage] = useState("");

  const handleRowClick = (sale) => {
    setPreviewSale(sale); // updates Tabs state
  };

    async function loadSales() {
    try {
      setLoading(true);
      const res = await fetch(`https://dashboard-sales-q5ql.onrender.com/api/sales?page=${page}`);
      const json = await res.json();
      setSales(json.data);
      setTotalPages(json.totalPages);
      setSelected(new Set());
    } catch (err) {
      setError("Failed to load sales");
    } finally {
      setLoading(false);
    }
    
  }

  // ✅ Correct useEffect
  useEffect(() => {
    loadSales();
  }, [page]);

 async function handleDelete() {
  try {
    const ids = Array.from(selected);
    console.log("Deleting IDs:", ids);

    const res = await fetch("https://dashboard-sales-q5ql.onrender.com/api/sales", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }), // send array of IDs
    });

    if (res.ok) {
      setMessage("Selected sales deleted successfully!");
      setShowConfirmDelete(false);
      loadSales();
    } else {
      setMessage("Failed to delete sales.");
    }
  } catch (err) {
    setMessage("Error deleting sales.");
  }

  setTimeout(() => setMessage(""), 3000);
}

  /* =======================
     SELECTION (CHECKBOX ONLY)
  ======================= */

  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === sales.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(sales.map((s) => s._id)));
    }
  };

   if (loading)
    return <div className="p-4 text-sm text-gray-500">Loading company info…</div>;

  if (error)
    return <div className="p-4 text-sm text-red-600">{error}</div>;

  if (!sales)
    return <div className="p-4 text-sm text-gray-500">No company data found</div>;
console.log("ROW ID:", sales.saleName);

  return (
    <div className=" mt-1 mr-4 ml-4 mb-2 bg-white flex-1 border rounded rounded-lg shadow-gray-400 shadow shadow-md overflow-hidden">
        {/* TABS */}
      <div className="px-4 pb-1 mt-3 border-b border-gray-200" >
        <div className="flex gap-4 text-xs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full transition text-black  ${
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

{message && (
  <div
    className="mx-4 mt-2 mb-2 p-2 rounded bg-teal-100 text-teal-700 text-sm font-medium
               transform transition-all duration-500 ease-in-out
               opacity-100 translate-y-0"
  >
    {message}
  </div>
)}

      {/* TABLE */}
      <table className="w-full ">
       <thead className="bg-gray-50 border-b text-black">
  <tr>
    <th className="w-10 px-4 py-3">
      <input
        type="checkbox"
        checked={sales.length > 0 && selected.size === sales.length}
        onChange={toggleAll}
        className="accent-teal-600"
      />
    </th>
    <th className="px-3 py-3 text-left font-medium">Status</th>
    <th className="px-3 py-3 text-left font-medium">Sale date</th>
    <th className="px-3 py-3 text-left font-medium">Amount</th>
    <th className="px-3 py-3 text-left font-medium flex items-center gap-1">
      Stage <BsArrowDown className="h-4 w-4" />
    </th>
    <th className="px-3 py-3 text-left font-medium">Next activity</th>
    <th className="px-3 py-3 text-left font-medium">Sale name</th>
  </tr>
</thead>


        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="py-6 text-center text-black">
                Loading…
              </td>
            </tr>
          ) : (
            sales.map((sale) => {
              const isPreview = previewSale?._id === sale._id;
              const isSelected = selected.has(sale._id);
              const status = STATUS[sale.status];


              return (
                <tr
                  key={sale._id}
                   onClick={() => setPreviewSale(sale)}
  className={`border-b cursor-pointer transition
    ${
      isPreview
        ? "bg-teal-100"
        : isSelected
        ? "bg-teal-50"
        : "hover:bg-gray-50"
    }
  `}
                >
                  {/* CHECKBOX */}
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => toggleRow(sale._id)}
                      className="accent-teal-600"
                    />
                  </td>

                  {/* STATUS */}
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs  ${status.cls}`}
                    >
                      {status.icon}
                      {status.text}
                    </span>
                  </td>

                  {/* SALE DATE */}
                  <td className="px-3 py-2 text-gray-800 text-sm font-light">
                    {formatDate(sale.saleDate)}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-3 py-2 font-medium text-gray-800 text-sm font-light">
                    € {Number(sale.amount).toLocaleString()}
                  </td>
{/* STAGE */}
<td className="px-3 py-2 text-gray-800 text-sm font-light">
  {sale.stage?.label}
  {sale.stage?.percentage !== undefined && sale.stage?.percentage !== "" 
    ? ` (${sale.stage.percentage}%)` 
    : ""}
</td>


                  {/* NEXT ACTIVITY */}
                  <td className="px-3 py-2 text-gray-800 text-sm font-light">
                    {formatDate(sale.nextActivityDate)}
                  </td>

                  {/* SALE NAME */}
                  <td className="px-3 py-2 truncate max-w-xs text-gray-800 text-sm font-light">
                    {sale.saleName}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-4 py-3 border-t">
        {/* ACTIONS */}
        <div className="flex items-center gap-7 text-black font-extralight ">
          <FooterBtn icon={<IoAddCircleOutline className="h-4 w-4 text-orange-500 mr-2"/>} label="Add" onClick={() => setShowAddSale(true)}
 />
<FooterBtn
  icon={<RiDeleteBin6Line className="h-4 w-4 text-orange-500 mr-2" />}
  label="Delete"
  onClick={() => {
    if (selected.size > 0) {
      setShowConfirmDelete(true);
    } else {
      setMessage("Please select at least one row to delete.");
      setTimeout(() => setMessage(""), 3000);

    }
  }}
/>          <FooterBtn icon={<PiFunnelLight className="h-4 w-4 text-orange-500"/>} label="Filter" />
          <FooterBtn icon={<ArrowDownTrayIcon className="h-4 w-4 text-orange-500" />} label="Export" />
        </div>

        {/* PAGINATION */}
        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

{showConfirmDelete && (
  <ConfirmModal
    message={`Are you sure you want to delete ?`}
    onConfirm={handleDelete}
    onCancel={() => setShowConfirmDelete(false)}
  />
)}


{showAddSale && (
  <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
    <AddSale 
      onClose={() => setShowAddSale(false)} 
      refreshSales={loadSales} 
      setMessage={setMessage}   // ✅ pass message setter
    />
  </div>
)}

    </div>
  );
}

/* =======================
   HELPERS
======================= */

function FooterBtn({ icon, label ,onClick}) {
  return (
    <button className="flex items-center gap-1 hover:text-teal-700"
    onClick={onClick}>
      <span className="h-4 w-4">{icon}</span>
      {label}
    </button>
  );
}

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString("en-GB") : "-";
}
