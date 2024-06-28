"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, Input, Button, Alert } from "../MaterialTailwind";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";

export function Signin() {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const signInResponse = await signIn("credentials",{
      email,
      password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error){
      router.push("/");
    }else{
      console.log("Error: ", signInResponse.error);
      setError("Tu correo o contraseña están incorrectos.");
    }

  };

  return (
    <section
      className="grid text-center h-screen items-center p-8"
      style={{
        background: "linear-gradient(180deg, #3d6cb4, #152a3e)", // Degradado de colores
      }}
    >
      <div className="bg-white rounded-lg p-8 mx-auto max-w-[24rem]">
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Iniciar Sesión
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Ingrese su correo y contraseña para iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:opacity-100"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Contraseña
              </Typography>
            </label>
            <Input
              id="password"
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:opacity-100"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <Alert color="red">
              {error}
            </Alert>
          )}
          <Button color="gray" size="lg" className="mt-6" fullWidth type="Submit"
          >
            Iniciar Sesión
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Olvide mi contraseña
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Sin Registro?{" "}
            <a href="/signup" className="font-medium text-gray-900">
              Registrarse
            </a>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Signin;
