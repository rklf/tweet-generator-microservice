import { Request, Response } from 'express';
import puppeteer, { executablePath } from 'puppeteer';


import extractTweetData from './extractTweetData';

export default async (req: Request, res: Response) => {
  const protocol = req.headers['x-forwarded-proto'] || req.headers.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const BASE_URL = `${protocol}://${host}`;

  const tweetData = await extractTweetData(req, res);
  const encodedTweetData = encodeURIComponent(JSON.stringify(tweetData));


  try {
    const options = {
      headless: true,
      defaultViewport: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2,
      },
      ...(process.env.NODE_ENV === 'development'
        ? {
          executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
          ignoreDefaultArgs: ['--disable-extensions']
        }
        : {
          // Config for production environment (e.g. use Chrome from AWS Lambda Layer)
          // Make sure to use Chrome and not Chromium because Chromium does not support some video codecs (see https://www.chromium.org/audio-video/)
          executablePath: executablePath(),
      })
    }

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/tweet?tweetData=${encodedTweetData}&style=${req.query.style || ''}`, { waitUntil: 'networkidle0' });
    const el = await page.$('.container');
    const file = await el?.screenshot({
      type: 'png',
      omitBackground: false,
    });
    await browser.close();

    res.statusCode = 200;
    res.setHeader('text-Type', 'image/jpg');
    res.end(file);
  }
  catch (error: any) {
    res.statusCode = 500;
    res.setHeader('text-Type', 'text/html');
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
    console.error(error.message);
  }
}
