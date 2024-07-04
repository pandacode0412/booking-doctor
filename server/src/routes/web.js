import express from "express"
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/", homeController.getAboutPage)
    router.get('/get-crud' , homeController.displayCRUD)


    return app.use("/", router)
}

module.exports = initWebRoutes;