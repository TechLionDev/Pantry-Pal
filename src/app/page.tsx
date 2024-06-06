"use client";

import { useEffect, useState } from "react";
import { getAuthedUser, isAuthed } from "./auth/actions";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
const pb = new PocketBase("https://pantry-pal.pockethost.io");
pb.autoCancellation(false);

function HomePage() {
  const [authed, setAuthed] = useState(false);
  const [authCookie, setAuthCookie] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      let authed = await isAuthed();
      setAuthed(authed);
      if (authed) {
        let cookie = await getAuthedUser();
        setAuthCookie(cookie);
      } else {
        router.push("/auth");
      }
    })();
  }, []);
  if (authCookie) {
    pb.authStore.loadFromCookie(JSON.stringify(authCookie));
    pb.authStore.save(authCookie.token, authCookie.model);
  }
  return (
    <>
      <div className='flex items-center justify-center p-8'>
        <div className='flex flex-col items-center'>
          <h1 className='text-3xl font-bold'>Welcome to Pantry Pal</h1>
          <h2 className='text-xl'>
            Your personal pantry assistant
          </h2>
        </div>
      </div>
    </>
  );
}

export default HomePage;
