import Image from "next/image";
import folder from "../img/folder_pink.svg";

type CardFolderProps = {
  folderName: string;
  folderId: number;
  count: number;
};

export default function CardFolder({
  folderName,
  folderId,
  count,
}: CardFolderProps) {
  return (
    <div className="flex bg-pastelPink text-titlePink rounded-lg p-3 justify-between max-w-[200px] transition cursor-pointer hover:drop-shadow-[4px_4px_0px]">
      <div className="flex gap-2">
        <Image src={folder} alt="logo" width={24} height={24} />
        <p className="text-titlePink font-inter text-base">{folderName}</p>
      </div>
      <p className="text-titlePink font-inter text-base">
        {count} {count > 1 ? "recipes" : "recipe"}
      </p>
      <p className="hidden">{folderId}</p>
    </div>
  );
}
