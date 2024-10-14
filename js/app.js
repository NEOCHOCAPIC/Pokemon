const d = document;
const listapokemon = d.querySelector('#listapokemon') 
let url = "https://pokeapi.co/api/v2/pokemon/"
const botonHeader = d.querySelectorAll(".btn-header")

async function obtenerPokemones() {
    for (let i = 1; i <= 151; i++) {
        try {
            const response = await fetch(url + i);
            const data = await response.json();
            mostrarpokemon(data);
        } catch (error) {
            console.error("Error al obtener el Pokémon:", error);
        }
    }
}

function mostrarpokemon(data) {
    let tipos = data.types.map(type => `
        <p class="${type.type.name} tipo">${type.type.name}</p>`
    ).join('');

    let pokeId = data.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = d.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
        <img src="${data.sprites.other["official-artwork"].front_default}" alt="">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${data.name}</h2>
        </div>
        <div class="pokemon-tipos">
          ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">Altura: ${data.height}m</p>
            <p class="stat">Peso: ${data.weight}KG</p>
        </div>
    </div>
    `;
    listapokemon.append(div);
}
obtenerPokemones();


botonHeader.forEach(boton => {
    boton.addEventListener("click", async (event) => {
        const botonId = event.currentTarget.id;
        listapokemon.innerHTML = '';

        for (let i = 1; i <= 151; i++) {
            try {
                const response = await fetch(url + i);
                const data = await response.json();

                const tipos = data.types.map(type => type.type.name);
                if (botonId === "ver-todos") {
                    mostrarpokemon(data);
                } else {
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarpokemon(data);
                    }
                }
            } catch (error) {
                console.error("Error al obtener el Pokémon:", error);
            }
        }
    });
});