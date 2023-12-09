//URL for Axios calls
const potionsUrl = `https://api.potterdb.com/v1/potions?page[size]=10`;
const spellsUrl = `https://api.potterdb.com/v1/spells?filter[incantation_not_eq]=null&page[size]=10`;
const potionsPage2 = `https://api.potterdb.com/v1/potions?page[number]=2`;

// DOM Access
const potionsDiv = document.querySelector("#potions");
const potionsResultsDiv = document.querySelector("#potionsResults");
const spellsDiv = document.querySelector("#spells");
const spellsResultsDiv = document.querySelector("#spellsResults");
const potionsDetailsDiv = document.querySelector("#potionsDetails");
const spellsDetailsDiv = document.querySelector("#spellsDetails");
const hogImg = document.querySelector("#bannerImage");

//Functions for axios calls

//Potions call
const potionCalls = function (){
  axios
  .get(potionsUrl)

  .then(function (response) {
    console.log(response.data.data);

    for (const potions of response.data.data) {
      potionsResultsDiv.innerHTML += `
        <div id="potionsWrapper" data-id="${potions.id}">
        <h3>${potions.attributes.name}</h3>
        <img src=
        ${
          potions.attributes.image === null
            ? "https://cdn.pixabay.com/photo/2023/02/12/22/46/magic-7786147_1280.png"
            : potions.attributes.image
        }
        ${potions.attributes.image}>
        <p>Effect: 
        ${
          potions.attributes.effect === null
            ? "Unknown"
            : potions.attributes.effect
        }
        ${potions.attributes.effect} </p>
        </div>
    `;
    }
  })
  .catch(function (err) {
    console.log(`Error loading data`, err);
  });
}

//Spells call
const spellsCalls = function(){
  axios
    .get(spellsUrl)

    .then(function (response) {
      for (const spells of response.data.data) {
        spellsResultsDiv.innerHTML += `
    <h3>${spells.attributes.name}</h3>
    <img src=${spells.attributes.image}>
    <p>Effect: ${spells.attributes.effect}</p>
    `;
      }
    })
    .catch(function (err) {
      console.log(`Error loading data`, err);
    });
}

// Initial API call upon script load
potionCalls();
spellsCalls();

//Click on potions and get potions results
potionsDiv.addEventListener("click", function () {
  potionsResultsDiv.style.display = "flex";
  spellsResultsDiv.style.display = "none";
  potionsDiv.style.opacity = "100";
  spellsDiv.style.opacity = "0.2";
  spellsResultsDiv.style.display = "none";
  potionsDetailsDiv.style.display = "none";
  hogImg.style.display = "none";

  
});

// Pagination
/*
potionsDiv.addEventListener("click", function () {
  axios
    .get(potionsPage2)

    .then(function (response) {
      console.log(response.data.data);

      for (const potionsPage of response.data.data) {
        potionsResultsDiv.innerHTML += `
        <ul>
        <li><a href="${potionsPage}>1</a></li>
        <li>2</li>
        <li>3</li>
        </ul>
        `;
      }
    })
    .catch(function (err) {
      console.log(`Error loading data`, err);
    });
});*/

// Click on potion results and get potion details
potionsResultsDiv.addEventListener("click", function (ev) {
  spellsDiv.style.opacity = "0.2";
  spellsResultsDiv.style.display = "none";
  potionsDiv.style.opacity = "100";
  hogImg.style.display = "none";

  if (ev.target.closest("div#potionsWrapper")) {
    potionsResultsDiv.style.display = "none";
    potionsDetailsDiv.style.display = "flex";
    console.log(ev.target.closest("div#potionsWrapper"));

    const potionsId = ev.target.closest("div#potionsWrapper").dataset.id;
    const potionsIdUrl = `https://api.potterdb.com/v1/potions/${potionsId}`;

    console.log(potionsIdUrl);
    axios
      .get(potionsIdUrl)

      .then(function (response) {
        console.log(response.data);

        const map = new Map();
        map.set(response.data.data);

        for (const potionDetails of map.keys()) {
          const characteristics = map.get(potionDetails);
          console.log(characteristics, potionDetails);
          potionsDetailsDiv.innerHTML = `
      <div id=“potionsCard” data-id=“${potionDetails.id}“>
      <h3>${potionDetails.attributes.name}</h3>
      <img src=${potionDetails.attributes.image}>
      <p>Effect: ${potionDetails.attributes.effect}</p>
      <p>Ingredients: ${potionDetails.attributes.effect}</p>
      </div>
      `;
        }
      })
      .catch(function (err) {
        console.log(`Error loading data`, err);
      });
  }
});

//Click on spells and get spell results
spellsDiv.addEventListener("click", function () {
  spellsDiv.style.opacity = "100";
  spellsResultsDiv.style.display = "flex";
  potionsResultsDiv.style.display = "none";
  potionsDiv.style.opacity = "0.2";
  potionsResultsDiv.style.display = "none";
  potionsDetailsDiv.style.display = "none";
  hogImg.style.display = "none";

});
