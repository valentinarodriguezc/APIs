const url = "https://gateway.marvel.com:443/v1/public/characters?apikey=8f5daf48d75f254dca138c28fe7cd332&ts=1&hash=6723d7b80e5b440dee21bf6234b6f901";

// Función para mostrar los personajes como tarjetas (cards)
function showCharacters(dataCharacters) {
    const container = document.querySelector("#container-card"); // id del contenedor donde se mostrarán las tarjetas
    
    let containerHTML = "";
    
    dataCharacters.forEach(character => {
        
        const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        const marvelUrl = "https://www.marvel.com/comics/characters" 

        containerHTML += `
        <div class="col-md-4">
          <div class="cards card mb-4 shadow-sm custom-card cursor-active" onclick="window.location='${marvelUrl}'" style="cursor: pointer;">
            <img class="bd-placeholder-img card-img-top" src="${imageUrl}" alt="${character.name}">
            <h3 class="m-3">${character.name}</h3>
            <div class="card-body"></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = containerHTML;
}


fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.data && data.data.results) {
            showCharacters(data.data.results);
        } else {
            console.error("No se encuentran resultados");
        }
    })
    .catch(error => {
        console.error("Hubo un problema con la búsqueda", error);
    });
