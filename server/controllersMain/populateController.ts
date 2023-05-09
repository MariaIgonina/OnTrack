import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { msg1, msg2, msg3 } from "../mockData/mockMessage";
import { action1, action2, action3 } from "../mockData/mockAction";
import { vacancy1, vacancy2, vacancy3 } from "../mockData/mockVacancy";

const { stepId: stepId1, ...actionData1 } = action1;
const { stepId: stepId2, ...actionData2 } = action2;
const { stepId: stepId3, ...actionData3 } = action3;

const { trackId: trackId1, ...msgData1 } = msg1;
const { trackId: trackId2, ...msgData2 } = msg2;
const { trackId: trackId3, ...msgData3 } = msg3;

async function populateDatabase() {
  //populate vacancy
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
  //populate action
  try {
    const actionA = await prisma.action.create({
      data: {
        ...actionData1,
        action: { connect: { id: stepId1 } },
      },
    });
  } catch (error) {
    console.log(error);
  }
  const actionB = await prisma.action.create({
    data: {
      ...actionData2,
      action: { connect: { id: stepId2 } },
    },
  });
  const actionC = await prisma.action.create({
    data: {
      ...actionData3,
      action: { connect: { id: stepId3 } },
    },
  });
  //populate messge
  try {
    const msgA = await prisma.message.create({
      data: { ...msgData1, track: { connect: { id: trackId1 } } },
    });
  } catch (error) {
    console.log(error);
  }
  const msgB = await prisma.message.create({
    data: { ...msgData2, track: { connect: { id: trackId2 } } },
  });
  const msgC = await prisma.message.create({
    data: { ...msgData3, track: { connect: { id: trackId3 } } },
  });
}

export { populateDatabase };
