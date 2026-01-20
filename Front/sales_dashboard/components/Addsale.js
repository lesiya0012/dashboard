"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Joi from "joi";

// Define Joi schema
const saleSchema = Joi.object({
  saleName: Joi.string().min(3).required().messages({
    "string.empty": "Sale name is required",
    "string.min": "Sale name must be at least 3 characters",
  }),
  status: Joi.string().valid("Open", "Lost", "Sold", "Stalled").required(),
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be positive",
  }),
  stageLabel: Joi.string().min(2).required(),
  stagePercentage: Joi.alternatives().try(
  Joi.number().min(0).max(100),
  Joi.string().allow("") // allow empty string
),
  nextActivityDate: Joi.date().iso().required().messages({
    "date.base": "Next activity date is required",
  }),
});

export default function AddSale({ onClose, refreshSales, setMessage }) {
  const [formData, setFormData] = useState({
    saleName: "",
    status: "Open",
    amount: "",
    stageLabel: "",
    stagePercentage: "",
    nextActivityDate: "",
  });

  const[errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     const { error } = saleSchema.validate(formData, { abortEarly: false });
    if (error) {
      const fieldErrors = {};
      error.details.forEach((detail) => {
        fieldErrors[detail.path[0]] = detail.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});


    const payload = {
      saleName: formData.saleName,
      status: formData.status,
      amount: Number(formData.amount),
      stage: {
    label: formData.stageLabel,
    percentage: formData.stagePercentage !== "" 
      ? Number(formData.stagePercentage) 
      : undefined,
  },
      nextActivityDate: formData.nextActivityDate,
    };

    const res = await fetch("https://dashboard-sales-q5ql.onrender.com/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage("Sale added successfully!");

      setFormData({
        saleName: "",
        status: "Open",
        amount: "",
        stageLabel: "",
        stagePercentage: "",
        nextActivityDate: "",
      });
      refreshSales();
      onClose();
    } else {
      setMessage("Failed to add sale.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40 backdrop-blur-sm">
      <div className="bg-teal-700 p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <div className="flex justify-between  text-center justify-center items-center mb-4">
          <h2 className="text-lg font items-center-semibold text-white">Add New Sale</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <input
            name="saleName"
            value={formData.saleName}
            onChange={handleChange}
            placeholder="Sale Name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          {errors.saleName && <p className="text-red-500 text-xs">{errors.saleName}</p>}


          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300  rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option className="text-black ">Open</option>
            <option className="text-black">Lost</option>
            <option className="text-black">Sold</option>
            <option className="text-black"> Stalled</option>
          </select>
          {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}


          <input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}


          <input
            name="stageLabel"
            value={formData.stageLabel}
            onChange={handleChange}
            placeholder="Stage Label"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          {errors.stageLabel && <p className="text-red-500 text-xs">{errors.stageLabel}</p>}


          <input
            name="stagePercentage"
            type="number"
            value={formData.stagePercentage}
            onChange={handleChange}
            placeholder="Stage %"
           
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          {formData.stagePercentage && (
  <span className="text-gray-600 text-sm">%</span>
)}



          <input
            name="nextActivityDate"
            type="date"
            value={formData.nextActivityDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          {errors.nextActivityDate && <p className="text-red-500 text-xs">{errors.nextActivityDate}</p>}


          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-gray-800 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}