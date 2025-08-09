"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "../../components/AdminSidebar";
import { BOOKS } from "../../data/books";
import {
  BookOpen,
  User,
  Tag,
  DollarSign,
  Star,
  Hash,
  Flame,
  Sparkles,
  Save,
  UploadCloud,
  Image as ImageIcon,
  X,
} from "lucide-react";

// Simple Ksh formatter
const fmtKsh = (n) =>
  isNaN(n) ? "Ksh.—" : `Ksh.${Number(n).toFixed(2)}`;

export default function UploadBooks() {
  const router = useRouter();

  // --- auth guard ---
  useEffect(() => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      if (!auth) router.replace("/login");
    } catch {
      router.replace("/login");
    }
  }, [router]);

  const categories = useMemo(() => {
    const set = new Set(BOOKS.map((b) => b.category).filter(Boolean));
    const common = ["Fiction", "Self Help", "Technology", "Finance", "Adventure"];
    const rest = [...set].filter((c) => !common.includes(c));
    return [...common, ...rest];
  }, []);

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    originalPrice: "",
    rating: "",
    reviewCount: "",
    // imageData holds a data URL (from file upload)
    imageData: "",
    category: categories[0] || "Fiction",
    isNewRelease: false,
    isBestseller: false,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (form.price === "" || Number(form.price) <= 0) e.price = "Price must be greater than 0";
    if (!form.category) e.category = "Category is required";
    if (form.originalPrice !== "" && Number(form.originalPrice) < 0)
      e.originalPrice = "Original price must be ≥ 0";
    if (form.rating !== "" && (Number(form.rating) < 0 || Number(form.rating) > 5))
      e.rating = "Rating must be between 0 and 5";
    if (form.reviewCount !== "" && Number(form.reviewCount) < 0)
      e.reviewCount = "Review count must be ≥ 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ----- image upload -----
  const fileInputRef = useRef(null);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setField("imageData", reader.result); // data URL string
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => setField("imageData", "");

  // ----- actions -----
  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setTimeout(() => {
      const current = JSON.parse(localStorage.getItem("adminDraftBooks") || "[]");
      const newId = nextLocalId(current, BOOKS);
      const payload = {
        id: newId,
        title: form.title.trim(),
        author: form.author.trim(),
        price: Number(form.price),
        originalPrice: form.originalPrice === "" ? null : Number(form.originalPrice),
        rating: form.rating === "" ? null : Number(form.rating),
        reviewCount: form.reviewCount === "" ? 0 : Number(form.reviewCount),
        image: form.imageData || "/vercel.svg",
        category: form.category,
        isNewRelease: !!form.isNewRelease,
        isBestseller: !!form.isBestseller,
      };
      const updated = [payload, ...current];
      localStorage.setItem("adminDraftBooks", JSON.stringify(updated));
      setSaving(false);
      alert("Draft saved locally ✅");
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Hook this to your API later
    alert("Upload simulated. Wire this to your API when ready!");
  };

  // Preview
  const previewImage = form.imageData || "/vercel.svg";

  return (
    <div className="min-h-screen bg-indigo-50">
      <div className="max-w-[1400px] mx-auto py-6">
        <div className="bg-white/60 rounded-xl shadow-sm border border-indigo-100 flex">
          <AdminSidebar />

          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Upload Books</h1>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* --- FORM --- */}
              <form onSubmit={handleSubmit} className="xl:col-span-2 bg-white border rounded-lg p-6 space-y-5">
                {/* Title */}
                <Field
                  label="Book Title"
                  error={errors.title}
                  icon={BookOpen}
                  hint="Enter a descriptive title."
                  input={
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setField("title", e.target.value)}
                      className={inputClass(errors.title)}
                      placeholder="e.g. The Silent Things"
                    />
                  }
                />

                {/* Author */}
                <Field
                  label="Author"
                  error={errors.author}
                  icon={User}
                  hint="Who wrote this book?"
                  input={
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) => setField("author", e.target.value)}
                      className={inputClass(errors.author)}
                      placeholder="e.g. Sarah Towwet"
                    />
                  }
                />

                {/* Category */}
                <Field
                  label="Category"
                  error={errors.category}
                  icon={Tag}
                  hint="Pick the best matching genre."
                  input={
                    <select
                      value={form.category}
                      onChange={(e) => setField("category", e.target.value)}
                      className={inputClass(errors.category)}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  }
                />

                {/* Prices (Ksh.) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Price"
                    error={errors.price}
                    icon={DollarSign}
                    hint="Current selling price (Ksh.)."
                    input={
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">Ksh.</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={form.price}
                          onChange={(e) => setField("price", e.target.value)}
                          className={`w-full pl-16 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.price ? "border-red-400" : "border-gray-300"
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                    }
                    leftPaddingOverride // prevent double-left padding due to custom prefix
                  />
                  <Field
                    label="Original Price (optional)"
                    error={errors.originalPrice}
                    icon={DollarSign}
                    hint="Former price if discounted (Ksh.)."
                    input={
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">Ksh.</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={form.originalPrice}
                          onChange={(e) => setField("originalPrice", e.target.value)}
                          className={`w-full pl-16 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.originalPrice ? "border-red-400" : "border-gray-300"
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                    }
                    leftPaddingOverride
                  />
                </div>

                {/* Rating & Reviews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Rating (0–5, optional)"
                    error={errors.rating}
                    icon={Star}
                    hint="Use one decimal, e.g. 4.5."
                    input={
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={form.rating}
                        onChange={(e) => setField("rating", e.target.value)}
                        className={inputClass(errors.rating)}
                        placeholder="4.5"
                      />
                    }
                  />
                  <Field
                    label="Review Count (optional)"
                    error={errors.reviewCount}
                    icon={Hash}
                    hint="How many reviews?"
                    input={
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={form.reviewCount}
                        onChange={(e) => setField("reviewCount", e.target.value)}
                        className={inputClass(errors.reviewCount)}
                        placeholder="234"
                      />
                    }
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePickImage}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Upload Image
                    </button>
                    {form.imageData && (
                      <button
                        type="button"
                        onClick={clearImage}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelected}
                    />
                  </div>
                  {/* Hint spaced slightly to align, not hugging left */}
                  <p className="text-xs text-gray-500 mt-2 pl-1">
                    JPG/PNG recommended. A square or 3:4 image works best.
                  </p>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Toggle
                    label="Mark as New Release"
                    icon={Sparkles}
                    checked={form.isNewRelease}
                    onChange={(v) => setField("isNewRelease", v)}
                  />
                  <Toggle
                    label="Mark as Bestseller"
                    icon={Flame}
                    checked={form.isBestseller}
                    onChange={(v) => setField("isBestseller", v)}
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-800 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving…" : "Save draft (local)"}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    <UploadCloud className="h-4 w-4" />
                    Upload
                  </button>
                </div>
              </form>

              {/* --- PREVIEW --- */}
              <aside className="bg-white border rounded-lg p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Preview</h2>
                <div className="flex gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-24 h-32 object-cover rounded-md border"
                  />
                  <div className="space-y-1">
                    <p className="text-gray-900 font-medium">{form.title || "—"}</p>
                    <p className="text-gray-600 text-sm">by {form.author || "—"}</p>
                    <p className="text-gray-700 text-sm">
                      {form.category} • {form.rating ? `${Number(form.rating).toFixed(1)}★` : "No rating"}
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {fmtKsh(form.price)}
                      {form.originalPrice && (
                        <span className="ml-2 text-gray-500 line-through">
                          {fmtKsh(form.originalPrice)}
                        </span>
                      )}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {form.isNewRelease && (
                        <span className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                          New
                        </span>
                      )}
                      {form.isBestseller && (
                        <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-sm text-gray-600">
                  <p>
                    Drafts are saved to{" "}
                    <code className="bg-gray-100 px-1 rounded">localStorage.adminDraftBooks</code>.
                    Connect the <strong>Upload</strong> button to your API when ready.
                  </p>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------------- helpers & tiny components ---------------- */

function nextLocalId(localDrafts, staticBooks) {
  const maxStatic = Math.max(0, ...staticBooks.map((b) => Number(b.id) || 0));
  const maxDraft = Math.max(0, ...localDrafts.map((b) => Number(b.id) || 0));
  return Math.max(maxStatic, maxDraft) + 1;
}

function Field({ label, error, icon: Icon, input, hint, leftPaddingOverride = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <div className={leftPaddingOverride ? "" : "pl-10"}>{input}</div>
      </div>
      {hint && <p className="text-xs text-gray-500 mt-2 pl-1">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600 pl-1">{error}</p>}
    </div>
  );
}

function inputClass(hasError) {
  return `w-full pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
    hasError ? "border-red-400" : "border-gray-300"
  }`;
}

function Toggle({ label, checked, onChange, icon: Icon }) {
  return (
    <label className="flex items-center justify-between border rounded-lg p-3">
      <span className="flex items-center gap-2 text-gray-700">
        <Icon className="h-4 w-4 text-gray-500" />
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 text-indigo-600"
      />
    </label>
  );
}
