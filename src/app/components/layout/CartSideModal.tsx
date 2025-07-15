import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CartContent } from "../AppContext";
import SectionHeaders from "../menu/SectionHeaders";

const profileSchema = z.object({
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

const CartSideModal = ({
  showCart,
  setShowCart,
}: {
  showCart: boolean;
  setShowCart: () => void;
}) => {
  const cartCtx = useContext(CartContent);

  if (!cartCtx) {
    throw Error("Error Occured");
  }

  const { status, data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
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
        phoneNumber: session.user.phoneNumber || "",
        postalCode: session.user.postalCode || "",
        address: session.user.address || "",
        city: session.user.city || "",
        country: session.user.country || "",
      });
    }
  }, [session, status, reset]);

  console.log("profileData", session);

  const { carts, removeCarts } = cartCtx;

  let total = 0;

  for (let p of carts) {
    console.log("Price", p.itemPrice);
    total += p.itemPrice;
  }

  //   console.log("from carts", carts);

  return (
    <div
      className={`absolute top-0  -right-24 h-screen w-72 transition-all duration-1000 bg-white overflow-y-auto mb-5 ${
        showCart ? " -translate-x-24 z-30 shadow-lg " : " translate-x-48"
      }`}
    >
      <section className=" h-full p-3 mb-5 ">
        <SectionHeaders mainHeader="carts" />

        <div>
          {carts.length === 0 && (
            <span>No products available in your carts</span>
          )}
          {carts.length > 0 && (
            <div className="flex flex-col space-y-3">
              {carts.map((item, index) => (
                <div key={item._id} className="flex items-center gap-3">
                  <span className="grow text-sm font-semibold">
                    {item?.itemName}
                  </span>
                  <span className="text-sm text-gray-600 font-semibold">
                    {" "}
                    ${item.itemPrice}
                  </span>
                  <span
                    className=" bg-primary  cursor-pointer rounded-2xl p-2"
                    onClick={() => removeCarts(index)}
                  >
                    <Trash2 className="text-white size-5" />
                  </span>
                </div>
              ))}
              <div className="text-sm font-semibold self-end">
                Total: ${total}
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-300 mt-4 p-3 rounded-2xl">
          <h3 className="font-semibold text-base">Checkout Address</h3>
          <div>
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
          </div>
        </div>
        <div className="sticky bottom-0 mb-2 p-2 mt-3 bg-white">
          <button type="button" className=" " onClick={setShowCart}>
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
};

export default CartSideModal;
