import { Link } from "react-router-dom";

const Navbar = ({ link1 }) => {
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
