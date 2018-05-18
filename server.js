const express = require('express');

const hbs = require('hbs');
const fs = require('fs');
const app = express();

app.set('view engine', 'hbs'); // set configuration for views

// app.get('/', (req, res) => res.send('<h1>Hello</h1> Saurav'))
// Middleware

app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `Log: ${now} , Method: ${req.method}, Path: ${req.path}`;
    fs.appendFile('server.log',log + '\n',(err) => {
        console.log('There is some Error');
    })
    console.log(log);
    // res.render('maintenance.hbs');
    next();
});

//to set Partial View
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
})

//helper method with aRGUMENTS

hbs.registerHelper('upper',(text)=>{
    return text.toUpperCase();
    })

app.get('/', (req, res) => res.render(
    'home.hbs',{
        
        pageTitle: 'About Page',
        greeting: 'Welcome to My Home Page'
    }
));

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    }
);
}


);

app.get('/calculator', (req, res) => {
    res.render('calculator.hbs', {
        pageTitle: 'Calculator Page'
    }
);
}


);
app.get('/bad', (req, res) => res.send(
    '<h2>Error Page</h2>'
));

app.listen(3000, () => console.log('Example app listening on port 3000!'));