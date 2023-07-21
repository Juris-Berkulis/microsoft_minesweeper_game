import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { FieldSettings } from "@/types/index";

export const useFieldSizeStore = defineStore('fieldSize', () => {
    const cellsCountInHeightDefault: Ref<number> = ref((JSON.parse(localStorage.getItem('fieldSettings') || '{}') as FieldSettings).cellsCountInHeight || 10);
    const cellsCountInWidthDefault: Ref<number> = ref((JSON.parse(localStorage.getItem('fieldSettings') || '{}') as FieldSettings).cellsCountInWidth || 10);
    const minesSpawnPercentageDefault: Ref<number> = ref((JSON.parse(localStorage.getItem('fieldSettings') || '{}') as FieldSettings).minesCountExpected || 20);

    const setFieldSettings = (fieldSettings: FieldSettings) => {
        cellsCountInHeightDefault.value = fieldSettings.cellsCountInHeight;
        cellsCountInWidthDefault.value = fieldSettings.cellsCountInWidth;
        minesSpawnPercentageDefault.value = fieldSettings.minesCountExpected;

        localStorage.setItem('fieldSettings', JSON.stringify(fieldSettings));
    };

    return {
        cellsCountInHeightDefault,
        cellsCountInWidthDefault,
        minesSpawnPercentageDefault,
        setFieldSettings,
    }
});
