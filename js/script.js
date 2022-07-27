//variaveis de retorno estas variaveis representam uma saida na pokedex
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNunber = document.querySelector('.pokemon__number');
const pokemonType = document.querySelector('.pokemon__type');
let pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');


//variaveis de entrada, estas variaveis representam uma entrada no codigo
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonshiny = document.querySelector('.shiny');

//variaveis de apoio, essas variaveis auxiliam no codigo em em if ou em funções
let shiny = 0;
let searchPokemon = 1;

//essa função captura o pacote da api
const fetchPokemon = async  (pokemon) =>{

    pokemonName.innerHTML = 'Carregando...';
    pokemonNunber.innerHTML = '';

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}
//essa função pegas as informações do pacote da api e distribui as saidas
const renderPokemon = async (pokemon) =>{
    const data = await fetchPokemon(pokemon);
    //aqui o programa só renderiza as informações se elas forem de um endereço valido
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNunber.innerHTML = data.id;
        input.value = '';
        searchPokemon = data.id;
        //para transformar o pokemon em shyni nos primeiro checamos se ele já não é shiny
        //se ele for então voltamos ele a sua forma normal
        if(shiny == 0){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            pokemonName.innerHTML = data.name;
        }
        else{
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
            pokemonName.innerHTML = data.name + ' shiny';
        }
        pokemonType.innerHTML = data['types']['0']['type']['name']
        //essa condicional, faz com que o segundo tipo do pokemon só apareça se ele existir
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
//essa função pesquisa pokemons pelo id ou pelonome
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    shiny = 0;
    renderPokemon(input.value.toLowerCase());
});
//estes eventos dão aos botões next e prev as ações de passar ou voltar na lista
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

//esse botão possibilita visualizar os pokemons em sua forma shiny
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