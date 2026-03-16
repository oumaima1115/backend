require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user.routes');
const tableRoutes = require('./routes/table.routes');
const reservationRoutes = require('./routes/reservation.routes');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());//express.json() allows sending JSON data

const options = { discriminatorKey: 'role', collection: 'people' };
const personSchema = new mongoose.Schema({
  name: String,
  age: Number
}, options);
const Person = mongoose.model('Person', personSchema);

const studentSchema = new mongoose.Schema({
  grade: String,
  courses: [String]
});
const Student = Person.discriminator('Student', studentSchema);

const teacherSchema = new mongoose.Schema({
  subject: String,
  salary: Number
});
const Teacher = Person.discriminator('Teacher', teacherSchema);
const collegeSchema = new mongoose.Schema({
  name: String,
  departments: [
    {
      name: String,
      head: String,
      teachers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher"
        }
      ],
      responsibleTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
      }
    }
  ]
});
const College = mongoose.model("College", collegeSchema);
const courseSchema = new mongoose.Schema({
  title: String,
  description: String
});
const Course = mongoose.model("Course", courseSchema);
const followSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  score: Number
});
const Follow = mongoose.model("Follow", followSchema);
const favoriteSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  addedAt: Date
});
const Favorite = mongoose.model("Favorite", favoriteSchema);

async function seedData() {
  const s = new Student({
    name: "Ali",
    age: 20,
    grade: "3rd year",
    courses: ["Math", "Physics"]
  });
  const t = new Teacher({
    name: "Sara",
    age: 35,
    subject: "Computer Science",
    salary: 3000
  });
  const co = new College({
    name: "Engineering College",
    departments: [
      {
        name: "IT",
        head: "Dr. Ahmed Ben Salah",
        teachers: [t._id],
        responsibleTeacher: t._id
      },
      {
        name: "Computer Science",
        head: "Dr. Sara Trabelsi",
        teachers: [t._id],
      },
      {
        name: "Information Systems",
        head: "Dr. Mohamed Ayachi",
        teachers: [t._id],
      }
    ]
  });
  const c = new Course({
    title: "Dev Web",
    description: "Software Development Bootcamp with AI skills",
  });
  const f = new Follow({
    student: s._id,
    course: c._id,
    score: 15
  });
  const fv = new Favorite({
    student: s._id,
    course: c._id,
    addedAt: new Date("2026-02-27")
  });

  await s.save();
  await t.save();
  await co.save();
  await c.save();
  await f.save();
  await fv.save();
  console.log("Data inserted");
}


app.use('/api/users', userRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB")
  .then(async () => {
    console.log("MongoDB connected");
    await seedData();
  })
  .catch(err => console.error(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
