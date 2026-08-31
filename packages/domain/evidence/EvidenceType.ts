/**
 * ============================================================================
 * EvidenceType
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the type of clinical evidence.
 *
 * Blueprint References
 * --------------------
 * - Evidence Before Opinion
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

export enum EvidenceTypeValue {
  Observation = "Observation",
  LaboratoryResult = "Laboratory Result",
  ImagingStudy = "Imaging Study",
  ClinicalNote = "Clinical Note",
  Prescription = "Prescription",
  ProcedureReport = "Procedure Report",
  SurgeryReport = "Surgery Report",
  Photograph = "Photograph",
  Video = "Video",
  Document = "Document",
  ExternalRecord = "External Record",
  Other = "Other",
}

interface EvidenceTypeProps {
  value: EvidenceTypeValue;
}

export class EvidenceType extends ValueObject<EvidenceTypeProps> {
  constructor(value: EvidenceTypeValue) {
    super({ value });
  }

  public get value(): EvidenceTypeValue {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }
}