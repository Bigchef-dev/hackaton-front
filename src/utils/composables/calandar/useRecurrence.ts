import type { Session } from '../../types';

/**
 * Normalise une date en retirant l'heure (minuit du jour)
 */
function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Génère toutes les occurrences d'un événement récurrent dans une période donnée
 */
export function generateRecurrentOccurrences(
  event: Session,
  periodStart: Date,
  periodEnd: Date
): Session[] {
  const eventStart = new Date(event.date_session);
  
  const eventStartDay = normalizeDate(eventStart);
  const periodStartDay = normalizeDate(periodStart);
  const periodEndDay = normalizeDate(periodEnd);
  
  if (eventStartDay > periodEndDay) {
    return [];
  }
  
  const occurrences: Session[] = [];
  
  if (!event.recurrence || event.recurrence <= 0) {
    if (eventStartDay >= periodStartDay && eventStartDay <= periodEndDay) {
      return [event];
    }
    return [];
  }
  
  let currentDate = new Date(eventStartDay);
  
  if (currentDate < periodStartDay) {
    const daysDiff = Math.floor(
      (periodStartDay.getTime() - eventStartDay.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const occurrencesToSkip = Math.floor(daysDiff / event.recurrence);
    
    currentDate = new Date(eventStartDay);
    currentDate.setDate(eventStartDay.getDate() + occurrencesToSkip * event.recurrence);
    
    if (currentDate < periodStartDay) {
      currentDate.setDate(currentDate.getDate() + event.recurrence);
    }
  }
  
  let occurrenceIndex = 0;
  const maxOccurrences = 1000;
  
  while (currentDate <= periodEndDay && occurrenceIndex < maxOccurrences) {
    if (currentDate >= periodStartDay) {
      const occurrenceDate = new Date(currentDate);
      occurrenceDate.setHours(
        eventStart.getHours(),
        eventStart.getMinutes(),
        eventStart.getSeconds(),
        eventStart.getMilliseconds()
      );
      
      const daysSinceStart = Math.floor(
        (currentDate.getTime() - eventStartDay.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const occurrenceNumber = daysSinceStart / event.recurrence;
      
      occurrences.push({
        ...event,
        date_session: occurrenceDate,
        id: event.id + occurrenceNumber * 1000000
      });
    }
    
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + event.recurrence);
    occurrenceIndex++;
  }
  
  return occurrences;
}

/**
 * Vérifie si un événement a au moins une occurrence dans une période donnée
 */
export function hasOccurrenceInPeriod(
  event: Session,
  periodStart: Date,
  periodEnd: Date
): boolean {
  return generateRecurrentOccurrences(event, periodStart, periodEnd).length > 0;
}

/**
 * Organise les événements par jour dans une Map
 */
export function groupEventsByDay(
  events: Session[],
  periodStart: Date,
  periodEnd: Date
): Map<string, Session[]> {
  const map = new Map<string, Session[]>();
  
  const periodStartDay = normalizeDate(periodStart);
  const periodEndDay = normalizeDate(periodEnd);
  
  events.forEach(event => {
    const occurrences = generateRecurrentOccurrences(event, periodStartDay, periodEndDay);
    
    occurrences.forEach(occurrence => {
      const occurrenceDate = new Date(occurrence.date_session);
      const normalizedDate = normalizeDate(occurrenceDate);
      const dayKey = normalizedDate.toDateString();
      
      if (!map.has(dayKey)) {
        map.set(dayKey, []);
      }
      
      map.get(dayKey)!.push(occurrence);
    });
  });
  
  map.forEach((dayEvents, key) => {
    map.set(
      key,
      dayEvents.sort(
        (a, b) =>
          new Date(a.date_session).getTime() - new Date(b.date_session).getTime()
      )
    );
  });
  
  return map;
}