'use strict';
let quizResponses = {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchExoplanetData() {
  try {
    const apiData = await fetch(
      'https://api.api-ninjas.com/v1/planets?min_distance_light_year=30000',
      {
        headers: { 'X-Api-Key': 'zt9vRW46vl4e8li5HhlgnA==HWWTaldjD4VJd3pb' },
      },
    );
    if (!apiData.ok) throw new Error(`HTTP error! Status: ${apiData.status}`);
    const exoplanetData = await apiData.json();
    console.log(exoplanetData);
  } catch (error) {
    console.error('Error:', error);
  }
}
// fetchExoplanetData();
// REMOVING ERRORS FROM DISTANCE INPUT QUIZ PAGE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function distanceInputRemoveErrors() {
  $distanceInputErrorString.classList.add('hidden');
  $distanceInputErrorInteger.classList.add('hidden');
  $distanceInputErrorValue.classList.add('hidden');
}
// SCROLL FUNCTIONS
const quizPages = document.querySelectorAll('[data-view]');
console.log(quizPages);
let dataView = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function revealNext() {
  quizPages[dataView + 1].classList.remove('hidden');
  dataView += 1;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function stopScroll() {
  document.body.classList.add('stop-scroll');
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scrollDown() {
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth',
  });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  dataView = 0;
}
// GENERATING SUMMARY PAGE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateSummary() {
  const $summaryHeading = document.querySelector('#summary-heading');
  const $summaryTemperature = document.querySelector('#summary-temperature');
  if (!$summaryTemperature)
    throw new Error('$summaryTemperature does not exist!');
  if (quizResponses.planetTemperature === 'cold') {
    const planetTempMsg = 'is cool and refreshing';
    $summaryTemperature.textContent = planetTempMsg;
  } else {
    const planetTempMsg = 'is warm and cozy';
    $summaryTemperature.textContent = planetTempMsg;
  }
  const $summaryMass = document.querySelector('#summary-mass');
  if (quizResponses.planetMass === 'small') {
    const planetMassMsg = 'makes you feel lighter';
    $summaryMass.textContent = planetMassMsg;
  } else {
    const planetMassMsg = 'makes you feel grounded';
    $summaryMass.textContent = planetMassMsg;
  }
  const $summaryPeriod = document.querySelector('#summary-period');
  if (quizResponses.planetPeriod === 'long') {
    const planetPeriodMsg = 'gives you more time';
    $summaryPeriod.textContent = planetPeriodMsg;
  } else {
    const planetPeriodMsg = 'helps the time fly by';
    $summaryPeriod.textContent = planetPeriodMsg;
  }
  const $summaryRadius = document.querySelector('#summary-radius');
  if (quizResponses.planetRadius === 'large') {
    const planetRadiusMsg = 'gives you plenty of room';
    $summaryRadius.textContent = planetRadiusMsg;
  } else {
    const planetRadiusMsg = 'is cozy and small';
    $summaryRadius.textContent = planetRadiusMsg;
  }
  const $summaryDistance = document.querySelector('#summary-distance');
  const planetDistance = quizResponses.planetDistance;
  const planetDistanceMsg = `is at least ${planetDistance} light-years away`;
  $summaryDistance.textContent = planetDistanceMsg;
  setTimeout(() => revealText($summaryHeading), 250);
  setTimeout(() => revealText($summaryTemperature), 1000);
  setTimeout(() => revealText($summaryMass), 1500);
  setTimeout(() => revealText($summaryPeriod), 2000);
  setTimeout(() => revealText($summaryRadius), 2500);
  setTimeout(() => revealText($summaryDistance), 3000);
  setTimeout(() => revealText($summaryPageGetSuggestionsButton), 4000);
  setTimeout(() => revealText($summaryPageRetakeQuizButton), 4500);
}
// SUMMARY PAGE BUTTONS
const $summaryPageGetSuggestionsButton =
  document.querySelector('#get-suggestions');
const $summaryPageRetakeQuizButton = document.querySelector(
  '#summary-retake-quiz',
);
$summaryPageGetSuggestionsButton?.addEventListener('click', () => {
  dataView = 7;
  revealNext();
  scrollDown();
  stopScroll();
});
$summaryPageRetakeQuizButton?.addEventListener('click', () => {
  quizResponses = {};
  scrollToTop();
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function revealText(element) {
  element.classList.remove('invisible');
  element.classList.add('visible');
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function viewSwap() {
  dataView;
}
