<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { type FieldSettings } from '../types/index';
import { useFieldSizeStore } from '@/stores/fieldSize';
import { useLanguageSelectionStore } from '@/stores/languageSelection';

const {
    getTranslation,
} = useLanguageSelectionStore();

const {
    cellsCountInHeightDefault,
    cellsCountInWidthDefault,
    minesSpawnPercentageDefault,
    setFieldSettings,
} = useFieldSizeStore();

const cellsCountInHeightMin: number = 5;
const cellsCountInWidthMin: number = 5;
const minesSpawnPercentageMin: number = 15;

const cellsCountInHeightMax: number = 100;
const cellsCountInWidthMax: number = 100;
const minesSpawnPercentageMax: number = 85;

const cellsCountInHeight: Ref<number> = ref(cellsCountInHeightDefault);
const cellsCountInWidth: Ref<number> = ref(cellsCountInWidthDefault);
const minesSpawnPercentage: Ref<number> = ref(minesSpawnPercentageDefault);

const isFieldSettingsSaved: Ref<boolean> = ref(false);

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
            default: const _: never = <ReturnType<typeof inputType>>inputType;
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
            default: const _: never = <ReturnType<typeof inputType>>inputType;
        }

        isFieldSettingsSaved.value = false;
    }

    switch (inputType) {
        case 'height': return cellsCountInHeight.value.toString()
        case 'width': return cellsCountInWidth.value.toString()
        case 'minePercent': return minesSpawnPercentage.value.toString()
        default: const _: never = <ReturnType<typeof inputType>>inputType; return ''
    }
};

const saveSettings = (): void => {
    const fieldSettings: FieldSettings = {
        cellsCountInHeight: cellsCountInHeight.value,
        cellsCountInWidth: cellsCountInWidth.value,
        minesCountExpected: minesSpawnPercentage.value,
    };

    setFieldSettings(fieldSettings);
    isFieldSettingsSaved.value = true;
};

</script>

<template>
<form class="form" action="" @submit.prevent="saveSettings">
    <div class="inputWrapper">
        <label class="label" for="cellsCountInWidth">{{ getTranslation('theFieldSize_numberOfCellsInWidth') }}:</label>
        <input 
            class="input" 
            type="number" 
            :value="cellsCountInWidth" 
            @change.lazy="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'width')" 
            name="cellsCountInWidth" 
            :min="cellsCountInWidthMin" 
            :max="cellsCountInWidthMax" 
            step="1" 
            required="true"
        >
    </div>
    <div class="inputWrapper">
        <label class="label" for="cellsCountInHeight">{{ getTranslation('theFieldSize_numberOfCellsInHeight') }}:</label>
        <input 
            class="input" 
            type="number" 
            :value="cellsCountInHeight" 
            @change.lazy="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'height')" 
            name="cellsCountInHeight" 
            :min="cellsCountInHeightMin" 
            :max="cellsCountInHeightMax" 
            step="1" 
            required="true"
        >
    </div>
    <div class="inputWrapper">
        <label class="label" for="minesCountExpected">{{ getTranslation('theFieldSize_probabilityOfMineAppearingInACell') }} (%):</label>
        <input 
            class="input" 
            type="number" 
            :value="minesSpawnPercentage" 
            @change.lazy="(event: Event): string => (event.target as HTMLInputElement).value = setInput((event.target as HTMLInputElement).value, 'minePercent')" 
            name="minesCountExpected" 
            :min="minesSpawnPercentageMin" 
            :max="minesSpawnPercentageMax" 
            step="1" 
            required="true"
        >
    </div>
    <div class="btnWrapper">
        <button class="btn" id="saveNewFieldSizeBtn" type="submit">
            <span class="btnCurtain btnCurtain_1"></span>
            <span class="btnCurtain btnCurtain_2"></span>
            <span class="btnText">{{ getTranslation('theFieldSize_save') }}</span>
        </button>
        <div class="btnResultInfoContainer">
            <p class="btnResultInfo" v-if="isFieldSettingsSaved">{{ getTranslation('theFieldSize_btnResultInfo') }}</p>
        </div>
    </div>
</form>
</template>

<style scoped>
.inputWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.label {
    font-size: 1em;
    font-weight: 400;
    line-height: 1;
    color: #000000;
}

.input {
    width: 4em;
    min-width: 4em;
    margin-left: 10px;
    padding: 2px 5px;
    font-size: 1em;
    font-weight: 400;
    line-height: 1;
    color: #000000;
    border: 2px solid #449944;
    border-radius: 5px;
}

.btnWrapper {
    margin: 10px 0 calc(15px + 1em);;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn {
    position: relative;
    padding: 7px 17px;
    font-size: 1em;
    font-weight: 400;
    line-height: 1;
    color: #eeeeee;
    border-radius: 30px;
    background-color: transparent;
    overflow: hidden;
    z-index: 1;
    transition: all 0.4s linear 0s;
}

.btn:hover {
    color: #ffffff;
}

.btnCurtain {
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    width: calc(100% + 26px);
    transform: skewX(-45deg);
    box-shadow: inset 0 0 0.5em 0.5em #286928;
    z-index: -1;
    pointer-events: none;
    transition: inherit;
}

.btnCurtain_1 {
    left: -15px;
    background-color: #449944;
}

.btn:hover .btnCurtain_2 {
    left: calc(-100% - 15px);
    transform: skewX(45deg);
}

.btnCurtain_2 {
    left: calc(100% + 15px);
    background-color: #227722;
}

.btn:hover .btnCurtain_2 {
    left: -15px;
    transform: skewX(45deg);
}

.btnText {
    color: currentColor;
    pointer-events: none;
}

.btnResultInfoContainer {
    position: relative;
    width: 100%;
}

.btnResultInfo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 0.8em;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
    color: #008000;
}
</style>
