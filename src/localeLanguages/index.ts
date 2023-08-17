import type { AllKitsOfTranslatedWords, Locale } from "@/types/localeLanguages";
import { be_BY } from "./be_BY"; //* - Belarusian, Belarus.
import { el_GR } from "./el_GR"; //* - Greek, Greece.
import { en_GB } from "./en_GB"; //* - English, United Kingdom.
import { es_ES } from "./es_ES"; //* - Spanish, Spain.
import { fr_FR } from "./fr_FR"; //* - French, France.
import { hi_IN } from "./hi_IN"; //* - Hindi, India.
import { hu_HU } from "./hu_HU"; //* - Hungarian, Hungary.
import { it_IT } from "./it_IT"; //* - Italian, Italy.
import { kk_KZ } from "./kk_KZ"; //* - Kazakh, Kazakhstan.
import { ru_RU } from "./ru_RU"; //* - Russian, Russia.
import { sr_RS } from "./sr_RS"; //* - Serbian, Serbia.
import { tr_TR } from "./tr_TR"; //* - Turkish, Turkey.
import { zh_Hans_CN } from "./zh_Hans_CN"; //* - Chinese (simplified), China.

export const allKitsOfTranslatedWords: AllKitsOfTranslatedWords<Locale> = {
    be_BY,
    el_GR,
    en_GB,
    es_ES,
    fr_FR,
    hi_IN,
    hu_HU,
    it_IT,
    kk_KZ,
    ru_RU,
    sr_RS,
    tr_TR,
    zh_Hans_CN,
};
