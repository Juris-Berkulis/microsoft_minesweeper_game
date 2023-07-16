<script setup lang="ts">
import { ref, type Ref } from 'vue';

const cellsCountInHeightDefault = 10;
const cellsCountInWidthDefault = 10;
const minesCountExpectedDefault = 25;

const cellsCountInHeight: Ref<number> = ref(cellsCountInHeightDefault);
const cellsCountInWidth: Ref<number> = ref(cellsCountInWidthDefault);
const minesCountExpected: Ref<number> = ref(minesCountExpectedDefault);

type InputTypes = 'height' | 'width' | 'minePercent';

interface ValidResult {
    isValid: boolean, 
    value: number | null,
};

const validateInputValue = (inputValue: string, inputType: InputTypes): ValidResult => {
    const result: ValidResult = {
        isValid: false,
        value: null,
    };

    const inputValueNumber: number | string = +inputValue.trim();

    if (inputValueNumber && typeof inputValueNumber === 'number') {
        result.value = inputValueNumber;

        switch (inputType) {
            case 'height':
            case 'width': result.isValid = 3 <= inputValueNumber && inputValueNumber <= 100; break;
            case 'minePercent': result.isValid = 15 <= inputValueNumber && inputValueNumber <= 85; break;
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
        <input type="number" :value="cellsCountInWidth" @input="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'width')" name="cellsCountInWidth" min="3" max="100" step="1" required="true">
    </div>
    <div class="inputWrapper">
        <label for="cellsCountInHeight">Количество клеток в высоту:</label>
        <input type="number" :value="cellsCountInHeight" @input="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'height')" name="cellsCountInHeight" min="3" max="100" step="1" required="true">
    </div>
    <div class="inputWrapper">
        <label for="minesCountExpected">Вероятность появления мины в клетке (%):</label>
        <input type="number" :value="minesCountExpected" @input="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'minePercent')" name="minesCountExpected" min="15" max="85" step="0.1" required="true">
    </div>
    <div>
        <button type="submit">Сохранить</button>
    </div>
</form>
</template>

<style scoped>
</style>
