// COLLECTING QUIZ ANSWERS

interface QuizResponses {
  startQuiz?: boolean;
  planetSearch?: string | boolean;
  planetTemperature?: string;
  planetMass?: string;
  planetPeriod?: string;
  planetRadius?: string;
  planetDistance?: number;
}

const quizResponses: QuizResponses = {};

// landing page (data-view="0")
const $getStartedButton = document.getElementById('get-started');
$getStartedButton?.addEventListener('click', () => {
  quizResponses.startQuiz = true;
  // console.log('start quiz', quizResponses);
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
    // console.log('planet search:', quizResponses);
  }
});

$noPlanetSearchButton?.addEventListener('click', () => {
  quizResponses.planetSearch = false;
  // console.log('planet search:', quizResponses);
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
  // console.log('planet temperature:', quizResponses);
});

$temperatureHot?.addEventListener('click', () => {
  quizResponses.planetTemperature = 'hot';
  // console.log('planet temperature:', quizResponses);
});

// quiz 3 - planet mass (data-view="3")
const $smallMass = document.querySelector('#small-mass') as HTMLButtonElement;
const $largeMass = document.querySelector('#large-mass') as HTMLButtonElement;

$smallMass?.addEventListener('click', () => {
  quizResponses.planetMass = 'small';
  // console.log('planet mass:', quizResponses);
});

$largeMass?.addEventListener('click', () => {
  quizResponses.planetMass = 'large';
  // console.log('planet mass:', quizResponses);
});

// quiz 4 - planet period (data-view="4")
const $longPeriod = document.querySelector('#long-period') as HTMLButtonElement;
const $shortPeriod = document.querySelector(
  '#short-period',
) as HTMLButtonElement;

$longPeriod?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'long';
  // console.log('planet period:', quizResponses);
});

$shortPeriod?.addEventListener('click', () => {
  quizResponses.planetPeriod = 'short';
  // console.log('planet period:', quizResponses);
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
  // console.log('planet radius:', quizResponses);
});

$smallRadius?.addEventListener('click', () => {
  quizResponses.planetRadius = 'small';
  // console.log('planet radius:', quizResponses);
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

function distanceInputRemoveErrors(): void {
  $distanceInputErrorString.classList.add('hidden');
  $distanceInputErrorInteger.classList.add('hidden');
  $distanceInputErrorValue.classList.add('hidden');
}

$distanceInput.addEventListener('input', (event: Event) => {
  const distanceTarget = event.target as HTMLInputElement;
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

$distanceInput.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    quizResponses.planetDistance = $distanceInput.value;
    // console.log(quizResponses);
  }
});
