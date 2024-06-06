"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { HeartIcon, HomeIcon, SearchIcon, UserCircle2Icon } from "lucide-react";

import PocketBase from "pocketbase";
import { ModeToggle } from "./mode-toggle";

const pb = new PocketBase("https://pantry-pal.pockethost.io");
pb.autoCancellation(false);
function Nav() {
  let user = JSON.parse(localStorage.getItem("pocketbase_auth") || "{}");
  console.log(user.model.avatar);
  let avatarURL = pb.files.getUrl(user.model, user.model.avatar);
  console.log(avatarURL);
  return (
    <>
      <div className="p-4 absolute top-0 w-dvw flex justify-end items-center">
          <ModeToggle />
      </div>
      <div className='hidden md:flex'>SIDE</div>
      <div className='md:hidden absolute bottom-0 w-dvw flex justify-evenly items-center bg-secondary rounded-t-lg p-4'>
        <div className='flex flex-col items-center'>
          <Button asChild variant={"link"} size={"icon"}>
            <Link href='/'>
              <HomeIcon />
            </Link>
          </Button>
        </div>
        <div className='flex flex-col items-center'>
          <Button asChild variant={"link"} size={"icon"}>
            <Link href='/pantry'>
              <SearchIcon />
            </Link>
          </Button>
        </div>
        <div className='flex flex-col items-center'>
          <Button asChild variant={"link"} size={"icon"}>
            <Link href='/saved'>
              <HeartIcon />
            </Link>
          </Button>
        </div>
        <div className='flex flex-col items-center'>
          <Button asChild variant={"link"} size={"icon"}>
            <Link href='/account'>
              {user.model.avatar ? (
                <img src={avatarURL} className='w-8 h-8 rounded-full' />
              ) : (
                <UserCircle2Icon />
              )}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Nav;
