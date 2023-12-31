import { allKitsOfTranslatedWords } from "@/localeLanguages";
import type { AppLanguage, KitOfTranslatedWords } from "@/types/localeLanguages";
import { defineStore } from "pinia";
import { ref, type Ref, watchEffect } from 'vue';

export const useLanguageSelectionStore = defineStore('languageSelection', () => {
    const defaultAppLanguage: AppLanguage = {
        locale: 'en_GB',
        language: 'English',
        localeLanguage: 'English',
    };

    const selectedLanguage: Ref<AppLanguage> = ref(JSON.parse(localStorage.getItem('selectedLanguage')!) || defaultAppLanguage);

    const setSelectedLanguage = (newSelectedLanguage: AppLanguage): void => {
        selectedLanguage.value = newSelectedLanguage;
        localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage.value));
    };

    const getTranslation = (phrase: keyof KitOfTranslatedWords): string => {
        return allKitsOfTranslatedWords[selectedLanguage.value.locale][phrase] 
            || allKitsOfTranslatedWords['en_GB'][phrase]
    };

    watchEffect(() => {
        document.querySelector('html')?.setAttribute('lang', selectedLanguage.value.locale.split('_')[0]);
    });

    return {
        selectedLanguage,
        setSelectedLanguage,
        getTranslation,
    }
});
