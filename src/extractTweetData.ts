import { Request, Response } from 'express';
const atob = require('atob');

const resThrow = (res: Response, errors: string[], status: number = 400) => new Promise(() =>
  res.status(status).json({ errors }).end(() => {
    throw new Error(errors.join(', '));
  })
);

export default async (req: Request, res: Response) => {
  const { tweetData: tweetDataRaw } = <{ [key: string]: string }>req.query

  if (!tweetDataRaw) await resThrow(res, ['Missing tweetData query JSON object']);
  if (Array.isArray(tweetDataRaw)) await resThrow(res, ['tweetData query should not be an array of string']);

  let tweetData
  try {
    tweetData = tweetDataRaw.replace(/\n/g, '\\n');
    tweetData = decodeURIComponent(tweetDataRaw);
    tweetData = JSON.parse(tweetData);
  }
  catch (error) {
    try {
      tweetData = JSON.parse(decodeURIComponent(atob(tweetDataRaw)));
    }
    catch (error) {
      await resThrow(res, ['tweetData query is not a valid JSON object']);
    }
  }

  let errors = [];

  // Check tweet text
  const mainTweet = {
    name: tweetData.name,
    username: tweetData.username,
    verified_type: tweetData.verified_type || null,
    profileImage: tweetData.profileImage || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    text: tweetData.text,
    date: tweetData.date || new Date(),
    retweets: tweetData.retweets || 0,
    likes: tweetData.likes || 0,
    quotes: tweetData.quotes || 0,
    replies: tweetData.replies || 0,
    attachments: tweetData.attachments || [],
  }

  // Check all mandatory parameters were set
  if (!mainTweet.name || !mainTweet.username || !mainTweet.text) errors.push('Missing name, username or text');

  // Check datetime is valid, current datetime if not set
  if (isNaN(Date.parse(mainTweet.date))) errors.push('Invalid datetime');

  // Check quoted tweet text (if any)
  const quotedTweet = tweetData.quoted ? {
    name: tweetData.quoted.name,
    username: tweetData.quoted.username,
    verified_type: tweetData.quoted.verified_type || null,
    profileImage: tweetData.quoted.profileImage || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    text: tweetData.quoted.text,
    date: tweetData.quoted.date || new Date(),
    retweets: tweetData.quoted.retweets || 0,
    likes: tweetData.quoted.likes || 0,
    quotes: tweetData.quoted.quotes || 0,
    replies: tweetData.quoted.replies || 0,
    attachments: tweetData.quoted.attachments || [],
  } : null

  // Check there's no request errors
  if (errors.length > 0) await resThrow(res, errors);

  return {
    ...mainTweet,
    quoted: quotedTweet
  }
}
