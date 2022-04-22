import multer from "multer";

export const upload = multer({
    dest:"temp",
    fileFilter: (req,file,cb) => {
        const allowed = ["image/png", "image/jpg", "image/jpeg"]
        cb(null, allowed.includes(file.mimetype))
    },
    limits: {fieldSize: 2000000}
})

