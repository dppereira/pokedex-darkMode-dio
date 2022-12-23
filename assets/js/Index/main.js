const pokemonOl = document.getElementById('pokemonOl')
const loadMoreButton = document.getElementById('loadMoreButton')

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let value = params.gen;

const maxRecords = selectGen.pokeGen(value)
const limit = 10
let offset = selectGen.startGen(value)

function pokemonToLi(pokemon) {
    return `<li class="pokemon ${pokemon.type_main}">
                <a class="hyperlink" href="/PokeDetails.html?id_pokemon=${pokemon.id_poke}">
                <span class="number">#${pokemon.id_poke}</span>
                </a>
                <span class="name">${pokemon.name}</span>

                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((typeSlot) => `<li class="type ${typeSlot}"> ${typeSlot} </li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>

            </li>
            `
}

function loadPoke(offset, limit) {
    // Processo assincrono
    pokeApi.getPoke(offset, limit)
    .then((pokemonList = {}) => pokemonOl.innerHTML += pokemonList.map(pokemonToLi).join(''))
}

loadPoke(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPoke(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPoke(offset, limit)
    }
})
