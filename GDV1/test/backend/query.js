const { sequelize } = require('./src/config/database');
const { User } = require('./src/models/User');

async function tableExists() {
  const result = await sequelize.query(
    "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Users')"
  );
  return result[0][0].exists;
}

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  try {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to sync models:', error);
  }

  const usersTableExists = await tableExists();
  console.log("Users table exists:", usersTableExists);

  if (usersTableExists) {
    try {
      const users = await User.findAll();
      console.log('Users:', JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Unable to query users:', error);
    }
  }
}

main();
