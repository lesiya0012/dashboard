import {
  PiBuildings,
  PiCurrencyCircleDollar,
  PiCalendar,
  PiClipboardText,
  PiSparkleFill,
} from "react-icons/pi";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { LuTextSearch } from "react-icons/lu";
export default function SalePreview({ sale }) {
  if (!sale) {
    return (
      <div className="w-80 bg-white border rounded-xl p-4 text-gray-400">
        Select a sale to preview
      </div>
    );
  }

  return (
    <div >
      {/* TOP ICON BAR */}
      <div className="flex items-center justify-between mb-3 text-gray-500">
        <div className="flex gap-3">
          <LuTextSearch size={24} className="ml-0.5" />
          <PiCurrencyCircleDollar size={24} className="ml-0.5" />
          <PiCalendar  size={24} className="ml-0.5"/>
          <PiClipboardText  size={24} className="ml-0.5"/>
          <PiSparkleFill size={24} className="ml-0.5 text-teal-500"/>
        </div>
        <ChevronDownIcon size={24}  className="h-4 w-4" />
      </div>
      <div className="border-b pt-3 mt-3"></div>

      {/* PREVIEW LABEL */}
      <p className="text-xs text-gray-400 mb-2 mt-4">PREVIEW</p>

    {/* PREVIEW HEADER */}
<div className="flex items-start gap-3 mb-4">
  {/* € ICON */}
  <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-medium">
    €
  </div>

  {/* TITLE + AMOUNT */}
  <div>
   

    <h3 className="text-teal-700 font-medium text-sm leading-tight">
      {sale.saleName}
    </h3>

    <p className="text-gray-700 text-sm">
      {Number(sale.amount).toLocaleString()} EUR
    </p>
  </div>
</div>


      {/* DETAILS */}
      <div className="space-y-2 text-sm mb-4">
        <Row label="Company" value={sale.company} link />
        <Row label="Contact" value={sale.contact} link />
        <Row label="Sale date" value={formatDate(sale.saleDate)} />
        <Row label="Owner" value={sale.owner} />
        <Row label="Sale type" value={sale.saleType} />
        <Row label="Status" value={`${sale.status} (${sale.stage?.percentage ?? 0}%)`} />
      </div>

      {/* ACTIVITIES */}
      <Section title="Activities">
        {(sale.activities || []).map((a, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-500">{formatDate(a.date)}</span>
            <span className="text-teal-700 truncate max-w-[160px]">
              {a.title}
            </span>
          </div>
        ))}
      </Section>

      {/* STAKEHOLDERS */}
      <Section title="Stakeholders">
        {(sale.stakeholders || []).map((s, i) => (
          <div key={i} className="text-gray-700">
            {s}
          </div>
        ))}
      </Section>
    </div>
  );
}

/* ---------- SMALL HELPERS ---------- */

function Row({ label, value, link }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 w-20">{label}:</span>
      <span className={link ? "text-teal-700" : "text-gray-800"}>
        {value || "-"}
      </span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t pt-3 mt-3">
      <h4 className="font-medium text-gray-800 mb-2">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString("en-GB") : "-";
}
