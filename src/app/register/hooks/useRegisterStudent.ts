"use client";
import PocketBase from "pocketbase";

async function addToPocketBase(data: any) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  await pb.collection("test_registered_students").create({
    ...data,
    engBox: !!data.engBox,
    chinaBox: !!data.chinaBox,
    gerBox: !!data.gerBox,
    rusBox: !!data.rusBox,
  });
}

function useRegisterStudent() {
  return async (studentData: any) => {
    await addToPocketBase(studentData);
  };
}

export default useRegisterStudent;
