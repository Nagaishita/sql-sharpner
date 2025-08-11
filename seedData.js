const { User, Bus } = require('./models');

async function insertData() {
  await User.bulkCreate([
    { name: "User1", email: "user1@example.com" },
    { name: "User2", email: "user2@example.com" },
    { name: "User3", email: "user3@example.com" }
  ]);

  await Bus.bulkCreate([
    { name: "Bus A", availableSeats: 20 },
    { name: "Bus B", availableSeats: 5 }
  ]);
}

insertData();
