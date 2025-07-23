const sequelize = require('./config/database');
const Student = require('./models/student');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync model with database (creates table)
    await sequelize.sync(); // or sequelize.sync({ force: true }) to reset table

    console.log('Student table created/verified.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
