'use strict';
// COLLECTING QUIZ ANSWERS
const quizResponses = {};
// landing page (data-view="0")
const $getStartedButton = document.getElementById('get-started');
$getStartedButton?.addEventListener('click', () => {
  quizResponses.startQuiz = true;
  // console.log('start quiz', quizResponses);
});
// quiz 1 - planet search (data-view="1")
const $planetSearch = document.querySelector('#planet-search-input');
const $noPlanetSearchButton = document.getElementById('no-planet-search');
$planetSearch?.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    event.preventDefault();
    quizResponses.planetSearch = $planetSearch.value;
    // console.log('planet search:', quizResponses);
  }
});
$noPlanetSearchButton?.addEventListener('click', () => {
  quizResponses.planetSearch = false;
  // console.log('planet search:', quizResponses);
});
// quiz 2 - planet temperature (data-view="2")
const $temperatureCold = document.querySelector('#temp-cold');
const $temperatureHot = document.querySelector('#temp-hot');
$temperatureCold?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'cold';
  // console.log('planet temperature:', quizResponses);
});
$temperatureHot?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'hot';
  // console.log('planet temperature:', quizResponses);
});
// quiz 3 - planet mass (data-view="3")
const $smallMass = document.querySelector('#small-mass');
const $largeMass = document.querySelector('#large-mass');
$smallMass?.addEventListener('click', () => {
  quizResponses.planetMass = 'small';
  // console.log('planet mass:', quizResponses);
});
$largeMass?.addEventListener('click', () => {
  quizResponses.planetMass = 'large';
  // console.log('planet mass:', quizResponses);
});
// quiz 4 - planet period (data-view="4")
const $longPeriod = document.querySelector('#long-period');
const $shortPeriod = document.querySelector('#short-period');
$longPeriod?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'long';
  // console.log('planet period:', quizResponses);
});
$shortPeriod?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'short';
  // console.log('planet period:', quizResponses);
});
// quiz 5 - planet radius (data-view="5")
const $largeRadius = document.querySelector('#large-radius');
const $smallRadius = document.querySelector('#small-radius');
$largeRadius?.addEventListener('click', () => {
  quizResponses.planetRadius = 'large';
  // console.log('planet radius:', quizResponses);
});
$smallRadius?.addEventListener('click', () => {
  quizResponses.planetRadius = 'small';
  // console.log('planet radius:', quizResponses);
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
function distanceInputRemoveErrors() {
  $distanceInputErrorString.classList.add('hidden');
  $distanceInputErrorInteger.classList.add('hidden');
  $distanceInputErrorValue.classList.add('hidden');
}
$distanceInput.addEventListener('input', (event) => {
  const distanceTarget = event.target;
  const distanceTerm = distanceTarget?.value;
  if (isNaN(Number(distanceTerm))) {
    distanceInputRemoveErrors();
    $distanceInputErrorString.classList.remove('hidden');
  }
  if (!isNaN(Number(distanceTerm)) && distanceTerm.includes('.')) {
    distanceInputRemoveErrors();
    $distanceInputErrorInteger.classList.remove('hidden');
  }
  if (!isNaN(Number(distanceTerm)) && Number(distanceTerm) > 30000) {
    distanceInputRemoveErrors();
    $distanceInputErrorValue.classList.remove('hidden');
  }
});
$distanceInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    quizResponses.planetDistance = $distanceInput.value;
    // console.log(quizResponses);
  }
});
