const path = require('path');

const {v4:uuidv4} = require('uuid');

const uploadFile = (files, extensionsAllowed = ['png', 'jpg', 'jpeg', 'gif'], folder='') => {

    return new Promise((resolve, reject) => {
        
        const { file } = files;
        const nameSlice = file.name.split('.');
        const extension = nameSlice[nameSlice.length - 1];

        //Validate extensions
        if (!extensionsAllowed.includes(extension)) {
            return reject(`Extension ${extension} is not allowed - Extensions Allowed: ${extensionsAllowed}`)
        }


        const nameTemp = `${uuidv4()}.${extension}`
        const uploadPath = path.join( __dirname, '../uploads/',folder,nameTemp);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nameTemp)
        });
    });

}




module.exports = {
    uploadFile
}