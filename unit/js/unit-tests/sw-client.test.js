const { default: fetch } = require('node-fetch')
const { getAllPlanets, getPlanet, getPlanetByName } = require('../sw-client')
//const {allPlanetsMock} = require('./allPlanetsMock.json') //TBD use json files for mocking
const apiErrorMessageMock = 'API Failure'
const notFoundMessageMock = 'Not found'
const mockResponseAllPlanets = {
  count: 2,
  next: "http://swapi.dev/api/planets/?page=2",
  previous: null,
  results: [
    {
      name: "Alderaan",
      rotation_period: "24",
      orbital_period: "364",
      diameter: "12500",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "grasslands, mountains",
      surface_water: "40",
      population: "2000000000",
      residents: [
        "http://swapi.dev/api/people/5/",
        "http://swapi.dev/api/people/68/",
        "http://swapi.dev/api/people/81/"
      ],
      films: [
        "http://swapi.dev/api/films/1/",
        "http://swapi.dev/api/films/6/"
      ],
      created: "2014-12-10T11:35:48.479000Z",
      edited: "2014-12-20T20:58:18.420000Z",
      url: "http://swapi.dev/api/planets/2/"
    },
    {
      name: "Yavin IV",
      rotation_period: "24",
      orbital_period: "4818",
      diameter: "10200",
      climate: "temperate, tropical",
      gravity: "1 standard",
      terrain: "jungle, rainforests",
      surface_water: "8",
      population: "1000",
      residents: [],
      films: ["http://swapi.dev/api/films/1/"],
      created: "2014-12-10T11:37:19.144000Z",
      edited: "2014-12-20T20:58:18.421000Z",
      url: "http://swapi.dev/api/planets/3/"
    }
  ]
}
const planetById = {
  name: "Yavin IV",
  rotation_period: "24",
  orbital_period: "4818",
  diameter: "10200",
  climate: "temperate, tropical",
  gravity: "1 standard",
  terrain: "jungle, rainforests",
  surface_water: "8",
  population: "1000",
  residents: [],
  films: ["http://swapi.dev/api/films/1/"],
  created: "2014-12-10T11:37:19.144000Z",
  edited: "2014-12-20T20:58:18.421000Z",
  url: "http://swapi.dev/api/planets/3/"
}

describe("Get planet(s) SWAPI", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("Get all planets successfully", async () => {
    fetch.mockResponseOnce(
      JSON.stringify(mockResponseAllPlanets)
    );
    const response = await getAllPlanets();
    expect(fetch).toHaveBeenCalledWith(`https://swapi.dev/api/planets`, {
      method: "GET"
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response.count).toBe(2)
    expect(response.previous).toBeNull()
    expect(response.next).toBe("http://swapi.dev/api/planets/?page=2")
    expect(response.results.length).toBe(2)
  });

  test("Get all planets failure", async () => {
    fetch.mockReject(apiErrorMessageMock);
    try {
      await getAllPlanets();
    } catch (error) {
      expect(error).toEqual(apiErrorMessageMock);
    }
  });


  test('Get planet by correct id successfully', async () => {
    const planetId = 3
    fetch.mockResponseOnce(
      JSON.stringify(planetById)
    );
    const response = await getPlanet(planetId);
    expect(fetch).toHaveBeenCalledWith(`https://swapi.dev/api/planets/${planetId}`, {
      method: "GET"
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response.name).toBe(planetById.name);
  });



  test('Planet not found by incorrect id', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        detail: notFoundMessageMock
      })
    );
    const incorrectIds = [-1, 0, 3333333, 'foo']
    incorrectIds.forEach(assertIds)
    function assertIds(id) {
      async () => {
        const response = await getPlanet(id)
        console.log(response)
        expect(response.detail).toBe(notFoundMessageMock)
      }
    }
  })

  test('Get planet by correct name successfully', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(mockResponseAllPlanets)
    );
    const expectedPlanet = mockResponseAllPlanets.results[1].name
    const response = await getPlanetByName(expectedPlanet);
    expect(fetch).toHaveBeenCalledWith(`https://swapi.dev/api/planets`, {
      method: "GET"
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response.name).toBe(expectedPlanet)
  })

  test('Planet not found by incorrect name', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(mockResponseAllPlanets)
    );
    const planetParameter = mockResponseAllPlanets.results[1].name + 'test'
    const response = await getPlanetByName(planetParameter);
    expect(fetch).toHaveBeenCalledWith(`https://swapi.dev/api/planets`, {
      method: "GET"
    });
    expect(response).toBe(`Failed to find planet: ${planetParameter}`)
  })



});