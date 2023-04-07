import express from 'express';
import twemoji from 'twemoji';
import extractTweetData from './extractTweetData';
import screenshot from './screenshot';
import ejs from 'ejs';
import path from 'path';

/**
 * Convert a text's emojis to twitter SVG emojis (chrome-aws-lambda does not support emojis)
 * @param text Any text containing unicode emojis
 * @returns Text with emojis replaced
 */
const emojify = (text: string): string => twemoji.parse(text, { folder: 'svg', ext: '.svg' });

const app = express();

// Go at root of the project and go to the `src` folder
const srcPath = path.join(__dirname, '../src');

app.set('views', srcPath + '/tweet');
app.set('view engine', 'ejs');
app.engine('ejs', ejs.renderFile);

app.use('/tweet/assets', express.static(srcPath + '/tweet/assets'));

app.use('/', express.static(srcPath + '/public'));

app.use('/screenshot', screenshot);

app.get('/tweet', async (req, res) => {
  // Load the tweet data from the url `tweetData` JSON query object
  const tweetData = await extractTweetData(req, res)
  const tweetDataEmojified = {
    ...tweetData,
    name: emojify(tweetData.name),
    text: emojify(tweetData.text),
    quoted: tweetData.quoted && tweetData.quoted.text ? {
      ...tweetData.quoted,
      name: emojify(tweetData.quoted.name),
      text: emojify(tweetData.quoted.text)
    } : null
  }

  // Check if a custom template was asked
  if (req.query.style === 'no-stats') {
    res.render('no-stats', { tweetData: { ...tweetDataEmojified } });
  } else {
    res.render('classic', { tweetData: { ...tweetDataEmojified } });
  }
})

app.listen(process.env.PORT || 3000, () => console.log('Server started on port 3000'));
