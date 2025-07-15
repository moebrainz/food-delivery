"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const UserTabs = ({ isAdmin }: { isAdmin: boolean }) => {
  const path = usePathname();
  // console.log("path", path);

  return (
    <div className="flex justify-center items-center mb-4 tabs">
      {isAdmin && (
        <>
          <Link
            href={"/pages/profile"}
            className={path === "/pages/profile" ? "active" : ""}
          >
            Profile
          </Link>
          <Link
            href={"/pages/categories"}
            className={path === "/pages/categories" ? "active" : ""}
          >
            Categories
          </Link>

          <Link
            href={"/pages/menu-items"}
            className={path.includes("/pages/menu-items") ? "active" : ""}
          >
            Menu Items
          </Link>
          <Link
            href={"/pages/users"}
            className={path === "/pages/users" ? "active" : ""}
          >
            Users
          </Link>
          <Link
            href={"/pages/orders"}
            className={path === "/pages/orders" ? "active" : ""}
          >
            Orders
          </Link>
        </>
      )}
    </div>
  );
};

export default UserTabs;
