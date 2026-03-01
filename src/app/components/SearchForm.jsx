"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    country: "",
    startDate: "",
    endDate: "",
    type: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    router.push(
      `/results?country=${form.country}&start=${form.startDate}&end=${form.endDate}&type=${form.type}`
    )
  }

  return (
    <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">
      <h1 className="text-4xl font-bold text-white mb-2">
        Schengen Vize Bul
      </h1>
      <p className="text-white/70 mb-8">
        En hızlı ve en uygun vize seçeneklerini karşılaştır.
      </p>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <select
          name="country"
          onChange={handleChange}
          className="p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none"
        >
          <option value="">Ülke Seç</option>
          <option value="germany">Almanya</option>
          <option value="france">Fransa</option>
          <option value="italy">İtalya</option>
        </select>

        <select
          name="type"
          onChange={handleChange}
          className="p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none"
        >
          <option value="">Vize Türü</option>
          <option value="tourism">Turistik</option>
          <option value="business">Ticari</option>
          <option value="student">Öğrenci</option>
        </select>

        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          className="p-4 rounded-xl bg-white/20 text-white border border-white/30"
        />

        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          className="p-4 rounded-xl bg-white/20 text-white border border-white/30"
        />

        <button className="md:col-span-2 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition">
          En Uygun Vizeyi Bul
        </button>
      </form>
    </div>
  )
}