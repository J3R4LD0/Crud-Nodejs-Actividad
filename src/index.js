import app  from './app.js';
import http from 'http';
import { connectDB } from './db.js';
import { PORT,MONGODB_NAME } from './config.js';

( async ()=>{
    
    await connectDB(function(Mongoclient){

        var MongoClient = Mongoclient.db(MONGODB_NAME);
        console.log( "mongodb connect to " + MONGODB_NAME )

        app(MongoClient)

    })

} )();

