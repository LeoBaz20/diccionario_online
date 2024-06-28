import { authConfig } from "@/lib/auth";
import Signin from "@/components/signin/signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// sections

export default async function Campaign() {

  return (
    <>
      <Signin/>
    </>
  );
}