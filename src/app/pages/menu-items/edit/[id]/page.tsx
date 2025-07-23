"use client";

import { useProfileTabs } from "@/app/components/hooks/UseProfileTabs";
import ConfirmDelete from "@/app/components/layout/ConfirmDelete";
import EditImage from "@/app/components/layout/EditImage";
import UserTabs from "@/app/components/layout/UserTabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircle, Loader } from "lucide-react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const itemSchema = z.object({
  itemName: z
    .string()
    .min(4, { message: "Item name must be more the than four letters" })
    .optional(),
  itemDescription: z
    .string()
    .min(10, { message: "Description is too short" })
    .optional(),
  itemPrice: z
    .number()
    .min(1, { message: "Price should not be empty" })
    .optional(),
  itemCategory: z.string().optional(),

  // file: z.string(),
});
type MenuItemProps = {
  _id?: string;
  image: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemCategory: string;
  itemCategoryId?: string;
};

type CategoryProps = {
  _id: string | null;
  name: string | null;
};

type FormData = z.infer<typeof itemSchema>;

const EditMenuPages = () => {
  const { data: isAdmin, loading: profileLoading } = useProfileTabs();
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [redirectToMenu, setRedirectToMenu] = useState(false);
  const [menuItems, setMenuitems] = useState<MenuItemProps>();
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  function fetchMenuItems() {
    fetch("/api/menu-item").then((res) => {
      res.json().then((items) => {
        const item = items.find((i: { _id: string }) => i._id === id);
        setMenuitems(item);
        console.log(item);
      });
    });
  }

  useEffect(() => {
    fetchMenuItems();
    // react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      itemName: menuItems?.itemName,
      itemDescription: menuItems?.itemDescription,
      itemPrice: menuItems?.itemPrice,
      itemCategory: menuItems?.itemCategoryId,
    },
  });

  useEffect(() => {
    if (menuItems) {
      reset({
        itemName: menuItems.itemName,
        itemDescription: menuItems.itemDescription,
        itemPrice: menuItems.itemPrice,
        itemCategory: menuItems.itemCategoryId,
      });
      setImage(menuItems.image || "");
    }
  }, [menuItems, reset]);
  // console.log("image", image);

  async function handleMenuSubmit(data: FormData) {
    setSaving(true);
    const menuDataPromise = new Promise<void>(async (resolve, reject) => {
      const menuData = {
        _id: id,
        image,
        ...data,
      };
      const response = await fetch("/api/menu-item", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData),
      });

      if (response.ok) {
        resolve();
        reset();
        setSaving(false);
      } else reject();
      setSaving(false);
    });

    await toast.promise(menuDataPromise, {
      loading: "Saving Menu Item...",
      success: "Menu Saved!",
      error: "Error Occured!",
    });

    setRedirectToMenu(true);
  }

  async function handleDeleteMenu() {
    const deletePromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/menu-item?_id=" + id, {
        method: "DELETE",
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(deletePromise, {
      loading: "Deleting ...",
      success: "Deleted",
      error: "Error occured During Deleting.",
    });

    setRedirectToMenu(true);
  }

  if (redirectToMenu) {
    return redirect("/pages/menu-items");
  }

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
          <Link
            href={"/pages/menu-items"}
            className="flex w-fit px-3 py-2 bg-primary text-white rounded-sm font-medium gap-2 my-3"
          >
            <ArrowLeftCircle /> Show All Menu
          </Link>
          <div>
            <form
              onSubmit={handleSubmit(handleMenuSubmit)}
              className="max-w-md mx-auto flex flex-col "
              // onSubmit={handleSubmit(handleProfileUpdate)}
            >
              {/* image upload */}

              <EditImage
                link={image}
                setLink={setImage}
                imageUpload={uploadingImage}
                setUploadingImage={setUploadingImage}
              />

              <div>
                <div>
                  <label>Item Name</label>

                  <input
                    type="text"
                    {...register("itemName")}
                    placeholder="Item Name"
                  />
                  {errors.itemName && (
                    <p className="text-red-500">{errors.itemName.message} </p>
                  )}
                  <label>Item Description</label>
                  <input
                    type="text"
                    {...register("itemDescription")}
                    placeholder="Item Description"
                  />
                  {errors.itemDescription && (
                    <p className="text-red-500">
                      {errors.itemDescription.message}{" "}
                    </p>
                  )}
                  <label>Item Category</label>
                  <select {...register("itemCategory")}>
                    {categories?.length > 0 &&
                      categories.map((cat) => (
                        <option key={cat._id} value={cat?._id || ""}>
                          {cat.name}
                        </option>
                      ))}
                  </select>

                  <label>Item Price</label>
                  <input
                    type="number"
                    {...register("itemPrice", {
                      valueAsNumber: true,
                    })}
                    className=""
                    placeholder="Price"
                  />
                  {errors.itemPrice && errors.itemPrice.type.length < 1 && (
                    <p className="text-red-500">{errors.itemPrice.message} </p>
                  )}
                  <div className="flex gap-2">
                    <button type="submit" className="mt-4">
                      {" "}
                      {saving && (
                        <Loader className="text-white animate-spin mr-1" />
                      )}
                      Save
                    </button>
                    {/* <button
                      type="button"
                      className="gap-2 mt-4"
                      onClick={() => {
                        handleDeleteMenu();
                      }}
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button> */}
                    <ConfirmDelete onDelete={handleDeleteMenu} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditMenuPages;
