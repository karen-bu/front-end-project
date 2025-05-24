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
