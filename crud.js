const sequelize = require('./config/database');
const Student = require('./models/student');

async function performCRUD() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB ✅');

    // Sync table
    await sequelize.sync();

    // 🔸 Insert a new student
    const newStudent = await Student.create({
      name: 'Rohit Sharma',
      email: 'rohit@example.com',
      age: 36,
    });
    console.log('Inserted:', newStudent.toJSON());

    // 🔸 Read all students
    const allStudents = await Student.findAll();
    console.log('\nAll Students:');
    allStudents.forEach((student) => {
      console.log(student.toJSON());
    });

    // 🔸 Read student by primary key (ID)
    const singleStudent = await Student.findByPk(1);
    console.log('\nStudent with ID 1:', singleStudent?.toJSON());

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sequelize.close();
  }
}

performCRUD();

    // 🔸 Update student with ID 1
    const studentToUpdate = await Student.findByPk(1);
    if (studentToUpdate) {
      studentToUpdate.name = 'Hitman';
      studentToUpdate.email = 'hitman@example.com';
      await studentToUpdate.save();
      console.log('\nUpdated Student:', studentToUpdate.toJSON());
    } else {
      console.log('Student not found');
    }


        // 🔸 Delete student with ID 1
    const studentToDelete = await Student.findByPk(1);
    if (studentToDelete) {
      await studentToDelete.destroy();
      console.log('\nDeleted student with ID 1');
    } else {
      console.log('Student to delete not found');
    }

