import { Button } from "react-aria-components";
import Image from "next/image";
import Link from "next/link";
import chevron from "@/app/(app)/img/chevron_left.svg";

export default function BackToHomeButton() {
  return (
    <Button type="button" className="mb-4 flex items-center gap-1">
      <Image src={chevron} alt="logo" width={20} height={20} />
      <Link href="/" prefetch={true} className="font-inter text-xl text-title">
        Back
      </Link>
    </Button>
  );
}
