module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
     
    },
    email: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being entered if it doesn't
      // have a text value
      allowNull: false
      // len is a validation that checks that our todo is between 1 and 140 characters
    },
   
    password: {
      type: DataTypes.STRING
      // defaultValue is a flag that defaults a new todos complete value to false if
      // it isn't supplied one
    },
    firstName:{
      type:DataTypes.STRING
    },
    lastName:{
      type:DataTypes.STRING
    },
    profilePic:{
      type:DataTypes.STRING
    },
    phoneNumber:{
      type:DataTypes.STRING
    },
    address:{
      type:DataTypes.STRING
    },
    dateOfBirth:{
      type:DataTypes.STRING
    },
  
    
    verified:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }, 
  }, {
    timestamps: true
  });
  return Users;
};
