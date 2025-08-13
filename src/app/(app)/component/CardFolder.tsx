import Image from "next/image";
import folder from "../img/folder_pink.svg";

type CardFolderProps = {
  folderName: string;
  count: number;
};

export default function CardFolder({ folderName, count }: CardFolderProps) {
  return (
    <div className="flex w-[200px] cursor-pointer justify-between rounded-lg bg-pastelPink p-3 text-titlePink transition hover:drop-shadow-[4px_4px_0px]">
      <div className="flex gap-2">
        <Image src={folder} alt="logo" width={24} height={24} />
        <p className="font-inter text-base text-titlePink">{folderName}</p>
      </div>
      <p className="font-inter text-base text-titlePink">
        {count} {count > 1 ? "recipes" : "recipe"}
      </p>
    </div>
  );
}
