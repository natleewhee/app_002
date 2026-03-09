"use client";

import { useState } from "react";

const TIP_OPTIONS = [10, 15, 20];

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState(1);
  const [tip, setTip] = useState(15);

  const billNum = parseFloat(bill) || 0;
  const peopleNum = Math.max(1, parseInt(people) || 1);

  const tipAmount = (billNum * tip) / 100;
  const total = billNum + tipAmount;
  const tipPerPerson = tipAmount / peopleNum;
  const totalPerPerson = total / peopleNum;

  const fmt = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 font-serif">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-1">
            The
          </p>
          <h1 className="text-3xl text-stone-800">Tip Calculator</h1>
          <div className="mt-3 mx-auto w-12 h-px bg-stone-300" />
        </div>

        {/* Inputs */}
        <div className="space-y-5">

          {/* Bill */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
              Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-white border border-stone-200 rounded-lg text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-300"
              />
            </div>
          </div>

          {/* Tip */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
              Tip
            </label>
            <div className="flex gap-2">
              {TIP_OPTIONS.map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTip(pct)}
                  className={`flex-1 py-3 rounded-lg text-sm border transition-all duration-150 ${
                    tip === pct
                      ? "bg-stone-800 border-stone-800 text-white"
                      : "bg-white border-stone-200 text-stone-500 hover:border-stone-400"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* People */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
              Number of People
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPeople((p) => Math.max(1, (parseInt(p) || 1) - 1))}
                className="w-10 h-10 rounded-lg border border-stone-200 bg-white text-stone-500 hover:border-stone-400 text-lg transition-colors flex items-center justify-center"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="flex-1 text-center py-2 bg-white border border-stone-200 rounded-lg text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition-colors"
              />
              <button
                onClick={() => setPeople((p) => (parseInt(p) || 1) + 1)}
                className="w-10 h-10 rounded-lg border border-stone-200 bg-white text-stone-500 hover:border-stone-400 text-lg transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-stone-100" />

        {/* Results */}
        <div className="bg-white border border-stone-100 rounded-xl p-5 space-y-4">
          <Row label="Tip" value={fmt(tipAmount)} />
          <Row label="Total" value={fmt(total)} />
          <div className="border-t border-stone-100 pt-4">
            <Row label={`Tip / person`} value={fmt(tipPerPerson)} subtle />
            <Row
              label={`Total / person`}
              value={fmt(totalPerPerson)}
              highlight
            />
          </div>
        </div>

        {/* Reset */}
        {billNum > 0 && (
          <button
            onClick={() => { setBill(""); setPeople(1); setTip(15); }}
            className="mt-5 w-full text-xs uppercase tracking-widest text-stone-400 hover:text-stone-600 transition-colors py-2"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, highlight, subtle }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-xs uppercase tracking-widest ${
          subtle ? "text-stone-300" : "text-stone-400"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-serif text-lg tabular-nums ${
          highlight ? "text-stone-800 font-medium" : "text-stone-600"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
