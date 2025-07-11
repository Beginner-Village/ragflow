import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { LanguageAbbreviation } from '@/constants/common';
import translation_de from './de';
import translation_en from './en';
import translation_es from './es';
import translation_id from './id';
import translation_ja from './ja';
import translation_pt_br from './pt-br';
import { createTranslationTable, flattenObject } from './until';
import translation_vi from './vi';
import translation_zh from './zh';
import translation_zh_traditional from './zh-traditional';

const resources = {
  [LanguageAbbreviation.En]: translation_en,
  [LanguageAbbreviation.Zh]: translation_zh,
  [LanguageAbbreviation.ZhTraditional]: translation_zh_traditional,
  [LanguageAbbreviation.Id]: translation_id,
  [LanguageAbbreviation.Ja]: translation_ja,
  [LanguageAbbreviation.Es]: translation_es,
  [LanguageAbbreviation.Vi]: translation_vi,
  [LanguageAbbreviation.PtBr]: translation_pt_br,
  [LanguageAbbreviation.De]: translation_de,
};
const enFlattened = flattenObject(translation_en);
const viFlattened = flattenObject(translation_vi);
const esFlattened = flattenObject(translation_es);
const zhFlattened = flattenObject(translation_zh);
const jaFlattened = flattenObject(translation_ja);
const pt_brFlattened = flattenObject(translation_pt_br);
const zh_traditionalFlattened = flattenObject(translation_zh_traditional);
const deFlattened = flattenObject(translation_de);
export const translationTable = createTranslationTable(
  [
    enFlattened,
    viFlattened,
    esFlattened,
    zhFlattened,
    zh_traditionalFlattened,
    jaFlattened,
    pt_brFlattened,
    deFlattened,
  ],
  [
    'English',
    'Vietnamese',
    'Spanish',
    'zh',
    'zh-TRADITIONAL',
    'ja',
    'pt-BR',
    'Deutsch',
  ],
);
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      lookupLocalStorage: 'lng',
    },
    supportedLngs: Object.values(LanguageAbbreviation),
    resources,
    fallbackLng: 'zh', // 修改默认语言为中文
    lng: 'zh', // 设置初始语言为中文
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
