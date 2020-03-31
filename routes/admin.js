const {
    Router
} = require('express');
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const router = Router();

router.get('/',(req,res,next)=>{
    res.render('index',{
        name:'MAK',
        titlePage:'Home Page',
        path:'/'
    });
})

router.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:'Mohammad ali kazemi',
        path:'/about'
    })
})
router.get('/help',(req,res,next)=>{
    // res.redirect('help1.html')
    res.render('help',{
        helpText:"This is some helpful text . ",
        name:'MAK',
        helpText:"This some Helpful text . ",
        path:'/help'

    })
})
router.get('/help/*',(req,res)=>{
    // res.send('The Halp Page is not this url !!!');
    res.render('404',{
        title:'F O F',
        name:"MAK",
        msg:"Help article Not found .",
        path:'/help/*'
        
    });
})



router.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if( error ){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

// F O F

router.get('*',(req,res)=>{
    res.render('404',{
        title:'F O F',
        name:"MAK",
        msg:"page Not found !!!!",
    });
})


module.exports = router;