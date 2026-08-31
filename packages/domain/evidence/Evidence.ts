/**
 * ============================================================================
 * Evidence
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents evidence supporting a Clinical Event.
 *
 * Evidence provides the factual basis upon which clinical reasoning,
 * diagnoses, and treatment decisions are made.
 *
 * Blueprint References
 * --------------------
 * - Evidence Before Opinion
 * - Clinical Journey
 * - Domain Model
 * ============================================================================
 */

import { Entity } from "../shared/entity";

import { EvidenceId } from "./EvidenceId";
import { ClinicalEventId } from "../clinical-event/ClinicalEventId";

import { EvidenceType } from "./EvidenceType";
import { EvidenceSource } from "./EvidenceSource";

export class Evidence extends Entity {
  constructor(
    id: EvidenceId,
    private readonly clinicalEventId: ClinicalEventId,
    private readonly type: EvidenceType,
    private readonly source: EvidenceSource
  ) {
    super(id);
  }

  public getClinicalEventId(): ClinicalEventId {
    return this.clinicalEventId;
  }

  public getType(): EvidenceType {
    return this.type;
  }

  public getSource(): EvidenceSource {
    return this.source;
  }
}