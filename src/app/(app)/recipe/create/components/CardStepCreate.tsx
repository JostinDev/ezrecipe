import { Button, Input, TextField } from "react-aria-components";
import cross from "@/app/(app)/img/cross.svg";
import Image from "next/image";

type CardStepCreateProps = {
  stepDescription?: string;
  stepIndex: number;
  onRemove: (numberToRemove: number) => void;
};

export default function CardStepCreate({
  stepDescription,
  stepIndex,
  onRemove,
}: CardStepCreateProps) {
  return (
    <div>
      
    </div>
  );
}
