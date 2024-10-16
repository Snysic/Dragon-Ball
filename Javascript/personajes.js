const apiUrl = "https://dragonball-api.com/api/characters";

async function getAllCharacters() {
    let characters = [];
    let nextPage = `${apiUrl}?limit=10`;

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();

        characters = characters.concat(data.items);
        nextPage = data.links.next; 
    }

    displayCharacters(characters);
}

function displayCharacters(characters) {
    const container = document.getElementById("characters-container");

    characters.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
            <div class="card">
                <img src="${character.image}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">Especie: ${character.species}</p>
                    <p class="card-text">Raza: ${character.race}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", getAllCharacters);