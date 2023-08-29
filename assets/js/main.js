const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 5
let offset = 0;

// 1, 2, 3, 4, 5           0 - 5
// 6, 7, 8, 9, 10          5 - 5
// 11, 12, 13, 14, 15      10 - 5 ( remova o botão)

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <head>
                    <style>
                        a{
                            text-decoration: none;
                    
                            color: red;
                            border: 1px solid blue
                            padding:3px 5px;
                        }
                    </style>
                    </head>
                    <a href="http://127.0.0.1:5500/Index2.html"><span class="name">${pokemon.name}</span></a>
            
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                        </ol>
            
                        <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                    </div>
                </li>
            `).join('')

        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else  {
        loadPokemonItens(offset, limit)
    }
})


