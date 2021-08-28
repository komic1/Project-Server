const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);

const systemRoutes = require("./routes/systemRoutes");
const taskRoutes = require("./routes/taskRoutes");
const catRoutes = require('./routes/categoryRoutes');

const app = express();
const store = new mongoSession({
  uri: "mongodb+srv://kenonoke123:keno1998@kenocluster.xlvmk.mongodb.net/Project?retryWrites=true&w=majority",
  collection: "sessions",
});

app.use(bodyparser.json());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})
app.use(
  session({
    resave: false,
    secret: "otorinolaringologija123",
    saveUninitialized: false,
    store: store,
  })
);

app.use(systemRoutes);
app.use(taskRoutes);
app.use(catRoutes);


mongoose
  .connect(
    "mongodb+srv://kenonoke123:keno1998@kenocluster.xlvmk.mongodb.net/Project?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("Successfully connected to database!");
    User.findOne().then((user) => {
      if (!user) {
        const newUser = new User({
          firstName: "Kenny",
          lastName: "Omic",
          email: "kenanomic@hotmail.com",
          password: "keno1998",
        });
        newUser
          .save()
          .then((user) => console.log("Uspjesno kreiran novi user " + user))
          .catch((err) => console.log(err));
      } else {
        console.log("kurcina");
      }
    });
  })
  .catch((err) => console.log(err));

app.listen(8080);
