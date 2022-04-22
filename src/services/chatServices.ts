import sharp from "sharp"
import { unlink } from "fs/promises"

class chatServices {
   async avatarUploadService (file:any, userEmail: any) {
     const locate = JSON.parse(userEmail)
       await sharp(file.path)
        .resize(500)
        .toFormat("jpeg")
        .toFile(`./public/media/users/avatar/Avatar-${locate}.jpg`)

      await  unlink(file.path)
      return (`Avatar-${locate}.jpg`)
    }
  }

export default new chatServices