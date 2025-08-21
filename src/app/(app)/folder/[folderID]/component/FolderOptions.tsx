"use client";
import { Button, Dialog, DialogTrigger, OverlayArrow, Popover } from "react-aria-components";
import Image from "next/image";
import cog from "@/app/(app)/img/cog.svg";
import Link from "next/link";
import DeleteFolderModal from "@/app/(app)/folder/[folderID]/component/DeleteFolderModal";

type RecipeOptionProps = {
  folderID: number;
};

export default function FolderOptions({ folderID }: RecipeOptionProps) {
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
            <Link className="font-inter text-title" href={`/folder/edit/${folderID}`}>
              Edit
            </Link>
            <DeleteFolderModal folderID={folderID} />
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
