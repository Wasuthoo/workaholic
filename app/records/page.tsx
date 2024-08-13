"use client"
import Link from 'next/link';
import Records from 'app/_components/records';

export default function RecordsPage() {
  return (
    <div>
      <h1>Records</h1>
      <Records />
      <Link href="/">Back to Home</Link>
    </div>
  );
}
