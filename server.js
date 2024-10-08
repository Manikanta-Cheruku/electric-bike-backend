const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const PORT = 2900 || process.env.MONGOOSE_URI;
const app = express();


const userRoute = require("./Routes/user");
const bikeRoute = require("./Routes/bike");
const orderRoute = require("./Routes/order");
const cartRoute = require("./Routes/cart");


async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("DB Connected Successfully!!!");
    } catch (err) {
        console.log(`DB Connection Error: ${err.message}`);
    }
}


dbConnect();


app.use(cors());
app.use(express.json());


app.use('/user', userRoute);
app.use('/bike', bikeRoute);
app.use('/order', orderRoute);
app.use('/cart', cartRoute);


app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.send('Deployment successful!');
  });


app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});
