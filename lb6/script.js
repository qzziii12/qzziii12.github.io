const header = document.querySelector("header")
const section = document.querySelector("section")
const requestURL = "https://semegenkep.github.io/json/example.json"

const request = new XMLHttpRequest()
request.open("GET", requestURL)

request.responseType = "json"
request.send()

request.onload = function() {
    const superHeroes = request.response
    populateHeader(superHeroes)
    showHeroes(superHeroes)
}

function populateHeader(superheroes) {
    const h1 = document.createElement("h1");
    h1.textContent = superheroes.squadName;

    const p = document.createElement("p");
    p.innerHTML = `Hometown: <strong>${superheroes.homeTown}</strong> // Formed <strong>${superheroes.formed}</strong>`;

    header.append(h1, p);
}

function showHeroes(superheroes) {
    superheroes.members.forEach(({ name, secretIdentity, age, powers }) => {
        const article = document.createElement("article");

        article.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Secret Identity:</strong> ${secretIdentity}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Superpowers:</strong></p>
        `;

        const ul = document.createElement("ul");
        powers.forEach(power => {
            const li = document.createElement("li");
            li.textContent = power;
            ul.appendChild(li);
        });

        article.appendChild(ul);
        section.appendChild(article);
    });
}