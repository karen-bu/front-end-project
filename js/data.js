'use strict';
const apiKey1 = 'zt9vRW46vl4e8li5HhlgnA=';
const apiKey2 = '=HWWTaldjD4VJd3pb';
const apiKey = apiKey1.concat(apiKey2);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchExoplanetData(url) {
  try {
    const apiData = await fetch(url, {
      headers: { 'X-Api-Key': apiKey },
    });
    if (!apiData.ok) throw new Error(`HTTP error! Status: ${apiData.status}`);
    const exoplanetData = await apiData.json();
    console.log(exoplanetData);
  } catch (error) {
    console.error('Error:', error);
  }
}
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
function scrollDown() {
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth',
  });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hidePrev() {
  quizPages[dataView - 1].classList.add('hidden');
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function revealAll() {
  for (let i = 0; i < quizPages.length; i++) {
    quizPages[i].classList.remove('hidden');
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hideQuiz() {
  dataView = 0;
  for (let i = 1; i < 9; i++) {
    quizPages[i].classList.add('hidden');
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hideAll() {
  dataView = 0;
  for (let i = 1; i < quizPages.length; i++) {
    quizPages[i].classList.add('hidden');
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function showLoad() {
  hideAll();
  quizPages[8].classList.remove('hidden');
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
  } else if (quizResponses.planetTemperature === 'hot') {
    const planetTempMsg = 'is warm and cozy';
    $summaryTemperature.textContent = planetTempMsg;
  } else if (quizResponses.planetTemperature === 'medium') {
    const planetTempMsg = 'like april 25th - not too hot, not too cold';
    $summaryTemperature.textContent = planetTempMsg;
  }
  const $summaryMass = document.querySelector('#summary-mass');
  if (quizResponses.planetMass === 'small') {
    const planetMassMsg = 'makes you feel lighter';
    $summaryMass.textContent = planetMassMsg;
  } else if (quizResponses.planetMass === 'large') {
    const planetMassMsg = 'makes you feel grounded';
    $summaryMass.textContent = planetMassMsg;
  } else if (quizResponses.planetMass === 'medium') {
    const planetMassMsg = 'makes you stay in perfect balance';
    $summaryMass.textContent = planetMassMsg;
  }
  const $summaryPeriod = document.querySelector('#summary-period');
  if (quizResponses.planetPeriod === 'long') {
    const planetPeriodMsg = 'gives you more time';
    $summaryPeriod.textContent = planetPeriodMsg;
  } else if (quizResponses.planetPeriod === 'short') {
    const planetPeriodMsg = 'helps the time fly by';
    $summaryPeriod.textContent = planetPeriodMsg;
  } else if (quizResponses.planetPeriod === 'medium') {
    const planetPeriodMsg = 'gives you just enough time';
    $summaryPeriod.textContent = planetPeriodMsg;
  }
  const $summaryRadius = document.querySelector('#summary-radius');
  if (quizResponses.planetRadius === 'large') {
    const planetRadiusMsg = 'has plenty of room';
    $summaryRadius.textContent = planetRadiusMsg;
  } else if (quizResponses.planetRadius === 'small') {
    const planetRadiusMsg = 'is compact and small';
    $summaryRadius.textContent = planetRadiusMsg;
  } else if (quizResponses.planetRadius === 'medium') {
    const planetRadiusMsg =
      'is just the right size, like a magical pair of jeans';
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function revealText(element) {
  element.classList.remove('invisible');
  element.classList.add('visible');
}
