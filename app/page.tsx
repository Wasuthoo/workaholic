import Link from "next/link";
import CheckIn from "./_components/CheckIn";

export default function Home() {
  return (
    <div>
      <h1>Time Tracker</h1>
      <CheckIn />
      <Link href='/records'> records</Link>
    </div>
  );
}
