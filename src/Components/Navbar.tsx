import { Link } from "react-router-dom";

type NavbarProps = {
  link1?: string;
};

const Navbar = ({ link1 }: NavbarProps) => {
  return (
    <nav className="crumbs">
      <ol>
        <li className="crumb">
          <Link to="/">Home</Link>
        </li>
        {link1 && <li className="crumb crumb-arroy">{link1}</li>}
      </ol>
    </nav>
  );
};

export default Navbar;
