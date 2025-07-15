//

"use client";

import EditImage from "@/app/components/layout/EditImage";
import UserTabs from "@/app/components/layout/UserTabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const profileSchema = z.object({
  userName: z
    .string()
    .min(4, { message: "Username must be more the longer the four letters" })
    .optional(),
  address: z.string().min(4, { message: "" }).optional(),
  phoneNumber: z
    .string()
    .min(5, { message: "Please enter a valid Phone number" })
    .optional(),
  postalCode: z
    .string()
    .min(4, { message: "Please enter a valid Postal code" })
    .optional(),
  city: z
    .string()
    .min(3, { message: "Please provide a valid city" })
    .optional(),
  country: z
    .string()
    .min(4, { message: "Please provide a valid country" })
    .optional(),
  // file: z.string(),
});

type FormData = z.infer<typeof profileSchema>;

type UserContact = {
  admin?: boolean;
};

const ProfilePage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [image, setImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [userContact, setUserContact] = useState<UserContact>({});

  console.log("data from profile", session);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName: session?.user.name || "",
      phoneNumber: session?.user.phoneNumber || "",
      address: session?.user.address || "",
      postalCode: session?.user.postalCode || "",
      city: session?.user.city || "",
      country: session?.user.country || "",
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      reset({
        userName: session.user.name || "",
        phoneNumber: session.user.phoneNumber || "",
        postalCode: session.user.postalCode || "",
        address: session.user.address || "",
        city: session.user.city || "",
        country: session.user.country || "",
      });
      console.log(reset({ userName: session.user.name || "" }));

      setImage(session?.user.image || "");
      setIsAdmin(session?.user.admin || false);

      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUserContact(data);
          console.log("Contacts", userContact);
        });
      });
    }
  }, [session, status, reset]);

  async function handleProfileUpdate(data: FormData) {
    setSaving(true);
    console.log("profile Data", data);

    const savingProfile = fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.userName,
        image,
        phoneNumber: data.phoneNumber,
        address: data.address,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
      }),
    }).then((response) => {
      if (response.ok) {
        setSaving(false);
      }
    });
    await toast.promise(savingProfile, {
      loading: "Saving ...",
      success: "Profile Saved!",
      error: "Error Occured!",
    });

    //update session
    // await updateSession();
  }

  // const handleFileChange = async function (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) {
  //   // You can access the selected file with event.target.files?.[0]
  //   // const file = event.target.files?.[0];

  //   setUploadingImage(true);

  //   const file = event?.target?.files;

  //   if (file && file.length > 0) {
  //     const data = new FormData();
  //     data.set("file", file[0]);

  //     const upoadingPhoto = fetch("/api/upload", {
  //       method: "POST",
  //       body: data,
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json().then((link) => {
  //             setImage(link);
  //             setUploadingImage(false);
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         return error;
  //       });
  //     await toast.promise(upoadingPhoto, {
  //       loading: "Uploading ...",
  //       success: "Uploaded!",
  //       error: "Error Occured!",
  //     });
  //   }
  // };

  if (status === "loading") {
    return "Loading ...";
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  // const userImage = session?.user.image || "";

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <h1 className="text-primary text-center text-2xl font-semibold">
        Profile
      </h1>

      <form
        className="max-w-md mx-auto flex flex-col "
        onSubmit={handleSubmit(handleProfileUpdate)}
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
            <label>Username</label>

            <input
              type="text"
              {...register("userName")}
              placeholder="Username"
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName.message} </p>
            )}
            <label>Email</label>

            <input
              type="email"
              value={session?.user?.email || ""}
              disabled={true}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              {...register("phoneNumber")}
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message} </p>
            )}
            <label>Address</label>
            <input
              type="text"
              {...register("address")}
              placeholder="Street Address"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message} </p>
            )}
            <div className="flex gap-2">
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  {...register("postalCode")}
                  placeholder="Postal Code"
                />
                {errors.postalCode && (
                  <p className="text-red-500">{errors.postalCode.message} </p>
                )}
              </div>
              <div>
                <label>City</label>
                <input type="text" {...register("city")} placeholder="City" />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message} </p>
                )}
              </div>
            </div>
            <label>Country</label>
            <input type="text" {...register("country")} placeholder="Country" />
            {errors.country && (
              <p className="text-red-500">{errors.country.message} </p>
            )}
            <button type="submit" className="mt-4">
              {" "}
              {saving && <Loader className="text-white animate-spin mr-1" />}
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
