module.exports = function(sequelize, DataTypes) {
    var Carts = sequelize.define("Carts", {
      
    ProductInfo:{
      type:DataTypes.STRING
    },
    UserId:{
      type:DataTypes.STRING
    },
      
    
    
      
    
    
    }, {
      timestamps: true
    });
    return Carts;
  };
  