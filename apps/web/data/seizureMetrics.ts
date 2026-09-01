import { SeizureEvent } from "@/types/seizure";

export type SeizureMetrics = {
  totalLoggedEvents: number;
  uniqueEventDays: number;
  multiEventDays: {
    date: string;
    count: number;
  }[];
  multiEventDayCount: number;
  maxEventsInOneDay: number;
  sleepAssociatedEvents: number;
  symptomaticOnlyEvents: number;
  firstEventDate: string | null;
  lastEventDate: string | null;
};

export function calculateSeizureMetrics(
  events: SeizureEvent[]
): SeizureMetrics {
  const eventsByDate = new Map<string, number>();

  for (const event of events) {
    eventsByDate.set(
      event.date,
      (eventsByDate.get(event.date) ?? 0) + 1
    );
  }

  const multiEventDays = Array.from(eventsByDate.entries())
    .filter(([, count]) => count >= 2)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const sleepAssociatedEvents = events.filter((event) => {
    const context = event.context?.toLowerCase() ?? "";
    const notes = event.notes?.toLowerCase() ?? "";

    return (
      context.includes("sleep") ||
      context.includes("half asleep") ||
      notes.includes("sleep")
    );
  }).length;

  const symptomaticOnlyEvents = events.filter(
    (event) =>
      event.eventType === "fit-symptoms" ||
      event.eventType === "prodromal-or-symptomatic-event"
  ).length;

  const sortedDates = events
    .map((event) => event.date)
    .sort((a, b) => a.localeCompare(b));

  return {
    totalLoggedEvents: events.length,
    uniqueEventDays: eventsByDate.size,

    multiEventDays,
    multiEventDayCount: multiEventDays.length,

    maxEventsInOneDay:
      eventsByDate.size === 0
        ? 0
        : Math.max(...eventsByDate.values()),

    sleepAssociatedEvents,
    symptomaticOnlyEvents,

    firstEventDate:
      sortedDates.length > 0
        ? sortedDates[0]
        : null,

    lastEventDate:
      sortedDates.length > 0
        ? sortedDates[sortedDates.length - 1]
        : null,
  };
}