import { FaGithub } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="py-3 bg-base-200 text-center text-sm neutral-content stat-desc shadow-md">
      <p>© {new Date().getFullYear()} Benchi CHEN. Tous droits réservés.</p>
      <p className="flex items-center justify-center">
        Made with React, Typescript, Redux, Recharts, DaisyUI ( Tailwind ),
        Shadcn, hosted on
        <a
          className="inline-flex items-center px-2"
          href="https://github.com/Yunight/react-finance"
        >
          <FaGithub className="mx-1" />
        </a>
        and deployed on
        <span className="inline-flex items-center px-2">
          <IoLogoVercel className="mx-1" />
        </span>
      </p>
    </footer>
  );
};

export default Footer;
