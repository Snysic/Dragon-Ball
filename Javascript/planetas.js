const planetsApiUrl = "https://dragonball-api.com/api/planets";

async function getAllPlanets() {
    let planets = [];
    let nextPage = `${planetsApiUrl}?limit=10`; 

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();

        planets = planets.concat(data.items); 
        nextPage = data.links.next; 
    }

    displayPlanets(planets);
}

function displayPlanets(planets) {
    const container = document.getElementById("planets-container");

    planets.forEach(planet => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
            <div class="card">
                <img src="${planet.image}" class="card-img-top" alt="${planet.name}">
                <div class="card-body">
                    <h5 class="card-title">${planet.name}</h5>
                    <p class="card-text">Descripción: ${planet.description}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", getAllPlanets);