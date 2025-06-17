// "use strict";
// // DEV IS LAZY BUTTON
// const $devLazy = document.querySelector('#dev-lazy');
// $devLazy?.addEventListener('click', () => {
//     const $suggestionsHeader = document.querySelector('#suggestions-header-text');
//     const $suggestionsSubheader = document.querySelector('#suggestions-subheader-text');
//     const $planetRecommendations = document.querySelector('#planet-recommendations');
//     const $planetRecommendationPage = document.querySelector('#planet-recommendations-page');
//     $planetRecommendationPage?.remove();
//     revealAll();
//     quizResponses.startQuiz = true;
//     quizResponses.planetTemperature = 'null';
//     quizResponses.planetMass = 'null';
//     quizResponses.planetPeriod = 'null';
//     quizResponses.planetRadius = 'null';
//     quizResponses.planetDistance = '0';
//     generateSummary();
//     generateApiCall();
//     // console.log(apiURL);
//     fetchExoplanetData(apiURL);
//     buildSuggestionsPage();
//     setTimeout(() => revealText($suggestionsHeader), 250);
//     setTimeout(() => revealText($suggestionsSubheader), 750);
//     setTimeout(() => revealText($planetRecommendations), 1500);
//     // console.log('quizResponses:', quizResponses);
// });
