'use strict';
// DEV IS LAZY BUTTON
const $devLazy = document.querySelector('#dev-lazy');
$devLazy?.addEventListener('click', () => {
  const $suggestionsHeader = document.querySelector('#suggestions-header-text');
  const $suggestionsSubheader = document.querySelector(
    '#suggestions-subheader-text',
  );
  const $planetRecommendations = document.querySelector(
    '#planet-recommendations',
  );
  const $planetRecommendationPage = document.querySelector(
    '#planet-recommendations-page',
  );
  $planetRecommendationPage?.remove();
  revealAll();
  quizResponses.startQuiz = true;
  quizResponses.planetSearch = false;
  quizResponses.planetTemperature = 'null';
  quizResponses.planetMass = 'null';
  quizResponses.planetPeriod = 'null';
  quizResponses.planetRadius = 'null';
  quizResponses.planetDistance = '0';
  generateSummary();
  generateApiCall();
  console.log(apiURL);
  fetchExoplanetData(apiURL);
  buildSuggestionsPage();
  setTimeout(() => revealText($suggestionsHeader), 250);
  setTimeout(() => revealText($suggestionsSubheader), 750);
  setTimeout(() => revealText($planetRecommendations), 1500);
  console.log('quizResponses:', quizResponses);
});
let quizResponses = {};
// landing page (data-view="0")
const $getStartedButton = document.getElementById('get-started');
$getStartedButton?.addEventListener('click', () => {
  quizResponses.startQuiz = true;
  revealPage(1);
  scrollDown();
  setTimeout(() => hidePage(0), 750);
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
  revealPage(2);
  scrollDown();
  setTimeout(() => hidePage(1), 750);
});
// quiz 2 - planet temperature (data-view="2")
const $temperatureCold = document.querySelector('#temp-cold');
const $temperatureHot = document.querySelector('#temp-hot');
const $temperatureNull = document.querySelector('#temp-null');
$temperatureCold?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'cold';
  revealPage(3);
  scrollDown();
  setTimeout(() => hidePage(2), 750);
});
$temperatureHot?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'hot';
  revealPage(3);
  scrollDown();
  setTimeout(() => hidePage(2), 750);
});
$temperatureNull?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'null';
  revealPage(3);
  scrollDown();
  setTimeout(() => hidePage(2), 750);
});
// quiz 3 - planet mass (data-view="3")
const $massSmall = document.querySelector('#mass-small');
const $massLarge = document.querySelector('#mass-large');
const $massNull = document.querySelector('#mass-null');
$massSmall?.addEventListener('click', () => {
  quizResponses.planetMass = 'small';
  revealPage(4);
  scrollDown();
  setTimeout(() => hidePage(3), 750);
});
$massLarge?.addEventListener('click', () => {
  quizResponses.planetMass = 'large';
  revealPage(4);
  scrollDown();
  setTimeout(() => hidePage(3), 750);
});
$massNull?.addEventListener('click', () => {
  quizResponses.planetMass = 'null';
  revealPage(4);
  scrollDown();
  setTimeout(() => hidePage(3), 750);
});
// quiz 4 - planet period (data-view="4")
const $periodLong = document.querySelector('#period-long');
const $periodShort = document.querySelector('#period-short');
const $periodNull = document.querySelector('#period-null');
$periodLong?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'long';
  revealPage(5);
  scrollDown();
  setTimeout(() => hidePage(4), 750);
});
$periodShort?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'short';
  revealPage(5);
  scrollDown();
  setTimeout(() => hidePage(4), 750);
});
$periodNull?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'null';
  revealPage(5);
  scrollDown();
  setTimeout(() => hidePage(4), 750);
});
// quiz 5 - planet radius (data-view="5")
const $radiusLarge = document.querySelector('#radius-large');
const $radiusSmall = document.querySelector('#radius-small');
const $radiusNull = document.querySelector('#radius-null');
$radiusLarge?.addEventListener('click', () => {
  quizResponses.planetRadius = 'large';
  revealPage(6);
  scrollDown();
  setTimeout(() => hidePage(5), 750);
});
$radiusSmall?.addEventListener('click', () => {
  quizResponses.planetRadius = 'small';
  revealPage(6);
  scrollDown();
  setTimeout(() => hidePage(5), 750);
});
$radiusNull?.addEventListener('click', () => {
  quizResponses.planetRadius = 'null';
  revealPage(6);
  scrollDown();
  setTimeout(() => hidePage(5), 750);
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
  } else if (!isNaN(Number(distanceTerm)) && Number(distanceTerm) > 50) {
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
    revealPage(7);
    scrollDown();
    generateSummary();
    setTimeout(() => hidePage(6), 750);
  }
});
// SUMMARY PAGE
const $distanceForm = document.getElementById('distance');
// quiz response messages
const $summaryPageGetSuggestionsButton =
  document.querySelector('#get-suggestions');
const $summaryPageRetakeQuizButton = document.querySelector(
  '#summary-retake-quiz',
);
$summaryPageGetSuggestionsButton?.addEventListener('click', async () => {
  // generate API url and make the calls
  generateApiCall();
  fetchExoplanetData(apiURL);
  await buildSuggestionsPage();
  // reveal/scroll to load page, hide summary
  revealPage(8);
  scrollDown();
  setTimeout(() => hidePage(7), 750);
  // reveal/scroll to suggestions, hide quiz
  setTimeout(() => revealPage(9), 3000);
  setTimeout(() => scrollDown(), 3500);
  setTimeout(() => generateSuggestionsPage(), 3750);
  setTimeout(() => hideQuiz(), 4250);
});
$summaryPageRetakeQuizButton?.addEventListener('click', () => {
  quizResponses = {};
  $distanceForm.reset();
  distanceInputRemoveErrors();
  scrollToTop();
  setTimeout(() => hideAll(), 750);
});
// SUGGESTIONS PAGE
// building the suggestions page
const $suggestionsPageRetakeQuizButton = document.querySelector(
  '#suggestions-retake-quiz',
);
$suggestionsPageRetakeQuizButton?.addEventListener('click', () => {
  quizResponses = {};
  $distanceForm.reset();
  distanceInputRemoveErrors();
  scrollToTop();
  setTimeout(() => hideAll(), 750);
});
const $suggestionsNextButton = document.querySelector('#suggestions-next-icon');
const $suggestionsPreviousButton = document.querySelector(
  '#suggestions-previous-icon',
);
// previous and next buttons on suggestion page
$suggestionsNextButton?.addEventListener('click', () => {
  pageChange();
  increaseAPIOffset();
  console.log(apiURL);
  fetchExoplanetData(apiURL);
  $suggestionsLoading?.classList.remove('hidden');
  buildSuggestionsPage();
});
$suggestionsPreviousButton?.addEventListener('click', () => {
  pageChange();
  decreaseAPIOffset();
  console.log(apiURL);
  fetchExoplanetData(apiURL);
  $suggestionsLoading?.classList.remove('hidden');
  buildSuggestionsPage();
});
// PLANET INFORMATION PAGE
let favoritesList = [];
// retake quiz button
const $infoPageRetakeQuizButton = document.querySelector('#info-retake-quiz');
$infoPageRetakeQuizButton?.addEventListener('click', () => {
  quizResponses = {};
  $distanceForm.reset();
  distanceInputRemoveErrors();
  scrollToTop();
  setTimeout(() => hideAll(), 750);
});
// clicking on a planet
const $planetRecommendations = document.querySelector(
  '#planet-recommendations',
);
$planetRecommendations?.addEventListener('click', (event) => {
  const planetClicked = event.target;
  planetClickedNumber = Number(planetClicked?.dataset.planetRecommendation);
  if (planetClicked.classList.contains('entry-click')) {
    // remove the previous page
    const $planetInformationPageHolder = document.querySelector(
      '#planet-information-page-holder',
    );
    $planetInformationPageHolder?.remove();
    // build and show new information page
    buildInformationPage();
    revealPage(10);
    // scrollToInformation();
    // setTimeout(() => hidePage(9), 750);
  }
  // add planets to favorites
  else if (planetClicked.classList.contains('icon-click')) {
    // change heart icon
    if (planetClicked.classList.contains('fa-regular')) {
      planetClicked.classList.remove('fa-regular');
      planetClicked.classList.add('fa-solid');
      const favoritePlanet = {
        distance_light_year:
          exoplanetData[planetClickedNumber].distance_light_year,
        host_star_mass: exoplanetData[planetClickedNumber].host_star_mass,
        host_star_temperature:
          exoplanetData[planetClickedNumber].host_star_temperature,
        mass: exoplanetData[planetClickedNumber].mass,
        name: exoplanetData[planetClickedNumber].name,
        period: exoplanetData[planetClickedNumber].period,
        radius: exoplanetData[planetClickedNumber].radius,
        semi_major_axis: exoplanetData[planetClickedNumber].semi_major_axis,
        temperature: exoplanetData[planetClickedNumber].temperature,
        planetClickedNumber,
      };
      // push to favorites array
      favoritesList.push(favoritePlanet);
      console.log('favorites list:', favoritesList);
    }
    // remove from favorites list
    else {
      planetClicked.classList.add('fa-regular');
      planetClicked.classList.remove('fa-solid');
      for (let i = 0; i < favoritesList.length; i++) {
        if (favoritesList[i].planetClickedNumber === planetClickedNumber) {
          favoritesList.splice(i, 1);
        }
      }
      favoritesList.splice(planetClickedNumber, 1);
      console.log('favoritesList', favoritesList);
    }
  }
});
// event listener to go back to recommendations
const $recommendationsInfoPage = document.querySelector(
  '#back-to-recommendations',
);
// scroll back to recommendations page
$recommendationsInfoPage?.addEventListener('click', () => {
  revealPage(9);
  scrollToRecommendations();
  setTimeout(() => hidePage(10), 750);
});
// add planet to favorites from this page
const $infoPageFavoriteButton = document.querySelector('#info-page-favorite');
$infoPageFavoriteButton?.addEventListener('click', (event) => {
  console.log(planetClickedNumber);
  const favoriteClicked = event.target;
  // change appearance of heart
  if (favoriteClicked.classList.contains('fa-regular')) {
    favoriteClicked.classList.remove('fa-regular');
    favoriteClicked.classList.add('fa-solid');
    // push to favorites array
    const favoritePlanet = {
      distance_light_year:
        exoplanetData[planetClickedNumber].distance_light_year,
      host_star_mass: exoplanetData[planetClickedNumber].host_star_mass,
      host_star_temperature:
        exoplanetData[planetClickedNumber].host_star_temperature,
      mass: exoplanetData[planetClickedNumber].mass,
      name: exoplanetData[planetClickedNumber].name,
      period: exoplanetData[planetClickedNumber].period,
      radius: exoplanetData[planetClickedNumber].radius,
      semi_major_axis: exoplanetData[planetClickedNumber].semi_major_axis,
      temperature: exoplanetData[planetClickedNumber].temperature,
    };
    favoritesList.push(favoritePlanet);
    console.log('favorites list:', favoritesList);
  }
  // remove heart and remove from favorites array
  else if (favoriteClicked.classList.contains('fa-solid')) {
    favoriteClicked.classList.remove('fa-solid');
    favoriteClicked.classList.add('fa-regular');
    for (let i = 0; i < favoritesList.length; i++) {
      if (favoritesList[i].planetClickedNumber === planetClickedNumber) {
        favoritesList.splice(i, 1);
      }
    }
    console.log('favorites list:', favoritesList);
  }
});
