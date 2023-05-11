import { Request, Response } from "express";
import { Applicant, Recruiter, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getGoogleUserInfo = async (req: Request, res: Response) => {
  console.log(req.body)
  const userInfo: any = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      'Authorization': `Bearer ${req.body.token}`
    }
  })
    .then(data => data.json())
    .then(data => {
      //extra step to check the data
      console.log('userInfo from BE: ', data);
      return data;
    })
    .catch(e => {
      res.status(500).json(e);
    });
  if (!Object.keys(userInfo).length) throw new Error('Error getting user info');
  // const newUserRegistered = await registerUser(req.body.applicant, userInfo)
  // newUserRegistered ? res.status(200).json(newUserRegistered) : THE LINE BELOW;
  res.status(200).send(userInfo)
}

// Check if the user is already registered in the app, if not register it
const registerUser = async (applicantUser: Boolean, userInfo: any) => {
  try {
    if (applicantUser) {
      const applicantExists = await prisma.applicant.findUnique({
        where: {
          idAuth: userInfo.sub
        }
      })
      if (!applicantExists) {
        const newApplicant = {
          "idAuth": userInfo.sub,
          "email": userInfo.email,
          "picture": userInfo.picture || '',
          "name": userInfo.given_name || userInfo.name || 'Applicant',
        }
        const registeredUser = await prisma.applicant.create({
          data: newApplicant
        });
        return registeredUser;
      } else return null
    } else {
      const recruiterExists = await prisma.applicant.findUnique({
        where: {
          idAuth: userInfo.sub
        }
      })
      if (!recruiterExists) {
        const newRecruiter = {
          "idAuth": userInfo.sub,
          "email": userInfo.email,
          "picture": userInfo.picture || '',
          "recruiterName": userInfo.given_name || userInfo.name || 'Recruiter',
        }
        const registerdRecruiter = await prisma.recruiter.create({
          data: newRecruiter
        })
        return registerdRecruiter;
      } else return
    }

  } catch (error) {
    console.log('BE error registering new user', error);
    return null
  }
}

export const googleApiAuth = {
  getGoogleUserInfo
}