import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { msg1, msg2, msg3 } from "../mockData/mockMessage";
// import { action1, action2, action3 } from "../mockData/mockAction";
import { vacancy1, vacancy2, vacancy3 } from "../mockData/mockVacancy";
import { track1, track2, track3, track4 } from "../mockData/mockTracks";
import { guillaume, paola, xavi } from "../mockData/mockApplicants";
import {
  Questionnary1,
  Questionnary2,
  Questionnary3,
} from "../mockData/mockQuestionnary";
import { recruiter1, recruiter2, recruiter3 } from "../mockData/mockRecruiter";
import { step1, step2, step3 } from "../mockData/mockStep";

// const { stepId: stepId1, ...actionData1 } = action1;
// const { stepId: stepId2, ...actionData2 } = action2;
// const { stepId: stepId3, ...actionData3 } = action3;

const { trackId: trackId1, ...msgData1 } = msg1;
const { trackId: trackId2, ...msgData2 } = msg2;
const { trackId: trackId3, ...msgData3 } = msg3;

async function populateDatabase() {
  //applicant
  try {
    const applicantA = await prisma.applicant.create({ data: { ...xavi } });
  } catch (error) {
    console.log(error);
  }
  const applicantB = await prisma.applicant.create({ data: { ...guillaume } });
  const applicantC = await prisma.applicant.create({ data: { ...paola } });
  // recruiter
  try {
    const recruiterA = await prisma.recruiter.create({
      data: { ...recruiter1 },
    });
  } catch (error) {
    console.log(error);
  }
  const recruiterB = await prisma.recruiter.create({
    data: { ...recruiter2 },
  });
  const recruiterC = await prisma.recruiter.create({
    data: { ...recruiter3 },
  });
  //populate
  try {
    const vacancyA = await prisma.vacancy.create({
      data: {
        ...vacancy1.data,
        recruiter: { connect: { id: vacancy1.recruiterId } },
      },
    });
  } catch (error) {
    console.log(error);
  }
  const vacancyB = await prisma.vacancy.create({
    data: {
      ...vacancy2.data,
      recruiter: { connect: { id: vacancy2.recruiterId } },
    },
  });
  const vacancyC = await prisma.vacancy.create({
    data: {
      ...vacancy3.data,
      recruiter: { connect: { id: vacancy3.recruiterId } },
    },
  });
  // track
  try {
    const trackA = await prisma.track.create({
      data: {
        ...track1.data,
        Recruiter: { connect: { id: track1.recruiterID } },
        Applicant: { connect: { idDB: track1.applicantID } },
        Vacancy: { connect: { id: track1.vacancyId } },
      },
    });
  } catch (error) {
    console.log(error);
  }

  const trackB = await prisma.track.create({
    data: {
      ...track2.data,
      Recruiter: { connect: { id: track2.recruiterID } },
      Applicant: { connect: { idDB: track2.applicantID } },
      Vacancy: { connect: { id: track2.vacancyId } },
    },
  });
  const trackC = await prisma.track.create({
    data: {
      ...track3.data,
      Recruiter: { connect: { id: track3.recruiterID } },
      Applicant: { connect: { idDB: track3.applicantID } },
      Vacancy: { connect: { id: track3.vacancyId } },
    },
  });
  const trackD = await prisma.track.create({
    data: {
      ...track4.data,
      Recruiter: { connect: { id: track4.recruiterID } },
      Applicant: { connect: { idDB: track4.applicantID } },
      Vacancy: { connect: { id: track4.vacancyId } },
    },
  });
  // messge
  try {
    const msgA = await prisma.message.create({
      data: {
        ...msgData1,
        date: new Date(msgData1.date),
        track: { connect: { id: trackId1 } },
      },
    });
  } catch (error) {
    console.log(error);
  }
  const msgB = await prisma.message.create({
    data: {
      ...msgData2,
      date: new Date(msgData2.date),
      track: { connect: { id: trackId1 } },
    },
  });
  const msgC = await prisma.message.create({
    data: {
      ...msgData3,
      date: new Date(msgData3.date),
      track: { connect: { id: trackId1 } },
    },
  });
  //step
  try {
    const stepA = await prisma.step.create({
      data: { ...step1.data, Track: { connect: { id: step1.trackId } } },
    });
  } catch (error) {
    console.log(error);
  }
  const stepB = await prisma.step.create({
    data: { ...step2.data, Track: { connect: { id: step2.trackId } } },
  });
  const stepC = await prisma.step.create({
    data: { ...step3.data, Track: { connect: { id: step3.trackId } } },
  });

  //questionnary
  try {
    const questionA = await prisma.questionary.create({
      data: {
        ...Questionnary1.data,
        Step: { connect: { id: Questionnary1.stepId } },
      },
    });
  } catch (error) {
    console.log(error);
  }
  const questionB = await prisma.questionary.create({
    data: {
      ...Questionnary2.data,
      Step: { connect: { id: Questionnary2.stepId } },
    },
  });
  const questionC = await prisma.questionary.create({
    data: {
      ...Questionnary3.data,
      Step: { connect: { id: Questionnary3.stepId } },
    },
  });

  //populate action
  //   try {
  //     const actionA = await prisma.action.create({
  //       data: {
  //         ...actionData1,
  //         action: { connect: { id: stepId1 } },
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   const actionB = await prisma.action.create({
  //     data: {
  //       ...actionData2,
  //       action: { connect: { id: stepId2 } },
  //     },
  //   });
  //   const actionC = await prisma.action.create({
  //     data: {
  //       ...actionData3,
  //       action: { connect: { id: stepId3 } },
  //     },
  //   });
}

export { populateDatabase };
