require('dotenv').config();
const express = require('express');

const app = express();

const cors = require('cors');

const whitelist = ['https://priceless-bose-d43eea.netlify.app/'];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(express.static('./src/uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
const mongoose = require('mongoose');

mongoose.connect(
  process.env.URL_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
).then(() => {
  console.log('database connected');
  app.emit('connected');
}).catch((e) => {
  console.log(e);
});

const routes = require('./src/routes/articleRoutes');
const usersRoutes = require('./src/routes/usersRoute');

app.use(routes);
app.use(usersRoutes);

app.on('connected', () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
  });
});
