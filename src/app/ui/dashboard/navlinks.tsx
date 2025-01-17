'use client';

import {
  BeakerIcon,
  BookOpenIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

const links = [
  {
    name: "Heat Map",
    href: "/dashboard/heatmap",
    icon: BeakerIcon,
  },
  {
    name: "Cluster Map",
    href: "/dashboard/clustermap",
    icon: BookOpenIcon,
  },
  {
    name: "Residents",
    href: "/dashboard/residents",
    icon: HomeModernIcon,
  },
];
export const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <div className="flex m-1 w-full md:w-auto" key={link.name}>
            <Link
              href={link.href}
              key={link.name}
              className={clsx('flex justify-center md:justify-start md:items-center p-2 bg-gray-100 w-full hover:bg-gray-300 rounded-sm', {'bg-blue-800 text-gray-100 hover:bg-blue-800': pathname === link.href})}
            >
              <LinkIcon className="md:h-8 h-6" />
              <p className="hidden md:block pl-2">{link.name}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
};
