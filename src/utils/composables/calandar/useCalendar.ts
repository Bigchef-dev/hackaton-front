import { ref, computed } from 'vue';

export function useCalendar() {
    // State
    const currentDate = ref(new Date());
    const viewMode = ref<'week' | 'month'>('month');


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

    /**
     * Obtient le premier jour du mois
     */
    const monthStart = computed(() => {
        return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1);
    });

    /**
     * Obtient le dernier jour du mois
     */
    const monthEnd = computed(() => {
        return new Date(
            currentDate.value.getFullYear(),
            currentDate.value.getMonth() + 1,
            0
        );
    });

    /**
     * Génère un tableau avec tous les jours de la semaine actuelle
     */
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

    /**
     * Génère la grille du mois (incluant les jours des mois adjacents)
     * Le calcul construit la grille depuis le lundi de la première semaine
     * contenant le début du mois jusqu'au dimanche de la semaine contenant
     * la fin du mois. Ainsi on n'ajoute pas systématiquement une 6ème
     * semaine vide qui n'appartient pas au mois.
     */
    const monthGrid = computed(() => {
        const grid: Date[] = [];

        const startOfMonth = new Date(monthStart.value);
        const endOfMonth = new Date(monthEnd.value);

        // Calculer le lundi précédent (ou égal) pour débuter la grille
        const startWeekday = startOfMonth.getDay(); // 0 (Dim) - 6 (Sam)
        const offsetToMonday = (startWeekday + 6) % 7; // 0 if Mon, 6 if Sun
        const gridStart = new Date(startOfMonth);
        gridStart.setDate(startOfMonth.getDate() - offsetToMonday);

        // Calculer le dimanche suivant (ou égal) pour terminer la grille
        const endWeekday = endOfMonth.getDay();
        const offsetToSunday = (7 - endWeekday) % 7; // 0 if Sun
        const gridEnd = new Date(endOfMonth);
        gridEnd.setDate(endOfMonth.getDate() + offsetToSunday);

        // Remplir la grille jour par jour
        const cur = new Date(gridStart);
        while (cur <= gridEnd) {
            grid.push(new Date(cur));
            cur.setDate(cur.getDate() + 1);
        }

        return grid;
    });

    /**
     * Vérifie si une date est aujourd'hui
     */
    const isToday = (date: Date): boolean => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    /**
     * Vérifie si deux dates sont dans le même mois
     */
    const isSameMonth = (date1: Date, date2: Date): boolean => {
        return (
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    /**
     * Navigue vers aujourd'hui
     */
    const goToToday = (): void => {
        currentDate.value = new Date();
    };

    /**
     * Navigue vers la période précédente
     */
    const goToPrevious = (): void => {
        const date = new Date(currentDate.value);

        if (viewMode.value === 'week') {
            date.setDate(date.getDate() - 7);
        } else {
            date.setMonth(date.getMonth() - 1);
        }

        currentDate.value = date;
    };

    /**
     * Navigue vers la période suivante
     */
    const goToNext = (): void => {
        const date = new Date(currentDate.value);

        if (viewMode.value === 'week') {
            date.setDate(date.getDate() + 7);
        } else {
            date.setMonth(date.getMonth() + 1);
        }

        currentDate.value = date;
    };

    /**
     * Change le mode de vue
     */
    const setViewMode = (mode: 'week' | 'month'): void => {
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
