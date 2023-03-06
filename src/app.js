const express = require('express')
const ProductManager = require('./ProductManager')
const products = require('../productos.json')
const app = express()
const port = 3000

app.get('/products', (req, res) => {
    const {limit} = req.query
    if(!limit){
        res.send({ products })
    }else{
        const newProd = []
        for(let i = 0; i < limit; i++){
             newProd[i]= products[i]
        }
        res.send({ newProd })
    }
  })

app.get('/products/:pid', (req, res) => {
    const {pid} = req.params
    const result = products.filter((element) =>{
        return pid == element.id;
    }
    )
    if(result.length !== 0){
        res.send ({result});
    }else{
        res.send ('Not found');
    }
})
app.listen(port,()=>{
    console.log(`Servidor en puerto ${port}`);
})