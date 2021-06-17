const { getAllPlanets, getPlanet, getPlanetByName } = require('./sw-client')


test('Get all planets successfully', async () => {
    const response = await getAllPlanets()
    expect(response.count).toBe(60)
})

test('Get planet by correct id successfully', async () => {
    const call = {id: 3, name: 'Yavin IV'}
    const response = await getPlanet(call.id)
    expect(response.name).toBe(call.name)
})

test('Empty response get planet by incorrect id', async () => {
    const incorrectIds = [-1, 0, 3333333, 'foo']
    incorrectIds.forEach(assertIds)
    function assertIds(id) {async () => {
        const response = await getPlanet(id)
            expect(response).toBe('404 error')
    }}
}) 

test('Get planet by correct name successfully', async () => {
    const planet = 'Tatooine'
    const response = await getPlanetByName(planet)
    expect(response.name).toBe(planet)
})

test('Empty response get planet by incorrect name', async () => {
    const planet = 'Tatoo'
    const response = await getPlanetByName(planet)
    expect(response).toBe(`Failed to find planet: ${planet}`)
})

