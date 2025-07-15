"use client";

import { useProfileTabs } from "@/app/components/hooks/UseProfileTabs";
import UserTabs from "@/app/components/layout/UserTabs";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type MenuItemProps = {
  _id?: string;
  image: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
};

const MenuItemsPage = () => {
  const { data: isAdmin, loading: profileLoading } = useProfileTabs();
  const [menuItems, setMenuitems] = useState<MenuItemProps[]>([]);

  function fetchMenuItems() {
    fetch("/api/menu-item").then((res) => {
      res.json().then((result) => {
        setMenuitems(result);
      });
    });
  }

  useEffect(() => {
    fetchMenuItems();
  }, []);

  console.log(menuItems);

  if (profileLoading) {
    return "Loading Profile ...";
  }

  return (
    <>
      {isAdmin && (
        <div className="mt-8">
          <UserTabs isAdmin={isAdmin} />
          <h1 className="text-2xl font-bold mb-4">Menu Items</h1>
          <p className="mb-6">
            Explore our delicious menu items, crafted with care and quality
            ingredients.
          </p>
          <div>
            <Link
              href={"/pages/menu-items/create-menu"}
              className="flex w-fit px-3 py-2 bg-primary text-white rounded-sm font-medium gap-2 my-3"
            >
              Create New Menu <ArrowRightCircle />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {/* Example menu item cards */}
            {menuItems.map((item, index) => (
              <div
                key={index}
                className=" flex flex-col bg-white p-4 rounded-lg  shadow hover:shadow-lg transition-shadow"
              >
                <span className="flex justify-between text-lg font-semibold mb-2 ">
                  <h2>{item.itemName}</h2>
                  <h2 className="bg-primary py-1 px-2 text-white rounded-full">
                    $ {item.itemPrice}
                  </h2>
                </span>
                <div className="relative max-w-md h-48 rounded-sm">
                  <Image
                    src={item.image}
                    alt={item.itemName}
                    fill
                    quality={80}
                  />
                </div>

                <div className="grow">
                  <p className="text-gray-600 my-2">{item.itemDescription}</p>
                </div>
                <div className="mt-4">
                  <Link
                    href={"/pages/menu-items/edit/" + item._id}
                    className="rounded-full bg-primary py-2 px-3 text-white"
                  >
                    {" "}
                    Edit Menu{" "}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemsPage;
