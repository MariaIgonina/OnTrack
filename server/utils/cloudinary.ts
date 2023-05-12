import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name: "dd9tj642b",
    api_key: "877737478262454",
    api_secret: "utwxortokLEMnYoPg-crVKDpSAI"
})

export { cloudinary }
