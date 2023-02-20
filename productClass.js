class ProductManager{
    constructor(title, description, price, thumbnail, code, stock ){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.products = [];
        
    }
    
    addProduct = (item) =>{
        for(let pro in item){
            if(!item[pro]){
                console.log('Debes llenar los campos');
            };
        }
        const valItem = this.products.includes(p =>  p.code === item.code);
        if(valItem){
            console.log('Ya tienes ese codigo');
        }else{
         this.products.push({id:id,...item});
         id++;
        }
    }

    getProduct = () =>{
        console.log(this.products);
    }

    getProductById = (id) =>{
        const result = this.products.filter((element) =>{
            return id === element.id;
        }
        )
        if(result.length !== 0){
            console.log(result);
        }else{
            console.log('Not Found');
        }
    }
    
}

let id = 1;

const myProduct = new ProductManager();
const product1 = new ProductManager('zapatos','buenos zapatos', 50, '/imgzapato', 1000, 25);
myProduct.addProduct(product1);
const product2 = new ProductManager('chompa','Buenas chompas', 30,'/imgchomp', 1000,10);
myProduct.addProduct(product2);
myProduct.getProduct();
myProduct.getProductById(2); 