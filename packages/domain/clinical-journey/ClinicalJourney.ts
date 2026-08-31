/**
 * ============================================================================
 * ClinicalJourney
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the longitudinal clinical journey of a Patient.
 *
 * A Clinical Journey is the chronological record of meaningful clinical
 * events that together describe the patient's story over time.
 *
 * The Clinical Journey is an Aggregate Root responsible for preserving
 * the integrity and ordering of Clinical Events.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - Clinical Journey
 * - INV-002 : Every Clinical Journey Belongs to One Patient
 * - DL-002  : Preserve the Clinical Journey
 * ============================================================================
 */

import { AggregateRoot } from "../shared/aggregate-root";
import { ClinicalJourneyId } from "./ClinicalJourneyId";
import { PatientId } from "../patient/PatientId";

export class ClinicalJourney extends AggregateRoot {
  constructor(
    id: ClinicalJourneyId,
    private readonly patientId: PatientId
  ) {
    super(id);
  }

  /**
   * Returns the Patient to whom this journey belongs.
   */
  public getPatientId(): PatientId {
    return this.patientId;
  }
}