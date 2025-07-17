import Link from "next/link";
import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";

export default async function Create() {
  return (
    <div className="max-w-[1200px] w-full mx-auto px-5">
      <button className="flex gap-1">
        <Image src={chevron} alt="logo" width={20} height={20} />
        <Link
          href="/"
          prefetch={true}
          className="text-title font-inter text-xl"
        >
          Back
        </Link>
      </button>
      <div className="text-center">
        <h1 className="text-[40px] font-ptSerif text-title">New recipe</h1>
      </div>
    </div>
  );
}
