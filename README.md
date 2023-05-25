# Welcome to onTrack!

![onTrack Logo](https://res.cloudinary.com/dd9tj642b/image/upload/v1684776516/dev_setups/gorshqba6lswhzymq9ag.png)

onTrack is a platform designed for career development, catering to both recruiters and applicants. It provides a space for job seekers to showcase their CVs and enables employers to post job vacancies.

Members, including recruiters and job seekers, can create profiles and connect with each other in an online social network that mirrors real-world professional relationships.

## Key Features

- Job search functionality with filters for experience, skills, and location.
- Recruiters can create a track for the entire admission process, including questionnaires and software and hardware interviews.
- Transparent and easily manageable admission process on a single platform.
- Real-time chat functionality enabling seamless communication between recruiters and applicants during the interview tracking process.
- Integrated Google Maps feature for applicants to easily find vacancies based on location and for recruiters to locate potential candidates through the use of Google Maps.
- Convenient calendar displaying all upcoming events related to each member's track.
- User-friendly authorization system, allowing sign-in with Google or GitHub accounts for enhanced security.

Watch a video demonstration of onTrack: [![Video Thumbnail](https://img.youtube.com/vi/fYx8kvLRzPo/0.jpg)](https://www.youtube.com/watch?v=fYx8kvLRzPo)

## APIs and Environment File Setup

Before proceeding, you will need to acquire API keys and information from the following suppliers: Google APIs, Claudianry, Judge0.

### Client Environment File Setup

In the `/client` folder, create a file called `.env`:

```bash
touch .env
```

Add the following variables to your client .env file:
```
VITE_MAPS_KEY=your_google_api_key_for_google_maps
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_REDIRECT_URI=your_redirect_uri_after_being_logged_in_with_google
VITE_RAPIDAPI_HOST=your_judge0_host
VITE_RAPIDAPI_KEY=your_judge0_key
```

### Server Environment File Setup

(Create a PostgreSQL profile if you don't have one and create the database in your profile)

Image database is Cloudinary:
Create your profil if you don't have one. You can follow this tutorial if you don't know how to do:
https://cloudinary.com/documentation/how_to_integrate_cloudinary#:~:text=You%20can%20sign%20up%20for%20Cloudinary%20using%20an%20email%20address,set%20your%20account%20as%20active.

In the `/server` folder, create another file called `.env`:

```bash
touch .env
```

Add the following variables to your server `.env` file:


```
DATABASE_URL=postgresql://YOUR_PROFILE_NAME:YOUR_PASSWORD@localhost:PORT/DB_NAME
PORT=3000
CLIENT_ID=?
CLIENT_SECRET=?
MAPS_KEY=your_google_api_key_for_google_maps
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAPIDAPI_HOST=your_judge0_host
RAPIDAPI_KEY=your_judge0_key
```
The **Back-End** is built using Node.js with Express.js, and PostgreSQL is used for the database with Prisma as the ORM.

To start the server:

```bash
cd server
npm i
nodemon index.js
```
For using the **Prisma ORM**, the following commands can be useful:

```bash
npx prisma generate
npx prisma migrate dev 
npx prisma studio
```
If the schemas are changed, running npx prisma migrate dev will reset the database.

The **Front-End** is created in Vite.js. To start it, navigate to the "client" folder:

```bash
cd client
npm i
npx tailwindcss
npm run dev
```
