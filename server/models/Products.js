module.exports = function(sequelize, DataTypes) {
  var Products = sequelize.define("Products", {
    userId:{
      type:DataTypes.STRING
  },
  category:{
      
          type:DataTypes.STRING},
      product_name:{type: DataTypes.STRING},
      
          product_description:{type: DataTypes.STRING},
          tags:{
              type: DataTypes.STRING
          },
          computerInfo:{
              type:DataTypes.STRING},
          zipcode:{
type:DataTypes.STRING
          },
          serialNum:{
              type: DataTypes.STRING
          },
          userUploadImage1:{ type: DataTypes.STRING},
          userUploadImage2:{type: DataTypes.STRING},
      price:{type:DataTypes.INTEGER
      },
      condition:{type:DataTypes.STRING

      },

      warranty:{
          type:DataTypes.STRING
      },
  packingStat:{
      type:DataTypes.STRING
  },status:{
      type:DataTypes.STRING
  }
  });
  return Products;
};
