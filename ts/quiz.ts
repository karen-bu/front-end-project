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

// COLLECTING QUIZ RESPONSES

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
const $smallMass = document.querySelector('#small-mass') as HTMLButtonElement;
const $largeMass = document.querySelector('#large-mass') as HTMLButtonElement;

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
const $longPeriod = document.querySelector('#long-period') as HTMLButtonElement;
const $shortPeriod = document.querySelector(
  '#short-period',
) as HTMLButtonElement;

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
const $largeRadius = document.querySelector(
  '#large-radius',
) as HTMLButtonElement;
const $smallRadius = document.querySelector(
  '#small-radius',
) as HTMLButtonElement;

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

// BUILDING SUGGESTIONS PAGE

// quiz response messages

const $summaryPageGetSuggestionsButton = document.querySelector(
  '#get-suggestions',
) as HTMLButtonElement;

const $summaryPageRetakeQuizButton = document.querySelector(
  '#summary-retake-quiz',
) as HTMLButtonElement;

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
