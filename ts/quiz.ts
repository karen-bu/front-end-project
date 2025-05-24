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
  console.log('start quiz', quizResponses);
});

// quiz 1 (data-view="1")
const $planetSearch = document.querySelector(
  '#planet-search',
) as HTMLFormElement;

const $planetSearchInput = document.querySelector(
  '#planet-search-input',
) as HTMLFormElement;

const $noPlanetSearchButton = document.getElementById('no-planet-search');

$planetSearch.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.code === 'Enter') {
    quizResponses.planetSearch = $planetSearchInput.value;
    event.preventDefault();
    console.log('planet search:', quizResponses);
  }
});

$noPlanetSearchButton?.addEventListener('click', () => {
  quizResponses.planetSearch = false;
  console.log('planet search:', quizResponses);
});

// quiz 2 (data-view="2")
const $temperatureCold = document.querySelector(
  '#temp-cold',
) as HTMLButtonElement;

const $temperatureHot = document.querySelector(
  '#temp-hot',
) as HTMLButtonElement;

$temperatureCold.addEventListener('click', () => {
  quizResponses.planetTemperature = 'cold';
  console.log('planet temperature:', quizResponses);
});

$temperatureHot.addEventListener('click', () => {
  quizResponses.planetTemperature = 'hot';
  console.log('planet temperature:', quizResponses);
});
