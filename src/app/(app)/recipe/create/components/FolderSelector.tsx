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
};

export default function FolderSelector({ folders }: CardStepCreateProps) {
  return (
    <TextField className="flex justify-center mt-5">
      <Select
        name="selectedFolder"
        placeholder="Add folder"
        className="text-2xl font-inter text-body rounded-md border bg-transparent border-dashed border-titleBlue"
      >
        <Button className="flex justify-between w-full p-2">
          <SelectValue />
          <span aria-hidden="true">▼</span>
        </Button>

        <Popover>
          <ListBox className="bg-background border border-title rounded-lg p-2">
            <ListBoxItem
              id={-1}
              className="cursor-pointer p-0.5 hover:font-bold data-[selected=true]:font-bold transition-all"
            >
              No folder
            </ListBoxItem>
            {folders.map((option) => (
              <ListBoxItem
                id={option.id}
                className="cursor-pointer p-0.5 hover:font-bold data-[selected=true]:font-bold transition-all"
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
