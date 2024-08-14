import express from "express"
import bodyParser from "body-parser"
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web'
import connectDB from './config/connectDB'
import cors from 'cors';

require('dotenv').config()



let app = express();
app.use(cors({ origin: true }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)
//kết nối database
connectDB();

let port = process.env.PORT || 69696;
app.listen(port, () => {
    console.log("Backend Nodejs is running :" + port)
})
