"use client";
import { useState } from "react";
import Sales from "../pages/Sales";
import Company from "../pages/Company";
import SalePreview from "../pages/SalePreview";

export default function Tabs() {
  const [previewSale, setPreviewSale] = useState(null);

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col flex-1 min-w-0">
          <Company />

          <div className="flex-1 overflow-auto">
            <Sales
              previewSale={previewSale}
              setPreviewSale={setPreviewSale}
            />
          </div>
        </div>

        {/* RIGHT SIDE – Sale Preview */}
        <div
          className="
            w-full md:w-[360px]
            md:flex-shrink-0
            border-t md:border-t-0 md:border-l
            bg-white mb-6 p-4 md:p-6
            overflow-y-auto
            rounded-lg border border-gray-200 rounded-xl shadow-md
            transition-all duration-300">
          <SalePreview sale={previewSale} />
        </div>
      </div>
    </div>
  );
}