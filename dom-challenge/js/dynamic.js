// ==========================================
// 1. SELECTORS & CORE STATE
// ==========================================
const actionForm = document.getElementById('action-form');
const actionInput = document.getElementById('action-input');
const prioritySelect = document.getElementById('priority-select');
const actionList = document.getElementById('action-list');
const cardCounter = document.getElementById('card-counter');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');
const fileInput = document.getElementById('file-input');


// ==========================================
// 2. TODO: PROGRAMMATIC NODE CREATION
// ==========================================
const createActionCard = (text, priority) => {
    const li = document.createElement('li');

    li.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center',
        'impact-card'
    );

    
    li.classList.add(`priority-${priority}`);

    
    let badgeClass = 'bg-secondary';

    if (priority === 'high') {
        badgeClass = 'bg-danger';
    } else if (priority === 'medium') {
        badgeClass = 'bg-warning text-dark';
    } else if (priority === 'low') {
        badgeClass = 'bg-success';
    }

    
    li.innerHTML = ` 
        <div class="d-flex align-items-center"> 
            <span class="card-title fw-semibold">${text}</span> 
            <span class="badge ms-2 ${badgeClass} text-capitalize">${priority}</span>
        </div> 

        <div class="btn-group btn-group-sm"> 
            <button class="btn btn-outline-success" data-action="toggle">✓</button> 
            <button class="btn btn-outline-secondary" data-action="up">▲</button> 
            <button class="btn btn-outline-secondary" data-action="down">▼</button> 
            <button class="btn btn-outline-danger" data-action="delete">🗑</button> 
        </div> 
    `; 

    return li; 
};

// ==========================================
// 3. TODO: STATE COUNTER MANAGER
// ==========================================
const updateCounter = () => {
    // Calculate total children nodes inside actionList
    // and update cardCounter display.
    const total = actionList.children.length;
    const completed = actionList.querySelectorAll('.completed').length;
    cardCounter.textContent = `Total: ${total} Items, Completed: ${completed}`;
};

// ==========================================
// 4. TODO: FORM SUBMIT LISTENERS
// ==========================================
actionForm.addEventListener('submit', (e) => {
    // Prevent browser reload
    e.preventDefault();

    // Extract input text
    const text = actionInput.value.trim();
    const priority = prioritySelect.value;

    // If the input is empty, don't create a card
    if (text === "") return;

    // Instantiate a card
    const newCard = createActionCard(text, priority);

    // Append card to target list
    actionList.appendChild(newCard);

    // Reset form
    actionInput.value = '';
    prioritySelect.value = 'medium';

    // Update count
    updateCounter();
});

// ==========================================
// 5. TODO: EVENT DELEGATION & TRAVERSAL ENGINE
// ==========================================
actionList.addEventListener('click', (e) => {

    // 5a. Identify if a button or an icon
    // with "data-action" was clicked
    const action = e.target.getAttribute('data-action');

    if (!action) return;

    // 5b. Find the closest target parent card element
    const currentCard = e.target.closest('.impact-card');

    if (!currentCard) return;

    // 5c. Implement dynamic operations
    if (action === 'toggle') {

        // Toggle complete class on currentCard
        currentCard.classList.toggle('completed');
        updateCounter(); //llama otra vez la funcion al completar una task
    }

    else if (action === 'delete') {

        // Remove currentCard from DOM
        currentCard.remove();

        // Update totals
        updateCounter();

    }

    else if (action === 'up') {

        // Find sibling element directly above currentCard
        const previousCard = currentCard.previousElementSibling;

        // If it exists, move currentCard before it
        if (previousCard) {
            actionList.insertBefore(currentCard, previousCard);
        }

    }

    else if (action === 'down') {

        // Find sibling element directly below currentCard
        const nextCard = currentCard.nextElementSibling;

        // If it exists, move nextCard before currentCard
        if (nextCard) {
            actionList.insertBefore(nextCard, currentCard);
        }

    }
});


// ==========================================
// 6. LOCAL FILE EXPORT ENGINE 
// ==========================================
saveBtn.addEventListener('click', () => {
    // 1. Target all dynamically spawned list item nodes inside the DOM
    const actionCards = actionList.querySelectorAll('li');
    const exportData = [];
    // 2. Loop through active elements and scrape current UI state into an array
    actionCards.forEach((card) => {
        const titleElement = card.querySelector('.card-title');
        const priorityElement = card.querySelector('.badge');
        const isCompleted = card.classList.contains('completed');

        exportData.push({
            title: titleElement.textContent.trim(),
            priority: priorityElement.textContent.trim(),
            completed: isCompleted
        });
    });
    console.log(exportData);
    
    // 3. Defensive Check: Prevent exporting blank structures

    // 4. Serialize the JavaScript Array to formatted JSON text (from our JSON standards)

    // 5. Create a static Blob (Binary Large Object) containing our raw string payload

    // 6. Generate an ephemeral, localized URL string pointing to our Blob in memory

    // 7. Spawn a hidden anchor element to act as a programmatic trigger
    // Format filename dynamically with the current ISO calendar date

    // 8. Mount, programmatically click, and immediately unmount the anchor link

    // 9. Clean up memory pointers by revoking the Object URL slightly after completion
});

// ==========================================
// 7. IMPORT WORKFLOW (LOAD JSON VIA FILEREADER)
// ==========================================

// Click load button to programmatically trigger hidden local system explorer
loadBtn.addEventListener('click', () => {
    
});

// Handle local file selection event
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return; // Action cancelled by user

    // Instantiate native Web API FileReader stream
    const reader = new FileReader();

    // Define asynchronous execution callback once the file stream buffer finishes reading
    reader.onload = function(e) {
        try {    
            // Parse raw text into structured JSON array

            // Defensive Validation: Is this actually a valid array?

            // Prompt verification to avoid accidentally overriding current work

            // Clear current DOM items

            // Loop and programmatically spawn new cards

            // Update real-time statistics counters

        } catch (error) {
            console.error("Reader processing crashed:", error);
            alert(`❌ File Parsing Failed: ${error.message}`);
        } finally {
            // Flush file input selection so the user can re-upload the same file on demand
            fileInput.value = '';
        }
    };

    // Trigger the file read stream as text encoding
    reader.readAsText(file);
});