// Get the data from the DOM
const itemForm = document.getElementById('itemForm');
const itemsContainer = document.getElementById('items-container');

// Add an event listener to the itemForm for the 'submit' event
itemForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value of the input field with id 'quantity'
    const quantity = document.getElementById('quantity').value;

    // Send a POST request to '/generate' endpoint with the quantity as data
    axios.post('/generate', { quantity })
        .then(response => {
            // When the POST request is successful, retrieve numbers from response data
            const numbers = response.data.numbers;

            // Check if numbers array exists and has items
            if (numbers && numbers.length > 0) {
                // Generate HTML for each number in the numbers array
                const itemsHTML = numbers.map(number => `
                    <div class="item">
                      <p class="number">${number}</p>
                    </div>
                `).join('');

                // Update the innerHTML of itemsContainer with generated HTML
                itemsContainer.innerHTML = itemsHTML;
            }
        })
        // Log an error message to the console if the request fails
        .catch(error => {
            console.error('Error fetching items:', error);
        });
});
