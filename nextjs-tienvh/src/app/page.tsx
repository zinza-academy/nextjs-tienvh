import Image from "next/image";
import Link from "next/link";
import theme from "../lib/theme";
export default function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <Link href="/user">User</Link>
    </main>
  )
}
