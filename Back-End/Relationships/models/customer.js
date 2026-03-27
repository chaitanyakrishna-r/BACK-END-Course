const mongoose = require('mongoose');
const { findOne } = require('../../../../FULL-STACK-Projects/WonderLust/backend/models/listing');
const {Schema} = mongoose;


main().then(()=>{
    console.log("db is connected");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}


const orderSchema = new Schema({
    item:String,
    price:Number,
});

const custormerSchema = new Schema({
    name: String,
    order:[
        {type: Schema.Types.ObjectId,
         ref: "Order",   
        }
    ]
})


const Customer = mongoose.model("Customer",custormerSchema);
const Order = mongoose.model("Order",orderSchema);

//function for find all
const findCustomer = async()=>{
    let result = await Customer.find({}).populate('order');
    console.log(result[0]);
}
findCustomer();

//function for add new customers
const addCustomer = async()=>{
    const cust1 = new Customer({
        name:"rahul kumar"
    
    });

    //reterive data from order doc
    const order1 = await Order.findOne({item:"coffee"});
    const order2 = await Order.findOne({item:"dosa"});

    cust1.order.push(order1);
    cust1.order.push(order2);

    const result = await cust1.save();

    console.log(result);
    console.log(order1);

    //to get all data from db
//     const results =  await Customer.find({});
//     console.log(results); 
 }


//function for add new orders
async function addOrder(){

   const result = await Order.insertMany([
        {item:"coffee",price:20},
        {item:"dosa",price:50},
        {item:"idily", price:25},
    ]);
    console.log(result);
    
}

// addOrder();
// addCustomer();

// deletion handling
//middleware
Schema.post('findByIdandDelete', async (customer)=>{
    if(customer.order.length){
        let res = Order.deleteMany( {_id: {$in: customer.order}});
        console.log(res);
    }
})