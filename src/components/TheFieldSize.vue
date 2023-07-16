<script setup lang="ts">
import { ref, type Ref } from 'vue';

const cellsCountInHeightDefault: number = 10;
const cellsCountInWidthDefault: number = 10;
const minesCountExpectedDefault: number = 25;

const cellsCountInHeightMin: number = 3;
const cellsCountInWidthMin: number = 3;
const minesCountExpectedMin: number = 15;

const cellsCountInHeightMax: number = 100;
const cellsCountInWidthMax: number = 100;
const minesCountExpectedMax: number = 85;

const cellsCountInHeight: Ref<number> = ref(cellsCountInHeightDefault);
const cellsCountInWidth: Ref<number> = ref(cellsCountInWidthDefault);
const minesCountExpected: Ref<number> = ref(minesCountExpectedDefault);

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
            case 'minePercent': result.isValid = minesCountExpectedMin <= inputValueNumber && inputValueNumber <= minesCountExpectedMax; break;
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
            case 'minePercent': minesCountExpected.value = value as number; break;
        }
    }

    switch (inputType) {
        case 'height': return cellsCountInHeight.value.toString()
        case 'width': return cellsCountInWidth.value.toString()
        case 'minePercent': return minesCountExpected.value.toString()
    }
};

interface FieldSettings {
    cellsCountInHeight: number,
    cellsCountInWidth: number,
    minesCountExpected: number,
};

const saveSettings = (): void => {
    const fieldSettings: FieldSettings = {
        cellsCountInHeight: cellsCountInHeight.value,
        cellsCountInWidth: cellsCountInWidth.value,
        minesCountExpected: minesCountExpected.value,
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
        <input type="number" :value="minesCountExpected" @change.lazy="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'minePercent')" name="minesCountExpected" :min="minesCountExpectedMin" :max="minesCountExpectedMax" step="0.1" required="true">
    </div>
    <div>
        <button type="submit">Сохранить</button>
    </div>
</form>
</template>

<style scoped>
</style>