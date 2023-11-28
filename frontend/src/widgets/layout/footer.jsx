import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
        Copyright &copy; {year}, &#160; 
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-900 font-bold"
          >
            { brandName}
          </a>{" "}
          All rights reserved.
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-900"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Brandon Rv.",
  brandLink: "https://github.com/BrandonRv",
  routes: [
    { name: "Brandon Rv", path: "https://github.com/BrandonRv" },
    { name: "About Us", path: "https://www.linkedin.com/in/brandon-rivera-179a2bb6/" },
    { name: "Blog", path: "https://www.youtube.com/channel/UCgrE8sm9mUc3h1RK4C06o5w" },
    { name: "License", path: "https://github.com/BrandonRv" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
