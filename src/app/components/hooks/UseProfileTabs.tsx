"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useProfileTabs = () => {
  const { data: session } = useSession();
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (session?.user?.admin) {
      setData(true);
      setLoading(false);
    } else {
      setData(false);
      router.push("/auth/login");
    }
  }, []);

  return { data, loading };
};
