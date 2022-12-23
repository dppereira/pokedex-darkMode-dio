
const pokeShow = {}

const pokeData = document.getElementById('start')

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let value = params.id_pokemon;

function pokemonToLi(pokemon) {
    return `
    <section class="content ${pokemon.type_main}">
        <h1 class="pokeName">${pokemon.name} (#${pokemon.id_poke})</h1>
        
        <div class="pokemon">
            <img id="pokeImg" src="" alt="" class="pokeImg">
            <ol id="pokeData">
            <li class='detailsList'>
            <span>Types: ${pokemon.types}</span>
            </li>
            <li class='detailsList'>
            <span>Exp: ${pokemon.base_exp}</span>
            </li>
            <li class='detailsList'>
            <span>Height: ${pokemon.height/10}m</span>
            </li>
            <li class='detailsList'>
            <span>Weight: ${pokemon.weight/10}kg</span>
            </li>
            <li class='detailsList'>
            <span>Abilities: ${pokemon.abilities}</span>
            </li>
            </ol>
        </div>

        <div class="pagination">
            <button id="returnButton" type="button">
                Return
            </button>
        </div>

            `
}

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

function loadDetails(id_poke) {
    // Processo assincrono

    const pokemon = pokeShow.getDetails(id_poke)

   const pokePage = async () => {
    const poke = await pokemon;

    pokeData.innerHTML = pokemonToLi(poke);

    const pokeImg = (document.getElementById('pokeImg' 
   ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${params.id_pokemon}.svg`);
   
   const returnButton = (document.getElementById('returnButton').addEventListener('click', () => {window.location = '/index.html'}))
  };
  
  pokePage();
}


loadDetails(value);


