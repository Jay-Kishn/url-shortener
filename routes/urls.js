import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import { validateUrl } from '../Utils/utils.js';
import dotenv from 'dotenv';
import isAuthenticated from '../middleware/authMiddleware.js';

dotenv.config({ path: '../config/.env' });

const router = express.Router();

// Short URL Generator
router.post('/short',isAuthenticated, async (req, res) => {
  const { origUrl } = req.body;
  const base = 'http://localhost:5000'
  const urlId = nanoid()
  if (validateUrl(origUrl)) {
    //console.log(2);
    try {
      let url = await Url.findOne({ origUrl });
      //console.log(3);
      if (url) {
       //console.log(4);
        return res.render('index', { shortUrl: url.shortUrl });
      } else {
        console.log(5);
        const shortUrl = `${base}/${urlId}`;
          url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.render('index', { shortUrl: shortUrl })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
      res.status(400).json('Invalid Original Url');
  }
});

router.get('/short',(req,res)=>{
  res.render('index', { shortUrl:'' })
})

export default router