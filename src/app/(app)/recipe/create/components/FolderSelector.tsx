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
    <TextField className="mt-5 flex justify-center">
      <Select
        selectedKey={-1}
        isRequired
        name="selectedFolder"
        placeholder="Add folder"
        className="rounded-md border border-dashed border-titleBlue bg-transparent font-inter text-2xl text-body"
      >
        <Button className="flex w-full justify-between p-2">
          <SelectValue />
          <span aria-hidden="true">▼</span>
        </Button>

        <Popover>
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
