"use client";

import { useEffect, useState } from "react";
import MenuItem from "../components/menu/MenuItem";
import SectionHeaders from "../components/menu/SectionHeaders";

type CatProps = {
  _id?: string;
  name: string;
};

type MenuItemProps = {
  _id?: string;
  image: string;
  itemName: string;
  itemDescription: string;
  itemCategoryId: string;
  itemPrice: number;
};

const MenuPages = () => {
  const [categories, setCategories] = useState<CatProps[]>([]);
  const [menuitems, setMenuItems] = useState<MenuItemProps[]>([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((cat) => {
        setCategories(cat);
      });
    });
  }, []);
  useEffect(() => {
    fetch("/api/menu-item").then((res) => {
      res.json().then((menus) => {
        setMenuItems(menus);
      });
    });
  }, []);

  return (
    <section className="mt-8">
      <div className="text-center">
        {categories.length > 0 &&
          categories.map((cats) => (
            <div key={cats._id} className="mt-8">
              <SectionHeaders mainHeader={cats.name} />
              <div className="grid grid-cols-3 gap-4">
                {menuitems
                  .filter((menus) => menus.itemCategoryId === cats._id)
                  .map((menu) => (
                    <>
                      <MenuItem {...menu} />
                    </>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default MenuPages;
