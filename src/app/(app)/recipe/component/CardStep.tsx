type CardStepProps = {
  stepDescription: string;
  stepIndex: number;
};

export default function CardStep({ stepDescription, stepIndex }: CardStepProps) {
  return (
    <div className="flex w-full rounded-lg bg-pastelBlue p-5 text-titleBlue shadow-[4px_4px_0px_#263332] transition">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-titleBlue p-4 font-inter text-base font-bold text-titleBlue">
          {stepIndex + 1}
        </div>
        <p className="font-inter text-base text-titleBlue">{stepDescription}</p>
      </div>
    </div>
  );
}
