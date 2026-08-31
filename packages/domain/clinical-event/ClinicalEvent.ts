/**
 * ============================================================================
 * ClinicalEvent
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents a meaningful occurrence in a Patient's Clinical Journey.
 *
 * A Clinical Event is the Aggregate Root responsible for preserving the
 * consistency of everything that belongs to that event, including its
 * supporting evidence and lifecycle.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - Clinical Journey
 * - Evidence Before Opinion
 * ============================================================================
 */

import { AggregateRoot } from "../shared/aggregate-root";

import { ClinicalEventId } from "./ClinicalEventId";
import { ClinicalJourneyId } from "../clinical-journey/ClinicalJourneyId";

import { ClinicalEventType } from "./ClinicalEventType";
import { ClinicalEventTitle } from "./ClinicalEventTitle";
import { ClinicalEventStatus, EventStatus } from "./ClinicalEventStatus";
import { OccurredAt } from "./OccurredAt";

import { Evidence } from "../evidence/Evidence";

export class ClinicalEvent extends AggregateRoot {
  private readonly evidence: Evidence[] = [];

  constructor(
    id: ClinicalEventId,
    private readonly journeyId: ClinicalJourneyId,
    private readonly type: ClinicalEventType,
    private title: ClinicalEventTitle,
    private readonly occurredAt: OccurredAt,
    private status: ClinicalEventStatus
  ) {
    super(id);

    if (status.value === EventStatus.Verified && this.evidence.length === 0) {
      throw new Error(
        "A Clinical Event cannot start in the Verified state without supporting evidence."
      );
    }
  }

  public getJourneyId(): ClinicalJourneyId {
    return this.journeyId;
  }

  public getType(): ClinicalEventType {
    return this.type;
  }

  public getTitle(): ClinicalEventTitle {
    return this.title;
  }

  public getOccurredAt(): OccurredAt {
    return this.occurredAt;
  }

  public getStatus(): ClinicalEventStatus {
    return this.status;
  }

  public getEvidence(): readonly Evidence[] {
    return Object.freeze([...this.evidence]);
  }

  public addEvidence(evidence: Evidence): void {
    if (this.evidence.some(e => e.equals(evidence))) {
      throw new Error("Evidence already exists in this Clinical Event.");
    }

    if (!evidence.getClinicalEventId().equals(this.id)) {
      throw new Error(
        "Evidence belongs to a different Clinical Event."
      );
    }

    this.evidence.push(evidence);
  }

  public removeEvidence(evidenceId: string): void {
    const index = this.evidence.findIndex(
      e => e.getId().value === evidenceId
    );

    if (index === -1) {
      throw new Error("Evidence not found.");
    }

    if (this.status.value === EventStatus.Verified) {
      throw new Error(
        "Verified Clinical Events cannot have evidence removed."
      );
    }

    this.evidence.splice(index, 1);
  }

  public rename(title: ClinicalEventTitle): void {
    if (!this.isEditable()) {
      throw new Error(
        "Only Draft Clinical Events may be renamed."
      );
    }

    this.title = title;
  }

  public verify(): void {
    if (this.status.value === EventStatus.Verified) {
      return;
    }

    if (this.evidence.length === 0) {
      throw new Error(
        "A Clinical Event cannot be verified without supporting evidence."
      );
    }

    this.status = new ClinicalEventStatus(EventStatus.Verified);
  }

  public archive(): void {
    if (this.status.value === EventStatus.Archived) {
      return;
    }

    this.status = new ClinicalEventStatus(EventStatus.Archived);
  }

  private isEditable(): boolean {
    return this.status.value === EventStatus.Draft;
  }
}