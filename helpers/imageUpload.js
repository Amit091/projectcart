var Jimp = require('jimp');
const { promisify } = require("util");
const fs = require("fs-extra");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = async function(imageFile, id, type) {
    try {
        console.log(id + type);
        var path = `public/product_images/${id}/`;
        //for default Image upload
        if (type == 'default') {
            if (imageFile != '') {
                //uploading default Image
                let result = await imageFile.mv(path + 'default.jpg');
                console.log('*****1***********');
                
                console.log(result);
                console.log('*****2*********');
                if (result) console.log(result);
                //uploading  Image to thumbs
                gpath = `public/product_images/${id}/default.jpg`;
                thumbsPath = `public/product_images/${id}/thumbs/thumbnail.jpg`;
                //uploading  Image to Gallery
                let galleryPath = path + 'gallery/' + imageFile.name;
                var thumbsPath = `public/product_images/${id}/thumbs/${imageFile.name}`;
                let galleryImage = await imageFile.mv(galleryPath);
                if (galleryImage != "") {
                    imageResize(galleryPath, thumbsPath);
                }
            } else {
                //no Image
                imageFile = 'public/image/noimage.png';
                let noimage = await readFile('public/image/noimage.png');
                if (noimage) {
                    let writeimage = await writeFile(`public/product_images/${id}/thumbnail.jpg`, noimage);
                    let writeThumbImage = await writeFile(`public/product_images/${id}/thumbs/default.jpg`, noimage);
                }
            }
        } else if (type == 'gallery') {
            //uploading images
            if (imageFile != "") {
                var productImage = imageFile;
                console.log('......Upload');
                console.log(productImage.length + 'lengthj');
                /*
                 
                */
                var st = productImage.length;
                console.log(st + "lll");


                if (productImage.length != undefined) {
                    await productImage.forEach((prodImage) => {
                        console.log("Upload Gallery Image");
                        //gallery Image
                        console.log(prodImage.name);
                        gpath = path + 'gallery/' + prodImage.name;
                        let status = prodImage.mv(gpath);
                        if (status != "") {
                            console.log("Upload Thumbnail Image");
                            //thumbs images
                            let thumbsPath = path + 'thumbs/' + prodImage.name;
                            console.log(gpath);
                            console.log(thumbsPath);
                            imageResize(gpath, thumbsPath);

                            // Jimp.read(gpath)
                            //     .then(gpic => {
                            //         return gpic
                            //             .resize(100, 100)
                            //             .quality(80)
                            //             .write(thumbsPath);
                            //     }).catch(err => {
                            //         console.error(err);
                            //         return null;
                            //     });
                        }
                    });
                } else {
                    gpath = path + 'gallery/' + productImage.name;
                    let thumbsPath = path + 'thumbs/' + productImage.name;
                    let status = productImage.mv(gpath);
                    imageResize(gpath, thumbsPath);
                }
            } else {
                //no Image
                imageFile = 'public/image/noimage.png';
                let noimage = await readFile('public/image/noimage.png');
                if (noimage) {
                    let writeimage = await writeFile(`public/product_images/${id}/gallery/noimage.jpg`, noimage);
                    let writeThumbImage = await writeFile(`public/product_images/${id}/thumbs/noimage.jpg`, noimage);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

function imageResize(galleryPath, thumbsPath) {
    //UPLOAD TO GALLERY & thumbs
    console.log(galleryPath +'\n'+ thumbsPath);
    Jimp.read(galleryPath)
        .then(gpic => {
            return gpic
                .resize(100, 100)
                .quality(80)
                .write(thumbsPath);
        }).catch(err => {
            console.error(err);
            return null;
        });

}