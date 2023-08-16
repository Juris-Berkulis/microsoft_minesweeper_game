import { allKitsOfTranslatedWords } from "@/localeLanguages";
import type { AppLanguage, KitOfTranslatedWords } from "@/types/localeLanguages";
import { defineStore } from "pinia";
import { ref, type Ref } from 'vue';

export const useLanguageSelectionStore = defineStore('languageSelection', () => {
    const selectedLanguage: Ref<AppLanguage> = ref(JSON.parse(localStorage.getItem('selectedLanguage')!) || <AppLanguage>{
        locale: 'en_US',
        language: 'English',
    });

    const setSelectedLanguage = (newSelectedLanguage: AppLanguage): void => {
        selectedLanguage.value = newSelectedLanguage;
        localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage.value));
    };

    const getTranslation = (phrase: keyof KitOfTranslatedWords): string => {
        return allKitsOfTranslatedWords[selectedLanguage.value.locale][phrase]
    };

    return {
        selectedLanguage,
        setSelectedLanguage,
        getTranslation,
    }
});
