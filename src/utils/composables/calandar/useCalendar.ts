import { ref, computed } from 'vue';
import type { ViewMode } from '../../types';

export function useCalendar() {
  // State
  const currentDate = ref(new Date());
  const viewMode = ref<ViewMode>('month');

  const weekStart = computed(() => {
    const date = new Date(currentDate.value);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  });

  const weekEnd = computed(() => {
    const date = new Date(weekStart.value);
    date.setDate(date.getDate() + 6);
    return date;
  });

  const monthStart = computed(() => {
    return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1);
  });

  const monthEnd = computed(() => {
    return new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      0
    );
  });

  const weekDays = computed(() => {
    const days = [];
    const start = new Date(weekStart.value);

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      days.push(date);
    }

    return days;
  });

  const monthGrid = computed(() => {
    const grid: Date[] = [];

    const startOfMonth = new Date(monthStart.value);
    const endOfMonth = new Date(monthEnd.value);

    const startWeekday = startOfMonth.getDay();
    const offsetToMonday = (startWeekday + 6) % 7;
    const gridStart = new Date(startOfMonth);
    gridStart.setDate(startOfMonth.getDate() - offsetToMonday);

    const endWeekday = endOfMonth.getDay();
    const offsetToSunday = (7 - endWeekday) % 7;
    const gridEnd = new Date(endOfMonth);
    gridEnd.setDate(endOfMonth.getDate() + offsetToSunday);

    const cur = new Date(gridStart);
    while (cur <= gridEnd) {
      grid.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }

    return grid;
  });

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSameMonth = (date1: Date, date2: Date): boolean => {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const goToToday = (): void => {
    currentDate.value = new Date();
  };

  const goToPrevious = (): void => {
    const date = new Date(currentDate.value);

    if (viewMode.value === 'day') {
      date.setDate(date.getDate() - 1);
    } else if (viewMode.value === 'week') {
      date.setDate(date.getDate() - 7);
    } else {
      date.setMonth(date.getMonth() - 1);
    }

    currentDate.value = date;
  };

  const goToNext = (): void => {
    const date = new Date(currentDate.value);

    if (viewMode.value === 'day') {
      date.setDate(date.getDate() + 1);
    } else if (viewMode.value === 'week') {
      date.setDate(date.getDate() + 7);
    } else {
      date.setMonth(date.getMonth() + 1);
    }

    currentDate.value = date;
  };

  const setViewMode = (mode: ViewMode): void => {
    viewMode.value = mode;
  };

  return {
    // State
    currentDate,
    viewMode,

    // Computed
    weekStart,
    weekEnd,
    monthStart,
    monthEnd,
    weekDays,
    monthGrid,

    // Methods
    goToToday,
    goToPrevious,
    goToNext,
    setViewMode,
    isToday,
    isSameMonth,
  };
}