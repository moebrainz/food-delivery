import Image from "next/image";
import { useContext } from "react";
import { CartContent } from "../AppContext";

type MenuItemProps = {
  _id?: string;
  image: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
};

const MenuItem = ({
  image,
  itemName,
  itemDescription,
  itemPrice,
}: MenuItemProps) => {
  const cartCtx = useContext(CartContent);

  if (!cartCtx) {
    throw new Error("CartContext must be used within AppProvider");
  }

  const { addCart } = cartCtx;

  return (
    <>
      <div className="flex flex-col bg-gray-100 p-4 rounded-lg text-center space-y-3 hover:bg-white cursor-pointer hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="relative mt-3 h-36 w-full">
          <Image
            // src={"/images/fd-2.jpg"}
            src={image}
            alt="jelof"
            fill
            className=" rounded-lg mx-auto block"
          />
        </div>
        <div className="grow">
          <h4 className="font-bold text-xl my-1 text-black">{itemName}</h4>
          <p className="text-gray-900 text-sm text-start px-5 py-2 line-clamp-2 ">
            {itemDescription}
          </p>
        </div>
        <div>
          <button
            className="bg-primary text-white px-7 py-2 mb-2 rounded-full cursor-pointer font-semibold"
            onClick={() =>
              addCart({ image, itemName, itemDescription, itemPrice })
            }
          >
            Add to cart ${itemPrice}
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
