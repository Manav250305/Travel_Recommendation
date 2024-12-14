let travelData; // Global variable to hold fetched data

// Fetch data from JSON file
fetch('travel_recommendation_api.json') // Replace with your JSON file path
    .then(response => response.json())
    .then(data => {
        travelData = data; // Store fetched data globally
        console.log("Fetched Data:", travelData); // Check if data is fetched
    })
    .catch(error => console.error('Error fetching data:', error));

// Add event listener to the Search button
document.getElementById('btnSearch').addEventListener('click', () => {
    const searchInput = document.getElementById('destination').value.trim().toLowerCase();
    if (!searchInput) {
        alert("Please enter a keyword to search!");
        return;
    }
    displaySearchResults(searchInput);
});

// Add event listener to the Clear button
document.getElementById('btnClear').addEventListener('click', () => {
    document.getElementById('destination').value = ''; // Clear input field
    const container = document.getElementById('recommendationContainer');
    container.innerHTML = ''; // Clear search results
});

// Function to display search results
function displaySearchResults(keyword) {
    const container = document.getElementById('recommendationContainer');
    container.innerHTML = ''; // Clear previous results

    let resultsFound = false;

    // Check for beaches
    if (keyword.includes("beach") || keyword.includes("beaches")) {
        travelData.beaches.forEach(beach => {
            container.innerHTML += createCardHTML(beach);
        });
        resultsFound = true;
    }

    // Check for temples
    if (keyword.includes("temple") || keyword.includes("temples")) {
        travelData.temples.forEach(temple => {
            container.innerHTML += createCardHTML(temple);
        });
        resultsFound = true;
    }

    // Check for countries and cities
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

    // If no results are found
    if (!resultsFound) {
        container.innerHTML = `<p style="text-align: center; font-size: 1.2rem; color: #777;">
            No results found for "${keyword}". Try a different keyword!
        </p>`;
    }
}

// Helper function to generate card HTML
function createCardHTML(item) {
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
            <img src="${item.imageUrl}" alt="${item.name}" style="
                width: 100%; 
                height: 180px; 
                object-fit: cover;
            ">
            <div style="padding: 15px;">
                <h3 style="margin: 10px 0; font-size: 1.2rem; color: #333;">${item.name}</h3>
                <p style="color: #555; font-size: 0.9rem; line-height: 1.4;">
                    ${item.description}
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