let travelData; 
fetch('travel_recommendation_api.json') 
    .then(response => response.json())
    .then(data => {
        travelData = data; 
        console.log("Fetched Data:", travelData); 
    })
    .catch(error => console.error('Error fetching data:', error));

document.getElementById('btnSearch').addEventListener('click', () => {
    const searchInput = document.getElementById('destination').value.trim().toLowerCase();
    if (!searchInput) {
        alert("Please enter a keyword to search!");
        return;
    }
    displaySearchResults(searchInput);
});

document.getElementById('btnClear').addEventListener('click', () => {
    document.getElementById('destination').value = ''; // Clear input field
    const container = document.getElementById('recommendationContainer');
    container.innerHTML = ''; 
});

function displaySearchResults(keyword) {
    const container = document.getElementById('recommendationContainer');
    container.innerHTML = ''; 

    let resultsFound = false;

    if (keyword.includes("beach") || keyword.includes("beaches")) {
        travelData.beaches.forEach(beach => {
            container.innerHTML += createCardHTML(beach);
        });
        resultsFound = true;
    }

    if (keyword.includes("temple") || keyword.includes("temples")) {
        travelData.temples.forEach(temple => {
            container.innerHTML += createCardHTML(temple);
        });
        resultsFound = true;
    }

    if (keyword.includes("country") || keyword.includes("countries")) {
        travelData.countries.forEach(country => {
            container.innerHTML += createCardHTML(country);
        });
        resultsFound = true;
    }

    travelData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(keyword)) {
            country.cities.forEach(city => {
                container.innerHTML += createCardHTML(city);
            });
            resultsFound = true;
        }
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(keyword)) {
                container.innerHTML += createCardHTML(city);
                resultsFound = true;
            }
        });
    });

    if (!resultsFound) {
        container.innerHTML = `<p style="text-align: center; font-size: 1.2rem; color: #777;">
            No results found for "${keyword}". Try a different keyword!
        </p>`;
    }
}

function createCardHTML(item) {
    // Ensure that the `item` object has the expected fields (imageUrl, description, name)
    const imageUrl = item.imageUrl || 'default_image.jpg'; // Use a default image if none provided
    const description = item.description || 'No description available.';
    
    return `
        <div class="card" style="
            border: 1px solid #ddd; 
            border-radius: 10px; 
            box-shadow: 0 2px 5px rgba(0,0,0,0.2); 
            overflow: hidden; 
            margin: 20px; 
            max-width: 300px;
            text-align: center;
        ">
            <img src="${imageUrl}" alt="${item.name}" style="
                width: 100%; 
                height: 180px; 
                object-fit: cover;
            ">
            <div style="padding: 15px;">
                <h3 style="margin: 10px 0; font-size: 1.2rem; color: #333;">${item.name}</h3>
                <p style="color: #555; font-size: 0.9rem; line-height: 1.4;">
                    ${description}
                </p>
                <a href="#" style="
                    display: inline-block; 
                    background-color: #2a9d8f; 
                    color: #fff; 
                    padding: 8px 12px; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    margin-top: 10px;
                ">
                    Visit
                </a>
            </div>
        </div>
    `;
}

function updateCityTime() {
    const options = { 
        timeZone: 'Asia/Kolkata', 
        hour12: true, 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric' 
    };
    const kolkataTime = new Date().toLocaleTimeString('en-AU', options);
    document.getElementById('cityTime').innerText = `Current time in Kolkata: ${kolkataTime}`;
}

setInterval(updateCityTime, 1000);

updateCityTime();