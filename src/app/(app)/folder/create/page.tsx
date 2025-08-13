import Link from "next/link";
import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";

export default async function Create() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5">
      <button className="flex gap-1">
        <Image src={chevron} alt="logo" width={20} height={20} />
        <Link href="/" prefetch={true} className="font-inter text-xl text-title">
          Back
        </Link>
      </button>
      <div className="text-center">
        <h1 className="font-ptSerif text-[40px] text-title">New Folder</h1>
      </div>
    </div>
  );
}
