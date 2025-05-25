'use strict';
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
// quiz 3 - planet mass (data-view="3")
const $smallMass = document.querySelector('#small-mass');
const $largeMass = document.querySelector('#large-mass');
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
// quiz 4 - planet period (data-view="4")
const $longPeriod = document.querySelector('#long-period');
const $shortPeriod = document.querySelector('#short-period');
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
// quiz 5 - planet radius (data-view="5")
const $largeRadius = document.querySelector('#large-radius');
const $smallRadius = document.querySelector('#small-radius');
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
// BUILDING SUGGESTIONS PAGE
// quiz response messages
const $summaryPageGetSuggestionsButton =
  document.querySelector('#get-suggestions');
const $summaryPageRetakeQuizButton = document.querySelector(
  '#summary-retake-quiz',
);
$summaryPageGetSuggestionsButton?.addEventListener('click', () => {
  dataView = 7;
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
