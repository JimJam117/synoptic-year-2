import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// routes
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import locationRoutes from './routes/location.js'
import recordRoutes from './routes/record.js'

// models
import User from './models/User.js';

const app = express();

// env
const port = 5001;
const mongo_url = "mongodb://127.0.0.1:27017/dwas";

// connect to mongoose
mongoose.connect(mongo_url).then(console.log("connected to db with mongoose")).catch(err => console.log(`Err connecting to db ${err}`));

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello there')
})

// routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/location', locationRoutes);
app.use('/record', recordRoutes);


const createAdmin = async () => {
   
        const check = await User.findOne({"isAdmin": true});
        console.log("Admin check:", check);
        if (check === null) {
            console.log("creating new admin...");
            new User({
                isAdmin: true,
                name: "Admin",
                email: "admin@dwas.com",
                pword: "$2b$10$uiAN3/KADsFiJz9x6XjocODlDADoWzAIGPcXLZ.OxXjjBFZnCHzmq"
            }).save();
        } 
}

createAdmin();



// start server on port
app.listen(port, () => {console.log(`Server running on port ${port}`)});
