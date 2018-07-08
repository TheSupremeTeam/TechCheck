 import sendGridkey from '../../sendgrid.js'
import db from "../models"
import bcrypt from'bcrypt'
import jwtSecret from '../../jwtSecret'
import sgMail from '@sendgrid/mail'
import jwt, { verify } from 'jsonwebtoken'
import moment from 'moment';
// || jwtSecret;

// ||sendGridkey;
const secret = process.env.jwt
const saltRounds =10;
const sengrido =process.env.sendgrid 
sgMail.setApiKey(sengrido);
// Defining methods for the booksController process.env.sendgrid ||
const controller = {
  findAll: (req, res) => {
    db.users.findAll({
      where: {
        active: true
      }
    })
      .then(dbModel => {
        console.log(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  authUser: (req, res) => {
    // console.log(req.body)
    let authenticateUser;
     jwt.verify(req.body.userToken, secret, function(err, decoded) {      
     if (err) {
       return res.json({ success: false, message: 'Failed to authenticate token.' });    
     } else {

      //if everything is good, save to request for use in other routes
       req.decoded = decoded;    
      authenticateUser= decoded.currentUser.currentUser.userId  
        return authenticateUser
    //console.log(decoded.currentUser.currentUser.userId)
      
        
     }
   });
  console.log( authenticateUser)
    db.Users.findOne({
      where: {
        id:authenticateUser
      }
    })
      .then(user => {
        function getDbDate () {
          const split=JSON.stringify(user.dataValues.createdAt);
     const dbDate = split.split(':')
     const splitDate=dbDate[0].split('-')
    const dayCreated =splitDate[2].split('T')
    const removed=splitDate[0].split('"')
   
   const dates=splitDate[1]+' '+dayCreated[0]+' '+removed[1]
  return dates
        }
  const createdAt=getDbDate()
         
       const userInfo={
id:user.dataValues.id,
email:user.dataValues.email,
firstName:user.dataValues.firstName,
lastName:user.dataValues.lastName,
profilePic:user.dataValues.profilePic,
phoneNumber:user.dataValues.phoneNumber,
address:user.dataValues.address,
verified:user.dataValues.verified,
createdAt:createdAt,
active:user.dataValues.active
        }
        res.json(userInfo)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    console.log('look here')
    console.log(req.params.id)
    db.Users.findOne({
      where: {
        id: req.params.id,
        active: true
      }
    })
      .then(dbModel => {

        if(dbModel==null){
          res.send('noUser')
        }else{

        
      function getDbDate () {
        const split=JSON.stringify(dbModel.dataValues.createdAt);
   const dbDate = split.split(':')
   const splitDate=dbDate[0].split('-')
  const dayCreated =splitDate[2].split('T')
  const removed=splitDate[0].split('"')
 
 const dates=splitDate[1]+'-'+dayCreated[0]+'-'+removed[1]
return dates
       }

      const fullDate= getDbDate()
    const userProfilePage={
id:dbModel.dataValues.id,
email:dbModel.dataValues.email,
firstName:dbModel.dataValues.firstName,
lastName:dbModel.dataValues.lastName,
profilePic:dbModel.dataValues.profilePic,
phoneNumber:dbModel.dataValues.phoneNumber,
verified:dbModel.dataValues.verified,
active:dbModel.dataValues.active,
createdAt:fullDate,
address: dbModel.dataValues.address

        }
        res.send(userProfilePage)
       // console.log(dbModel)
        // if (dbModel) {
      
        // } else {
        //   res.status(404).json({
        //     message: 'Id not found.'
        //   });
      //  }
      }
      })
      .catch(err => res.status(422).json(err));
  },
  signIn: function (req, res) {
   

   

    console.log(req.body)
    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (userSign) {
      if(userSign == null){
        res.send('noUser')
      }
         //if the database enycrpted password and non enypyted email from the database 
       //match create a JWT token and send it to the front end for storage
      bcrypt.compare(req.body.pass, userSign.dataValues.password).then(function (pass) {
        if (pass === true && req.body.email === userSign.email) {

         const splitAddy = userSign.dataValues.address.split(' ');
         const homeAdress = splitAddy[0] + ' ' + splitAddy[1];
         const homeCity = splitAddy[2];
         const homeState = splitAddy[3];
        const  homeZipCode = splitAddy[4]
         const fullName = userSign.dataValues.firstName + ' ' + userSign.dataValues.lastName;
          const currentUser = {
            userId: userSign.dataValues.id,
            email: userSign.dataValues.email,
            firstName: userSign.dataValues.firstName,
            lastName: userSign.dataValues.lastName,
            fullName: fullName,
            profilePic: userSign.dataValues.profilePic,
            phoneNumber: userSign.dataValues.phoneNumber,
            address: homeAdress,
            city: homeCity,
            state: homeState,
            zipCode: homeZipCode,
            verified:userSign.verified,
            dateOfBirth:userSign.dateOfBirth
          }
        
          const token = jwt.sign({
            auth: currentUser.userId,
            agent: req.headers['user-agent'],
            currentUser:{ currentUser },
            exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60, // Note: in seconds!
          }, secret);
          res.send(token)
         
         //if the database enycrpted password and non enypyted email from the database don't match
         //send the front end a string of noMatch telling the front end to prompt the user to retry 
        } else {
          res.send("noMatch");
        }
      });

    })
  },
  signOut: function (req, res) {

// moment().format('2016-01-01 11:31:23 PM')
  let i= moment(' 11:31:23 PM').minute(Number);
 res.send(i)
  },
  create: function (req, res) {
  
  console.log(saltRounds)
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) {


        console.log(err)
      }
      db.Users.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (data) {
        if (data != null) {

          res.send('already')


        }
else{
 db.Users.create({
     email: req.body.email,
     password: hash,
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     profilePic: req.body.profilePic,
     phoneNumber: req.body.phoneNumber,
     address: req.body.address,
     dateOfBirth: req.body.dateOfBirth,
  })
    .then(dbModel => {
 
      db.Users.findOne({
        where: {
          email: req.body.email
        }
        }).then(newUser=>{
          console.log(newUser.dataValues.id)
          const name = newUser.dataValues.firstName + ' ' + newUser.dataValues.lastName
          const msg = {
            to: req.body.email,
            from: 'TechCheck@donotreply.com',
            subject: 'Reqister Your Email With TechChecks ',
            text: 'click me ',
             html: name +' <br> <a href='+'https://techcheck.herokuapp.com/api/users/verification/' +newUser.dataValues.id +'><strong> <button>Please Click This Link to Register Your Email</button></a></strong>',
          };
  
          sgMail.send(msg);
          res.send('user Created')
        })

   })
     .catch(err => res.status(422).json(err));
    }
  })
    })
  },
  updateInfo: function (req, res) {
    var diffrentEmail=true
    console.log(req.body)
    console.log('req.body')
    db.Users.findOne({
      where:{
        id:req.body.userId
      }
    }).then(user=>{



function detectNewEmail ()  {
  if(req.body.email != user.dataValues.email){
         const name = user.dataValues.firstName + ' ' + user.dataValues.lastName
          const msg = {
            to: req.body.email,
            from: 'TechCheck@donotreply.com',
            subject: 'Reqister Your Email With TechChecks ',
            text: 'click me ',
             html: name +' <br> <a href='+'https://techcheck.herokuapp.com/api/users/verification/' +user.dataValues.id +'><strong> <button>Please Click This Link to Register Your Email</button></a></strong>',
          };
  
         // sgMail.send(msg);
    diffrentEmail=false
    return diffrentEmail
    }else{
      
    }
} 
     diffrentEmail= detectNewEmail()

     console.log('above diffrent email')
   console.log(diffrentEmail)
      db.Users.update({
        email: req.body.email||user.dataValues.email,
       
        firstName: req.body.firstName,
        lastName: req.body.lastName ,
        profilePic: req.body.profilePic,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        dateOfBirth: req.body.dateOfBirth,
        verified:diffrentEmail
      }, {
          where: {
            id: req.body.userId,
            active: true
          }
        })
        .then(changedUser =>{
  res.send('j')
    
        })
      })

      .catch(err => res.status(422).json(err));
  },
 verification: function (req, res) {
console.log(req.params.id)
    db.Users.update({
      verified:true
    }, {
        where: {
          id: req.params.id,
          active: true
        }
      })
      .then(dbModel => {
        
        db.Users.findOne({
          where:{
            id:req.params.id
          }
        }).then(verify=>{
          console.log(verify)
       const name =verify.dataValues.firstName+ ' '+verify.dataValues.lastName
  
          res.send(name)
        })

      })
      .catch(err => res.status(422).json(err));
  },
  forgot: function (req, res) {
  
        db.Users.findOne({
           
            where: {
              email: req.body.email
              
            }
        
          })
          .then(forgottenUser => {
          console.log(forgottenUser)
            const token = jwt.sign({
              auth: forgottenUser.userId,
              agent: req.headers['user-agent'],
              currentUser:{ forgottenUser },
              exp: 120, // Note: in seconds!
            }, secret);
         
            const name = forgottenUser.dataValues.firstName + ' ' + forgottenUser.dataValues.lastName
            const msg = {
              to: req.body.email,
              from: 'TechCheck@donotreply.com',
              subject: 'TechCheck Account Recovery',
              text: 'click me ',
               html: name + ' <br> <a href='+'https://techcheck.herokuapp.com/reset/' +token +'><strong><button style="color:blue">Reset Password</button></a></strong><br>Note:This link will expire in one hour',
            
            };
    
            sgMail.send(msg);
            res.send('sent')
            
          })
          .catch(err => res.status(422).json(err));
      },
      secrity: function (req, res) {
        let change
        
      },
      recovery: function (req, res) {
        // client.messages.create(
        //   {
        //     to: '+8184294897',
        //     from: '+14243810089',
        //     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        //   },
        //   (err, message) => {
        //     console.log(message.sid);
        //   }
        // );
        let decoded
        jwt.verify(req.body.userToken, secret, function(err, decoded) {      
          if (err) {
           
            return res.json('NoAuth'); 
          
          } else {
          
           //if everything is good, save to request for use in other routes
            req.decoded = decoded;    
          console.log(decoded)
             return decoded
         //console.log(decoded.currentUser.currentUser.userId)
        }
      })
             
          if(decoded==null){
res.send('not valid')
          }else{

         
    
    
      
        console.log(req.body.newpass)
        
        bcrypt.hash(req.body.passswordConfirm, saltRounds, function (err, hash) {
        db.Users.update({
         password:hash
        }, {
            where: {
              id: req.body.id,
            
            }
          })
          .then(() => {
db.Users.findOne({
  where:{
    id:req.body.id
  }

}).then(forgottenUser=>{

  console.log(forgottenUser)
  const name = forgottenUser.dataValues.firstName + ' ' + forgottenUser.dataValues.lastName
            const msg = {
              to: forgottenUser.dataValues.email,
              from: 'TechCheck@donotreply.com',
              subject: 'TechCheck Account Recovery',
              text: 'click me ',
               html: name +' Your password has been changed sucsessfully,if you did not change your password,please contact support! '
            
            };
    
            sgMail.send(msg);
            res.send('Sucsessfully changed password')
       
     
          })
       
          })
       
          .catch(err => res.status(422).json(err));
        })
      }
      },
  remove: function (req, res) {
    db.Users.update({
      inactive: true
    }, {
        where: {
          id: req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

export { controller as default };
