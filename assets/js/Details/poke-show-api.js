
const pokeShow = {}

function pokeDetailsToPokemonModel(pokeDetails) {
    const pokemon = new PokemonDetails()
    pokemon.id_poke = pokeDetails.id
    pokemon.name = pokeDetails.name

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type_main] = types

    pokemon.types = types
    pokemon.type_main = type_main

    pokemon.base_exp = pokeDetails.base_experience
    pokemon.height = pokeDetails.height
    pokemon.weight = pokeDetails.weight

    const abilities = pokeDetails.abilities.map((abilitySlot) => abilitySlot.ability.name)

    pokemon.abilities = abilities

    return pokemon
}

pokeShow.getDetails = async (id_poke) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id_poke}/`
    return fetch(url)
                .then((response)=>response.json())
                .then(pokeDetailsToPokemonModel)
}