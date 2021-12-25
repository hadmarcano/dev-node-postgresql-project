const { Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstname:{
    allowNull: false,
    type: DataTypes.STRING
  },
  lastname:{
    allowNull: false,
    type: DataTypes.STRING
  },
  address:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  ocupation:{
    allowNull: false,
    type: DataTypes.STRING
  },
  email:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  role:{
    allowNull:false,
    type: DataTypes.STRING,
    defaultValue:'customer'
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {
  static associate(models) {
    // associate
    this.hasOne(models.Customer,{
      as:'customer',
      foreignKey:'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
};

module.exports={
  USER_TABLE,
  UserSchema,
  User
};
