import { Skeleton } from '@/components/ui/skeleton'

/** Loading placeholder mirroring the battle page layout. */
export function BattleSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-2xl space-y-8"
      aria-busy="true"
      aria-label="Cargando batalla"
    >
      <div className="space-y-4 text-center">
        <Skeleton className="mx-auto h-6 w-24 rounded-full" />
        <Skeleton className="mx-auto h-10 w-3/4" />
        <Skeleton className="mx-auto h-5 w-2/3" />
      </div>
      <div className="flex items-center justify-center gap-8">
        <Skeleton className="h-14 w-28" />
        <Skeleton className="h-14 w-28" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
