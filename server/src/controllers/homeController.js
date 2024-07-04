import db from "../models"

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

let displayGetCRUD = async(req , res) => {
    let data = await CRUDServie.getAllUser();


    return res.render('displayCRUD.ejs' , {
        dataTable: data,
    })
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    displayGetCRUD:displayGetCRUD
}