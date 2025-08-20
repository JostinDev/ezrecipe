"use client";
import { Button, Dialog, DialogTrigger, Form, Heading, Modal } from "react-aria-components";
import { useActionState } from "react";
import { deleteFolder } from "@/server/mutations";

type RecipeOptionProps = {
  folderID: number;
};

export default function DeleteFolderModal({ folderID }: RecipeOptionProps) {
  const [state, formAction, isPending] = useActionState(deleteFolder, {
    errors: {},
  });

  return (
    <DialogTrigger>
      <Button className="w-fit rounded-md text-left font-inter text-red-500 transition-colors hover:text-red-600">
        Delete folder
      </Button>
      <Modal className="bg-size-[200px_200px] w-[400px] flex-col rounded-lg bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat p-4">
        <Dialog>
          <Form action={formAction} className="flex h-full flex-col justify-between">
            <span className="hidden">{state.errors.folderID}</span>
            <input className="hidden" name="folderID" defaultValue={folderID} />
            <div>
              <Heading className="font-ptSerif text-[32px] text-title">Delete the folder?</Heading>
              <p className="font-inter text-sm text-body">This action cannot be undone</p>
            </div>
            <div className="mt-10 flex gap-4">
              <div className="group relative">
                <Button
                  isDisabled={isPending}
                  slot="close"
                  className="bg-size-[200px_200px] relative z-20 flex max-h-[50px] max-w-[200px] justify-between rounded-lg border border-title bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat px-3 py-2"
                >
                  <p className="font-inter text-sm font-semibold text-title">Cancel</p>
                </Button>
                <div className="absolute left-0 top-0 z-10 h-full max-h-[50px] w-full rounded-[8px] border border-title p-3 transition-all group-hover:left-1 group-hover:top-1"></div>
              </div>

              <div className="group relative">
                <Button
                  type="submit"
                  isDisabled={isPending}
                  className="relative z-20 flex max-h-[50px] max-w-[200px] items-center justify-center gap-2 rounded-lg border border-red-500 bg-red-500 px-3 py-2 text-sm font-semibold text-white"
                >
                  {isPending ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-transparent border-t-white"></div>
                  ) : (
                    ""
                  )}
                  <p>Delete</p>
                </Button>
                <div className="absolute left-0 top-0 z-10 h-full max-h-[50px] w-full rounded-[8px] border border-transparent bg-shadow p-3 transition-all group-hover:left-1 group-hover:top-1"></div>
              </div>
            </div>
          </Form>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
