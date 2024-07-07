import db from "../models"
import CRUDService from '../services/CRUDService'


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render('test.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDServie.getAllUser();


    return res.render('displayCRUD.ejs', {
        dataTable: data,
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServie.getUserInfoById(userId);

        return res.render('editCRUD.ejs', {
            user: userData
        })
    }
    else {
        return res.send('Users not found!');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDServie.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    displayGetCRUD: displayGetCRUD
}