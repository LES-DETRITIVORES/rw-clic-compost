// SDK initialization

const ImageKit = require('imagekit')

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PK,
  privateKey: process.env.IMAGEKIT_SK,
  urlEndpoint: process.env.IMAGEKIT_URL,
})

export const image = async ({ query }) => {
  const imageURL = imagekit.url({
    path: '/' + query,
    transformation: [
      {
        height: '300',
        width: '400',
      },
    ],
  })

  return {
    url: imageURL,
  }
}
