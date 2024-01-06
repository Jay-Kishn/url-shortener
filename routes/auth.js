import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Render the login form

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});


// Handle registration
router.get('/register', (req, res) => {
    res.render('register', { error: null });
  });

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    const saved = await newUser.save();
    setTimeout(() => {
        res.redirect('/auth/login');
    }, 4000);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body; 
  
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.userId = user._id; // Save user ID in the session
      res.redirect('/api/short');
    } else {
      // Render the login form with an error message
      res.render('login', { error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during login');
  }
  
});

// Handle logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error during logout');
    } else {
      res.redirect('/auth/login')
     // res.send('Logout successful!');
    }
  });
});

export default router;
