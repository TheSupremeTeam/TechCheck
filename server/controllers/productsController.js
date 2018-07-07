
import db from"../models"
 import s3Key from '../../awskey'
 import s3Secret from '../../awssecret'
import aws from 'aws-sdk'
import sequelize from 'sequelize'
import multer from 'multer'
import multerS3 from 'multer-s3'
const Op = sequelize.Op;
// ||s3Secret
// ||s3Key
aws.config.update({
  accessKeyId:process.env.s3_key||s3Key,
  secretAccessKey: process.env.s3_secret||s3Secret
});
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'techcheckbucket',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, file.originalname); //use Date.now() for unique file keys
      //var imagePath = file.originalname

    }


  })
});

function getDbDate (value) {
  const split=JSON.stringify(value);
const dbDate = split.split(':')
const splitDate=dbDate[0].split('-')
const dayCreated =splitDate[2].split('T')
const removed=splitDate[0].split('"')

const dates=splitDate[1]+'-'+dayCreated[0]+'-'+removed[1]
return dates
 };
// Defining methods for the booksController
const controller = {
  
  userProducts: (req, res) => {
   
    console.log(req.body)
   
 let offset=15
 let limit=15
 offset =parseInt(req.body.page)
limit=parseInt(req.body.limit)
console.log('helloits',limit)
let trueorfalse=false

  const offsetArray=[15,30,45,60]
 
console.log(offset)
  for(let i =0;i<4;i++){
if(offsetArray[i]===offset){
 trueorfalse=true
}
  }
  

console.log(trueorfalse)


  let newo=0




    if(limit===30&&trueorfalse===true){
 newo = offset += 15

}



console.log('hrll',newo)
//     s3.headObject({
//     Bucket: 'bucketname',
//     Key: 'file.txt'})
// .then (result=>{
// console.log(result)
// })

    db.Products.findAll({
      offset:newo,
      limit:limit,
        where: {
          userId:req.body.userId,
          
        }
      })
      .then(dbModel =>{
console.log(dbModel.length)
       
        res.send(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {

    db.Products.findOne({
        where: {
          id: req.params.id,
          
        }
      })
      .then(dbModel => {
        // console.log(dbModel)
   
     
       const  createdOn=getDbDate(dbModel.dataValues.createdAt)
         const product={
id:dbModel.dataValues.id,
userId:dbModel.dataValues.userId,
productName:dbModel.dataValues.productName,
serialNumber:dbModel.dataValues.serialNumber,
category:dbModel.dataValues.category,
price:dbModel.dataValues.price,
productDescription:dbModel.dataValues.productDescription,
condition:dbModel.dataValues.condition,
warranty:dbModel.dataValues.warranty,
packaging:dbModel.dataValues.packaging,
userUploadImage1:dbModel.dataValues.userUploadImage1,
userUploadImage2:dbModel.dataValues.userUploadImage2,
status:dbModel.dataValues.status,
verified:dbModel.dataValues.verified,
createdAt:createdOn

         }
         
      res.send(product)
      })
      .catch(err => res.status(422).json(err));
  },
  findCartItem:function(req,res){
 const myArray=[];
    db.Carts.findAll({
      where:{
        UserId: req.params.user
      }
    }).then(data=>{
     myArray.push(data[0].dataValues)
  
      // for(let i =0;i<data.length;i++){
       
        // db.Products.findOne({
        //   where:{
        //     id:data[0].dataValues.ProductInfo
        //   }
        // }).then(cartData=>{

// console.log(cartData.dataValues);

//  const  createdOn=getDbDate(cartData.dataValues.createdAt);
 
// let theProduct={
//   id:cartData.dataValues.id,
//   userId:cartData.dataValues.userId,
//   productName:cartData.dataValues.productName,
//   serialNumber:cartData.dataValues.serialNumber,
//   category:cartData.dataValues.category,
//   price:cartData.dataValues.price,
//   productDescription:cartData.dataValues.productDescription,
//   condition:cartData.dataValues.condition,
//   warranty:cartData.dataValues.warranty,
//   packaging:cartData.dataValues.packaging,
//   userUploadImage1:cartData.dataValues.userUploadImage1,
//   userUploadImage2:cartData.dataValues.userUploadImage2,
//   status:cartData.dataValues.status,
//   verified:cartData.dataValues.verified,
//   createdAt:createdOn
// };
// myArray.push(theProduct);
// console.log(myArray)
        // }) 
        
      // }
      // res.send('thefuckingcart');

      // console.log(data[1].dataValues)
   
    }).catch(err =>console.log(err));
    console.log(myArray)
// res.send(myArray);
  },
  addToCart:function(req,res){
    console.log(req.body)
   
   
    console.log(req.body.user)
       db.Carts.create({
        ProductInfo:req.body.Product,
        UserId:req.body.user
      }).then(data=>{
        res.send('done')
      }).catch(err => res.status(422).json(err));
  },
  categorySearch:function(req,res){

    console.log(req.body)
   
 let offset=15
 let limit=15
 offset =parseInt(req.body.page)
limit=parseInt(req.body.limit)
console.log('helloits',limit)
let trueorfalse=false

  const offsetArray=[15,30,45,60]
 
console.log(offset)
  for(let i =0;i<4;i++){
if(offsetArray[i]===offset){
 trueorfalse=true
}
  }
  

console.log(trueorfalse)


  let newo=0




    if(limit===30&&trueorfalse===true){
 newo = offset += 15

}



console.log('hrll',newo)
   
    db.Products.findAll({
     
      limit:limit,
      offset: newo,
      

      
       where:{ category: req.body.category}
      ,
        
      
    }).then(products=>{
      res.send(products)
    })
  },
  search:function(req,res){
    // console.log(req.body)
    let offset=15
 let limit=15
    offset =parseInt(req.body.page)
    limit=parseInt(req.body.limit)
   let category=req.body.search
   

    let catsearch='%'+category+'%'
    // console.log(catsearch)
    // console.log('helloits',typeof limit)
    function changingLimit (){
      let newo
    if(limit==30){
     newo = offset += 15
    
    }
    return newo
    }changingLimit()
    let newOffset=changingLimit();
    // console.log('hrll',newOffset)
  //   {productDescription: 
  //     {[Op.like] : catsearch}
  // }
        db.Products.findAll({
          offset: 0,
          limit:30,
          where: {
            [Op.or]:[
            {category: 
                {[Op.like] : catsearch}    
            },
            // {productName: 
            //     {[Op.like] : catsearch}
            
            
        ]
        }
        }).then(products=>{
          res.send(products)
        })
      
      },
  create: function(req, res) {
    // console.log(req.body)
    db.Products.create({
      userId:req.body.userId,
      
      category: req.body.category,
     tags: req.body.tags,
     computerInfo:req.body.computerInfo,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      serialNumber:req.body.serialNumber,
      userUploadImage1: req.body.userUploadImage1,
      userUploadImage2: req.body.userUploadImage2,
      condition:req.body.condition,
      price: req.body.price,
      warranty:req.body.warranty,
      status:req.body.status,
     packaging: req.body.packaging
      })
      .then(dbModel => {

res.send('product created')
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Products.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }, {
        where: {
          id: req.params.id,
          inactive: false
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Products.update({
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
