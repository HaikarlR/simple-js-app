let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



function add(pokemon){
    if ( 
        typeof pokemon === 'object' &&
        'name' in pokemon
    ) {
        pokemonList.push(pokemon);
    } else { 
        console.log('pokemon is not correct');
    }
}

function getAll(){
    return pokemonList;
}
// Creating a button list to hold the pokemon
function addListItem(pokemon){
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-item');
    
    listItem.appendChild(button);
    list.appendChild(listItem);
    /* Adds an event listner for the buttons to show pokemon details in
    the logs when clicked*/
    button.addEventListener('click', function() {
        showDetails(pokemon);
    })

}

function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
        console.log(pokemon) 
    });
    
}

// Fetch data from API and add each Pokemon in the fetched data
function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url 
            };
            add(pokemon);
        });
    }).catch(function (e) {
        console.error(e);
    })
}
 // Uses the detailsUrl property to load the details for a given Pokemon 
function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
}

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

console.log(pokemonRepository.getAll());


// Using a for loop to write names and heights and adds a conditional
/*for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 6){ 
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')   Wow, that is tall!' + '<br>');
    } else {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');
    }
    
}*/
pokemonRepository.loadList().then(function() {
// Replacing the for loop with a forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
    // if (pokemon.height > 6){
    //     document.write(pokemon.name + ' (height: ' + pokemon.height + ') Wow, that is tall!' + '<br>');
    // } else {
    //     document.write(pokemon.name + ' (height: ' + pokemon.height + ')' + '<br>');
    // }
    pokemonRepository.addListItem(pokemon)
    });
})   