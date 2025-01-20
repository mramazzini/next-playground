import Link from "next/link";

const HomePage = () => {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/login">Login</Link>
      <Link href="/register">Signup</Link>
    </main>
  );
};

export default HomePage;
