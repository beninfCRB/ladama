import { Skeleton } from "@/components/ui/skeleton";
import type { FunctionComponent } from "react";

interface SkeletonCardProps {
  height?: string;
  width?: string;
}

const SkeletonCard: FunctionComponent<SkeletonCardProps> = ({
  height,
  width,
}) => {
  return (
    <div className={`flex flex-col space-y-3`}>
      <Skeleton className={`h-[125px] w-[250px] rounded-xl`} />
      <div className="space-y-2">
        <Skeleton className={`${height ?? "h-full"} ${width ?? "w-full"}`} />
        <Skeleton className={`${height ?? "h-full"} ${width ?? "w-full"}`} />
      </div>
    </div>
  );
};

export default SkeletonCard;
