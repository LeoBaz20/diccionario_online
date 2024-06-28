// components
import { authConfig } from "@/lib/auth";
import {  Signup} from "../../components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// sections

export default async function Campaign() {
  
  return (
    <>
      <ToastContainer/>
      <Signup/>
    </>
  );
}
