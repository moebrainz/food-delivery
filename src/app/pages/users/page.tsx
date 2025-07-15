"use client";

import { useProfileTabs } from "@/app/components/hooks/UseProfileTabs";
import UserTabs from "@/app/components/layout/UserTabs";
import { useEffect, useState } from "react";

type UsersProps = {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
};

const UsersPage = () => {
  const { data: isAdmin } = useProfileTabs();
  const [users, setUsers] = useState<UsersProps[]>([]);

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  return (
    <>
      {isAdmin && (
        <div className="mt-8">
          <UserTabs isAdmin={isAdmin} />
          <h1 className="text-2xl font-bold mb-4">Users</h1>
          <p className="mb-6">
            Manage users and their roles within the application.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example user cards */}
            {users.length > 0 &&
              users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div>
                    <span className="text-lg font-semibold mb-2">
                      {!!user.name && <h2>{user.name}</h2>}
                      {!user.name && <h2 className="text-gray-500">No name</h2>}
                    </span>
                    <h6 className="text-primary text-base font-medium">
                      {user.admin ? "Admin" : "Customer"}
                    </h6>
                  </div>
                  <p className="text-gray-600">{user.email}</p>
                  <div>
                    <button type="button" className="mt-3">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UsersPage;
