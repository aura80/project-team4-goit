import updatePage from './main.js';

const countries = [
  { name: 'All countries', code: '' },
  { name: 'United States Of America', code: 'US' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Anguilla', code: 'AI' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Barbados', code: 'BB' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Bermuda', code: 'BM' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Canada', code: 'CA' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Faroe Islands', code: 'FO' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Gibraltar', code: 'GI' },
  { name: 'Great Britain', code: 'GB' },
  { name: 'Greece', code: 'GR' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Japan', code: 'JP' },
  { name: 'Republic of Korea', code: 'KR' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Lebanon', code: 'LB' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Malta', code: 'MT' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Montenegro', code: 'ME' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Netherlands Antilles', code: 'AN' },
  { name: 'New Zealand', code: 'NM' },
  { name: 'Northern Ireland', code: 'ND' },
  { name: 'Norway', code: 'NO' },
  { name: 'Peru', code: 'PE' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russian Federation', code: 'RU' },
  { name: 'Saint Lucia', code: 'LC' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Serbia', code: 'RS' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Taiwan', code: 'TW' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Trinidad and Tobago', code: 'TT' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Venezuela', code: 'VE' },
];

const countryInput = document.getElementById('country-input');
const countryDropdown = document.querySelector('.country-container');

// Populate country list dynamically
const countryListElement = document.querySelector('.country-list');

function populateCountryList(filteredCountries) {
  // Clear existing list
  countryListElement.innerHTML = '';

  // Populate list with filtered countries
  filteredCountries.forEach(country => {
    const listItem = document.createElement('li');
    listItem.className = 'country-item';
    listItem.setAttribute('data-country', country.code);
    listItem.textContent = country.name;
    countryListElement.appendChild(listItem);
  });
}

// Initially populate the list with all countries
if (countryListElement) {
  populateCountryList(countries);
} else {
  console.error('Element with class "country-list" not found');
}

if (countryInput && countryDropdown) {
  // Toggle dropdown visibility
  countryInput.addEventListener('click', () => {
    countryDropdown.classList.toggle('visible');
  });

  // Clear input value on focus and display placeholder
  countryInput.addEventListener('focus', () => {
    countryInput.value = '';
    countryInput.dataset.country = '';
    populateCountryList(countries);
  });

  // Search and filter countries on keyup
  countryInput.addEventListener('keyup', () => {
    const searchTerm = countryInput.value.toLowerCase().trim();

    // Create a regex to match the search term at the start of each word
    const searchRegex = new RegExp(`\\b${searchTerm}`, 'i'); // \b ensures it matches the start of a word

    const filteredCountries = countries.filter(country =>
      searchRegex.test(country.name)
    );

    populateCountryList(filteredCountries);
  });

  // Event delegation for selecting a country
  countryDropdown.addEventListener('click', event => {
    const item = event.target;
    if (item && item.classList.contains('country-item')) {
      countryCode = item.getAttribute('data-country');
      const selectedCountryName = item.textContent;

      // Update input field with selected country
      countryInput.value = selectedCountryName;
      countryInput.setAttribute('data-country', countryCode);

      // Close dropdown
      countryDropdown.classList.remove('visible');

      // Fetch events for the selected country
      let searchInputValue = document.getElementById('search').value;
      let searchEvent = searchInputValue !== '' ? searchInputValue : 'events';
      updatePage(searchEvent);
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', event => {
    if (
      !countryInput.contains(event.target) &&
      !countryDropdown.contains(event.target)
    ) {
      countryDropdown.classList.remove('visible');
    }
  });
} else {
  console.error('Country input or dropdown element not found.');
}
