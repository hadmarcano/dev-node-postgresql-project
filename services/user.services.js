const faker = require('faker');
const Boom = require('@hapi/boom');

class UserService {
  constructor() {
    this.listUsers = [];
    this.generate();
  }

  generate() {
    const limit = 40;

    for (let i = 0; i < limit; i++) {
      this.listUsers.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetName(),
        ocupation: faker.name.jobTitle(),
      });
    }
  }

  async createOne(dataUser) {
    const id = faker.datatype.uuid();
    try {
      dataUser.id = id;
      await this.listUsers.push(dataUser);
      const response = {
        created: 'OK',
        userId: dataUser.id,
      };
      return response;
    } catch (error) {
      throw Boom.conflict('An error has occurred');
    }
  }

  getting() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.listUsers);
      }, 1000);
    });
  }

  async getOne(id) {
    const user = await this.listUsers.find((el) => el.id == id);

    if (!user) {
      throw Boom.notFound('User not exists');
    }

    return user;
  }

  async updateOne(id, changes) {
    const userIndex = await this.listUsers.findIndex((el) => el.id == id);

    if (userIndex === -1) {
      throw Boom.notFound('User not exists');
    }

    const user = this.listUsers[userIndex];
    this.listUsers[userIndex] = {
      ...user,
      ...changes,
    };

    return this.listUsers[userIndex];
  }

  async deleteOne(id) {
    const userIndex = await this.listUsers.findIndex((el) => el.id == id);
    if(userIndex === -1){
      throw Boom.notFound("User not exists");
    }
    this.listUsers.splice(userIndex,1);
    return {id};
  }
}

module.exports = UserService;
