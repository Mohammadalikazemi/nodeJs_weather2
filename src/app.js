const express = require('express');
const hbs = require('hbs');
const path = require('path');

const pathView = path.join(__dirname,'../template/views');
const pathPatials = path.join(__dirname,'../template/partials');
const publicDirPath = path.join(__dirname,'../public');

const app = express();
const port = process.env.PORT || 3000 ;


const adminRouter = require('../routes/admin')


app.set('view engine','hbs');
app.set('views',pathView);
app.use(express.static(publicDirPath));


hbs.registerPartials(pathPatials);
hbs.registerHelper('date',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

app.use(adminRouter)

app.listen(port,()=>{
    console.log(`Server is running in port ${port}`.toString().toUpperCase());
})
