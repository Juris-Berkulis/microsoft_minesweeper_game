import type { AllKitsOfTranslatedWords, Locale } from "@/types/localeLanguages";
import { en_GB } from "./en_GB"; //* - English, United Kingdom.
import { es_ES } from "./es_ES"; //* - Spanish, Spain.
import { fr_FR } from "./fr_FR"; //* - French, France.
import { hi_IN } from "./hi_IN"; //* - Hindi, India.
import { it_IT } from "./it_IT"; //* - Italian, Italy.
import { ru_RU } from "./ru_RU"; //* - Russian, Russia.
import { tr_TR } from "./tr_TR"; //* - Turkish, Turkey.
import { zh_Hans_CN } from "./zh_Hans_CN"; //* - Chinese (simplified), China.

export const allKitsOfTranslatedWords: AllKitsOfTranslatedWords<Locale> = {
    en_GB,
    es_ES,
    fr_FR,
    hi_IN,
    it_IT,
    ru_RU,
    tr_TR,
    zh_Hans_CN,
};
