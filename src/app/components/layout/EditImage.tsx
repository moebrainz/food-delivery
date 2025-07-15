import { Loader } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "react-hot-toast";

const EditImage = ({
  link,
  setLink,
  imageUpload,
  setUploadingImage,
}: {
  link: string;
  imageUpload: boolean;
  setLink: (value: string) => void;
  setUploadingImage: (value: boolean) => void;
}) => {
  const handleFileChange = async function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // You can access the selected file with event.target.files?.[0]
    // const file = event.target.files?.[0];

    setUploadingImage(imageUpload);

    const file = event?.target?.files;

    if (file && file.length > 0) {
      const data = new FormData();
      data.set("file", file[0]);

      const upoadingPhoto = fetch("/api/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((link) => {
              setLink(link);
              setUploadingImage(imageUpload);
            });
          }
        })
        .catch((error) => {
          return error;
        });
      await toast.promise(upoadingPhoto, {
        loading: "Uploading ...",
        success: "Uploaded!",
        error: "Error Occured!",
      });
    }
  };
  return (
    <div className="inline-flex flex-col justify-center items-center space-y-2">
      <div className="flex justify-center items-center border border-gray-400 p-2 rounded-sm">
        {link && <Image src={link} alt="avatar" height={190} width={180} />}
        {!link && (
          <Image
            src={
              "https://res.cloudinary.com/deo7k0vzw/image/upload/v1752030108/no-image_zzw3dm.jpg"
            }
            alt="avatar"
            height={190}
            width={180}
          />
        )}
      </div>
      <div>
        <label className="cursor-pointer border border-gray-200 shadow p-2 flex w-20 text-center rounded-sm">
          <input
            type="file"
            // {...register("file")}
            className="hidden w-full"
            id="file"
            onChange={handleFileChange}
          />
          <span className="w-full flex justify-center  text-center">
            {imageUpload ? (
              <Loader className="text-black animate-spin mr-1" />
            ) : (
              "Edit"
            )}
          </span>
        </label>
      </div>
    </div>
  );
};

export default EditImage;
