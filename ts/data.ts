interface Exoplanet {
  name?: string;
  min_mass?: number;
  max_mass?: number;
  min_radius?: number;
  max_radius?: number;
  min_period?: number;
  max_period?: number;
  min_temperature?: number;
  max_temperature?: number;
  min_distance_light_year?: number;
  max_distance_light_year?: number;
  min_semi_major_axis?: number;
  max_semi_major_axis?: number;
  offset?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchExoplanetData(): Promise<void> {
  try {
    const apiData = await fetch(
      'https://api.api-ninjas.com/v1/planets?min_distance_light_year=30000',
      {
        headers: { 'X-Api-Key': 'zt9vRW46vl4e8li5HhlgnA==HWWTaldjD4VJd3pb' },
      },
    );
    if (!apiData.ok) throw new Error(`HTTP error! Status: ${apiData.status}`);
    const exoplanetData = (await apiData.json()) as Exoplanet;
    console.log(exoplanetData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// fetchExoplanetData();

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
  } else {
    const planetTempMsg = 'is warm and cozy';
    $summaryTemperature.textContent = planetTempMsg;
  }

  const $summaryMass = document.querySelector('#summary-mass') as HTMLElement;
  if (quizResponses.planetMass === 'small') {
    const planetMassMsg = 'makes you feel lighter';
    $summaryMass.textContent = planetMassMsg;
  } else {
    const planetMassMsg = 'makes you feel grounded';
    $summaryMass.textContent = planetMassMsg;
  }

  const $summaryPeriod = document.querySelector(
    '#summary-period',
  ) as HTMLElement;
  if (quizResponses.planetPeriod === 'long') {
    const planetPeriodMsg = 'gives you more time';
    $summaryPeriod.textContent = planetPeriodMsg;
  } else {
    const planetPeriodMsg = 'helps the time fly by';
    $summaryPeriod.textContent = planetPeriodMsg;
  }

  const $summaryRadius = document.querySelector(
    '#summary-radius',
  ) as HTMLElement;
  if (quizResponses.planetRadius === 'large') {
    const planetRadiusMsg = 'gives you plenty of room';
    $summaryRadius.textContent = planetRadiusMsg;
  } else {
    const planetRadiusMsg = 'is cozy and small';
    $summaryRadius.textContent = planetRadiusMsg;
  }

  const $summaryDistance = document.querySelector(
    '#summary-distance',
  ) as HTMLElement;

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
function revealText(element: HTMLElement): void {
  element.classList.remove('invisible');
  element.classList.add('visible');
}
