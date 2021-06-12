var Jimp = require('jimp');
module.exports = async function(imageFile, id) {
    console.log(id);
    var path = `public/product_images/${id}/`;

    //uploading images
    if (imageFile != "") {
        var productImage = imageFile;
        await productImage.forEach((prodImage) => {
            console.log("Upload Gallery Image");
            //gallery Image
            console.log(prodImage.name);

            gpath = path + 'gallery/' + prodImage.name;
            prodImage.mv(gpath, (err => {
                if (err) console.log(err);
            }));

            console.log("Upload Thumbnail Image");
            //thumbs images
            let thumbsPath = path + 'thumbs/' + prodImage.name;
            console.log(gpath);
            console.log(thumbsPath);
            Jimp.read(gpath)
                .then(gpic => {
                    return gpic
                        .resize(100, 100)
                        .quality(80)
                        .write(thumbsPath);
                }).catch(err => {
                    console.error(err);
                    return null;
                });
        });
    } else {
        return null;
    }
};