'use strict';
// "root" -> https://api.api-ninjas.com/v1/planets?
// GENERATE API URL
let apiTemp = '';
let apiMass = '';
let apiPeriod = '';
let apiRadius = '';
let apiURL = '';
let apiOffsetNumber = 0;
const api1 = 'https://api.api-ninjas.com/v1/planets?';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateApiCall() {
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
    apiRadius = '&min_radius=3';
  } else if (quizResponses.planetRadius === 'small') {
    apiRadius = '&max_radius=1';
  } else if (quizResponses.planetRadius === 'null') {
    apiRadius = '&min_radius=0';
  }
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
// GENERATING NEXT PAGE OF API URL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function increaseAPIOffset() {
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
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function decreaseAPIOffset() {
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
  } else
    apiURL = apiURL = api1
      .concat(apiTemp)
      .concat(apiMass)
      .concat(apiPeriod)
      .concat(apiRadius)
      .concat(apiDistance);
}
