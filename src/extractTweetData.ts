import { Request, Response } from 'express';
const atob = require('atob');

const resThrow = (res: Response, errors: Error[], status: number = 400) => new Promise(() =>
  res.status(status).json({ errors }).end(() => {
    throw new Error(errors.join(', '));
  })
);

interface Attachment {
  type: string;
  url: string;
}

type Tweet = {
  name: string;
  username: string;
  verifiedType?: string | null;
  profileImage: string;
  text: string;
  date: string | Date;
  retweetCount: number;
  likeCount: number;
  quoteCount: number;
  replyCount: number;
  attachments?: Attachment[];
  quoted?: Tweet | null;
  repliedTo?: Tweet[] | null;
  [key: string]: any;
};

type Error = {
  field: string;
  message: string;
};

export default async (req: Request, res: Response) => {
  const { tweetData: tweetDataRaw } = <{ [key: string]: string }>req.query

  if (!tweetDataRaw) await resThrow(res, [{ field: 'tweetData', message: 'Missing tweetData query JSON object' }], 400);
  if (Array.isArray(tweetDataRaw)) await resThrow(res, [{ field: 'tweetData', message: 'tweetData query JSON object must be a string' }], 400);

  let tweetData;
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
      await resThrow(res, [{ field: 'tweetData', message: 'Invalid tweetData query JSON object' }], 400);
    }
  }

  let errors: Error[] = [];

  // Check tweet data
  const validateTweet = (tweet: Tweet): Error[] => {
    const tweetMandatoryFields = ['name', 'username', 'text'];
    const errors: Error[] = [];
    const validateTweetField = (field: string, tweet: Tweet, prefix: string) => {
      if (!tweet[field]) {
        errors.push({
          field: `${prefix} ${field}`,
          message: `Missing ${field} in tweet`,
        });
      }
    };
    tweetMandatoryFields.forEach((field) => {
      validateTweetField(field, tweet, 'Main');
      if (tweet.quoted) {
        validateTweetField(field, tweet.quoted, 'Quoted');
      }
      if (tweet.repliedTo) {
        tweet.repliedTo.forEach((reply) => {
          validateTweetField(field, reply, 'Replied to');
        });
      }
    });
    return errors;
  };

  // Main tweet
  const mainTweet: Tweet = {
    name: tweetData.name,
    username: tweetData.username,
    verifiedType: tweetData.verifiedType || null,
    profileImage: tweetData.profileImage || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    text: tweetData.text,
    date: tweetData.date || new Date(),
    retweetCount: tweetData.retweetCount || 0,
    likeCount: tweetData.likeCount || 0,
    quoteCount: tweetData.quoteCount || 0,
    replyCount: tweetData.replyCount || 0,
    impressionCount: tweetData.impressionCount || 0,
    attachments: tweetData.attachments || [],
    quoted: tweetData.quoted || null,
    repliedTo: tweetData.repliedTo || null,
  }

  // Check datetime is valid, current datetime if not set
  if (isNaN(Date.parse(mainTweet.date as string))) {
    mainTweet.date = new Date();
  }

  if (mainTweet) {
    errors = validateTweet(mainTweet);
  }

  // Check there's no request errors
  if (errors.length > 0) await resThrow(res, errors);

  return {
    ...mainTweet,
  }
}
