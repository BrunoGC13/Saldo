const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// === Websites ===
app.use(express.static(path.join(__dirname, 'public')));

// === Get endpoints ===
app.get('/api/get/income', async (req, res) => {
    try {
        const filePath = path.join(__dirname, "data.json");
        const data = await fs.readFile(filePath, "utf-8");
        const income = JSON.parse(data);
        res.json(income.incomes);
    } catch (err) {
        console.error("Error reading data.json:", err);
        res.status(500).json({ error: "Could not read income data" });
    }
});

app.get('/api/get/expenses', async (req, res) => {
    try {
        const filePath = path.join(__dirname, "data.json");
        const data = await fs.readFile(filePath, "utf-8");
        const income = JSON.parse(data);
        res.json(income.expenses);
    } catch (err) {
        console.error("Error reading data.json:", err);
        res.status(500).json({ error: "Could not read income data" });
    }

});

app.get('/api/get/allIncomesAnnually', async (req, res) => {
    let allIncomesWeekly1 = 0;
    let allIncomesMonthly1 = 0;
    let allIncomesAnnually1 = 0;
    try {
        const filePath = path.join(__dirname, "data.json");
        const data = await fs.readFile(filePath, "utf-8");
        const income = JSON.parse(data);

        // console.log(income.incomes[0].weekly[0])

        const incomesWeekly = income.incomes[0].weekly;

        incomesWeekly.forEach(element => {
            allIncomesWeekly1 += element.amount;
        });

        const incomesMonthly = income.incomes[1].monthly;

        incomesMonthly.forEach(element => {
            allIncomesMonthly1 += element.amount;
        });

        const incomeAnnually = income.incomes[2].annually;

        incomeAnnually.forEach(element => {
            allIncomesAnnually1 += element.amount;
        });

        let allIncomesWeekly = allIncomesWeekly1 * 52; // 52 for 52 weeks in a year
        let allIncomesMonthly = allIncomesMonthly1 * 12; // 12 for 12 months in a year

        res.json({ allIncomesWeekly: allIncomesWeekly, allIncomesMonthly: allIncomesMonthly, allIncomesAnnually: allIncomesAnnually1 });

    } catch (err) {
        console.error("Error reading data.json:", err);
        res.status(500).json({ error: "Could not read income data" });
    }
});

app.get('/api/get/allExpensesAnnually', async (req, res) => {
    let allExpensesWeekly1 = 0;
    let allExpensesMonthly1 = 0;
    let allExpensesAnnually1 = 0;
    try {
        const filePath = path.join(__dirname, "data.json");
        const data = await fs.readFile(filePath, "utf-8");
        const expens = JSON.parse(data);

        // console.log(income.incomes[0].weekly[0])

        const expensesWeekly = expens.expenses[0].weekly;

        expensesWeekly.forEach(element => {
            allExpensesWeekly1 += element.amount;
        });

        const expensesMonthly = expens.expenses[1].monthly;

        expensesMonthly.forEach(element => {
            allExpensesMonthly1 += element.amount;
        });

        const expensesAnnually = expens.expenses[2].annually;

        expensesAnnually.forEach(element => {
            allExpensesAnnually1 += element.amount;
        });

        allExpensesWeekly = allExpensesWeekly1 * 52; // 52 for 52 weeks in a year
        allExpensesMonthly = allExpensesMonthly1 * 12; // 12 for 12 months in a year

        res.json({ allExpensesWeekly: allExpensesWeekly, allExpensesMonthly: allExpensesMonthly, allExpensesAnnually: allExpensesAnnually1 });

    } catch (err) {
        console.error("Error reading data.json:", err);
        res.status(500).json({ error: "Could not read income data" });
    }
});

app.get('/api/get/categories', async (req, res) => {
    try {
        const filePath = path.join(__dirname, "data.json");
        const data = await fs.readFile(filePath, "utf-8");
        const categories = JSON.parse(data);
        res.json(categories.categories);
    } catch (err) {
        console.error("Error reading data.json:", err);
        res.status(500).json({ error: "Could not read income data" });
    }
});

app.get('/export', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };

    const fileName = 'data.json';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

// === Post endpoints ===
app.post('/api/create/income', async (req, res) => {
    const { name, amount, frequency, category } = req.body;

    if (!name || !amount || !frequency || !category) {
        res.status(400).json({ error: "Name, amount, frequency and category are all required!" });
    }

    try {
        const filePath = path.join(__dirname, "data.json");
        const tempData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(tempData);

        const newIncome = { name, amount, category };

        const target = data.incomes.find(obj => obj[frequency]);
        if (!target) {
            return res.status(400).json({ error: "Invalid frequency" });
        }

        target[frequency].push(newIncome);

        await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");

        res.json({ success: true });

    } catch (err) {
        console.error("Error reading data.json:", err);
        res.status(500).json({ error: "Could not create income", success: false });
    }

});

app.delete('/api/delete/income', async (req, res) => {
    const { name, frequency } = req.body;

    if (!name || !frequency) {
        return res.status(400).json({ error: "Name and frequency are required!" });
    }

    try {
        const filePath = path.join(__dirname, "data.json");
        const tempData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(tempData);

        const target = data.incomes.find(obj => obj[frequency]);
        if (!target) {
            return res.status(400).json({ error: "Invalid frequency!" });
        }

        const originalLength = target[frequency].length;
        target[frequency] = target[frequency].filter(entry => entry.name !== name);

        if (target[frequency].length === originalLength) {
            return res.status(404).json({ error: "Income not found!" });
        }

        await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");

        res.json({ success: true });

    } catch (err) {
        console.error("Error reading/writing data.json:", err);
        res.status(500).json({ error: "Could not delete income", success: false });
    }
});

app.post('/api/create/expenses', async (req, res) => {
    const { name, amount, frequency, category } = req.body;

    if (!name || !amount || !frequency || !category) {
        res.status(400).json({ error: "Name, amount, frequency and category are all required!" });
    }

    try {
        const filePath = path.join(__dirname, "data.json");
        const tempData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(tempData);

        const newExpenses = { name, amount, category };

        const target = data.expenses.find(obj => obj[frequency]);
        if (!target) {
            return res.status(400).json({ error: "Invalid frequency" });
        }

        target[frequency].push(newExpenses);

        await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");

        res.json({ success: true });

    } catch (err) {
        console.error("Error reading data.json:", err);
        res.status(500).json({ error: "Could not create expenses", success: false });
    }

});

app.delete('/api/delete/expenses', async (req, res) => {
    const { name, frequency } = req.body;

    if (!name || !frequency) {
        return res.status(400).json({ error: "Name and frequency are required!" });
    }

    try {
        const filePath = path.join(__dirname, "data.json");
        const tempData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(tempData);

        const target = data.expenses.find(obj => obj[frequency]);
        if (!target) {
            return res.status(400).json({ error: "Invalid frequency!" });
        }

        const originalLength = target[frequency].length;
        target[frequency] = target[frequency].filter(entry => entry.name !== name);

        if (target[frequency].length === originalLength) {
            return res.status(404).json({ error: "Expenses not found!" });
        }

        await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");

        res.json({ success: true });

    } catch (err) {
        console.error("Error reading/writing data.json:", err);
        res.status(500).json({ error: "Could not delete expenses", success: false });
    }
});

app.post('/api/create/category', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: "Name is required!" });
    }

    try {
        const filePath = path.join(__dirname, "data.json");
        const tempData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(tempData);

        const newCategory = { name };

        data.categories.push(newCategory);

        await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");

        res.json({ success: true });

    } catch (err) {
        console.error("Error reading data.json:", err);
        res.status(500).json({ error: "Could not create expenses", success: false });
    }

});

app.delete('/api/delete/category', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required!" });
    }

    try {
        const filePath = path.join(__dirname, "data.json");
        const tempData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(tempData);

        const categoryExists = data.categories.some(cat => cat.name === name);
        if (!categoryExists) {
            return res.status(400).json({ error: "Invalid name!" });
        }

        data.categories = data.categories.filter(cat => cat.name !== name);

        await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");

        res.json({ success: true, message: `Category "${name}" deleted.` });

    } catch (err) {
        console.error("Error reading/writing data.json:", err);
        res.status(500).json({ error: "Could not delete category", success: false });
    }
});



// === Start server ===
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});