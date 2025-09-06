const incomeListWeekly = document.getElementById('income-list-weekly');
const incomeListMonthly = document.getElementById('income-list-monthly');
const incomeListAnnually = document.getElementById('income-list-annually');

const expensesListWeekly = document.getElementById('expenses-list-weekly');
const expensesListMonthly = document.getElementById('expenses-list-monthly');
const expensesListAnnually = document.getElementById('expenses-list-annually');

const incomeAnnuallyText = document.getElementById('income-annually-text');
const incomeMonthlyText = document.getElementById('income-monthly-text');
const incomeWeeklyText = document.getElementById('income-weekly-text');
const incomeTotalText = document.getElementById('income-total-text');

const expensesAnnuallyText = document.getElementById('expenses-annually-text');
const expensesMonthlyText = document.getElementById('expenses-monthly-text');
const expensesWeeklyText = document.getElementById('expenses-weekly-text');
const expensesTotalText = document.getElementById('expenses-total-text');

let globalIncomeTotal = undefined;
let globalExpensesTotal = undefined;
let plusMinus = undefined;

async function getIncome() {
    try {
        const response = await fetch('/api/get/income', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();


        const weeklyIncomes = data[0].weekly;

        weeklyIncomes.forEach(element => {
            const li = document.createElement("li");

            li.textContent = 'Name: ' + element.name + "; Amount: " + element.amount + '; Category: ' + element.category;

            incomeListWeekly.appendChild(li);

        });

        const monthlyIncomes = data[1].monthly;

        monthlyIncomes.forEach(element => {
            const li = document.createElement("li");

            li.textContent = 'Name: ' + element.name + "; Amount: " + element.amount + '; Category: ' + element.category;

            incomeListMonthly.appendChild(li);

        });

        const annuallyIncome = data[2].annually;

        annuallyIncome.forEach(element => {
            const li = document.createElement("li");

            li.textContent = 'Name: ' + element.name + "; Amount: " + element.amount + '; Category: ' + element.category;

            incomeListAnnually.appendChild(li);

        });


    } catch (err) {
        console.error(err);
    };
};

async function getExpenses() {
    try {
        const response = await fetch('/api/get/expenses', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();


        const weeklyExpenses = data[0].weekly;

        weeklyExpenses.forEach(element => {
            const li = document.createElement("li");

            li.textContent = 'Name: ' + element.name + "; Amount: " + element.amount + '; Category: ' + element.category;

            expensesListWeekly.appendChild(li);

        });

        const monthlyExpenses = data[1].monthly;

        monthlyExpenses.forEach(element => {
            const li = document.createElement("li");

            li.textContent = 'Name: ' + element.name + "; Amount: " + element.amount + '; Category: ' + element.category;

            expensesListMonthly.appendChild(li);

        });

        const annuallyExpenses = data[2].annually;

        annuallyExpenses.forEach(element => {
            const li = document.createElement("li");

            li.textContent = 'Name: ' + element.name + "; Amount: " + element.amount + '; Category: ' + element.category;

            expensesListAnnually.appendChild(li);

        });


    } catch (err) {
        console.error(err);
    };
};

async function getAnuallyIncomes() {
    try {
        const response = await fetch('/api/get/allIncomesAnnually', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();

        incomeAnnuallyText.textContent = data.allIncomesAnnually + '€';
        incomeMonthlyText.textContent = data.allIncomesMonthly + '€';
        incomeWeeklyText.textContent = data.allIncomesWeekly + '€';

        const total = data.allIncomesAnnually + data.allIncomesMonthly + data.allIncomesWeekly

        incomeTotalText.innerText = total + '€';
        globalIncomeTotal = total;

    } catch (err) {
        console.error(err);
    }
}

async function getAnnuallyExpenses() {
    try {
        const response = await fetch('/api/get/allExpensesAnnually', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();

        expensesAnnuallyText.textContent = data.allExpensesAnnually + '€';
        expensesMonthlyText.textContent = data.allExpensesMonthly + '€';
        expensesWeeklyText.textContent = data.allExpensesWeekly + '€';

        const total = data.allExpensesAnnually + data.allExpensesMonthly + data.allExpensesWeekly

        expensesTotalText.innerText = total + '€';
        globalExpensesTotal = total;

    } catch (err) {
        console.error(err);
    }
}

const categoriesSelection = document.getElementById('categoriesIncome');
const categoriesSelectionExpens = document.getElementById('categoriesExpenses');
const categoriesList = document.getElementById('categoriesList');
const categoriesSubscription = document.getElementById('categoriesSubscription');

async function getCategories() {
    try {
        const response = await fetch('/api/get/categories', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();

        data.forEach(element => {
            // console.log(element.name);

            let newOption = new Option(element.name, element.name);
            let newOption2 = new Option(element.name, element.name);
            let newOption3 = new Option(element.name, element.name);
            categoriesSelection.add(newOption);
            categoriesSelectionExpens.add(newOption2);
            categoriesSubscription.add(newOption3);

            const li = document.createElement('li');
            li.textContent = element.name;
            categoriesList.appendChild(li);

        })

        // console.log(data);

    } catch (err) {
        console.error(err);
    }
}

const subscriptionList = document.getElementById('subscription-list-ul');

async function getSubscriptions() {
    try {
        const response = await fetch('/api/get/subscriptions', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();

        data.forEach(element => {
            const li = document.createElement('li');
            li.textContent = 'Name: ' + element.name + '; Date: ' + element.date + '; Category: ' + element.category;
            subscriptionList.appendChild(li);

        })
    } catch (err) {
        console.error(err);
    }
}

const categoriesIncome = document.getElementById('categoriesIncome');
const frequencyIncome = document.getElementById('frequencyIncome');
const amountIncome = document.getElementById('amount-income');
const incomeName = document.getElementById('incomeName');

async function createIncome() {
    try {
        const response = await fetch('/api/create/income', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: incomeName.value, amount: parseFloat(amountIncome.value), frequency: frequencyIncome.value, category: categoriesIncome.value })
        })

        if (!response.ok) {
            console.error("Error while fetching!");
        }

        const data = await response.json();

        if (data.success) {
            window.location.reload();
            alert("Successfully created income!");
        } else {
            alert("Error while creating income!");
            console.error(data.error);
        }

    } catch (err) {
        console.error(err);
    }
}

const categoriesExpenses = document.getElementById('categoriesExpenses');
const frequencyExpenses = document.getElementById('frequencyExpenses');
const amountExpenses = document.getElementById('amount-expenses');
const expensesName = document.getElementById('expensesName');

async function createExpenses() {
    try {
        const response = await fetch('/api/create/expenses', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: expensesName.value, amount: parseFloat(amountExpenses.value), frequency: frequencyExpenses.value, category: categoriesExpenses.value })
        })

        if (!response.ok) {
            console.error("Error while fetching!");
        }

        const data = await response.json();

        if (data.success) {
            window.location.reload();
            alert("Successfully created expenses!");
        } else {
            alert("Error while creating expenses!");
            console.error(data.error);
        }

    } catch (err) {
        console.error(err);
    }
}

const categoriesSubscriptions = document.getElementById('categoriesSubscription');
const dateSubscriptions = document.getElementById('date-subscription');
const subscriptionName = document.getElementById('subscriptionName');

async function createSubscription() {
    try {
        const response = await fetch('/api/create/subscription', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: subscriptionName.value, date: dateSubscriptions.value, category: categoriesSubscriptions.value })
        })

        if (!response.ok) {
            console.error("Error while fetching!");
        }

        const data = await response.json();

        if (data.success) {
            window.location.reload();
            alert("Successfully created subscription!");
        } else {
            alert("Error while creating subscription!");
            console.error(data.error);
        }

    } catch (err) {
        console.error(err);
    }
}

const subscriptionNameDelete = document.getElementById('subscriptionNameDelete');

async function deleteSubscription() {
    try {
        const response = await fetch('/api/delete/subscriptions', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: subscriptionNameDelete.value })
        })

        if (!response.ok) {
            console.error("Error while fetching!");
        }

        const data = await response.json();

        if (data.success) {
            alert("Successfully deleted subscription!");
            window.location.reload();
        } else {
            alert("Error while deleting subscription!");
        }

    } catch (err) {
        console.error(err);
    }
}

const totalTextAnnually = document.getElementById('total-annually');
const totalTextMonthly = document.getElementById('total-monthly');

function getPlusMinus() {

    // console.log(globalIncomeTotal);
    // console.log(globalExpensesTotal);
    // console.log(plusMinus);

    plusMinus = globalIncomeTotal - globalExpensesTotal;

    roundedPlusMinus = plusMinus.toFixed(2);

    if (isNaN(roundedPlusMinus)) {
        totalTextAnnually.style.color = 'green';
        totalTextAnnually.innerText = 'Total: 0€';
        return;
    }

    if (roundedPlusMinus >= 0) {
        totalTextAnnually.style.color = 'green';
        totalTextAnnually.innerText = 'Total: ' + roundedPlusMinus + '€';
    } else {
        totalTextAnnually.style.color = 'red';
        totalTextAnnually.innerText = 'Total: ' + roundedPlusMinus + '€';
    }
}

const incomeNameDelete = document.getElementById('incomeNameDelete');
const incomeFrequencyDelete = document.getElementById('incomeFrequencyDelete');

async function deleteIncome() {
    try {
        const response = await fetch('/api/delete/income', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: incomeNameDelete.value, frequency: incomeFrequencyDelete.value })
        })

        if (!response.ok) {
            console.error("Error while fetching!");
        }

        const data = await response.json();

        if (data.success) {
            alert("Successfully deleted income!");
            window.location.reload();
        } else {
            alert("Error while deleting income!");
        }

    } catch (err) {
        console.error(err);
    }
}

const expensesNameDelete = document.getElementById('expensesNameDelete');
const expensesFrequencyDelete = document.getElementById('expensesFrequencyDelete');

async function deleteExpenses() {
    try {
        const response = await fetch('/api/delete/expenses', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: expensesNameDelete.value, frequency: expensesFrequencyDelete.value })
        })

        if (!response.ok) {
            console.error("Error while fetching!");
        }

        const data = await response.json();

        if (data.success) {
            alert("Successfully deleted expenses!");
            window.location.reload();
        } else {
            alert("Error while deleting expenses!");
        }

    } catch (err) {
        console.error(err);
    }
}

const categoryNameCreate = document.getElementById('categoryName');

async function createCategory() {
    try {
        const response = await fetch('/api/create/category', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: categoryNameCreate.value })
        })

        if (!response.ok) {
            console.error("Error while fetching!");
        }

        const data = await response.json();

        if (data.success) {
            alert("Successfully created category!");
            window.location.reload();
        } else {
            alert("Error while created category!");
            console.error(data.error);
        }

    } catch (err) {

    }
}

const categoryNameDelete = document.getElementById('categoryNameDelete');

async function deleteCategory() {
    try {
        const response = await fetch('/api/delete/category', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: categoryNameDelete.value })
        })

        if (!response.ok) {
            console.error("Error while fetching!");
        }

        const data = await response.json();

        if (data.success) {
            alert("Successfully deleted category!");
            window.location.reload();
        } else {
            alert("Error while deleted category!");
            console.error(data.error);
        }

    } catch (err) {

    }
}

const submitCreateIncomeBtn = document.getElementById('submitCreateIncomeBtn');
const submitCreateExpensesBtn = document.getElementById('submitCreateExpensesBtn');
const createIncomeForm = document.getElementById('create-income-form');
const deleteIncomeForm = document.getElementById('delete-income-form');
const submitDeleteIncomeBtn = document.getElementById('submitDeleteIncomeBtn');
const submitDeleteExpensesBtn = document.getElementById('submitDeleteExpensesBtn');
const deleteExpensesForm = document.getElementById('delete-expenses-form');
const createCategoryForm = document.getElementById('create-category-form');
const deleteCategoryForm = document.getElementById('delete-category-form');
const submitCreateCategoryBtn = document.getElementById('submitCreateCategoryBtn');
const submitDeleteCategoryBtn = document.getElementById('submitDeleteCategoryBtn');
const createSubscriptionForms = document.getElementById('create-subscription-form');
const submitCreateSubscriptionBtn = document.getElementById('submitCreateSubscriptionBtn');
const submitDeleteSubscriptionBtn = document.getElementById('submitDeleteSubscriptionBtn');
const deleteSubscriptionForm = document.getElementById('delete-subscription-form');

deleteSubscriptionForm.addEventListener("submit", (e => {
    e.preventDefault();
    deleteSubscription();
}));

submitDeleteSubscriptionBtn.addEventListener("click", (e => {
    e.preventDefault();
    deleteSubscription();
}));

submitCreateSubscriptionBtn.addEventListener("click", (e => {
    e.preventDefault();
    createSubscription();
}));

createSubscriptionForms.addEventListener("submit", (e => {
    e.preventDefault();
    createSubscription();
}));

deleteCategoryForm.addEventListener("submit", (e => {
    e.preventDefault();
    deleteCategory();
}));

submitDeleteCategoryBtn.addEventListener("click", (e => {
    e.preventDefault();
    deleteCategory();
}))

createCategoryForm.addEventListener("submit", (e => {
    e.preventDefault();
    createCategory();
}));

submitCreateCategoryBtn.addEventListener("click", (e => {
    e.preventDefault();
    createCategory();
}));

deleteExpensesForm.addEventListener("submit", (e => {
    e.preventDefault();
    deleteExpenses();
}));

submitDeleteExpensesBtn.addEventListener("click", (e => {
    e.preventDefault();
    deleteExpenses();
}));

deleteIncomeForm.addEventListener("submit", (e => {
    e.preventDefault();
    deleteIncome();
}));

submitDeleteIncomeBtn.addEventListener("click", (e => {
    e.preventDefault();
    deleteIncome();
}));

submitCreateIncomeBtn.addEventListener("click", (e => {
    e.preventDefault();
    createIncome();
}));

submitCreateExpensesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createExpenses();
})

createIncomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createIncome();
});

window.addEventListener("load", async () => {
    await getIncome();
    await getExpenses();
    await getAnuallyIncomes();
    await getAnnuallyExpenses();
    await getCategories();
    await getSubscriptions();

    getPlusMinus();
});
