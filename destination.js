function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
  }
  
  function readFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return null;
    }
  }
  
  let favorites = readFromLocalStorage("favorites") || [];
  
  // Get URL parameters
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");
  
  fetch(`/data/${id}.json`)
  .then(response => response.json())
  .then(data => {
    let isFavorite = favorites.includes(data.id.toString());
  
    let sectionElm = document.createElement("section");
    sectionElm.classList.add("sec2"); 
  
    sectionElm.innerHTML = `
       <button class="card__favoritebtn2" data-favid="${data.id}">
       <i class="fa-regular fa-heart ${isFavorite ? "heart-selected" : ""}"></i> Favorite
       </button>
       <img class="big" src="/img/${data.image}" alt="${data.destination}"> 
       <article class="card">
          <span>${data.destination}</span>
          <h2>${data.title}</h2>
          <p>${data.text}</p>
          <h5>${data.subtitle}</h5>
          <h3>Faciliteter</h3>
          <ul>
              ${data.facilities.map(facility => `<li>${facility}</li>`).join('')}
          </ul>
       </article>
    `;
  
    document.querySelector("#root").append(sectionElm);

    let favoriteBtn = sectionElm.querySelector(".card__favoritebtn2");
    let heartIcon = favoriteBtn.querySelector("i");
  
    favoriteBtn.addEventListener("click", function () {
        let currentId = data.id.toString();
  
        if (favorites.includes(currentId)) {
            favorites = favorites.filter(id => id !== currentId);
            heartIcon.classList.remove("heart-selected");
        } else {
            favorites.push(currentId);
            heartIcon.classList.add("heart-selected");
        }
  
        saveToLocalStorage("favorites", favorites);
    });
  })
  .catch(error => console.error("Error loading data:", error));
  