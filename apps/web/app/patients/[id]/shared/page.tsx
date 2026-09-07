import { verifyActiveShareToken } from "@/lib/shareAccess";
import { loadPatient } from "@/data/loadPatient";
import { loadHopeSeizures } from "@/data/loadSeizures";
import { loadHopeVideos } from "@/data/loadVideos";
import { loadMedications } from "@/data/loadMedications";
import { loadLaboratory } from "@/data/loadLaboratory";
import { loadClinicalEvents } from "@/data/loadClinicalEvents";

import {
  buildReferralData,
  type ReferralData,
} from "@/data/buildReferralData";

import CasePanorama from "@/components/CasePanorama";

type Props = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    share?: string;
  }>;
};

type ReferralMedication =
  ReferralData["medications"][number];

export default async function SharedPatientPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { share } = await searchParams;

  const verified = share
    ? await verifyActiveShareToken(share)
    : null;

  if (
    !verified ||
    verified.patientId !== id
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <section className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Compass Clinical
          </p>

          <h1 className="mt-3 text-2xl font-bold text-slate-900">
            Shared link unavailable
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            This link is missing, invalid, or expired.
          </p>
        </section>
      </main>
    );
  }

  const patient = loadPatient();

  if (patient.id !== id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <h1 className="text-3xl font-bold text-red-600">
          Patient not found
        </h1>
      </main>
    );
  }

  const referral = buildReferralData(
    patient,
    loadHopeSeizures(),
    loadHopeVideos(),
    loadMedications(),
    loadLaboratory(),
    loadClinicalEvents()
  );

  const levetiracetam = referral.medications.filter(
    (medication) =>
      medication.activeIngredient?.toLowerCase() ===
        "levetiracetam" ||
      medication.name.toLowerCase() ===
        "levetiracetam"
  );

  const phenobarbital = referral.medications.filter(
    (medication) =>
      medication.activeIngredient?.toLowerCase() ===
      "phenobarbital"
  );

  const emergencyPlan = referral.medications.filter(
    (medication) =>
      medication.status ===
      "current-emergency-plan"
  );

  const getCurrentMedication = (
    medicationRecords: ReferralMedication[],
    statuses: string[]
  ) =>
    medicationRecords.find(
      (medication) =>
        medication.status &&
        statuses.includes(medication.status)
    );

  const getCurrentMedicationText = (
    medicationRecords: ReferralMedication[],
    statuses: string[]
  ) => {
    const current = getCurrentMedication(
      medicationRecords,
      statuses
    );

    if (!current) {
      return "Current regimen not available.";
    }

    return current.frequency || current.dose;
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <article className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg">

        <div className="mb-6 rounded-xl border border-teal-200 bg-teal-50 p-4">
          <p className="text-sm font-semibold text-teal-950">
            Read-only specialist view
          </p>

          <p className="mt-1 text-sm leading-6 text-teal-800">
            This shared case can be reviewed but not edited.
          </p>
        </div>

        <header className="border-b border-slate-200 pb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Compass Clinical
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {referral.patientName}
          </h1>

          <p className="mt-2 text-slate-600">
            {referral.species} · {referral.breed} ·{" "}
            {referral.sex}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Patient ID: {referral.patientId}
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Reason for specialist review
          </h2>

          <p className="mt-2 leading-7 text-slate-700">
            {referral.clinicalProblem}
          </p>

          {referral.workingDiagnosis && (
            <p className="mt-2 text-sm text-slate-600">
              Working diagnosis:{" "}
              <strong>
                {referral.workingDiagnosis}
              </strong>
            </p>
          )}
        </section>

        <section className="mt-10">
          <CasePanorama
            shareToken={share}
            patientName={referral.patientName}
            photoSrc="/hope-profile.jpeg"
            patient={{
              patientId: referral.patientId,
              species: referral.species,
              breed: referral.breed,
              sex: referral.sex,
              dateOfBirth: referral.dateOfBirth,
              weightKg: referral.weightKg,
              workingDiagnosis:
                referral.workingDiagnosis,
            }}
            treatmentHistory={referral.medications}
            story={{
              totalLoggedEvents:
                referral.seizureDiary.totalLoggedEvents,
              uniqueEventDays:
                referral.seizureDiary.uniqueEventDays,
              multiEventDays:
                referral.seizureDiary.multiEventDays,
              firstEventDate:
                referral.seizureDiary.firstEventDate,
              lastEventDate:
                referral.seizureDiary.lastEventDate,
              maxEventsInOneDay:
                referral.seizureDiary.maxEventsInOneDay,
              sleepAssociatedEvents:
                referral.seizureDiary.sleepAssociatedEvents,
              symptomaticOnlyEvents:
                referral.seizureDiary.symptomaticOnlyEvents,
            }}
            drugMonitoringRecords={
              referral.therapeuticDrugMonitoring
            }
            earlyChronology={referral.earlyChronology}
            treatment={{
              daily: getCurrentMedicationText(
                phenobarbital,
                ["current"]
              ),

              sos: getCurrentMedicationText(
                levetiracetam,
                ["current-sos"]
              ),

              emergency: getCurrentMedicationText(
                emergencyPlan,
                ["current-emergency-plan"]
              ),
            }}
            evidence={{
              laboratoryGroups:
                referral.laboratoryGroups.length,
              videos:
                referral.videoEvidence.totalVideos,
              drugMonitoring:
                referral.therapeuticDrugMonitoring.length,
            }}
            laboratoryGroups={
              referral.laboratoryGroups
            }
            videoEvidence={referral.videoEvidence}
            questions={referral.unresolvedIssues}
          />
        </section>
      </article>
    </main>
  );
}