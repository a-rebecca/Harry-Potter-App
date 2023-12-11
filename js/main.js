//URL for Axios calls
const potionsUrl = `https://api.potterdb.com/v1/potions?filter[characteristics_not_eq]=null&filter[effect_not_eq]=null&?filter[ingredients_not_eq]=null&filter[difficulty_not_eq]=nullpage[size]=40`;
const spellsUrl = `https://api.potterdb.com/v1/spells?filter[incantation_not_eq]=null&filter[hand_not_eq]=null&filter[effect_not_eq]=null&page[size]=40`;

// DOM Access
const potionsDiv = document.querySelector("#potions");
const potionsResultsDiv = document.querySelector("#potionsResults");
const spellsDiv = document.querySelector("#spells");
const spellsResultsDiv = document.querySelector("#spellsResults");
const potionsDetailsDiv = document.querySelector("#potionsDetails");
const spellsDetailsDiv = document.querySelector("#spellsDetails");
const castle = document.querySelector("#castle");

////Functions for axios calls////

//Potions call
const potionCalls = function () {
  axios
    .get(potionsUrl)

    .then(function (response) {

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
        ${potions.attributes.effect} </p>
        </div>
    `;
      }
    })
    .catch(function (err) {
      console.log(`Error loading data`, err);
    });
};

//Spells call
const spellsCalls = function () {
  axios
    .get(spellsUrl)

    .then(function (response) {

      for (const spells of response.data.data) {
        spellsResultsDiv.innerHTML += `
    <div id="spellsWrapper" data-id="${spells.id}">       
    <h3>${spells.attributes.name}</h3>
    <img src=
    ${
      spells.attributes.image === null
        ? "https://cdn.pixabay.com/photo/2013/07/12/14/14/wand-148059_1280.png"
        : spells.attributes.image
    }>
    <p>Effect: ${spells.attributes.effect}</p>
    </div>
    `;
      }
    })
    .catch(function (err) {
      console.log(`Error loading data`, err);
    });
};

////Styling functions////

//Click on potions and get potions results
const potionsResults = function () {
  potionsDiv.addEventListener("click", function () {
    potionsResultsDiv.style.display = "flex";
    spellsResultsDiv.style.display = "none";
    potionsDiv.style.opacity = "100";
    spellsDiv.style.opacity = "0.2";
    spellsDetailsDiv.style.display = "none";
    potionsDetailsDiv.style.display = "none";
    castle.style.display = "none";
  });
};

//Click on spells and get spell results
const spellsResults = function () {
  spellsDiv.addEventListener("click", function () {
    spellsDiv.style.opacity = "100";
    spellsResultsDiv.style.display = "flex";
    potionsResultsDiv.style.display = "none";
    potionsDiv.style.opacity = "0.2";
    potionsDetailsDiv.style.display = "none";
    spellsDetailsDiv.style.display = "none";
    castle.style.display = "none";
  });
};

// Initial API call upon script load
potionCalls();
spellsCalls();

//Styling functions
potionsResults();
spellsResults();

// Click on potion results and get potion details
potionsResultsDiv.addEventListener("click", function (ev) {
  if (ev.target.closest("div#potionsWrapper")) {
    potionsResultsDiv.style.display = "none";
    potionsDetailsDiv.style.display = "flex";

    const potionsId = ev.target.closest("div#potionsWrapper").dataset.id;
    const potionsIdUrl = `https://api.potterdb.com/v1/potions/${potionsId}`;

    axios
      .get(potionsIdUrl)

      .then(function (response) {

        const map = new Map();
        map.set(response.data.data);
        console.log(map.keys());
        for (const potionDetails of map.keys()) {
          const characteristics = map.get(potionDetails);
          potionsDetailsDiv.innerHTML = `
      <div id=“potionsCard” data-id=“${potionDetails.id}“>
      <h3>${potionDetails.attributes.name}</h3>
      <img src=${potionDetails.attributes.image}>
      <p>Effect: ${potionDetails.attributes.effect}</p><br>
      <p>Ingredients: ${potionDetails.attributes.ingredients}</p><br>
      <p>Difficulty: ${potionDetails.attributes.difficulty}</p>
      </div>
      `;
        }
      })
      .catch(function (err) {
        console.log(`Error loading data`, err);
      });
  }
});

// Click on spell results and get spell details
spellsResultsDiv.addEventListener("click", function (ev) {
  potionsDiv.style.opacity = "0.2";
  spellsDiv.style.opacity = "100";

  if (ev.target.closest("div#spellsWrapper")) {
    potionsResultsDiv.style.display = "none";
    potionsDetailsDiv.style.display = "none";
    spellsDetailsDiv.style.display = "flex";
    spellsResultsDiv.style.display = "none";
    castle.style.display = "none";

    const spellsId = ev.target.closest("div#spellsWrapper").dataset.id;
    const spellsIdUrl = `https://api.potterdb.com/v1/spells/${spellsId}`;

    axios
      .get(spellsIdUrl)

      .then(function (response) {
        console.log(response.data);

        const spellDetails = response.data.data
          console.log(spellDetails);
          spellsDetailsDiv.innerHTML = `
            <div id=“spellCard” data-id=“${spellDetails.id}“>
              <h3>${spellDetails.attributes.name}</h3>
              <img src=${spellDetails.attributes.image}><br>
              <p>Incantation: ${spellDetails.attributes.incantation}</p><br>
              <p>Effect: ${spellDetails.attributes.effect}</p><br>
              <p>Hand motion: ${spellDetails.attributes.hand}</p>
            </div>
          `;
      })
      .catch(function (err) {
        console.log(`Error loading data`, err);
      });
  }
});