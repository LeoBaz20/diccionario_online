import {
    Typography,
    IconButton,
  } from "@material-tailwind/react";
  
  
  const CURRENT_YEAR = new Date().getFullYear();
  const LINKS = ["Empresa", "Sobre Nosotros", "Equipos"];
  
  export function Footer() {
    return (
      <footer className="pb-5 p-10 md:pt-10 bg-blue-800">
        <div className="container flex flex-col mx-auto">
          <div className="flex flex-col md:flex-row items-center !justify-between">
            <Typography
              as="a"
              target="_blank"
              variant="h6"
              className="text-white"
            >
              DevTeam G2
            </Typography>
            <ul className="flex justify-center my-4 md:my-0 w-max mx-auto items-center gap-4">
              {LINKS.map((link, index) => (
                <li key={index}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="white"
                    className="font-normal !text-white hover:!text-gray-900 transition-colors"
                  >
                    {link}
                  </Typography>
                </li>
              ))}
            </ul>
            <div className="flex w-fit justify-center gap-2">
              <IconButton size="sm" color="white" variant="text">
                <i className="fa-brands fa-twitter text-lg" />
              </IconButton>
              <IconButton size="sm" color="white" variant="text">
                <i className="fa-brands fa-youtube text-lg" />
              </IconButton>
              <IconButton size="sm" color="white" variant="text">
                <i className="fa-brands fa-instagram text-lg" />
              </IconButton>
              <IconButton size="sm" color="white" variant="text">
                <i className="fa-brands fa-github text-lg" />
              </IconButton>
            </div>
          </div>
          <Typography
            color="white"
            className="text-center mt-12 font-normal !text-white"
          >
            &copy; {CURRENT_YEAR} Derechos Reservados - DevTeam G2
            .
          </Typography>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  