const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 1
let offset = 0;



// 1, 2, 3, 4, 5           0 - 5
// 6, 7, 8, 9, 10          5 - 5
// 11, 12, 13, 14, 15      10 - 5 ( remova o botão)

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
            
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                        </ol>
            
                        <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                            <div class="edit">
                                <div class="col-md-12"></div>
                                <div class="sub">About</div>
                                <div class="sub1">Base Status</div>
                                <div class="sub2">Evolution</div>
                                <div class="sub3">Moves</div>
                                <div class="sub4">Species</div>
                                <div class="sub5">Seed</div>
                            </div> 
                            <div>
                                <div class="sub6">Height</div>
                                <div class="sub7">2'3.6* (0.70 cm)</div>
                            </div>
                            <div>
                            <div class="sub8">Weight</div>
                            <div class="sub9">15.2 lbs (6.9 kg)</div>
                            </div>
                            <div>
                            <div class="sub10">Abilities</div>
                            <div class="sub11">Overgrow, Chlorophyl</div>
                            </div>
                            <div class="sub12">Breeding</div>
                            <div>
                            <div class="sub13">Gender</div>
                            <div class="sub14">Man 87.5%</div>
                            <div class="sub15">Woman 12.5%</div>
                            </div>
                            <div>
                            <div class="sub16">Eggs Groups</div>
                            <div class="sub17">Monster</div>
                            </div>
                            <div>
                            <div class="sub18">Egg Cylce</div>
                            <div class="sub19">Grass</div>
                            </div>
                            </div>
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


