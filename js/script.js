const pokemonName = document.querySelector('.pokemon__name');
const pokemonNunber = document.querySelector('.pokemon__number');
const pokemonType = document.querySelector('.pokemon__type');
let pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonshiny = document.querySelector('.shiny');

let shiny = 0;
let searchPokemon = 1;
const fetchPokemon = async  (pokemon) =>{

    pokemonName.innerHTML = 'Carregando...';
    pokemonNunber.innerHTML = '';

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNunber.innerHTML = data.id;
        input.value = '';
        searchPokemon = data.id;
        if(shiny == 0){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            pokemonName.innerHTML = data.name;
        }
        else{
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
            pokemonName.innerHTML = data.name + ' shiny';
        }
        pokemonType.innerHTML = data['types']['0']['type']['name']
        
        if (data['types']['1']['type']['name']){
            pokemonType.innerHTML = data['types']['0']['type']['name'] + ', ' + data['types']['1']['type']['name'];
         }
    }
    else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'não encontrado :c';
        pokemonNunber.innerHTML = '';
        
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    shiny = 0;
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1){
        searchPokemon -= 1;
        shiny = 0;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    shiny = 0;
    renderPokemon(searchPokemon);
});

buttonshiny.addEventListener('click', ()=>{
    if(shiny == 0){
        shiny = 1
    }
    else{
        shiny = 0
    }
    renderPokemon(searchPokemon)
    
});

renderPokemon(searchPokemon)