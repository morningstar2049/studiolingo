"use client";
import PocketBase from "pocketbase";
import { TStudentRegistrationForm } from "../components/StudentRegistration/types";

async function addToPocketBase(studentData: TStudentRegistrationForm) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const readyToSendData: TStudentRegistrationForm = {
    ...studentData,
    acceptRules: !!studentData.acceptRules,
    online: !!studentData.online,
    engBox: !!studentData.engBox,
    chinaBox: !!studentData.chinaBox,
    gerBox: !!studentData.gerBox,
    rusBox: !!studentData.rusBox,
  };
  console.log(readyToSendData);
  await pb.collection("test_registered_students").create(readyToSendData);
}

function useRegisterStudent() {
  return async (studentData: TStudentRegistrationForm) => {
    await addToPocketBase(studentData);
  };
}

export default useRegisterStudent;
