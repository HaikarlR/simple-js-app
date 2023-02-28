let pokemonRepository = (function () {
    let pokemonList = [
    { name: 'Bulbasaur', height: 7, types: ['grass', 'poison']},
    { name: ' Charmander', height: 6, types: ['fire']},
    { name: ' Squirtle', height: 5, types: ['water']}
];

function getAll(){
    return pokemonList;
}

function add(pokemon){
    pokemonList.push(pokemon);
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
    console.log(pokemon)
}


return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
};
})();

pokemonRepository.add({name: 'Pikachu', height: 4, types :['electric'] });
console.log(pokemonRepository.getAll());
// Using a for loop to write names and heights and adds a conditional
/*for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 6){ 
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')   Wow, that is tall!' + '<br>');
    } else {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');
    }
    
}*/

// Replacing the for loop with a forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
    // if (pokemon.height > 6){
    //     document.write(pokemon.name + ' (height: ' + pokemon.height + ') Wow, that is tall!' + '<br>');
    // } else {
    //     document.write(pokemon.name + ' (height: ' + pokemon.height + ')' + '<br>');
    // }
    pokemonRepository.addListItem(pokemon)
});