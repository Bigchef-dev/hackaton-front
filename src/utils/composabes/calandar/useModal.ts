import { ref } from 'vue';

export interface ModalState {
    isOpen: boolean;
    modalData: Record<string, any> | null;
}

export function useModal() {
    // State
    const isOpen = ref<boolean>(false);
    const modalData = ref<Record<string, any> | null>(null);

    /**
     * Ouvre le modal avec les données optionnelles
     */
    const open = (data?: Record<string, any>): void => {
        modalData.value = data || null;
        isOpen.value = true;
    };

    /**
     * Ferme le modal
     */
    const close = (): void => {
        isOpen.value = false;
        // Délai pour permettre l'animation de fermeture
        setTimeout(() => {
            modalData.value = null;
        }, 200);
    };

    /**
     * Bascule l'état du modal
     */
    const toggle = (data?: Record<string, any>): void => {
        if (isOpen.value) {
            close();
        } else {
            open(data);
        }
    };

    /**
     * Met à jour les données du modal
     */
    const updateData = (data: Record<string, any>): void => {
        modalData.value = {
            ...modalData.value,
            ...data,
        };
    };

    /**
     * Réinitialise l'état du modal
     */
    const reset = (): void => {
        isOpen.value = false;
        modalData.value = null;
    };

    return {
        // State
        isOpen,
        modalData,

        // Methods
        open,
        close,
        toggle,
        updateData,
        reset,
    };
}
