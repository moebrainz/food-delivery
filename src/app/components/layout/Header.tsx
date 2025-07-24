"use client";

import { ShoppingCart } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContent } from "../AppContext";
import CartSideModal from "./CartSideModal";

const Header = () => {
  const [showCart, setShowCart] = useState(false);

  const session = useSession();

  console.log("user session", session);

  const userName = session.data?.user?.name || "Guest";

  const firstName = userName.split(" ")[0];

  const loginStatus = session.status;

  const cartCtx = useContext(CartContent);

  if (!cartCtx) {
    throw new Error("CartContext must be used within AppProvider");
  }

  const { carts } = cartCtx;

  function handleShowCart() {
    setShowCart((showCart) => !showCart);
  }

  // console.log("session authenticated:", session);

  return (
    <header className="sticky top-0 z-40  bg-white  py-4">
      <nav className="max-w-3xl mx-auto justify-between flex gap-8">
        <nav className="flex gap-8 text-gray-600 font-semibold items-center">
          <Link href="/" className="text-primary font-semibold text-2xl ">
            FOOD DELIVERY
          </Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <nav className="relaive flex items-center gap-2 font-semibold w-fit">
          {loginStatus === "authenticated" && (
            <>
              <Link
                href={"/pages/profile"}
                className="text-gray-500 font-semibold whitespace-nowrap"
              >
                Hello, {firstName || "Profile"}
              </Link>
              <button
                onClick={() => signOut()}
                className=" text-white px-4 py-2 rounded-full bg-primary"
              >
                Logout
              </button>
            </>
          )}
          {loginStatus === "unauthenticated" && (
            <>
              <Link
                href="/auth/login"
                className=" text-gray-500 px-4 py-2 rounded-full"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-primary text-white px-8 py-2 rounded-full"
              >
                Register
              </Link>
            </>
          )}

          {/* <Link href={"/cart"} className="relative"> */}
          <span
            className="relative cursor-pointer"
            onClick={() => handleShowCart()}
          >
            <ShoppingCart />
            <span className="absolute -top-3 -right-3 bg-primary rounded-full leading-3 text-white p-[5px] text-center text-xs">
              {carts.length}{" "}
            </span>
          </span>
          {/* </Link> */}
        </nav>
        <CartSideModal
          showCart={showCart}
          setShowCart={() => {
            setShowCart((prev) => !prev);
          }}
        />
      </nav>
    </header>
  );
};

export default Header;
