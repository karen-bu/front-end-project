'use strict';
const apiKey1 = 'zt9vRW46vl4e8li5HhlgnA=';
const apiKey2 = '=HWWTaldjD4VJd3pb';
const apiKey = apiKey1.concat(apiKey2);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// async function fetchExoplanetData(): Promise<void> {
//   try {
//     const apiData = await fetch(
//       'https://api.api-ninjas.com/v1/planets?min_radius=0',
//       {
//         headers: { 'X-Api-Key': apiKey },
//       },
//     );
//     if (!apiData.ok) throw new Error(`HTTP error! Status: ${apiData.status}`);
//     const exoplanetData = (await apiData.json()) as Exoplanet;
//     console.log(exoplanetData);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// fetchExoplanetData();
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
  quizPages[0].classList.remove('hidden');
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
  } else if (quizResponses.planetTemperature === 'null') {
    const planetTempMsg =
      'is of any temperature - you can adjust, you always do';
    $summaryTemperature.textContent = planetTempMsg;
  }
  const $summaryMass = document.querySelector('#summary-mass');
  if (quizResponses.planetMass === 'small') {
    const planetMassMsg = 'makes you feel lighter';
    $summaryMass.textContent = planetMassMsg;
  } else if (quizResponses.planetMass === 'large') {
    const planetMassMsg = 'makes you feel grounded';
    $summaryMass.textContent = planetMassMsg;
  } else if (quizResponses.planetMass === 'null') {
    const planetMassMsg =
      "makes you feel different somehow - it doesn't matter how";
    $summaryMass.textContent = planetMassMsg;
  }
  const $summaryPeriod = document.querySelector('#summary-period');
  if (quizResponses.planetPeriod === 'long') {
    const planetPeriodMsg = 'gives you more time';
    $summaryPeriod.textContent = planetPeriodMsg;
  } else if (quizResponses.planetPeriod === 'short') {
    const planetPeriodMsg = 'helps the time fly by';
    $summaryPeriod.textContent = planetPeriodMsg;
  } else if (quizResponses.planetPeriod === 'null') {
    const planetPeriodMsg =
      "gives you either more or less time - it's a construct, anyway";
    $summaryPeriod.textContent = planetPeriodMsg;
  }
  const $summaryRadius = document.querySelector('#summary-radius');
  if (quizResponses.planetRadius === 'large') {
    const planetRadiusMsg = 'has plenty of room';
    $summaryRadius.textContent = planetRadiusMsg;
  } else if (quizResponses.planetRadius === 'small') {
    const planetRadiusMsg = 'is compact and small';
    $summaryRadius.textContent = planetRadiusMsg;
  } else if (quizResponses.planetRadius === 'null') {
    const planetRadiusMsg = "is any size, as long as it's elsewhere";
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
