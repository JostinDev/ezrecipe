"use client";
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  TextField,
} from "react-aria-components";

type Folder = {
  id: number;
  name: string;
};

type CardStepCreateProps = {
  folders: Folder[];
  currentFolderID?: number | null;
};

export default function FolderSelector({ folders, currentFolderID }: CardStepCreateProps) {
  console.log(currentFolderID);
  return (
    <TextField className="mt-5 flex justify-center">
      <Select
        defaultSelectedKey={currentFolderID ? currentFolderID : -1}
        isRequired
        name="selectedFolder"
        placeholder="Add folder"
        className="w-full max-w-60 rounded-md border border-dashed border-titleBlue bg-transparent font-inter text-xl text-body sm:text-2xl"
      >
        <Button className="flex w-full justify-between p-2">
          <SelectValue className="mx-auto items-center justify-center" />
          <span aria-hidden="true">▼</span>
        </Button>

        <Popover className="w-full max-w-60 origin-top-left scale-100 opacity-100 transition-all duration-150 ease-in-out [&[data-entering]]:scale-95 [&[data-entering]]:opacity-100 [&[data-exiting]]:scale-95 [&[data-exiting]]:opacity-0">
          <ListBox className="rounded-lg border border-title bg-background p-2">
            <ListBoxItem
              id={-1}
              key={-1}
              className="cursor-pointer p-0.5 transition-all hover:font-bold data-[selected=true]:font-bold"
            >
              No folder
            </ListBoxItem>
            {folders.map((option) => (
              <ListBoxItem
                id={option.id}
                className="cursor-pointer p-0.5 transition-all hover:font-bold data-[selected=true]:font-bold"
                key={option.id}
              >
                {option.name}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
    </TextField>
  );
}
