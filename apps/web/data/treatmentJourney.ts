export type TreatmentMilestone = {
  id: string;
  date: string;
  title: string;
  summary: string;
  medications: string[];
  evidence: string[];
};

export const hopeTreatmentJourney: TreatmentMilestone[] = [];