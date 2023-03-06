const fs = require('fs');

class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
        this.id = 1;
    }
    
    addProduct =  async(item) =>{
        try{
            this.products.push({id:this.id,...item});
            this.id++;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));    
        }catch(err){
            console.log(err);
        }
        }
    

    getProduct = async() =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const response = JSON.parse(data);
            return response;
            
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const response = JSON.parse(data);
            const result = response.filter((element) =>{
                return id === element.id;
            }
            )
            if(result.length !== 0){
                return result;
            }else{
                return 'Not Found';
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }
    
    updateProduct = async (id, obj) =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const response = JSON.parse(data);
            const index = response.findIndex((element) =>{
                return id === element.id;
            })
            this.products[index] = {...this.products[index], ...obj}
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t')); 
        } catch (error) {
            console.log(error);
            
        }
    }

    deleteProduct = async (id) =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const response = JSON.parse(data);
            const result = response.filter((element) =>{
                return id !== element.id;
            }
            )
            this.products = [...result];
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t')); 
        } catch (error) {
            console.log(error);
        }
    }
    
}
const productos = new ProductManager('./Users.json');

const productosTotales = async() =>{
const product1 = {
    title: 'zapatos',
    descripcion : 'buenos zapatos',
    price: 50,
    thumbnail: '/imgzapato',
    code: 1000,
    stock: 25,
}
const product2 = {
    title: 'chompas',
    descripcion : 'buenas chompas',
    price: 30,
    thumbnail: '/imgchompas',
    code: 1001,
    stock: 20,
}
const product3 = {
    title: 'poleras',
    descripcion : 'buenas poleras',
    price: 35,
    thumbnail: '/imgpoleras',
    code: 1002,
    stock: 12,
}
//agregando productos
await productos.addProduct(product1);
await productos.addProduct(product2);
await productos.addProduct(product3);

//mostrar productos
//console.log(await productos.getProduct());

//mostrar producto con id
//const dataId = await productos.getProductById(1);
//console.log(dataId);

//eliminar producto
await productos.deleteProduct(2);

//mostrar producto
console.log(await productos.getProduct());

//actualizar producto
await productos.updateProduct(1,{price: 10, stock: 25})
console.log(await productos.getProduct());


}

//productosTotales();

module.exports = ProductManager