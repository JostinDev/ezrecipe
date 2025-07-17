import Link from "next/link";
import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";

type RecipeProps = {
  params: Promise<{ recipeID: string }>;
};

export default async function Create({ params }: RecipeProps) {
  const param = await params; //nextjs 15 makes storing await params mandatory
  const recipeID = Number(param.recipeID);

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
        <h1 className="text-[40px] font-ptSerif text-title">
          Edit recipe {recipeID}
        </h1>
      </div>
    </div>
  );
}
