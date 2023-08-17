<script setup lang="ts">
import { allKitsOfTranslatedWords } from '@/localeLanguages';
import type { AllKitsOfTranslatedWords, AppLanguage } from "@/types/localeLanguages";
import type { Locale } from "@/types/localeLanguages";
import { useLanguageSelectionStore } from '@/stores/languageSelection';
import { storeToRefs } from 'pinia';
import { ref, type Ref } from 'vue';
import { sendActionIntoGoogleAnalytics } from '@/analytics/GoogleAnalytics';

const languageSelectionStore = useLanguageSelectionStore();

const {
    setSelectedLanguage,
    getTranslation,
} = languageSelectionStore;

const {
    selectedLanguage,
} = storeToRefs(languageSelectionStore);

const isShowLanguageList: Ref<boolean> = ref(false);

const toogleIsShowLanguageList = (isShow?: boolean): void => {
    isShow !== undefined 
    ? isShowLanguageList.value = isShow 
    : isShowLanguageList.value = !isShowLanguageList.value

    sendActionIntoGoogleAnalytics('toogleIsShowLanguageList', 'btn', 'toogle_show_language_list');
};

const selectTheLanguage = (appLanguage: AppLanguage): void => {
    setSelectedLanguage(appLanguage);
    toogleIsShowLanguageList(false);
    sendActionIntoGoogleAnalytics('selectTheLanguage', 'btn', 'select_the_language');
};

const checkingForAllValues = (locale: never): string => {
    return `${locale}`
};

const getLanguageForLocale = (locale: Locale): string => {
    switch (locale) {
        case 'en_GB': return 'English'
        case 'es_ES': return 'Español'
        case 'fr_FR': return 'Français'
        case 'hi_IN': return 'हिंदी'
        case 'it_IT': return 'Italiana'
        case 'ru_RU': return 'Русский'
        case 'tr_TR': return 'Türkçe'
        case 'zh_Hans_CN': return '汉语'
        default: return checkingForAllValues(locale)
    }
};

const localesList: Array<keyof AllKitsOfTranslatedWords<Locale>> = (Object.keys(allKitsOfTranslatedWords)) as Array<keyof AllKitsOfTranslatedWords<Locale>>;

const appLanguagesList: AppLanguage[] = localesList.map((locale: keyof AllKitsOfTranslatedWords<Locale>) => {
    const appLanguage: AppLanguage = {
        locale,
        language: getLanguageForLocale(locale),
    };

    return appLanguage
});

const appLanguagesListHeight: string = `${appLanguagesList.length * (1 + 0.25 * 2)}em`
</script>

<template>
<div class="languagesSelectionWrapper">
    <div class="languagesSelectionHeader">
        <p class="languagesSelectionTitle">{{ getTranslation('theLanguageSelection_language') }}: {{ selectedLanguage.language }}</p>
        <button class="languagesSelectionBtn" @click="toogleIsShowLanguageList()">{{ isShowLanguageList ? getTranslation('theLanguageSelection_cancel') : getTranslation('theLanguageSelection_changeTheLanguage') }}</button>
    </div>
    <ul class="languagesList" :class="{hiden: !isShowLanguageList}">
        <li class="languageItem" v-for="appLanguage, index of appLanguagesList" :key="index">
            <button class="languageBtn" @click="selectTheLanguage(appLanguage)">{{ appLanguage.language }}</button>
        </li>
    </ul>
</div>
</template>

<style scoped>
.languagesSelectionWrapper {
    width: 100%;
    margin-bottom: 1.5em;
    font-size: 1em;
    font-weight: 400;
    line-height: 1;
}

.languagesSelectionHeader {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px 15px;
    margin-bottom: 1em;
}

.languagesSelectionTitle {
    font-weight: 700;
}

.languagesSelectionBtn {
    padding: 0.2em 0.5em;
    color: #ffffff;
    background-color: #449944;
    box-shadow: inset 0 0 0.3em 0.2em #286928;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
}

.languagesSelectionBtn:hover {
    background-color: #227722;
}

.languagesList {
    height: min(calc(6em + 3px), calc(v-bind(appLanguagesListHeight) + 3px));
    width: 100%;
    overflow-y: scroll;
    transition: all 0.4s linear 0s;
}

.languagesList.hiden {
    height: 0;
}

.languageItem {
    width: 100%;
    border-bottom: 1px solid #999999;
}

.languageItem:last-child {
    border: none;
}

.languageBtn {
    width: 100%;
    padding: 0.25em;
    color: #dddddd;
    background-color: #6497d4;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    box-shadow: inset 0 0 0.5em 0.2em #385e8d;
}

.languageBtn:hover {
    color: #ffffff;
    background-color: #4e88ce;
}
</style>