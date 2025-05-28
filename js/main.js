'use strict';
// DEV IS LAZY BUTTON
const $devLazy = document.querySelector('#dev-lazy');
$devLazy?.addEventListener('click', () => {
  revealAll();
  quizResponses.startQuiz = true;
  quizResponses.planetSearch = false;
  quizResponses.planetTemperature = 'hot';
  quizResponses.planetMass = 'small';
  quizResponses.planetPeriod = 'long';
  quizResponses.planetRadius = 'small';
  quizResponses.planetDistance = '1994';
  generateSummary();
  console.log('quizResponses:', quizResponses);
});
let quizResponses = {};
// landing page (data-view="0")
const $getStartedButton = document.getElementById('get-started');
$getStartedButton?.addEventListener('click', () => {
  quizResponses.startQuiz = true;
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
// quiz 1 - planet search (data-view="1")
const $planetSearch = document.querySelector('#planet-search-input');
const $noPlanetSearchButton = document.getElementById('no-planet-search');
$planetSearch?.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    event.preventDefault();
    quizResponses.planetSearch = $planetSearch.value;
  }
});
$noPlanetSearchButton?.addEventListener('click', () => {
  quizResponses.planetSearch = false;
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
// quiz 2 - planet temperature (data-view="2")
const $temperatureCold = document.querySelector('#temp-cold');
const $temperatureHot = document.querySelector('#temp-hot');
const $temperatureMedium = document.querySelector('#temp-medium');
$temperatureCold?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'cold';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
$temperatureHot?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'hot';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
$temperatureMedium?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'medium';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
// quiz 3 - planet mass (data-view="3")
const $smallMass = document.querySelector('#mass-small');
const $largeMass = document.querySelector('#mass-large');
const $mediumMass = document.querySelector('#mass-medium');
$smallMass?.addEventListener('click', () => {
  quizResponses.planetMass = 'small';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
$largeMass?.addEventListener('click', () => {
  quizResponses.planetMass = 'large';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
$mediumMass?.addEventListener('click', () => {
  quizResponses.planetMass = 'medium';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
// quiz 4 - planet period (data-view="4")
const $longPeriod = document.querySelector('#period-long');
const $shortPeriod = document.querySelector('#period-short');
const $mediumPeriod = document.querySelector('#period-medium');
$longPeriod?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'long';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
$shortPeriod?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'short';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
$mediumPeriod?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'medium';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
// quiz 5 - planet radius (data-view="5")
const $largeRadius = document.querySelector('#radius-large');
const $smallRadius = document.querySelector('#radius-small');
const $mediumRadius = document.querySelector('#radius-medium');
$largeRadius?.addEventListener('click', () => {
  quizResponses.planetRadius = 'large';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
$smallRadius?.addEventListener('click', () => {
  quizResponses.planetRadius = 'small';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
$mediumRadius?.addEventListener('click', () => {
  quizResponses.planetRadius = 'medium';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});
// quiz 6 - planet distance (data-view="6")
const $distanceInput = document.querySelector('#distance-input');
const $distanceInputErrorString = document.querySelector(
  '#distance-input-error-string',
);
const $distanceInputErrorInteger = document.querySelector(
  '#distance-input-error-integer',
);
const $distanceInputErrorValue = document.querySelector(
  '#distance-input-error-value',
);
$distanceInput.addEventListener('input', (event) => {
  const distanceTarget = event.target;
  const distanceTerm = distanceTarget?.value;
  if (isNaN(Number(distanceTerm))) {
    distanceInputRemoveErrors();
    $distanceInputErrorString.classList.remove('hidden');
  } else if (!isNaN(Number(distanceTerm)) && distanceTerm.includes('.')) {
    distanceInputRemoveErrors();
    $distanceInputErrorInteger.classList.remove('hidden');
  } else if (!isNaN(Number(distanceTerm)) && Number(distanceTerm) > 30000) {
    distanceInputRemoveErrors();
    $distanceInputErrorValue.classList.remove('hidden');
  } else if (distanceTerm === '') {
    distanceInputRemoveErrors();
  } else {
    distanceInputRemoveErrors();
  }
});
$distanceInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    quizResponses.planetDistance = $distanceInput.value;
    event.preventDefault();
    revealNext();
    scrollDown();
    generateSummary();
    setTimeout(() => hidePrev(), 750);
  }
});
// SUMMARY PAGE
// quiz response messages
let apiURL = '';
const $summaryPageGetSuggestionsButton =
  document.querySelector('#get-suggestions');
const $summaryPageRetakeQuizButton = document.querySelector(
  '#summary-retake-quiz',
);
$summaryPageGetSuggestionsButton?.addEventListener('click', () => {
  dataView = 7;
  // generate API url and make the calls
  generateApiCall();
  fetchExoplanetData(apiURL);
  // reveal/scroll to load page, hide summary
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
  // reveal/scroll to suggestions, hide quiz
  setTimeout(() => revealNext(), 3000);
  setTimeout(() => scrollDown(), 3500);
  setTimeout(() => hideQuiz(), 4250);
});
$summaryPageRetakeQuizButton?.addEventListener('click', () => {
  quizResponses = {};
  scrollToTop();
  setTimeout(() => hideAll(), 1000);
});
// SUGGESTIONS PAGE
const $suggestionsPageRetakeQuizButton = document.querySelector(
  '#suggestions-retake-quiz',
);
$suggestionsPageRetakeQuizButton?.addEventListener('click', () => {
  scrollToTop();
  setTimeout(() => hideAll(), 750);
});
// GENERATE API URL
let apiTemp = '';
let apiMass = '';
let apiPeriod = '';
let apiRadius = '';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateApiCall() {
  if (quizResponses.planetTemperature === 'cold') {
    apiTemp = '&max_temperature=185';
  } else if (quizResponses.planetTemperature === 'hot') {
    apiTemp = '&min_temperature=186';
  } else if (quizResponses.planetTemperature === 'medium') {
    apiTemp = '&min_temperature=185&max_temperature=325';
  }
  if (quizResponses.planetMass === 'large') {
    apiMass = '&min_mass=2';
  } else if (quizResponses.planetMass === 'small') {
    apiMass = '&max_mass=0.003';
  } else if (quizResponses.planetMass === 'medium') {
    apiMass = '&min_mass=0.003&max_mass=2';
  }
  if (quizResponses.planetPeriod === 'large') {
    apiPeriod = '&min_period=730';
  } else if (quizResponses.planetPeriod === 'small') {
    apiPeriod = '&max_period=100';
  } else if (quizResponses.planetPeriod === 'medium') {
    apiPeriod = '&min_period=100&max_period=730';
  }
  if (quizResponses.planetRadius === 'large') {
    apiRadius = '&max_radius=3';
  } else if (quizResponses.planetRadius === 'small') {
    apiRadius = '&max_radius=1';
  } else if (quizResponses.planetRadius === 'medium') {
    apiRadius = '&min_radius=1&max_radius=3';
  }
  const apiDistance = `&min_distance_light_year=${quizResponses.planetDistance}`;
  const api1 = 'https://api.api-ninjas.com/v1/planets?';
  apiURL = api1
    .concat(apiTemp)
    .concat(apiMass)
    .concat(apiPeriod)
    .concat(apiRadius)
    .concat(apiDistance);
  console.log(quizResponses);
  console.log(apiURL);
}
