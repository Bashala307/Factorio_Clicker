const express = require('express');
const fs = require('fs'); 
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname));

app.get('/get-progress', (req, res) => {
    
    if (fs.existsSync('save.json')) {
        const saveData = fs.readFileSync('save.json', 'utf8');
        res.json(JSON.parse(saveData)); 
    } else {
        res.json({ oreNumber: 0, drillBought: false, drillBought2: false });
    }
});

app.post('/save-progress', (req, res) => {
    const progress = req.body; 
    fs.writeFileSync('save.json', JSON.stringify(progress, null, 2));
    res.json({ message: "Прогрес успішно збережно у хмарі!" });
});

app.listen(PORT, () => {
    console.log(`Сервер працює: http://localhost:${PORT}`);
});