const btnSearch = document.getElementById("BtnSearch");

const cleanButton = document.getElementById("Clean");

btnSearch.addEventListener("click", searchDestination);

// BOTÃO LIMPAR

cleanButton.addEventListener("click", () => {

    document.getElementById("results").innerHTML = "";

    document.getElementById("ConditionInput").value = "";
});

// FUNÇÃO DE BUSCA

function searchDestination(){

    const input = document
        .getElementById("ConditionInput")
        .value
        .toLowerCase()
        .trim();

    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "";

    fetch("./travel_recommendation_api.json")

    .then(response => response.json())

    .then(data => {

        let results = [];

        // PRAIAS

        if(
            input === "beach" ||
            input === "beaches" ||
            input === "praia" ||
            input === "praias"
        ){

            results = data.beaches;
        }

        // TEMPLOS

        else if(
            input === "temple" ||
            input === "temples" ||
            input === "templo" ||
            input === "templos"
        ){

            results = data.temples;
        }

        // PAÍSES

        else{

            data.countries.forEach(country => {

                // procura país

                if(
                    country.name.toLowerCase() === input
                ){

                    results = country.cities;
                }

                // procura cidade

                country.cities.forEach(city => {

                    if(
                        city.name
                        .toLowerCase()
                        .includes(input)
                    ){

                        results.push(city);
                    }
                });
            });
        }

        // SEM RESULTADOS

        if(results.length === 0){

            resultsDiv.innerHTML = `

                <h2>
                    Nenhum resultado encontrado.
                </h2>
            `;

            return;
        }

        // MOSTRAR RESULTADOS

        results.forEach(place => {

            resultsDiv.innerHTML += `

                <div class="result-card">

                    <img 
                        src="${place.imageUrl}" 
                        alt="${place.name}"
                    >

                    <div class="result-content">

                        <h3>${place.name}</h3>

                        <p>${place.description}</p>

                    </div>

                </div>
            `;
        });

    })

    .catch(error => {

        console.error(error);
    });
}