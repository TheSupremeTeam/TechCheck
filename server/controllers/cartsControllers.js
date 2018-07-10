import db from"../models"


const controller = {
    

    deleteFromCart: function(req, res) {
         console.log(req.body)
        res.send('hey')
    }

}


export { controller as default };