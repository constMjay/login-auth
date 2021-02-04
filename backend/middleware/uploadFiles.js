const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './frontend/assets/upload')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname)
    }
})
const upload = () => {
    const uploadStorage = multer({ storage: storage })
    return uploadStorage.single('articleImage');
}
const uploadFiles = upload();
module.exports = uploadFiles