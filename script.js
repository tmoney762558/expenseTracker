// Constants
const mainDisplay = document.getElementById("main-display");
const expensesDisplay = document.getElementById("expenses-display");
const addExpenseForm = document.getElementById("add-expense-form");
const titleInput = document.getElementById("title-input");
const amountInput = document.getElementById("amount-input");
const descriptionInput = document.getElementById("description-input");
const totalExpenseDisplay = document.getElementById("total-expense-display");
const addExpenseBtn = document.getElementById("add-expense-btn");
const discardChangesBtn = document.getElementById("discard-changes-btn");
const confirmExpenseBtn = document.getElementById("confirm-expense-btn");
// Value Storage
let tasks = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};
// Load local storage
updateExpenseDisplay();
// Event Listeners
addExpenseBtn.addEventListener("click", toggleForm);
confirmExpenseBtn.addEventListener("click", addOrEditExpense);
discardChangesBtn.addEventListener("click", discardChanges);
//Functions
function toggleForm() {
    addExpenseForm.classList.toggle("hidden");
    mainDisplay.classList.toggle("hidden");
    mainDisplay.classList.toggle("flex");
}
// Function for clearing all input fields
function clearInput() {
    titleInput.value = "";
    amountInput.value = "";
    descriptionInput.value = "";
}
// Function for removing disallowed inputs
function validateInput(input) {
    const regex = /^\d*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^\d]/g, '');
    }
}
// Function that allows for adding and editing of expenses
function addOrEditExpense() {
    if (titleInput.value === "" || amountInput.value === "") {
        alert("Please fill out required fields.")
        return;
    }

    if (descriptionInput.value === "") {
        descriptionInput.value = "None"
    }

    currentTask.title = titleInput.value;
    currentTask.id = currentTask.title + "-" + Date.now();
    currentTask.amount = amountInput.value;
    currentTask.description = descriptionInput.value;

    if (confirmExpenseBtn.innerText !== "Confirm Edit") {
        tasks.push(currentTask);
    }

    localStorage.setItem("data", JSON.stringify(tasks));
    currentTask = {};
    updateExpenseDisplay();
    clearInput();
    toggleForm();
    confirmExpenseBtn.innerHTML = "Add Expense";
}
// Function for removing expenses from the tasks array
function deleteExpense(buttonEl) {
    const currentIndex = tasks.findIndex((item) => {
        return item.id === buttonEl.parentElement.id;
    });

    tasks.splice(currentIndex, 1);
    buttonEl.parentElement.remove();
    updateExpenseDisplay();
    localStorage.setItem("data", JSON.stringify(tasks));
}
// Function for loading the value of the expense the user has selected to edit
function openEditForm(buttonEl) {
    const currentIndex = tasks.findIndex((item) => {
        return item.id === buttonEl.parentElement.id;
    });

    currentTask = tasks[currentIndex];

    titleInput.value = currentTask.title;
    amountInput.value = currentTask.amount;
    descriptionInput.value = currentTask.description;

    toggleForm();
    confirmExpenseBtn.innerText = "Confirm Edit";
}
// Function for discarding expense changes
function discardChanges() {
    clearInput();
    toggleForm();
}
// Function for updating the HTML used to display expenses
function updateExpenseDisplay() {
    if (tasks.length === 0) {
        expensesDisplay.innerText = "Please enter an expense.";
        return;
    }
    let totalExpenses = 0;

    expensesDisplay.innerHTML = "";
    tasks.forEach(
        ({ id, title, amount, description }) => {
            expensesDisplay.innerHTML += `        
            <div id="${id}" class="expense-box">
                <p>Title: ${title}</p>
                <p>Amount: $${amount}</p>
                <p>Description: ${description}</p>
                <button class="buttons" onclick="openEditForm(this)">Edit</button>
                <button class="buttons" onclick="deleteExpense(this)">Delete</button>
        </div>`
            totalExpenses += Number(amount);
        }
    )
    totalExpenseDisplay.innerText = "Total Expenses: $" + totalExpenses;
}