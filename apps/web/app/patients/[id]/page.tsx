import patients from "@/data/patients";

import Timeline from "@/components/Timeline";
import MedicationList from "@/components/MedicationList";
import ReportList from "@/components/ReportList";
import DiagnosisList from "@/components/DiagnosisList";
import AllergyList from "@/components/AllergyList";
import PatientHeader from "@/components/PatientHeader";
import ClinicalSnapshot from "@/components/ClinicalSnapshot";
import SpecialistSummary from "@/components/SpecialistSummary";
import SeizureBurden from "@/components/SeizureBurden";
import VideoEvidence from "@/components/VideoEvidence";
import SpecialistQuestions from "@/components/SpecialistQuestions";

import { loadHopeSeizures } from "@/data/loadSeizures";
import { loadHopeVideos } from "@/data/loadVideos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PatientPage({ params }: Props) {
  const { id } = await params;

  const patient = patients.find(
    (patient) => patient.id === id
  );

  if (!patient) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">
          Patient not found
        </h1>
      </main>
    );
  }

  const seizures = loadHopeSeizures();
  const videos = loadHopeVideos();

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <PatientHeader patient={patient} />

      <ClinicalSnapshot
        seizures={seizures}
        medications={patient.medications}
        reports={patient.reports}
      />

      <SpecialistSummary
        seizures={seizures}
        medications={patient.medications}
        reports={patient.reports}
        videos={videos}
      />

      <SeizureBurden events={seizures} />

      <VideoEvidence videos={videos} />

      <SpecialistQuestions />

      <MedicationList medications={patient.medications} />

      <DiagnosisList diagnoses={patient.diagnoses} />

      <AllergyList allergies={patient.allergies} />

      <Timeline clinicalEvents={patient.clinicalEvents} />

      <ReportList
        patientId={patient.id}
        reports={patient.reports}
      />
    </main>
  );
}