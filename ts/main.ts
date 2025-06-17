// QUIZ PAGES

interface QuizResponses {
  startQuiz?: boolean;
  planetTemperature?: string;
  planetMass?: string;
  planetPeriod?: string;
  planetRadius?: string;
  planetDistance?: string | undefined;
}

let quizResponses: QuizResponses = {};

// landing page (data-view="0")

const $getStartedButton = document.getElementById('get-started');

$getStartedButton?.addEventListener('click', () => {
  quizResponses.startQuiz = true;
  revealPage(1);
  scrollDown();
  setTimeout(() => hidePage(0), 750);
});

// going to saved favorites using data from local storage
const $savedFavorites = document.querySelector('.saved-favorites');
const $clearFavorites = document.querySelector('.clear-favorites');

if (localStorage.getItem('favoritesList-storage') === null) {
  $savedFavorites?.classList.add('hidden');
  $clearFavorites?.classList.add('hidden');
} else {
  $savedFavorites?.classList.remove('hidden');
  $clearFavorites?.classList.remove('hidden');
}

$savedFavorites?.addEventListener('click', () => {
  readQuizResponses();
  generateApiCall();
  fetchExoplanetData(apiURL);
  readFavoritesList();
  buildSuggestionsPage();
  generateSuggestionsPage();
  buildFavoritesPage();

  revealPage(10);
  scrollToFavorites();
  setTimeout(() => hidePage(0), 750);
});

$clearFavorites?.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

// quiz 1 - planet temperature (data-view="1")
const $temperatureCold = document.querySelector(
  '#temp-cold',
) as HTMLButtonElement;

const $temperatureHot = document.querySelector(
  '#temp-hot',
) as HTMLButtonElement;

const $temperatureNull = document.querySelector(
  '#temp-null',
) as HTMLButtonElement;

$temperatureCold?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'cold';
  revealPage(2);
  scrollDown();
  setTimeout(() => hidePage(1), 750);
});

$temperatureHot?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'hot';
  revealPage(2);
  scrollDown();
  setTimeout(() => hidePage(1), 750);
});

$temperatureNull?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'null';
  revealPage(2);
  scrollDown();
  setTimeout(() => hidePage(1), 750);
});

// quiz 2 - planet mass (data-view="2")
const $massSmall = document.querySelector('#mass-small') as HTMLButtonElement;
const $massLarge = document.querySelector('#mass-large') as HTMLButtonElement;
const $massNull = document.querySelector('#mass-null') as HTMLButtonElement;

$massSmall?.addEventListener('click', () => {
  quizResponses.planetMass = 'small';
  revealPage(3);
  scrollDown();
  setTimeout(() => hidePage(2), 750);
});

$massLarge?.addEventListener('click', () => {
  quizResponses.planetMass = 'large';
  revealPage(3);
  scrollDown();
  setTimeout(() => hidePage(2), 750);
});

$massNull?.addEventListener('click', () => {
  quizResponses.planetMass = 'null';
  revealPage(3);
  scrollDown();
  setTimeout(() => hidePage(2), 750);
});

// quiz 3 - planet period (data-view="3")
const $periodLong = document.querySelector('#period-long') as HTMLButtonElement;
const $periodShort = document.querySelector(
  '#period-short',
) as HTMLButtonElement;
const $periodNull = document.querySelector('#period-null') as HTMLButtonElement;

$periodLong?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'long';
  revealPage(4);
  scrollDown();
  setTimeout(() => hidePage(3), 750);
});

$periodShort?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'short';
  revealPage(4);
  scrollDown();
  setTimeout(() => hidePage(3), 750);
});

$periodNull?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'null';
  revealPage(4);
  scrollDown();
  setTimeout(() => hidePage(3), 750);
});

// quiz 4 - planet radius (data-view="4")
const $radiusLarge = document.querySelector(
  '#radius-large',
) as HTMLButtonElement;
const $radiusSmall = document.querySelector(
  '#radius-small',
) as HTMLButtonElement;
const $radiusNull = document.querySelector('#radius-null') as HTMLButtonElement;

$radiusLarge?.addEventListener('click', () => {
  quizResponses.planetRadius = 'large';
  revealPage(5);
  scrollDown();
  setTimeout(() => hidePage(4), 750);
});

$radiusSmall?.addEventListener('click', () => {
  quizResponses.planetRadius = 'small';
  revealPage(5);
  scrollDown();
  setTimeout(() => hidePage(4), 750);
});

$radiusNull?.addEventListener('click', () => {
  quizResponses.planetRadius = 'null';
  revealPage(5);
  scrollDown();
  setTimeout(() => hidePage(4), 750);
});

// quiz 5 - planet distance (data-view="5")
const $distanceInput = document.querySelector(
  '#distance-input',
) as HTMLFormElement;

const $distanceInputErrorString = document.querySelector(
  '#distance-input-error-string',
) as HTMLElement;

const $distanceInputErrorInteger = document.querySelector(
  '#distance-input-error-integer',
) as HTMLElement;

const $distanceInputErrorValue = document.querySelector(
  '#distance-input-error-value',
) as HTMLElement;

$distanceInput.addEventListener('input', (event: Event) => {
  const distanceTarget = event.target as HTMLInputElement;
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

$distanceInput.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    quizResponses.planetDistance = $distanceInput.value;
    event.preventDefault();
    revealPage(6);
    scrollDown();
    generateSummary();
    setTimeout(() => hidePage(5), 750);
  }
});

// SUMMARY PAGE (data-view="6")

const $distanceForm = document.getElementById('distance') as HTMLFormElement;

// quiz response messages

const $summaryPageGetSuggestionsButton = document.querySelector(
  '#get-suggestions',
) as HTMLButtonElement;

const $summaryPageRetakeQuizButton = document.querySelector(
  '#summary-retake-quiz',
) as HTMLButtonElement;

$summaryPageGetSuggestionsButton?.addEventListener('click', async () => {
  // write quiz responses to local storage
  writeQuizResponses();

  // generate API url and make the calls
  generateApiCall();
  fetchExoplanetData(apiURL);
  await buildSuggestionsPage();

  // reveal/scroll to load page, hide summary
  revealPage(7);
  scrollDown();
  setTimeout(() => hidePage(6), 750);

  // reveal/scroll to suggestions, hide quiz
  setTimeout(() => revealPage(8), 3000);
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

// SUGGESTIONS PAGE (data-view="8")

// favorites list button

const $suggestionsPageFavoritesList = document.querySelector(
  '#suggestions-favorites',
);

$suggestionsPageFavoritesList?.addEventListener('click', () => {
  buildFavoritesPage();
  revealPage(10);
  scrollDown();
  setTimeout(() => hidePage(8), 750);
});

// retake quiz button
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

// previous and next buttons on suggestion page
const $suggestionsNextButton = document.querySelector('#suggestions-next-icon');
const $suggestionsPreviousButton = document.querySelector(
  '#suggestions-previous-icon',
);
$suggestionsNextButton?.addEventListener('click', async () => {
  pageChange();
  increaseAPIOffset();
  await fetchExoplanetData(apiURL);
  $suggestionsLoading?.classList.remove('hidden');
  await buildSuggestionsPage();

  const $heartIcons = document.querySelectorAll('.recommended-favorite');

  // map array of planet names
  const favoritePlanetNames = favoritesList.map(
    (favoritePlanet) => favoritePlanet.name,
  );

  for (let i = 0; i < exoplanetData.length; i++) {
    if (favoritePlanetNames.includes(exoplanetData[i].name)) {
      $heartIcons[i].classList.remove('fa-regular');
      $heartIcons[i].classList.add('fa-solid');
    }
  }
});

$suggestionsPreviousButton?.addEventListener('click', async () => {
  pageChange();
  decreaseAPIOffset();
  await fetchExoplanetData(apiURL);
  $suggestionsLoading?.classList.remove('hidden');
  await buildSuggestionsPage();

  const $heartIcons = document.querySelectorAll('.recommended-favorite');

  // map array of planet names
  const favoritePlanetNames = favoritesList.map(
    (favoritePlanet) => favoritePlanet.name,
  );

  for (let i = 0; i < exoplanetData.length; i++) {
    if (favoritePlanetNames.includes(exoplanetData[i].name)) {
      $heartIcons[i].classList.remove('fa-regular');
      $heartIcons[i].classList.add('fa-solid');
    }
  }
});

// PLANET INFORMATION PAGE (data-view="9")

let favoritesList: Exoplanet[] = [];

const $infoPageFavoriteText = document.querySelector(
  '#info-page-favorite-text',
);

const $infoPageFavoriteButton = document.querySelector(
  '#info-page-favorite-icon',
);

// retake quiz button
const $infoPageRetakeQuizButton = document.querySelector('#info-retake-quiz');

$infoPageRetakeQuizButton?.addEventListener('click', () => {
  quizResponses = {};
  $distanceForm.reset();
  distanceInputRemoveErrors();
  scrollToTop();
  setTimeout(() => hideAll(), 750);
});

// favorites list button

const $infoPageFavoritesList = document.querySelector('#information-favorites');
$infoPageFavoritesList?.addEventListener('click', () => {
  buildFavoritesPage();
  revealPage(10);
  scrollDown();
  setTimeout(() => hidePage(9), 750);
});

// clicking on a planet

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let redirectFrom: string = '';

const $planetRecommendations = document.querySelector(
  '#planet-recommendations',
) as HTMLElement;

$planetRecommendations?.addEventListener('click', (event: Event) => {
  const planetClicked = event.target as HTMLElement;

  planetClickedNumber = Number(planetClicked?.dataset.planetRecommendation);

  if (planetClicked.classList.contains('entry-click')) {
    redirectFrom = 'recommendations';

    // remove the previous page
    const $planetInformationPageHolder = document.querySelector(
      '#planet-information-page-holder',
    );

    $planetInformationPageHolder?.remove();

    // build and show new information page
    buildInformationPage();

    revealPage(9);
    scrollToInformation();
    setTimeout(() => hidePage(10), 750);

    // show right 'back to' page
    const backToFavoritesIcon = document.querySelector(
      '#back-to-favorites-icon',
    );
    const backToFavoritesText = document.querySelector(
      '#back-to-favorites-text',
    );
    const backToRecommendationsIcon = document.querySelector(
      '#back-to-recommendations-icon',
    );
    const backToRecommendationsText = document.querySelector(
      '#back-to-recommendations-text',
    );

    backToFavoritesIcon?.classList.add('hidden');
    backToFavoritesText?.classList.add('hidden');
    backToRecommendationsIcon?.classList.remove('hidden');
    backToRecommendationsText?.classList.remove('hidden');

    // show favorite button and text
    $infoPageFavoriteButton?.classList.remove('hidden');
    $infoPageFavoriteText?.classList.remove('hidden');
  }

  // add planets to favorites
  else if (planetClicked.classList.contains('icon-click')) {
    // change heart icon
    if (planetClicked.classList.contains('fa-regular')) {
      planetClicked.classList.remove('fa-regular');
      planetClicked.classList.add('fa-solid');

      const favoritePlanet: Exoplanet = {
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

      // write to local storage
      writeFavoritesList();

      // build favorites page
      buildFavoritesPage();
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
    }

    // retain appearance of heart even if page is refreshed - TO WORK ON
  }
});

// event listener to go back to recommendations
const $recommendationsInfoPage = document.querySelector(
  '.back-to-recommendations',
) as HTMLElement;

// scroll back to recommendations page
$recommendationsInfoPage?.addEventListener('click', () => {
  revealPage(8);
  scrollToRecommendations();
  setTimeout(() => hidePage(9), 750);
});

// add planet to favorites from this page

$infoPageFavoriteButton?.addEventListener('click', (event: Event) => {
  const favoriteClicked = event.target as HTMLElement;

  // change appearance of heart
  if (favoriteClicked.classList.contains('fa-regular')) {
    favoriteClicked.classList.remove('fa-regular');
    favoriteClicked.classList.add('fa-solid');

    // push to favorites array
    const favoritePlanet: Exoplanet = {
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

    // build favorites page
    buildFavoritesPage();
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
  }
});

// FAVORITES LIST

// retake quiz button
const $favoritesPageRetakeQuizButton = document.querySelector(
  '#favorite-retake-quiz',
);

$favoritesPageRetakeQuizButton?.addEventListener('click', () => {
  quizResponses = {};
  $distanceForm.reset();
  distanceInputRemoveErrors();
  scrollToTop();
  setTimeout(() => hideAll(), 750);
});

// recommendations list button
const $favoritesPageRecommendationsList = document.querySelector(
  '#favorite-recommendations-list',
);

$favoritesPageRecommendationsList?.addEventListener('click', () => {
  revealPage(8);
  scrollToRecommendations();
  setTimeout(() => hidePage(10), 750);
});

// clicking on a planet

const $favoritesList = document.querySelector('#favorites-list');
const $deleteModal = document.querySelector('dialog');
const $deleteModalText = document.querySelector('#delete-text') as HTMLElement;

$favoritesList?.addEventListener('click', (event: Event) => {
  const favoritesEntry = event.target as HTMLElement;

  if (favoritesEntry.classList.contains('entry-click')) {
    planetClickedNumber = Number(favoritesEntry?.dataset.planetClickedNumber);
    // remove previous content in information page
    const $planetInformationPageHolder = document.querySelector(
      '#planet-information-page-holder',
    );

    $planetInformationPageHolder?.remove();

    // build information page and scroll
    buildInformationPage();
    revealPage(9);
    scrollToInformation();
    setTimeout(() => hidePage(10), 750);

    // show right 'back to' page
    const backToFavoritesIcon = document.querySelector(
      '#back-to-favorites-icon',
    );
    const backToFavoritesText = document.querySelector(
      '#back-to-favorites-text',
    );
    const backToRecommendationsIcon = document.querySelector(
      '#back-to-recommendations-icon',
    );
    const backToRecommendationsText = document.querySelector(
      '#back-to-recommendations-text',
    );

    backToFavoritesIcon?.classList.remove('hidden');
    backToFavoritesText?.classList.remove('hidden');
    backToRecommendationsIcon?.classList.add('hidden');
    backToRecommendationsText?.classList.add('hidden');

    // hide 'favorite this planet'
    $infoPageFavoriteButton?.classList.add('hidden');
    $infoPageFavoriteText?.classList.add('hidden');
  } else if (favoritesEntry.classList.contains('icon-click')) {
    const planetToDelete = exoplanetData[planetClickedNumber].name;

    // show modal
    $deleteModalText.textContent = `are you sure you want to delete ${planetToDelete}? this action cannot be undone.`;
    $deleteModal?.showModal();

    // confirm delete
    const $confirmDeleteButton = document.querySelector('#delete-confirm');
    $confirmDeleteButton?.addEventListener('click', () => {
      const favoritesEntryHolder = favoritesEntry?.closest(
        '.favorites-entry-holder',
      ) as HTMLElement;

      planetClickedNumber = Number(
        favoritesEntryHolder.dataset.planetClickedNumber,
      );

      for (let i = 0; i < favoritesList.length; i++) {
        if (favoritesList[i].planetClickedNumber === planetClickedNumber) {
          favoritesList.splice(i, 1);
        }
      }

      writeFavoritesList();
      favoritesEntryHolder?.remove();

      $deleteModal?.close();
    });

    // cancel delete
    const $cancelDeleteButton = document.querySelector('#delete-cancel');
    $cancelDeleteButton?.addEventListener('click', () => {
      $deleteModal?.close();
    });
  }
});

// event listener to go back to favorites
const $favoritesPage = document.querySelector(
  '#back-to-favorites-icon',
) as HTMLElement;

// scroll back to recommendations page
$favoritesPage?.addEventListener('click', () => {
  revealPage(10);
  scrollToFavorites();
  setTimeout(() => hidePage(9), 750);
});
