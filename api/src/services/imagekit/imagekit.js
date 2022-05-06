// SDK initialization

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : "public_RujORre5FFpe1N220PBprbYjPjg=",
    privateKey : "private_NSEPIdI5LCdgItHNuGZwTXLYzRc=",
    urlEndpoint : "https://ik.imagekit.io/dttv"
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