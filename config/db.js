const mongoose=require('mongoose')

const config=require('config')
const db=config.get('mongoURI');


mongoose.set('strictQuery', true);

const connectDb= async function(){
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log("Mongo Connected...")
    }catch(err){
        console.error(err.message)
        process.exit(1)

    }

};
module.exports=connectDb