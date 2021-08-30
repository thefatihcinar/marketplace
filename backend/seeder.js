import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import ConnectDb from './configurations/database.js'
    /* Data */
import users from './data/users.js'
import products from './data/products.js'
    /* Models */
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import connectDB from './configurations/database.js'

dotenv.config()

connectDB()

const FAILURE = 1;

const seedDatabase = async () => {
    /* this function seeds the database with sample data */
    try {
        /* first clear the database */
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        /* insert users to the database first */
        let createdUsers = await User.insertMany(users);

        let adminUserId = createdUsers[0]._id;

        /* now insert products */
            /* only add admin id to each product */
        let sampleProducts = products.map( product => { return {...product, user: adminUserId} });

        await Product.insertMany(sampleProducts);

        console.log("Database seeded.".green.inverse);

        process.exit(); // since this script is seperate

    } catch (error) {
        
        console.error(`Error occured while seeding: ${error}`.red.inverse);

        process.exit(FAILURE);
    }
};

const destroyDatabase = async () => {
    /* this function removes all the data in the database */

    try {
        
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed.'.red.inverse)
        process.exit()

    } catch (error) {
        
        console.log(`Error occured while destroying the database: ${error}`.red.inverse)
        process.exit(FAILURE)
    }
};

/* this file is a seperate script that is not going to be used by the server code */
/* it will be used by the system admin with commands in the terminal */
/* so it is better to process the commands */

let OPTION = process.argv[2];
let SEED = '--seed';
let DESTROY = '--destroy';

if(OPTION === DESTROY){
    destroyDatabase()
}
else{
    seedDatabase()
}