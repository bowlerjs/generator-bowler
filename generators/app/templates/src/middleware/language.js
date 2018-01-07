// @flow
import { Country, SupportedLanguages } from '../constants';

/**
 * @name language
 * @description Resolves the users preferred language
 */

export default (async function language(req, res, next) {
  // getting headers
  let lang;
  const browserLang = req.headers['accept-language'] || 'en-US';
  let prefLang = req.headers['x-pref-lang'];
  let countryCode = req.headers['cf-ipcountry'] || 'xx';

  /*
   * making sure the country code is lower case
   */
  countryCode = countryCode.toLowerCase();

  /*
   * If the countryCode is in our supported country list,
   * we accept it, else we fallback to international
   */
  countryCode = Object.keys(Country).indexOf(countryCode) !== -1 ? countryCode : 'xx';

  /*
   * If we don't have a preferred language,
   * but a browser language,
   * we use that as preferred language
   */
  if (!prefLang && browserLang) {
    prefLang = browserLang.split(',')[0];
  }

  /*
   * If the preferred language is not in our supported list of languages,
   * we fallback to the users country default or else the international fallback
   */
  if (!prefLang || SupportedLanguages.indexOf(prefLang) === -1) {
    const fallback = Country[countryCode.toLowerCase()];
    lang = fallback && fallback.code ? fallback.code : 'en-US';
  } else {
    lang = prefLang;
  }

  req.language = lang;
  req.country = countryCode;
  res.set({
    'X-Language': lang,
    'X-Country': countryCode
  });
  next();
});
