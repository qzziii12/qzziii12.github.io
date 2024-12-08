const header = document.querySelector('header');
const section = document.querySelector('section');
const requestURL = 'https://semegenkep.github.io/json/example.json';
const request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    const superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
};

function populateHeader(superHeroes) {
    const h1 = document.createElement('h1');
    h1.textContent = superHeroes.squadName;
    header.appendChild(h1);

    const para = document.createElement('p');
    para.textContent = `Hometown: ${superHeroes.homeTown} // Formed: ${superHeroes.formed}`;
    header.appendChild(para);
}

function showHeroes(superHeroes) {
    const heroes = superHeroes.members;

    heroes.forEach(hero => {
        const article = document.createElement('article');

        const h2 = document.createElement('h2');
        h2.textContent = hero.name;
        article.appendChild(h2);

        const para1 = document.createElement('p');
        para1.textContent = `Secret identity: ${hero.secretIdentity}`;
        article.appendChild(para1);

        const para2 = document.createElement('p');
        para2.textContent = `Age: ${hero.age}`;
        article.appendChild(para2);

        const para3 = document.createElement('p');
        para3.textContent = 'Superpowers:';
        article.appendChild(para3);

        const ul = document.createElement('ul');
        hero.powers.forEach(power => {
            const li = document.createElement('li');
            li.textContent = power;
            ul.appendChild(li);
        });
        article.appendChild(ul);

        section.appendChild(article);
    });
}
