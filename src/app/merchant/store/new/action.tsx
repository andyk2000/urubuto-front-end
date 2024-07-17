"use server";

import axiosConfig from "@/api.config/axios.config";
import { unstable_noStore as noStore } from "next/cache";
// import { redirect } from "next/navigation";
import { NewStore } from "@/app/types/store.type";
import { redirect } from "next/navigation";

const createStore = async (store: NewStore) => {
  try {
    const response = await axiosConfig.post("/store/", store);
    noStore();
    console.log(true);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

const navigateStorePage = () => {
  redirect("/merchant/store");
};

export { createStore, navigateStorePage };