const app = document.querySelector("#app")
const main = document.querySelector("main")
const loading = document.querySelector(".loading")


function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    div.classList.add("pokeMain")
    const pokeTitleCase = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`
    div.innerHTML = `
        <figure>
            <img src="${pokemon.sprites.front_shiny}" alt="${pokeTitleCase}" />
            <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${pokeTitleCase} </a></figcaption>
        </figure>
    `
    main.append(div)
}

const url = "https://pokeapi.co/api/v2/pokemon?limit=50"


fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches)
    }).then(responses => {
        loading.classList.add("hidden")
        responses.forEach(response => {
            addPokemonImage(response)
        })
    })