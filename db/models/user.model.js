const { Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    alowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstname:{
    alowNull: false,
    type: DataTypes.STRING
  },
  lastname:{
    alowNull: false,
    type: DataTypes.STRING
  },
  address:{
    alowNull: false,
    type: DataTypes.STRING,
  },
  ocupation:{
    alowNull: false,
    type: DataTypes.STRING
  },
  email:{
    alowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    alowNull: false,
    type: DataTypes.STRING
  },
  createdAt:{
    alowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {
  static associate() {
    // associate
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
