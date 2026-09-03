// ==========================================
// 1. SELECTORS & CORE STATE
// ==========================================
const actionForm = document.getElementById('action-form');
const actionInput = document.getElementById('action-input');
const prioritySelect = document.getElementById('priority-select');
const actionList = document.getElementById('action-list');
const cardCounter = document.getElementById('card-counter');

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