// SDK initialization

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PK,
    privateKey : process.env.IMAGEKIT_SK,
    urlEndpoint : process.env.IMAGEKIT_URL
});

export const image = async ({ query }) => {
    var imageURL = imagekit.url({
        path : "/" + query,
        transformation : [{
            "height" : "300",
            "width" : "400"
        }]
    });

    return {
        url : imageURL
    }
}