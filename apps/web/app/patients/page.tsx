import patients from "@/data/patients";

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
      <main className="p-10">
        <h1>Patient not found</h1>
      </main>
    );
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        {patient.demographics.name}
      </h1>

      <p className="mt-3">
        Compass patient page is running.
      </p>
    </main>
  );
}