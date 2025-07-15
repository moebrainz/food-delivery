"use client";

import { useProfileTabs } from "@/app/components/hooks/UseProfileTabs";
import ConfirmDelete from "@/app/components/layout/ConfirmDelete";
import UserTabs from "@/app/components/layout/UserTabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
// import { useSession } from "next-auth/react";

const categoryNameSchema = z.object({
  categoryName: z.string(),
});

type FormData = z.infer<typeof categoryNameSchema>;

type CategoryProps = {
  _id: string | null;
  name: string | null;
};

// Define the type
type CategoryEdit = {
  _id?: string;
  name: string;
};

const CategoriesPage = () => {
  const { data: isAdmin, loading: profileLoading } = useProfileTabs();
  const [saving, setSaving] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState<CategoryEdit | null>(
    null
  );
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategoryList(categories);
      });
    });
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(categoryNameSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  console.log("edited category id", { editCategoryName });

  //get all categories when loading

  async function handleNewCategory(data: FormData) {
    setSaving(true);
    const createCategory = new Promise<void>(async (resolve, reject) => {
      const dataCat: { name: string; _id?: string } = {
        name: data.categoryName,
      };
      console.log("data category id", dataCat);

      if (editCategoryName) {
        dataCat._id = editCategoryName._id;
      }
      const response = await fetch("/api/categories", {
        method: editCategoryName ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataCat),
      });
      //run fetch category function
      fetchCategories();
      setEditCategoryName(null);

      if (response.ok) {
        resolve();
        reset();
        //using optimistic approach to add new cat into the ui
        // setCategoryList((prev) => [...prev, { name: data.categoryName }]);

        // Add the new category to the state
        // setCategoryList(prev => [...prev, data.categoryName]);
        setSaving(false);
      } else reject();
    });
    // const createCategory = fetch("/api/categories", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name: data.categoryName }),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       setSaving(false);
    //     }
    //   })
    //   .catch((error) => {
    //     return error;
    //   });

    await toast.promise(createCategory, {
      loading: editCategoryName
        ? "Updating Category Name..."
        : "Creating New Category ...",
      success: editCategoryName ? "Category Name Updated" : "Category Created!",
      error: "Error Occured!",
    });
  }

  async function handleDeleteCategory(_id: string) {
    const deletePromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
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

    fetchCategories();
  }

  console.log("editname", editCategoryName);

  if (profileLoading) {
    return "Loading Profile ...";
  }

  return (
    <>
      {isAdmin && (
        <div className="mt-8">
          <UserTabs isAdmin={isAdmin} />

          <form onSubmit={handleSubmit(handleNewCategory)}>
            <div className="flex mx-auto  items-end max-w-xl gap-2">
              <div className="grow ">
                <label htmlFor="">
                  {editCategoryName
                    ? `Edit Category Name: ${editCategoryName.name}`
                    : "New Category Name"}
                </label>
                <input
                  type="text"
                  {...register(`categoryName`)}
                  placeholder="Category Name"
                />
              </div>
              <div className="pb-2 flex gap-2">
                <button type="submit">
                  {saving && (
                    <Loader className="text-white animate-spin mr-1" />
                  )}{" "}
                  {editCategoryName ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditCategoryName(null);
                    setValue("categoryName", "");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>

          <h1 className="text-2xl font-bold mb-4">Categories</h1>
          <p className="mb-6">
            Explore our wide range of categories to find the products you love.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example category cards */}
            {categoryList.length > 0 &&
              categoryList.map((cat, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col">
                    <div>
                      <h2 className="text-lg font-semibold mb-2 inline-flex items-center gap-2">
                        {cat?.name} {index + 1}
                        <Edit3
                          className="size-4 cursor-pointer"
                          onClick={() => {
                            setEditCategoryName({
                              name: cat?.name ?? "",
                              _id: cat?._id ?? "",
                            });

                            if (cat?.name) setValue("categoryName", cat?.name);
                          }}
                        />
                      </h2>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Discover a variety of products in this category.
                  </p>
                  <div className="mt-2">
                    {/* <button
                      type="button"
                      className="gap-2"
                      onClick={() => {
                        if (cat._id) handleDeleteCategory(cat._id);
                      }}
                      disabled={!cat._id}
                    >
                      {" "}
                      <Trash2 className="h-4 w-4" /> Delete
                    </button> */}
                    <ConfirmDelete
                      onDelete={() => {
                        if (cat._id) handleDeleteCategory(cat._id);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesPage;
