let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

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
        button.classList.add('list-group-item');
        button.classList.add('img');

        // Adding theing bootstrap btn class
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('col');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokeModal');

        //Appending to the button
        listItem.appendChild(button);
        list.appendChild(listItem);
        
        /* Adds an event listner for the buttons to show pokemon details in
        the logs when clicked*/
        button.addEventListener('click', function() {
            showDetails(pokemon);
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
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.weight = details.weight;
        item.height = details.height;
        item.types = details.types;
        item.abilities = details.abilities;
    }).catch(function (e) {
        console.error(e);
    });
}

function showDetails(pokemon){
    loadDetails(pokemon)
    .then(function () { 
    showModal(pokemon);
    });
}
    // Show modal content
   function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    // Clear existing content of the modal
    modalTitle.empty();
    modalBody.empty();

    // Creating element for name in modal content
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    // Creating img in modal content
    let imageElementFront = $('<img class="modal-img" style ="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style ="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    // Creating element for height in modal content
    let heightElement = $("<p>" + "Height: " + pokemon.height/10 + "m" + "</p>");
    // Creating element for height in modal content
    let weightElement = $("<p>" + "Weight: " + pokemon.weight/10 + "kg" + "</p>");
    // Creating element for height in modal content
    // let typesElement = $("<p>" + "types: " + pokemon.types + "</p>");
    // Creating element for abilities in modal content
    // let abilitiesElement = $("<p>" + "abilities: " + pokemon.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    //modalBody.append(typesElement);
    //modalBody.append(abilitiesElement);

    };

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };

})();

pokemonRepository.loadList().then(function() {
// Replacing the for loop with a forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
});

