
const pokeApi = {}

function pokeDetailsToPokemonModel(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.id_poke = pokeDetails.id
    pokemon.name = pokeDetails.name

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type_main] = types

    pokemon.types = types
    pokemon.type_main = type_main

    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokeDetail = async (pokemon) => {
    return fetch(pokemon.url)
                .then((response)=>response.json())
                .then(pokeDetailsToPokemonModel)
}

pokeApi.getPoke = async (offset=0, limit=10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&&limit=${limit}`
    return fetch(url) 
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons)=> pokemons.map(pokeApi.getPokeDetail))
            .then((detailReq)=> Promise.all(detailReq))
            .then((pokeDetails)=> pokeDetails)
}