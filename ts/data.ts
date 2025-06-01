// REMOVING ERRORS FROM DISTANCE INPUT QUIZ PAGE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function distanceInputRemoveErrors(): void {
  $distanceInputErrorString.classList.add('hidden');
  $distanceInputErrorInteger.classList.add('hidden');
  $distanceInputErrorValue.classList.add('hidden');
}

// SCROLL FUNCTIONS
const quizPages = document.querySelectorAll('[data-view]');
console.log(quizPages);

let dataView = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function revealNext(): void {
  quizPages[dataView + 1].classList.remove('hidden');
  dataView += 1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scrollDown(): void {
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth',
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hidePrev(): void {
  quizPages[dataView - 1].classList.add('hidden');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function revealAll(): void {
  for (let i = 0; i < quizPages.length; i++) {
    quizPages[i].classList.remove('hidden');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hideQuiz(): void {
  dataView = 0;
  for (let i = 1; i < 9; i++) {
    quizPages[i].classList.add('hidden');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hideAll(): void {
  dataView = 0;
  for (let i = 1; i < quizPages.length; i++) {
    quizPages[i].classList.add('hidden');
  }
  quizPages[0].classList.remove('hidden');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function showLoad(): void {
  hideAll();
  quizPages[8].classList.remove('hidden');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  dataView = 0;
}

// GENERATING SUMMARY PAGE

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateSummary(): void {
  const $summaryHeading = document.querySelector(
    '#summary-heading',
  ) as HTMLElement;

  const $summaryTemperature = document.querySelector(
    '#summary-temperature',
  ) as HTMLElement;
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

  const $summaryMass = document.querySelector('#summary-mass') as HTMLElement;
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

  const $summaryPeriod = document.querySelector(
    '#summary-period',
  ) as HTMLElement;
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

  const $summaryRadius = document.querySelector(
    '#summary-radius',
  ) as HTMLElement;
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

  const $summaryDistance = document.querySelector(
    '#summary-distance',
  ) as HTMLElement;

  const planetDistance = quizResponses.planetDistance;

  if (quizResponses.planetDistance === '1') {
    const planetDistanceMsg = `is at least ${planetDistance} light-year away`;
    $summaryDistance.textContent = planetDistanceMsg;
  } else {
    const planetDistanceMsg = `is at least ${planetDistance} light-years away`;
    $summaryDistance.textContent = planetDistanceMsg;
  }

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
function revealText(element: any): void {
  element.classList.remove('invisible');
  element.classList.add('visible');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hideText(element: any): void {
  element.classList.remove('visible');
  element.classList.add('invisible');
}

// GENERATE API URL

let apiTemp = '';
let apiMass = '';
let apiPeriod = '';
let apiRadius = '';

let apiURL = '';
let apiOffsetNumber = 0;

const api1 = 'https://api.api-ninjas.com/v1/planets?';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateApiCall(): void {
  if (quizResponses.planetTemperature === 'cold') {
    apiTemp = '&max_temperature=185';
  } else if (quizResponses.planetTemperature === 'hot') {
    apiTemp = '&min_temperature=186';
  } else if (quizResponses.planetTemperature === 'null') {
    apiTemp = '&min_temperature=0';
  }

  if (quizResponses.planetMass === 'large') {
    apiMass = '&min_mass=2';
  } else if (quizResponses.planetMass === 'small') {
    apiMass = '&max_mass=0.003';
  } else if (quizResponses.planetMass === 'null') {
    apiMass = '&min_mass=0';
  }

  if (quizResponses.planetPeriod === 'large') {
    apiPeriod = '&min_period=730';
  } else if (quizResponses.planetPeriod === 'small') {
    apiPeriod = '&max_period=100';
  } else if (quizResponses.planetPeriod === 'null') {
    apiPeriod = '&min_period=0';
  }

  if (quizResponses.planetRadius === 'large') {
    apiRadius = '&max_radius=3';
  } else if (quizResponses.planetRadius === 'small') {
    apiRadius = '&max_radius=1';
  } else if (quizResponses.planetRadius === 'null') {
    apiRadius = '&min_radius=0';
  }

  const apiDistance = `&min_distance_light_year=${quizResponses.planetDistance}`;
  const apiOffset = '&offset=0';

  apiURL = api1
    .concat(apiTemp)
    .concat(apiMass)
    .concat(apiPeriod)
    .concat(apiRadius)
    .concat(apiDistance)
    .concat(apiOffset);

  console.log(quizResponses);
  console.log(apiURL);
}

// GENERATING NEXT PAGE OF API URL

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function increaseAPIOffset(): void {
  apiOffsetNumber += 30;
  const apiOffset = `&offset=${apiOffsetNumber}`;
  const apiDistance = `&min_distance_light_year=${quizResponses.planetDistance}`;

  apiURL = api1
    .concat(apiTemp)
    .concat(apiMass)
    .concat(apiPeriod)
    .concat(apiRadius)
    .concat(apiDistance)
    .concat(apiOffset);
  console.log(apiURL);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function decreaseAPIOffset(): void {
  const apiDistance = `&min_distance_light_year=${quizResponses.planetDistance}`;

  if (apiOffsetNumber >= 30) {
    apiOffsetNumber -= 30;
    const apiOffset = `&offset=${apiOffsetNumber}`;

    apiURL = api1
      .concat(apiTemp)
      .concat(apiMass)
      .concat(apiPeriod)
      .concat(apiRadius)
      .concat(apiDistance)
      .concat(apiOffset);
    console.log(apiURL);
  } else
    apiURL = apiURL = api1
      .concat(apiTemp)
      .concat(apiMass)
      .concat(apiPeriod)
      .concat(apiRadius)
      .concat(apiDistance);
}

// CALLING API

interface Exoplanet {
  distance_light_year: number;
  host_star_mass: number;
  host_star_temperature: number;
  mass: number;
  name: string;
  period: number;
  radius: number;
  semi_major_axis: number;
  temperature: number;
  offset: number;
}

const apiKey1 = 'zt9vRW46vl4e8li5HhlgnA=';
const apiKey2 = '=HWWTaldjD4VJd3pb';
const apiKey = apiKey1.concat(apiKey2);

// const fetchTest =
//   'https://api.api-ninjas.com/v1/planets?&min_temperature=0&min_mass=0&min_period=0&min_radius=0&min_distance_light_year=0&offset=30';

// async function fetchExoplanetData(url: string): Promise<void> {
//   try {
//     const apiData = await fetch(url, {
//       headers: { 'X-Api-Key': apiKey },
//     });
//     if (!apiData.ok) throw new Error(`HTTP error! Status: ${apiData.status}`);
//     const exoplanetData = await apiData.json();
//     console.log(exoplanetData);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// console.log(fetchExoplanetData(fetchTest));

async function fetchExoplanetData(
  url: string,
): Promise<Exoplanet[] | undefined> {
  try {
    const apiData = await fetch(url, {
      headers: { 'X-Api-Key': apiKey },
    });
    if (!apiData.ok) throw new Error(`HTTP error! Status: ${apiData.status}`);
    return await apiData.json();
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}

// BUILD SUGGESTIONS PAGE

const $previousIconRecommendations = document.querySelector(
  '#suggestions-previous-icon',
) as HTMLElement;
const $nextIconRecommendations = document.querySelector(
  '#suggestions-next-icon',
) as HTMLElement;
const $previousTextRecommendations = document.querySelector(
  '#suggestions-previous-text',
) as HTMLElement;
const $nextTextRecommendations = document.querySelector(
  '#suggestions-next-text',
) as HTMLElement;
const $suggestionsLoading = document.querySelector(
  '#suggestions-loading',
) as HTMLElement;

const $disclaimerRecommendations = document.querySelector(
  '#suggestions-disclaimer',
) as HTMLElement;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function buildSuggestionsPage(): Promise<void> {
  const exoplanetData = (await fetchExoplanetData(apiURL)) as Exoplanet[];
  if (!exoplanetData) throw new Error('exoplanetData does not exist!');
  console.log(exoplanetData);

  const $planetEntryRow = document.querySelector(
    '#planet-recommendations',
  ) as HTMLElement;

  if (exoplanetData.length === 0) {
    const $h4NoPlanets1 = document.createElement('h4');
    $h4NoPlanets1.setAttribute('class', 'no-planets-text');
    $h4NoPlanets1.textContent = 'nothing matching your criteria was found :(';

    const $h4NoPlanets2 = document.createElement('h4');
    $h4NoPlanets2.setAttribute('class', 'no-planets-text');
    $h4NoPlanets2.textContent =
      "don't worry, there is still a place in the universe meant for you!";

    const $h4NoPlanets3 = document.createElement('h4');
    $h4NoPlanets3.setAttribute('class', 'no-planets-text');
    $h4NoPlanets3.textContent =
      'please retake the quiz to adjust your parameters and search again.';

    $planetEntryRow?.appendChild($h4NoPlanets1);
    $planetEntryRow?.appendChild($h4NoPlanets2);
    $planetEntryRow?.appendChild($h4NoPlanets3);
  } else {
    const $rowCenterEntry = document.createElement('div');

    $rowCenterEntry.setAttribute('class', 'row center');
    $rowCenterEntry.setAttribute('id', 'planet-recommendations-page');

    for (let i = 0; i < exoplanetData.length; i++) {
      const $column50CenterEntry = document.createElement('div');
      $column50CenterEntry.setAttribute('class', 'column-50 center entry');

      const $column50PlanetEntry = document.createElement('div');
      $column50PlanetEntry.setAttribute('class', 'column-50 planet-entry');
      $column50PlanetEntry.setAttribute(
        'data-planet-recommendation',
        String(exoplanetData.indexOf(exoplanetData[i])),
      );
      const $column50DivName = document.createElement('div');
      $column50DivName.setAttribute('class', 'column-50 left');

      const $h4PlanetEntry = document.createElement('h4');

      $h4PlanetEntry.textContent = exoplanetData[i].name;

      const $column50DivIcons = document.createElement('div');
      $column50DivIcons.setAttribute('class', 'column-50 right');

      const $h4RecommendationsHeartIcon = document.createElement('h4');

      const $recommendationsHeartIcon = document.createElement('i');
      $recommendationsHeartIcon.setAttribute('class', 'fa-regular fa-heart');

      // appending entry to DOM

      $planetEntryRow?.appendChild($rowCenterEntry);
      $rowCenterEntry?.appendChild($column50CenterEntry);
      $column50CenterEntry.appendChild($column50PlanetEntry);
      $column50PlanetEntry.appendChild($column50DivName);
      $column50DivName.appendChild($h4PlanetEntry);
      $column50PlanetEntry.appendChild($column50DivIcons);
      $column50DivIcons.appendChild($h4RecommendationsHeartIcon);
      $h4RecommendationsHeartIcon.appendChild($recommendationsHeartIcon);
    }
  }

  if (exoplanetData.length === 30) {
    setTimeout(() => revealText($nextIconRecommendations), 2250);
    setTimeout(() => revealText($nextTextRecommendations), 2250);
    setTimeout(() => revealText($disclaimerRecommendations), 3000);
  }

  if (apiOffsetNumber > 0) {
    revealText($previousIconRecommendations);
    revealText($previousTextRecommendations);
    revealText($nextIconRecommendations);
    revealText($nextTextRecommendations);
    revealText($disclaimerRecommendations);
  }

  if (apiOffsetNumber === 0) {
    hideText($previousIconRecommendations);
    hideText($previousTextRecommendations);
    revealText($disclaimerRecommendations);
  }

  $suggestionsLoading?.classList.add('hidden');
}

// GENERATING SUGGESTIONS PAGE

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateSuggestionsPage(): void {
  const $suggestionsHeader = document.querySelector(
    '#suggestions-header-text',
  ) as HTMLElement;
  const $suggestionsSubheader = document.querySelector(
    '#suggestions-subheader-text',
  ) as HTMLElement;
  const $planetRecommendations = document.querySelector(
    '#planet-recommendations',
  ) as HTMLElement;

  // suggestions arrows

  const $previousNextRecommendations = document.querySelector(
    '#recommendations-previous-next',
  ) as HTMLElement;

  setTimeout(() => revealText($suggestionsHeader), 250);
  setTimeout(() => revealText($suggestionsSubheader), 750);
  setTimeout(() => revealText($planetRecommendations), 1500);
  setTimeout(() => revealText($previousNextRecommendations), 2250);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function pageChange(): void {
  const $planetRecommendationPage = document.querySelector(
    '#planet-recommendations-page',
  );
  $planetRecommendationPage?.remove();

  if ($planetRecommendationPage === null) {
    $suggestionsLoading?.classList.remove('hidden');
  }
}
