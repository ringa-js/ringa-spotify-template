import ENGLISH_LANGUAGE_PACK from './assets/i18n/en/pack.json';
import SWEDISH_LANGUAGE_PACK from './assets/i18n/sv/pack.json';

const EN = 'en';
const SV = 'sv';

/**
 * The primary I18NModel instance is created in DefaultApplicationRoot. ApplicationLayout extends this and then
 * calls our setup function below. Here we add all our keys to the language pack before the application is rendered
 * so that we can then display the values immediately.
 *
 * Note: in this template we are loading all of our language data directly into our final JS artifact. For large
 * applications this is a poor strategy since we would probably want to dynamically load our language data from a DB
 * or a file stored on the server.
 */
export function setup(i18NModel) {
  // Language packs are a JSON file of multiple keys
  i18NModel.mergeLanguagePack(EN, ENGLISH_LANGUAGE_PACK);
  i18NModel.mergeLanguagePack(SV, SWEDISH_LANGUAGE_PACK);
}