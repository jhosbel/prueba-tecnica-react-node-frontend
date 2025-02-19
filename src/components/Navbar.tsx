import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-[#333] p-4 text-white absolute top-0 left-0 w-full">
      <div className="container mx-auto flex justify-center gap-[5rem]">
        <Link to="/" className="font-bold">
          Artículos
        </Link>
        <Link to="/special-prices" className="font-bold">
          Precios Especiales
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
