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

return {
    add: add,
    getAll: getAll
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
pokemonRepository.getAll().forEach(function (pokemon){
    if (pokemon.height > 6){
        document.write(pokemon.name + ' (height: ' + pokemon.height + ') Wow, that is tall!' + '<br>');
    } else {
        document.write(pokemon.name + ' (height: ' + pokemon.height + ')' + '<br>');
    }
});