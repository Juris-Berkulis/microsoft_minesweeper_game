<script setup lang="ts">
import { allKitsOfTranslatedWords } from '@/localeLanguages';
import type { AllKitsOfTranslatedWords, AppLanguage } from "@/types/localeLanguages";
import type { Locale } from "@/types/localeLanguages";
import { useLanguageSelectionStore } from '@/stores/languageSelection';

const {
    setSelectedLanguage,
} = useLanguageSelectionStore();

const checkingForAllValues = (locale: never): string => {
    return `${locale}`
};

const getLanguageForLocale = (locale: Locale): string => {
    switch (locale) {
        case 'en_US': return 'English'
        case 'ru_RU': return 'Русский'
        default: return checkingForAllValues(locale)
    }
};

const localesList: Array<keyof AllKitsOfTranslatedWords<Locale>> = (Object.keys(allKitsOfTranslatedWords)) as Array<keyof AllKitsOfTranslatedWords<Locale>>;

const appLanguages: AppLanguage[] = localesList.map((locale: keyof AllKitsOfTranslatedWords<Locale>) => {
    const appLanguage: AppLanguage = {
        locale,
        language: getLanguageForLocale(locale),
    };

    return appLanguage
});
</script>

<template>
<div>
    <ul>
        <li v-for="appLanguage, index of appLanguages" :key="index" @click="setSelectedLanguage(appLanguage)">{{ appLanguage.language }}</li>
    </ul>
</div>
</template>

<style scoped lang="scss">
</style>
