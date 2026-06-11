"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

const PLANS = [
  {
    key: "basic",
    name: "Basic plan",
    desc: "Perfect for startups and small businesses looking to get online fast.",
    price: "499",
    current: false,
    features: [
      "10 Free Scans",
      "100 Furniture item limit",
      "1-5 pages",
      "1-month support",
    ],
    action: "Downgrade to Basic",
  },
  {
    key: "professional",
    name: "Professional Plan",
    desc: "For growing businesses needing advanced features and custom functionality.",
    price: "1,199",
    current: true,
    features: [
      "50 Free Scans",
      "Unlimited 3d Furniture",
      "Custom Branding",
      "Hub & Avatar",
      "10 Team members",
      "3-month support",
    ],
    action: "Your Current Plan!",
  },
  {
    key: "premium",
    name: "Premium Plan",
    desc: "For growing businesses needing advanced features and custom functionality.",
    price: "2,499",
    current: false,
    features: [
      "100 Free Scans",
      "Custom Branding",
      "Hub & Avatar",
      "Schedule",
      "Unlimited Team members",
      "Advanced features (integrations, custom web apps)",
      "Ongoing support and maintenance",
    ],
    action: "Upgrade to Premium",
  },
];

interface ManagePlanModalProps {
  onClose: () => void;
}

export default function ManagePlanModal({ onClose }: ManagePlanModalProps) {
  const [billing, setBilling] = useState<"yearly" | "monthly">("yearly");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-gray-100 p-8 shadow-2xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-encre hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-extrabold text-encre">
            Manage your plan
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ardoise">
            Contact Us If you need something more specific, we also offer custom
            quotes based on your project requirements.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mb-8 flex justify-center">
          <div className="flex rounded-full bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                billing === "yearly"
                  ? "bg-encre text-white"
                  : "text-ardoise hover:text-encre"
              }`}
            >
              Yearly
            </button>
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                billing === "monthly"
                  ? "bg-encre text-white"
                  : "text-ardoise hover:text-encre"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`flex flex-col rounded-2xl p-6 ${
                plan.current
                  ? "bg-accent text-white"
                  : "bg-white text-encre"
              }`}
            >
              <h3
                className={`text-2xl font-extrabold ${
                  plan.current ? "text-white" : "text-encre"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`mt-1 text-xs italic ${
                  plan.current ? "text-white/80" : "text-ardoise"
                }`}
              >
                {plan.desc}
              </p>

              {/* Price */}
              <div className="my-5 flex items-start">
                <span
                  className={`text-5xl font-extrabold leading-none ${
                    plan.current ? "text-white" : "text-encre"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`ml-0.5 mt-1 text-base font-semibold ${
                    plan.current ? "text-white/80" : "text-ardoise"
                  }`}
                >
                  $
                </span>
              </div>

              {/* CTA */}
              {plan.current ? (
                <button
                  type="button"
                  className="mb-5 w-full rounded-full border-2 border-white bg-transparent py-2.5 text-sm font-semibold text-white"
                >
                  {plan.action}
                </button>
              ) : (
                <button
                  type="button"
                  className="mb-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {plan.action}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              {/* Features */}
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2 text-xs ${
                      plan.current ? "text-white/90" : "text-ardoise"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
