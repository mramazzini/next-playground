"use client";
import { getAllUsers } from "@/lib/actions/db/User/read.actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default DashboardPage;
