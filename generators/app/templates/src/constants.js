export const Country = {
  cz: { code: 'cs-CZ', currency: 'EUR', language: 'Czech' },
  de: { code: 'de-DE', currency: 'EUR', language: 'German' },
  dk: { code: 'da-DK', currency: 'DKK', language: 'Danish' },
  fi: { code: 'fi-FI', currency: 'EUR', language: 'Finnish' },
  no: { code: 'nd-NO', currency: 'NOK', language: 'Norwegian Bokmål' },
  pl: { code: 'pl-PL', currency: 'PLN', language: 'Polish' },
  se: { code: 'sv-SE', currency: 'SEK', language: 'Swedish' },
  us: { code: 'en-US', currency: 'USD', language: 'International English' },

  // fallback used when the user visiting from a language not on this list
  xx: { code: 'en-US', currency: 'USD', language: 'International English' }
};

export const SupportedLanguages = [
  'cs-CZ',
  'de-DE',
  'en-US',
  'fi-FI',
  'nd-NO',
  'pl-PL',
  'sv-SE'
];
