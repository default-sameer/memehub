const env = process.env.NODE_ENV



let BASE_URL : string

if (env == "development") {
    BASE_URL = "http://localhost:3000";
} else if (env == "production") {
    BASE_URL = "https://memehub.vercel.app";
}
const cloudinary =`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/v1652332830/`

export {BASE_URL, cloudinary}