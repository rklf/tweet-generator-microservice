# tweet-generator-microservice
Forked from [rigwild/tweet-generator-microservice](https://github.com/rigwild/tweet-generator-microservice)

Generate fake tweets images.

Supports [Twemoji](https://twemoji.twitter.com/) and tweet quotes.

## How it works
An express server renders the tweet using an EJS template. A puppeteer instance is fired and screenshots the page. The image is then returned by the endpoint.

## Usage
Append the [URI queries](#uri-queries) to [http://localhost:3000/tweet](http://localhost:3000/tweet) to generate a tweet webpage.

Append the [URI queries](#uri-queries) to [http://localhost:3000/screenshot](http://localhost:3000/screenshot) to generate a tweet image .

### URI queries
| Name | Description |
| ---- | ----------- |
| `style` | Tweet template to use (see [Tweet templates](#tweet-templates)) |
| `tweetData` | Stringified JSON object containing tweet's data (see [Tweet data object](#tweet-data-object)) |

### Tweet templates
| Name | Description |
| ---- | ----------- |
| `classic` | Normal tweet (default if not specified) |
| `no-stats` | Normal tweet without statistics |

### Tweet data object
A JSON stringified object containing the tweet's properties.

If you have UTF-16 (like recent emojis) text, JSON stringify, URI encode and convert to Base64. See [Implementation example](#implementation-example).

| Name | type | Required | Default |
| ---- | ---- | :------: | ------- |
| name | `string` | ✅ |  |
| username | `string` | ✅ |  |
| text | `string` | ✅ |  |
| verifiedType | `string` |  | `null` |
| date | `Date` |  | Current date |
| retweetCount | `number` |  | `0` |
| quoteCount | `number` |  | `0` |
| likeCount | `number` |  | `0` |
| replyCount | `number` |  | `0` |
| impressionCount | `number` |  | `0` |
| attachments | `Object[]` - {"type": `string`, "url": `string`} |  | `0` |
| profileImage | `string` |  | [Default Twitter image](https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png) |
| quoted | `Object` - all of the above (and `repliedTo`) except `quoted` |  | `null` (no quote) |
| repliedTo | `Object[]` - all of the above except `repliedTo` |  | `null` (no reply to) |

## Public demo
~~You can use the provided demo endpoint or host your own using [Now](https://zeit.co/now). Examples are given at the root of the website.~~

~~[https://tweet-generator.now.sh/](https://tweet-generator.now.sh/)~~

Available at [https://tweet.rklf.fr/](https://tweet.rklf.fr/). See [Implementation example](#implementation-example) for a Node.js example.

## Implementation example
The following ESM module script (`.mjs`) will generate a tweet image and download it to `generatedTweet.png`.

```js
import fs from 'fs'
import fetch from 'node-fetch'

const setup = async () => {
  // My future tweet data
  const tweet = {
    "name": "My cool name 🎉",
    "username": "my_username",
    "text": "My awesome #tweet text 💖",
    "verifiedType": "none",
    "date": "2023-04-19T19:48:22.531Z",
    "retweetCount": 54371,
    "likeCount": 54371,
    "quoteCount": 1,
    "replyCount": 543,
    "profileImage": "https://picsum.photos/96",
    "attachments": [
      {
          "type": "image",
          "url": "https://picsum.photos/600"
      },
      {
          "type": "image",
          "url": "https://picsum.photos/600"
      },
      {
          "type": "video",
          "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
      },
      {
          "type": "image",
          "url": "https://picsum.photos/600"
      }
    ],
    "quoted": {
      "name": "Quoted name 🤷‍♂️",
      "username": "quoted_username",
      "text": "quoted tweet text 😌",
      "verifiedType": "business",
      "date": "2023-04-19T18:48:22.531Z",
      "retweetCount": 54371,
      "likeCount": 54371,
      "quoteCount": 1,
      "replyCount": 543,
      "profileImage": "https://picsum.photos/96",
      "attachments": [
        {
            "type": "image",
            "url": "https://picsum.photos/600"
        },
        {
            "type": "image",
            "url": "https://picsum.photos/600"
        }
      ]
    }
  }

  // Create the uri (encodeURIComponent is important as stringified JSON can contain invalid query characters)
  const uri = `http://localhost:3000/screenshot?style=classic&tweetData=${encodeURIComponent(JSON.stringify(tweet))}`)

  /*
  // If you have UTF-16 (like recent emojis), JSON stringify, URI encode and convert to Base64
  const btoa = require('btoa')
  const uri = `http://localhost:3000/screenshot?style=classic&tweetData=${btoa(encodeURIComponent(JSON.stringify(tweet)))}`
  */

  const { body } = await fetch(uri)
    .then(async res => {
      // The endpoint returned errors, throw
      if (!res.ok) throw (await res.json()).errors.join(', ')
      return res
    })

  // Save the response body to an image file
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream('./generatedTweet.png')
    body.pipe(fileStream)
    body.on('error', err => reject(err))
    fileStream.on('finish', () => resolve())
  })
}

setup()
```

## Contributing
If you want to contribute to this project, you can open an [issue](https://github.com/rklf/tweet-generator-microservice/issues) detailing your suggestions or bugs.

Feel free to open a [pull request](https://github.com/rklf/tweet-generator-microservice/pulls).

## License
[The MIT license](./LICENSE)

Author of this service is not affiliated in any way with `Twitter, Inc`.
