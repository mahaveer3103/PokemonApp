const searchBar = document.getElementById("searchBar")
const pokemonDetails = []
// const searchButton = document.getElementById("Search")
const cardsContainer = document.getElementById("cardsContainer")
const resetButton = document.getElementById("Reset")
// console.log(searchBar,searchValue);


searchBar.addEventListener("keyup",(e)=>{
    e.preventDefault()
    // console.log(searchBar.value);
    cardsContainer.innerHTML = ""
    const filteredList = pokemonDetails.filter((ele)=> ele.name.includes(searchBar.value.toLowerCase()))
    console.log(filteredList);
    filteredList.map((pokemon)=>{
        createPokemonCard(pokemon)
    })
    
})

resetButton.addEventListener("click",(e)=>{
    e.preventDefault()
    cardsContainer.innerHTML=""
    pokemonDetails.map((pokemon)=>createPokemonCard(pokemon))
    searchBar.value=""
})

function fetchPokemonDetails(){
    const promises = []
    for(let i=1;i<=150;i++){
        const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        promises.push(promise.then((response)=>response.json()))
        // console.log(promise);
    }
    Promise.all(promises).then((data)=>{
        data.map((ele)=>{
            // console.log(ele);
            const pokemonObj = {
                id : ele.id,
                name : ele.name,
                frontShinyImg : ele.sprites["front_shiny"],
                ability : ele.abilities.map(ele=>ele.ability.name),
                type : ele.types[0].type.name
            }
            // console.log(pokemonObj);
            pokemonDetails.push(pokemonObj)
        })
        pokemonDetails.map((pokemon)=>createPokemonCard(pokemon))
        // console.log(pokemonDetails);
    })
    // console.log(pokemonDetails);
}


fetchPokemonDetails()



// function test(){
//     promises.forEach((data)=>{
//         console.log(data)
//     })
// }

// test();



function createPokemonCard(pokemon){
    const cardDiv = document.createElement("div")
    const id = document.createElement("span")
    const img = document.createElement("img")
    const name = document.createElement("h2")
    const abilitiesDiv = document.createElement("div")
    const abilitiesPara = pokemon.ability.map((ele)=>{
        const ability = document.createElement("p")
        ability.innerHTML = ele
        return ability
    })
    abilitiesPara.map((ability)=>{
        abilitiesDiv.appendChild(ability)
    })
    const type = document.createElement("p")
    // console.log(abilitiesPara);
    // abilitiesPara.map((ele)=>{
    //     console.log(ele);
    // })
    cardDiv.classList.add("cardDiv")

    type.innerHTML = pokemon.type
    id.innerHTML = pokemon.id 
    img.src = pokemon.frontShinyImg
    name.innerHTML = pokemon.name

    cardDiv.appendChild(id)
    cardDiv.appendChild(img)
    cardDiv.appendChild(name)
    cardDiv.appendChild(abilitiesDiv)
    abilitiesDiv.classList.add("abilitiesDiv")
    cardDiv.appendChild(type)

    cardsContainer.appendChild(cardDiv)
    // console.log(cardDiv);

}
