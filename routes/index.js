import express from 'express';
import Url from '../models/Url.js';
const router = express.Router();


router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    const currDate = new Date();
    const twoDays = 2 * 24 * 60 * 60 * 1000;
    if (url && currDate - new Date(url.date) <= twoDays) {
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

export default router;