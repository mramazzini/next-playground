import { User } from "@prisma/client";

interface DashboardProps {
  users: User[];
}

const Dashboard = ({ users }: DashboardProps) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
