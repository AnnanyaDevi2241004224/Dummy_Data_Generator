const express = require('express')
const mongoose = require('mongoose');
let conn = mongoose.connect('mongodb://127.0.0.1:27017/company');
const Employee = require("./models/Employee")

const app = express()
const port = 3000
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
});
const getRandom = (arr)=>{
    let rno = Math.floor(Math.random() * (arr.length - 1))
    return arr[rno]
}

app.get('/generate', async (req, res) => {
    await Employee.deleteMany({}) 

    let randomNames = ['Virat', "Utkarsh", "Annanya", "Messi"]
    let randomLang = ["Python", "Java Script", "C++", "Java"]
    let randomCities = ["Banglore", "Mumbai", "Chennai", "Kolkata"]
    for (let index = 0; index < 10; index++) {
        let e = await Employee.create({
            name: getRandom(randomNames),
            salary: Math.floor(Math.random() * 22000),
            language: getRandom(randomLang),
            city: getRandom(randomCities),
            isManager: (Math.random()>0.5)?true:false
        })
        console.log(e);
    }
    res.render('index', { foo: 'FOO' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})