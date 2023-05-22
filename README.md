Welcome to onTrack!
<p>
<img src="./client/src/assets/logo-on-green.png"  height="200" width="400" alt='prepd login screen'>
</p>

onTrack is a website for recruiters and applicants. The platform is used for career development and allows jobseekers to post their CVs and employers to post jobs. 
onTrack allows members (both recruiters and employers) to create profiles and connect with each other in an online social network which may represent real-world professional relationships.
Searching jobs for applicants  and candidates for recruiters can be done using filters by experience, skills and location.
As soon as recruiter creates the vacancy, creates the track of the whole the admission process, including questionnaire, software and hardware interviews. 
Since an applicant applies for a job starts the interaction between both members. The app allows people to go through each of step in one platform which makes the admission process clear and easy to manage. Both members can have as many tracks as they want and reject them in each step. 
The website has convenient calendar showing all the future events for each of member's track. 
onTrack has the very convenient authorisation system that allows users to sign in using their Google or GitHub accounts, and keeps all the information secure.

## **APIs and env file setup:**

Before moving ahead, you will need to accuire API keys and information from the following supliers: Google APIs, Claudianry, Judge0

In the `/client` folder, create a file called .env:

```bash
touch .env
```

Add the following variables to your client .env file:
VITE_MAPS_KEY= your google api key for google maps.

VITE_GOOGLE_CLIENT_ID= your google Cliend Id.

VITE_REDIRECT_URI= your redirect uri after being logged in with Google.

VITE_RAPIDAPI_HOST= your Judge0 host

VITE_RAPIDAPI_KEY= your Judge0 key

In the `/server` folder, create another file called .env:

```bash
touch .env
```

Add the following variables to your server .env file:
(Create your PostgeSQL profile, if you don't have one. Create the database in your profile)

Data base for images is Cloudinary:

Create your cloudinary profil if you don't have one. You can follow this tutorial if you don't know how to do:
https://cloudinary.com/documentation/how_to_integrate_cloudinary#:~:text=You%20can%20sign%20up%20for%20Cloudinary%20using%20an%20email%20address,set%20your%20account%20as%20active.

DATABASE_URL="postgresql://YOUR_PROFILE_NAME:YOUR_PASSWORD@localhost:PORT/DB_NAME"

PORT="3000"

CLIENT_ID= ?

CLIENT_SECRET=?

MAPS_KEY=Google api key for Google Maps

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

RAPIDAPI_HOST=Judge0 host

RAPIDAPI_KEY= Judge0 key

The back-end is build using Node.js with ExpressJS and PostgreSQL for the database with Prisma as ORM.

To start the server:

```bash
cd server
npm i
nodemon index.js
```


Front-end is created in ViteJS. To start it go to the folder "client":

```bash
cd client
npm i
npx tailwindcss
npm run dev
```

1. Run "npm i" in your terminal
  
2. Go to the website https://developers.google.com/maps/documentation/javascript/cloud-setup and genetate your secret key for using Google maps API. Create the .env file and paste your key there: XAVI ADD THIS!
  
3. ADDITIONAL KEYS - XAVI, ROSIE
  
4. npm start (to run React App)