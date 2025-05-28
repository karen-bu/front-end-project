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
  quizResponses.planetDistance = '0';
  generateSummary();
  console.log('quizResponses:', quizResponses);
});

// QUIZ PAGES

interface QuizResponses {
  startQuiz?: boolean;
  planetSearch?: string | boolean;
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
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

// quiz 1 - planet search (data-view="1")
const $planetSearch = document.querySelector(
  '#planet-search-input',
) as HTMLFormElement;

const $noPlanetSearchButton = document.getElementById('no-planet-search');

$planetSearch?.addEventListener('keydown', (event: KeyboardEvent) => {
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

$temperatureNull?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'null';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

// quiz 3 - planet mass (data-view="3")
const $massSmall = document.querySelector('#mass-small') as HTMLButtonElement;
const $massLarge = document.querySelector('#mass-large') as HTMLButtonElement;
const $massNull = document.querySelector('#mass-null') as HTMLButtonElement;

$massSmall?.addEventListener('click', () => {
  quizResponses.planetMass = 'small';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

$massLarge?.addEventListener('click', () => {
  quizResponses.planetMass = 'large';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

$massNull?.addEventListener('click', () => {
  quizResponses.planetMass = 'null';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

// quiz 4 - planet period (data-view="4")
const $periodLong = document.querySelector('#period-long') as HTMLButtonElement;
const $periodShort = document.querySelector(
  '#period-short',
) as HTMLButtonElement;
const $periodNull = document.querySelector('#period-null') as HTMLButtonElement;

$periodLong?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'long';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

$periodShort?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'short';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

$periodNull?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'null';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

// quiz 5 - planet radius (data-view="5")
const $radiusLarge = document.querySelector(
  '#radius-large',
) as HTMLButtonElement;
const $radiusSmall = document.querySelector(
  '#radius-small',
) as HTMLButtonElement;
const $radiusNull = document.querySelector('#radius-null') as HTMLButtonElement;

$radiusLarge?.addEventListener('click', () => {
  quizResponses.planetRadius = 'large';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

$radiusSmall?.addEventListener('click', () => {
  quizResponses.planetRadius = 'small';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

$radiusNull?.addEventListener('click', () => {
  quizResponses.planetRadius = 'null';
  revealNext();
  scrollDown();
  setTimeout(() => hidePrev(), 750);
});

// quiz 6 - planet distance (data-view="6")
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
  } else if (!isNaN(Number(distanceTerm)) && Number(distanceTerm) > 30000) {
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
    revealNext();
    scrollDown();
    generateSummary();
    setTimeout(() => hidePrev(), 750);
  }
});

// SUMMARY PAGE

// quiz response messages

let apiURL = '';

const $summaryPageGetSuggestionsButton = document.querySelector(
  '#get-suggestions',
) as HTMLButtonElement;

const $summaryPageRetakeQuizButton = document.querySelector(
  '#summary-retake-quiz',
) as HTMLButtonElement;

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
  setTimeout(() => revealAll(), 750);
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
