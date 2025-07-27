import { Button } from "react-aria-components";
import Image from "next/image";
import Link from "next/link";
import chevron from "@/app/(app)/img/chevron_left.svg";

export default function BackToHomeButton() {
  return (
    <Button type="button" className="flex items-center gap-1 mb-4">
      <Image src={chevron} alt="logo" width={20} height={20} />
      <Link href="/" prefetch={true} className="text-title font-inter text-xl">
        Back
      </Link>
    </Button>
  );
}
