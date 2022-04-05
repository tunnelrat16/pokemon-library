const ul = document.querySelector(".pokemon")

function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    const pokeTitleCase = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`
    div.innerHTML = `
        <figure>
            <img src="${pokemon.sprites.front_shiny}" alt="${pokeTitleCase}" />
            <figcaption>${pokeTitleCase}</figcaption>
            </a>
        </figure>
    `
    ul.append(div)
}


const queryString = new URLSearchParams(window.location.search)
fetch('https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}')
    .then(response => {
        return response.json()
    }).then(pokemon => {
        const abilitiesRequests = pokemon.abilities
            .map(ability => ability.ability.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        addPokemonImage(pokemon)
        Promise.all(abilitiesRequests).then(abilities => {
            //loading.classList.add("hidden")
            abilities.forEach(ability => {
                addPokemonAbility(ability)
            })
        })
    })

function addPokemonAbility(pokemon) {
    const li = document.createElement("li")
    const flavor_text = (pokemon.flavor_text_entries)
        .find(flavor_text_entry => flavor_text_entry.language.name === "en")
    li.innerHTML = ` <
    span class = "ability-name" > $ { pokemon.name } < /span> <
    span class = "ability-short-description" > $ { flavor_text.flavor_text } < /span>
`
    ul.append(li)

}