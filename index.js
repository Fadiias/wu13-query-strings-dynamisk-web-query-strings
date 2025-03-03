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
let sectionElm = document.createElement("section");

// Add Dark Mode Toggle (Global, Outside the Loop)
let darkModeToggle = document.createElement("div");
darkModeToggle.classList.add("toggle-container");
darkModeToggle.innerHTML = `
    <label for="darkModeSwitch">Dark Mode</label>
    <input type="checkbox" id="darkModeSwitch" class="dark-mode-toggle">
`;
document.querySelector("#root").append(darkModeToggle);

// Apply Dark Mode from Local Storage
const darkModeSwitch = document.getElementById("darkModeSwitch");
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeSwitch.checked = true;
}

darkModeSwitch.addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
    }
});

fetch("/data/destinations.json")
    .then(response => response.json())
    .then(data => {
        sectionElm.innerHTML = data.destinations.map(destination => {
            let isFavorite = favorites.includes(destination.id.toString());
            return `
                <article>
                    <a href="destination.html?id=${destination.id}">
                        <img src="/img/${destination.image}" alt="${destination.name}">
                    </a>
                    <a href="destination.html?id=${destination.id}">More</a>
                    <button class="card__favoritebtn ${isFavorite ? "card__favoritebtn--selected" : ""}" data-favid="${destination.id}">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </article>
            `;
        }).join("");

        sectionElm.querySelectorAll(".card__favoritebtn").forEach(button => {
            button.addEventListener("click", function (event) {
                let currentId = event.currentTarget.dataset.favid;

                if (favorites.includes(currentId)) {
                    favorites = favorites.filter(id => id !== currentId);
                    event.currentTarget.classList.remove("card__favoritebtn--selected");
                } else {
                    favorites.push(currentId);
                    event.currentTarget.classList.add("card__favoritebtn--selected");
                }

                saveToLocalStorage("favorites", favorites);
            });
        });

        document.querySelector("#root").append(sectionElm);
    })
    .catch(error => console.error("Error loading destinations:", error));
