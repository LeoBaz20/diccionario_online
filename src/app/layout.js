import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components";
import { Layout } from "@/components/Layout"


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "DiccionarioWEB",
  description: "Diccionario Multilenguaje",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
    <head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </head>
    <body className={roboto.className} >
        <Navbar/>
        <main>{children}</main>
    </body>
  </html>
  );
}
