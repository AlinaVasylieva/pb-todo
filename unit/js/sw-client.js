
const fetch = require('node-fetch');
const planetsEndpoint = 'https://swapi.dev/api/planets'


const getAllPlanets = async () => {
  const response = await fetch(planetsEndpoint, {
    method: 'GET',
  }).catch(error => {
    console.log(`Failed to get planets: ${error}`);
    throw error;
  });

  const planets = await response.json();

  return planets;
};

const getPlanet = async (planetId) => {
  const response = await fetch(`${planetsEndpoint}/${planetId}`, {
    method: 'GET',
  }).catch(error => {
    console.log(`Failed to get planet: ${error}`);
    throw error;
  });

  const planets = await response.json();
  
  return planets;
}

const getPlanetByName = async (planetName) => {
  const response = await getAllPlanets()
  const planet = response.results.find(o => o.name === planetName)
  if (!planet) {
    const errorResponse = `Failed to find planet: ${planetName}`
    console.log(errorResponse)
    return errorResponse
  } 
  return planet
}

module.exports = { getAllPlanets, getPlanet, getPlanetByName }