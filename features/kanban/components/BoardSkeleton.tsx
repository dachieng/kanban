import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

const SKELETON_COLUMNS = 3;

const ColumnSkeleton = () => (
  <Card className="flex w-80 min-h-96 shrink-0 grow-0 flex-col lg:w-full">
    <CardHeader className="p-spacing-xl">
      <Skeleton className="h-5 w-24" />
    </CardHeader>
    <CardContent className="flex flex-1 flex-col gap-spacing-md px-spacing-xl py-spacing-md">
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </CardContent>
    <CardFooter className="px-spacing-xl pt-spacing-md pb-spacing-xl">
      <Skeleton className="h-9 w-full" />
    </CardFooter>
  </Card>
);

const BoardSkeleton = () => (
  <div className="flex items-start gap-spacing-xl overflow-x-auto pb-spacing-md lg:grid lg:grid-cols-5">
    {Array.from({ length: SKELETON_COLUMNS }).map((_, index) => (
      <ColumnSkeleton key={index} />
    ))}
  </div>
);

export default BoardSkeleton;
