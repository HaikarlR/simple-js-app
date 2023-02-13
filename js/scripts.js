let pokemonList = [
    { name: 'Bulbasaur', height: 7, types: ['grass', 'poison']},
    { name: ' Charmander', height: 6, types: ['fire']},
    { name: ' Squirtle', height: 5, types: ['water']}
];

// Using a for loop to write names and heights and adds a conditional
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 6){ 
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')   Wow, that is tall!' + '<br>');
    } else {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');
    }
    
} 