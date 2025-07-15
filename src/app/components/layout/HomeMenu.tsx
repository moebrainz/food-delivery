"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "../menu/SectionHeaders";

type MenuItemProps = {
  _id?: string;
  image: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
};

const HomeMenu = () => {
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
  return (
    <section className="mt-10">
      <div className="text-center ">
        <div className="absolute left-0 right-0 w-full">
          <div className=" absolute top-15 -z-10 left-0">
            <Image
              src={"/images/fd-2.jpg"}
              alt="food-delivery"
              width={"150"}
              height={"100"}
              className="rounded-full"
            />
          </div>
          <div className=" absolute right-0 top-15 -z-10">
            <Image
              src={"/images/fd-2.jpg"}
              alt="food-delivery"
              width={"150"}
              height={"100"}
              className="rounded-full"
            />
          </div>
        </div>
        <SectionHeaders subHeader="Check out" mainHeader="Menu" />
        <div className="grid grid-cols-3 gap-4 ">
          {menuItems.length > 0 &&
            menuItems.map((menu) => <MenuItem key={menu._id} {...menu} />)}
          {/* <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem /> */}
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
