<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { type FieldSettings } from '../types/index';

const cellsCountInHeightDefault: number = (JSON.parse(localStorage.getItem('fieldSettings') || '') as FieldSettings).cellsCountInHeight || 10;
const cellsCountInWidthDefault: number = (JSON.parse(localStorage.getItem('fieldSettings') || '') as FieldSettings).cellsCountInWidth || 10;
const minesSpawnPercentageDefault: number = (JSON.parse(localStorage.getItem('fieldSettings') || '') as FieldSettings).minesCountExpected || 25;

const cellsCountInHeightMin: number = 3;
const cellsCountInWidthMin: number = 3;
const minesSpawnPercentageMin: number = 15;

const cellsCountInHeightMax: number = 100;
const cellsCountInWidthMax: number = 100;
const minesSpawnPercentageMax: number = 85;

const cellsCountInHeight: Ref<number> = ref(cellsCountInHeightDefault);
const cellsCountInWidth: Ref<number> = ref(cellsCountInWidthDefault);
const minesSpawnPercentage: Ref<number> = ref(minesSpawnPercentageDefault);

type InputTypes = 'height' | 'width' | 'minePercent';

interface ValidResult {
    isValid: boolean, 
    value?: number,
};

const validateInputValue = (inputValue: string, inputType: InputTypes): ValidResult => {
    const result: ValidResult = {
        isValid: false,
    };

    const inputValueNumber: number = +inputValue.trim(); //* - inputValueNumber или число:number, или NaN:number.

    if (inputValueNumber) {
        result.value = inputValueNumber;

        switch (inputType) {
            case 'height': result.isValid = cellsCountInHeightMin <= inputValueNumber && inputValueNumber <= cellsCountInHeightMax; break;
            case 'width': result.isValid = cellsCountInWidthMin <= inputValueNumber && inputValueNumber <= cellsCountInWidthMax; break;
            case 'minePercent': result.isValid = minesSpawnPercentageMin <= inputValueNumber && inputValueNumber <= minesSpawnPercentageMax; break;
        }
    }

    return result
};

const setInput = (inputValue: string, inputType: InputTypes): string => {
    const {isValid, value}: ValidResult = validateInputValue(inputValue, inputType);

    if (isValid) {
        switch (inputType) {
            case 'height': cellsCountInHeight.value = value as number; break;
            case 'width': cellsCountInWidth.value = value as number; break;
            case 'minePercent': minesSpawnPercentage.value = value as number; break;
        }
    }

    switch (inputType) {
        case 'height': return cellsCountInHeight.value.toString()
        case 'width': return cellsCountInWidth.value.toString()
        case 'minePercent': return minesSpawnPercentage.value.toString()
    }
};

const saveSettings = (): void => {
    const fieldSettings: FieldSettings = {
        cellsCountInHeight: cellsCountInHeight.value,
        cellsCountInWidth: cellsCountInWidth.value,
        minesCountExpected: minesSpawnPercentage.value,
    };

    localStorage.setItem('fieldSettings', JSON.stringify(fieldSettings));
};

</script>

<template>
<form action="" @submit.prevent="saveSettings">
    <div class="inputWrapper">
        <label for="cellsCountInWidth">Количество клеток в ширину:</label>
        <input type="number" :value="cellsCountInWidth" @change.lazy="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'width')" name="cellsCountInWidth" :min="cellsCountInWidthMin" :max="cellsCountInWidthMax" step="1" required="true">
    </div>
    <div class="inputWrapper">
        <label for="cellsCountInHeight">Количество клеток в высоту:</label>
        <input type="number" :value="cellsCountInHeight" @change.lazy="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'height')" name="cellsCountInHeight" :min="cellsCountInHeightMin" :max="cellsCountInHeightMax" step="1" required="true">
    </div>
    <div class="inputWrapper">
        <label for="minesCountExpected">Вероятность появления мины в клетке (%):</label>
        <input type="number" :value="minesSpawnPercentage" @change.lazy="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'minePercent')" name="minesCountExpected" :min="minesSpawnPercentageMin" :max="minesSpawnPercentageMax" step="0.1" required="true">
    </div>
    <div>
        <button type="submit">Сохранить</button>
    </div>
</form>
</template>

<style scoped>
</style>
