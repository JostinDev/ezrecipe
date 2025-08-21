"use client";
import { Button, Dialog, DialogTrigger, OverlayArrow, Popover } from "react-aria-components";
import Image from "next/image";
import cog from "@/app/(app)/img/cog.svg";
import copy from "@/app/(app)/img/clipboard-copy.svg";
import { useState } from "react";
import DeleteRecipeModal from "@/app/(app)/recipe/[recipeID]/Component/DeleteRecipeModal";
import Link from "next/link";

type RecipeOptionProps = {
  recipeID: number;
  shareToken: string;
};

export default function RecipeOptions({ recipeID, shareToken }: RecipeOptionProps) {
  const [copied, setCopied] = useState("Sharing link");
  const link = `https://ezrecipe.dev/sharing/${shareToken}`;

  function copyLink() {
    navigator.clipboard.writeText(link).then(() => {
      setCopied("Link copied!");
      setTimeout(() => {
        setCopied("Sharing link");
      }, 3000);
    });
  }

  return (
    <DialogTrigger>
      <Button>
        <Image src={cog} width={30} height={30} alt={"option"} />
      </Button>
      <Popover className="editOptions">
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
        <Dialog>
          <div className="flex flex-col gap-4">
            <Link className="font-inter text-title" href={`/recipe/edit/${recipeID}`}>
              Edit
            </Link>
            <div>
              <p className="font-inter text-title">{copied}</p>
              <div className="mt-1">
                <div className="flex">
                  <p className="truncate rounded-l-lg border-y border-l border-body p-2 text-body">
                    {link}
                  </p>
                  <Button
                    onClick={() => copyLink()}
                    className="flex w-24 items-center justify-center rounded-r-lg bg-pastelYellow"
                  >
                    <Image src={copy} width={30} height={30} alt={"copy"} />
                  </Button>
                </div>
              </div>
            </div>
            <DeleteRecipeModal recipeID={recipeID} />
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
