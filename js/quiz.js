'use strict';
// COLLECTING QUIZ ANSWERS
const quizResponses = {};
// landing page (data-view="0")
const $getStartedButton = document.getElementById('get-started');
$getStartedButton?.addEventListener('click', () => {
  quizResponses.startQuiz = true;
  console.log('start quiz', quizResponses);
});
// quiz 1 (data-view="1")
const $planetSearch = document.querySelector('#planet-search');
const $planetSearchInput = document.querySelector('#planet-search-input');
const $noPlanetSearchButton = document.getElementById('no-planet-search');
$planetSearch.addEventListener('keydown', (event) => {
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
const $temperatureCold = document.querySelector('#temp-cold');
const $temperatureHot = document.querySelector('#temp-hot');
$temperatureCold.addEventListener('click', () => {
  quizResponses.planetTemperature = 'cold';
  console.log('planet temperature:', quizResponses);
});
$temperatureHot.addEventListener('click', () => {
  quizResponses.planetTemperature = 'hot';
  console.log('planet temperature:', quizResponses);
});
