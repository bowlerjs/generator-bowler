export const Country = {
  at: { code: 'de-AT', currency: 'EUR', language: 'Austrian German' },
  ca: { code: 'en-CA', currency: 'CAD', language: 'Canadian English' },
  ch: { code: 'de-CH', currency: 'EUR', language: 'Switzerland German' },
  cz: { code: 'cs-CZ', currency: 'EUR', language: 'Czech' },
  de: { code: 'de-DE', currency: 'EUR', language: 'German' },
  dk: { code: 'da-DK', currency: 'DKK', language: 'Danish' },
  fi: { code: 'fi-FI', currency: 'EUR', language: 'Finnish' },
  gb: { code: 'en-GB', currency: 'GBP', language: 'UK English' },
  in: { code: 'en-IN', currency: 'EUR', language: 'Irish English' },
  no: { code: 'nd-NO', currency: 'NOK', language: 'Norwegian Bokmål' },
  pl: { code: 'pl-PL', currency: 'PLN', language: 'Polish' },
  se: { code: 'sv-SE', currency: 'SEK', language: 'Swedish' },
  us: { code: 'en-US', currency: 'USD', language: 'International English' },

  // fallback used when the user visiting from a language not on this list
  xx: { code: 'en-US', currency: 'USD', language: 'International English' }
};

export const SupportedLanguages = [
  'cs-CZ',
  'de-AT',
  'de-DE',
  'de-CH',
  'en-CA',
  'en-GB',
  'en-IN',
  'en-US',
  'fi-FI',
  'nd-NO',
  'pl-PL',
  'sv-SE'
];

export const Regulators = {
  gb: 'UKGC',
  dk: 'DGA'
};
