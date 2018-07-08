import db from "../models"
import sgMail from '@sendgrid/mail'
// import sendGridkey from '../../sendgrid'
const sengrido =process.env.sendgrid 
sgMail.setApiKey(sengrido);
const controller = {
  findId: (req, res) => {
   
    console.log(req.body)
   
      .then(dbModel => {
       
      
      }).then(fun=>{
        // res.send(productsArray)
      })
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {

    db.Purchases.bulkCreate(
      req.body.array

    )
      .then(dbModel => {


        const prodsToUpdate = []
        for (let i = 0; i < req.body.array.length; i++) {
          prodsToUpdate.push(req.body.array[i].proudctId)
        }

        for (let i = 0; i < prodsToUpdate.length; i++) {
          db.Products.update({
            status: 'sold'
          }, {
              where: {
                id: prodsToUpdate[i],

              }
            }).then(fun => {
res.end('done')
            })
        }
      })
      .catch(err => res.status(422).json(err));
  },
email: (req, res) => {
   
    // console.log(req.body.products1[0].products[0].userId)
    for(let i=0;i<req.body.products1.length;i++){
console.log(req.body.products1[i].products[i].userId)
    }
   db.Users.findOne({
     where:{
       id:req.body.userId}
   })
      .then(dbModel => {
      // console.log(dbModel)
       const name = dbModel.dataValues.firstName + ' ' + dbModel.dataValues.lastName
       const msg = {
        to: dbModel.dataValues.email,
        from: 'TechCheck@donotreply.com',
        subject: 'receipt ',
        text: 'click me ',
         html: name +'<strong>Thank you for buying with Tech Check. Your order is being processed. You will receive an update once the sellers item is at our facility for testing  <br/></strong>',
      };

      sgMail.send(msg);
      
      }).then(fun=>{
        for(let i=0;i<req.body.products1.length;i++){
          //console.log(req.body.products1[i].products[i].userId)

          db.Users.findOne({
            where:{
              id:req.body.products1[0].products[0].userId
            }
          }).then(user=>{
            const name = user.dataValues.firstName + ' ' + user.dataValues.lastName
            const msg = {
             to: user.dataValues.email,
             from: 'TechCheck@donotreply.com',
             subject: 'Congratulations, your product has just been sold ',
             text: 'click me ',
              html: name +'<strong> Congratulations, your product has just been sold. Please send the product to our facilities for testing with the prepaid shipping label within three business days.<br/><br>'+req.body.products1[0].products[0].productName+' <img src="https://s3-us-west-1.amazonaws.com/techcheckbucket/'+req.body.products1[0].products[0].userUploadImage1+'"'+'/> </strong>',
           };
         sgMail.send(msg);
          })
            }
     
      })
      .catch(err => res.status(422).json(err));
  },
}

export default controller;