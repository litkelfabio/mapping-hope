import { GlobeIcon } from "./globeIcon";
import Link from "next/link";
import { NavLinks } from "./navlinks";

export const SideNav = () => {
  return (
    <div className="md:m-1">
      <Link href="/dashboard">
        <GlobeIcon />
      </Link>
      <div className="flex flex-row justify-between md:flex-col md:flex-col md:pt-2">
        <NavLinks />
      </div>
    </div>
  );
};
