const headerElement = document.querySelector("header");
const sectionElement = document.querySelector("section");

function renderHeader(data) {
    headerElement.innerHTML = ""; 
    headerElement.innerHTML = `
        <h1>${data.squadName}</h1>
        <p>${data.labelHomeTown}: ${data.homeTown} // ${data.labelFormed} ${data.formed}</p>
    `;
}

function renderHeroes(data) {
    sectionElement.innerHTML = ""; 
    data.members.forEach(member => {
        let powersHTML = "";
        member.powers.forEach(power => {
            powersHTML += `<li>${power}</li>`; 
        });

        sectionElement.innerHTML += `
            <article>
                <h2>${member.name}</h2>
                <p>${data.labelSecretIdentity}: ${member.secretIdentity}</p>
                <p>${data.labelAge}: ${member.age}</p>
                <p>${data.labelSuperpowers}:</p>
                <ul>${powersHTML}</ul>
            </article>
        `;
    });
}

let localizationData = {};

function fetchTranslations(language) {
    fetch(`./locales/${language}.json`)
        .then(response => response.json())
        .then(data => {
            localizationData = data;
            updateContent();
        })
        .catch(error => console.error("Error loading translations:", error));
}

function updateContent() {
    renderHeader(localizationData);
    
    renderHeroes(localizationData);
}

document.getElementById("language-selector").addEventListener("change", function () {
    const selectedLanguage = this.value;
    fetchTranslations(selectedLanguage);
});

fetchTranslations("en");