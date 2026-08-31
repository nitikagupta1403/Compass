"use client";

import { useState } from "react";
import patients from "@/data/patients";
import PatientCard from "@/components/PatientCard";

export default function PatientsPage() {
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter((patient) => {
    const query = search.toLowerCase();

    return (
      patient.demographics.name.toLowerCase().includes(query) ||
      patient.demographics.breed.toLowerCase().includes(query) ||
      patient.condition.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <h1 className="mb-8 text-4xl font-bold text-slate-900">
        Patients
      </h1>

      <input
        type="text"
        placeholder="Search by name, breed or condition..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full rounded-lg border border-slate-300 bg-white p-3 text-lg text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
      />

      <div className="space-y-6">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
          />
        ))}
      </div>
    </main>
  );
}