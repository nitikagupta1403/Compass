export type SeizureEvent = {
  id: string;
  patientId: string;
  date: string;
  time: string | null;
  duration: string | null;

  context?: string;
  eventType?: string;

  notes?: string | null;

  motorSigns?: string[];
  autonomicSigns?: string[];
  postIctalSigns?: string[];

  rescueMedication?: string;

  source: string;
  certainty: string;

  dataQualityNote?: string;
};