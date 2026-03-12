"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";

interface ContactFormProps {
  dict: Dictionary["contact"];
}

export function ContactForm({ dict }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
      if (data.success)
        setForm({
          name: "",
          organization: "",
          email: "",
          phone: "",
          message: "",
        });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="font-bold text-green-800 text-xl mb-2">
          {dict.successTitle}
        </h3>
        <p className="text-green-700 text-sm">{dict.successMsg}</p>
        <Button
          variant="outline"
          className="mt-6 text-green-700 border-green-300"
          onClick={() => setStatus("idle")}
        >
          {dict.backBtn}
        </Button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E4FA3]/40 focus:border-[#1E4FA3] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {dict.nameLabel} <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={dict.namePlaceholder}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {dict.organizationLabel}
          </label>
          <input
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder={dict.organizationPlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {dict.emailLabel} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={dict.emailPlaceholder}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {dict.phoneLabel}
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={dict.phonePlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {dict.messageLabel} <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder={dict.messagePlaceholder}
          required
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
          {dict.errorMsg}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#1E4FA3] hover:bg-[#163a7d] text-white h-11 text-sm font-semibold"
      >
        {status === "loading" ? dict.submitting : dict.submit}
      </Button>
    </form>
  );
}
