"use client";

import { useProfileTabs } from "@/app/components/hooks/UseProfileTabs";
import UserTabs from "@/app/components/layout/UserTabs";

const OrdersPage = () => {
  const { data: isAdmin } = useProfileTabs();

  return (
    <>
      {isAdmin && (
        <div className="mt-8">
          <UserTabs isAdmin={isAdmin} />
          <h1 className="text-2xl font-bold mb-4">Orders</h1>
          <p className="mb-6">Manage orders and within the application.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example user cards */}
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h2 className="text-lg font-semibold mb-2">User {index + 1}</h2>
                <p className="text-gray-600">
                  User details and actions can be managed here.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersPage;
