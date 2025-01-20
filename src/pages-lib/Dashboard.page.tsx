import { User } from "@prisma/client";

interface DashboardProps {
  users: User[];
}

const DashboardPage = ({ users }: DashboardProps) => {
  return (
    <main>
      <h1>Dashboard</h1>
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
