import Image from "next/image";
import chef from "../img/chef.svg";
import user from "../img/user.svg";
import Link from "next/link";

export default function Header() {
  return (
    <div className="container mx-auto px-5 flex flex-row pt-6 justify-between items-center">
      <Link href="/">
        <h1 className="md:text-5xl text-4xl font-ptSerif text-title">
          ezrecipe
        </h1>
      </Link>
      <div className="flex flex-row gap-8 pt-2">
        <Link href="/" className="flex flex-col items-center justify-between">
          <Image src={chef} alt="logo" width={24} height={24} />
          <p className="text-title font-inter text-base">Home</p>
        </Link>

        <Link
          href="/profile"
          className="flex flex-col items-center justify-between"
        >
          <Image src={user} alt="logo" width={24} height={24} />
          <p className="text-title font-inter text-base">Profile</p>
        </Link>
      </div>
    </div>
  );
}
