"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

type CartContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carts: any[];
  setCarts: React.Dispatch<React.SetStateAction<any[]>>;
  addCart: (product: any) => void;
  clearCarts: () => void;
  removeCarts: (index: any) => void;
};

// export const CartContent = createContext({});
export const CartContent = createContext<CartContextType | undefined>(
  undefined
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppProvider({ children }: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [carts, setCarts] = useState<any[]>([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCarts(JSON.parse(ls.getItem("cart") || ""));
    }
  }, []);

  function saveCartLocalStorage(newCarts: any) {
    if (ls) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ls.setItem("cart", JSON.stringify(newCarts));
    }
  }

  //clear carts
  function clearCarts() {
    setCarts([]);
    saveCartLocalStorage([]);
  }

  function removeCarts(indexToRemove: any) {
    setCarts((prevCarts) => {
      const newCarts = prevCarts.filter((v, index) => index !== indexToRemove);
      saveCartLocalStorage(newCarts);
      return newCarts;
    });
  }

  function addCart(product: any) {
    setCarts((prevCart) => {
      // const cartProducts = { ...product };
      const newProducts = [...prevCart, { ...product }];
      saveCartLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContent.Provider
        value={{ carts, setCarts, addCart, clearCarts, removeCarts }}
      >
        {children}
      </CartContent.Provider>
    </SessionProvider>
  );
}
