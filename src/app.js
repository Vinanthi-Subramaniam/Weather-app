const  path=require("path")
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port = process.env.PORT||3000
const publicpath=path.join(__dirname,'../public')
const temppath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//handlebar setup
app.set('view engine','hbs')
app.set('views',temppath)

//path for static content 
app.use(express.static(publicpath))//for homepage as it accesses index.

//set up partials
hbs.registerPartials(partialspath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Vinan",
        
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        name:"Vinan",
        age:21,
        title:"About",
        
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        helptext:"help me!",
        title:"help",
        name:"Vinan"
    })
})

app.get('/weather',(req,res)=>{ 
    if(!req.query.address){
        return res.send({
            error:"Please provide location/pin!"
        })
    }
    
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,data)=>{
                if(error){
                   return res.send({error})
                }
                return res.send({
                        forecast:data,
                        location,
                        address:req.query.address
                    })
            })
        })       
    })

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'you must provide a search term'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products:[]
//     })
// })

//for all help 404 errors
app.get("/help/*",(req,res)=>{
    res.render("404",{
        errormessage:"Help page not found",
        name:"Vinan",
        title:"404 Error"
    })
    
})
//for allgeneric 404 errors
app.get('*',(req,res)=>{
    res.render("404",{
        errormessage:"404 error",
        name:"Vinan",
        title:"404 Error"
    })


})

app.listen(port,()=>{
 console.log("listening to port "+port)
})