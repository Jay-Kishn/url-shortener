import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB.js';
import urlsRouter from './routes/urls.js';
import indexRouter from './routes/index.js';
import auth from './routes/auth.js'
import session from 'express-session';


dotenv.config({ path: './env' });
 
const app = express();

app.set('view engine', 'ejs');

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }));

app.use('/', indexRouter);
app.use('/api', urlsRouter);
app.use('/auth',auth)

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

