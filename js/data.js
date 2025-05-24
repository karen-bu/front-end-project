'use strict';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchExoplanetData() {
  try {
    const apiData = await fetch(
      'https://api.api-ninjas.com/v1/planets?min_distance_light_year=30000',
      {
        headers: { 'X-Api-Key': 'zt9vRW46vl4e8li5HhlgnA==HWWTaldjD4VJd3pb' },
      },
    );
    if (!apiData.ok) throw new Error(`HTTP error! Status: ${apiData.status}`);
    const exoplanetData = await apiData.json();
    console.log(exoplanetData);
  } catch (error) {
    console.error('Error:', error);
  }
}
// fetchExoplanetData();
// REMOVING ERRORS FROM DISTANCE INPUT QUIZ PAGE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function distanceInputRemoveErrors() {
  $distanceInputErrorString.classList.add('hidden');
  $distanceInputErrorInteger.classList.add('hidden');
  $distanceInputErrorValue.classList.add('hidden');
}
// SCROLL FUNCTIONS
const quizPages = document.querySelectorAll('[data-view]');
let dataView = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function revealNext() {
  quizPages[dataView + 1].classList.remove('hidden');
  dataView += 1;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function stopScroll() {
  document.body.classList.add('stop-scroll');
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
function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
