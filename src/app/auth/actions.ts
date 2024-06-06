"use server";
type FormState = {
  message: string;
};
import { redirect } from "next/navigation";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";

export const authUser = async (formState: FormState, formData: FormData) => {
  let usernameOrEmail = formData.get("usernameOrEmail") as string;
  let password = formData.get("password") as string;
  const pb = new PocketBase("https://pantry-pal.pockethost.io");
  pb.autoCancellation(false);
  console.log(usernameOrEmail, typeof usernameOrEmail);
  console.log(password, typeof password);

  try {
    const { token, record: model } = await pb
      .collection("users")
      .authWithPassword(usernameOrEmail, password);

    const cookie = JSON.stringify({ token, model });

    cookies().set("pb_auth", cookie, {
      secure: true,
      path: "/",
      sameSite: "strict",
      httpOnly: true
    });

    console.log(cookie);
    return {
      message: "Logged In User!",
      type: "success"
    };
  } catch (error:any) {
    // get all keys of error.data and join them with a comma
    let messageKeys = Object.keys(error.data.data).join(", ");
    //  for each key, get its message attr and join them with a comma
    let messages = Object.keys(error.data.data)
      .map((key) => error.data.data[key].message)
      .join(", ");
    // for each message prefix it with {KEY}: {MESSAGE}
    messages = Object.keys(error.data.data)
      .map((key) => `${key}: ${error.data.data[key].message}`)
      .join(", ");
    console.log(messages);
    return {
      message: messages,
      type: "error"
    };
  }
};

export const isAuthed = async () => {
  const cookie = cookies().get("pb_auth");
  if (!cookie) {
    return false;
  }
  console.log(cookie);
  const pb = new PocketBase("https://pantry-pal.pockethost.io");
  pb.autoCancellation(false);
  pb.authStore.loadFromCookie(cookie.value);
  pb.authStore.save(
    JSON.parse(cookie.value).token,
    JSON.parse(cookie.value).model
  );
  console.log(pb.authStore);
  return true;
};

export const getAuthedUser = async () => {
  const cookie = cookies().get("pb_auth");
  if (!cookie) {
    return null;
  }
  return JSON.parse(cookie.value);
};

export const createUser = async (formState: FormState, formData: FormData) => {
  let username = formData.get("username") as string;
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  const pb = new PocketBase("https://pantry-pal.pockethost.io");
  pb.autoCancellation(false);
  console.log(username, typeof username);
  console.log(email, typeof email);
  console.log(password, typeof password);

  try {
    const { token, record: model } = await pb.collection("users").create({
      username,
      email,
      password,
      passwordConfirm: password
    });

    const cookie = JSON.stringify({ token, model });

    cookies().set("pb_auth", cookie, {
      secure: true,
      path: "/",
      sameSite: "strict",
      httpOnly: true
    });

    console.log(cookie);
    return {
      message: "User Created!",
      type: "success"
    };
  } catch (error:any) {
    // get all keys of error.data and join them with a comma
    let messageKeys = Object.keys(error.data.data).join(", ");
    //  for each key, get its message attr and join them with a comma
    let messages = Object.keys(error.data.data)
      .map((key) => error.data.data[key].message)
      .join(", ");
    // for each message prefix it with {KEY}: {MESSAGE}
    messages = Object.keys(error.data.data)
      .map((key) => `${key}: ${error.data.data[key].message}`)
      .join(", ");
    console.log(messages);
    return {
      message: messages,
      type: "error"
    };
  }
};
