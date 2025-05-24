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
