import Image from "next/image";
import folder from "../img/folder_pink.svg";

type CardFolderProps = {
  folderName: string;
  count: number;
};

export default function CardFolder({ folderName, count }: CardFolderProps) {
  return (
    <div className="flex max-w-[250px] cursor-pointer items-center justify-between gap-4 rounded-lg border border-pastelPink bg-pastelPink p-3 text-titlePink transition hover:shadow-[4px_4px_0_#5a2c16]">
      <div className="flex gap-2 truncate">
        <Image src={folder} alt="logo" width={24} height={24} />
        <p className="truncate font-inter text-base text-titlePink">{folderName}</p>
      </div>
      <p className="text-nowrap font-inter text-sm text-titlePink">
        {count} {count > 1 ? "recipes" : "recipe"}
      </p>
    </div>
  );
}
