import { Skeleton } from "@/components/ui/skeleton";

interface GridSkeletonProps {
  count?: number;
  cardHeight?: number;
}

const GridSkeleton = ({ count = 6, cardHeight = 192 }: GridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={`skeleton-${i}`} className="w-full">
          <div className="overflow-hidden border-0 rounded-lg bg-card">
            <div className="relative" style={{ height: cardHeight }}>
              <Skeleton className="absolute inset-0" />
            </div>
            <div className="p-6 space-y-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridSkeleton;

