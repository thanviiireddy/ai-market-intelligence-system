export default function SkeletonLoader({ type = "workspace" }) {
  if (type === "dashboard") {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-zinc-900/60 border border-zinc-800/40 p-5 flex flex-col justify-between">
              <div className="w-8 h-8 rounded-lg bg-zinc-800" />
              <div className="h-4 w-1/3 bg-zinc-800 rounded" />
              <div className="h-6 w-1/2 bg-zinc-800 rounded" />
            </div>
          ))}
        </div>

        {/* Charts and Tables Skeleton */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-80 rounded-2xl bg-zinc-900/60 border border-zinc-800/40 p-5 space-y-4">
            <div className="h-5 w-1/4 bg-zinc-800 rounded" />
            <div className="h-full w-full bg-zinc-800/40 rounded-xl" />
          </div>
          <div className="h-80 rounded-2xl bg-zinc-900/60 border border-zinc-800/40 p-5 space-y-4">
            <div className="h-5 w-1/3 bg-zinc-800 rounded" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2">
                  <div className="h-4 w-1/2 bg-zinc-800 rounded" />
                  <div className="h-4 w-12 bg-zinc-800 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: full workflow/workspace skeleton
  return (
    <div className="space-y-8 animate-pulse">
      {/* Pipeline Loader */}
      <div className="h-20 rounded-2xl bg-zinc-900/60 border border-zinc-800/40 p-5 flex items-center justify-between gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-6.5 h-6.5 rounded-full bg-zinc-800" />
            <div className="h-4 w-16 bg-zinc-800 rounded hidden sm:block" />
          </div>
        ))}
      </div>

      {/* Agents Monitoring Loader */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-40 rounded-2xl bg-zinc-900/60 border border-zinc-800/40 p-5 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="h-4 w-16 bg-zinc-800 rounded" />
              <div className="w-3 h-3 rounded-full bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-zinc-800 rounded" />
              <div className="h-3 w-5/6 bg-zinc-800 rounded" />
            </div>
            <div className="h-3 w-12 bg-zinc-800 rounded" />
          </div>
        ))}
      </div>

      {/* Main Report Loader */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-[450px] rounded-3xl bg-zinc-900/60 border border-zinc-800/40 p-8 space-y-6">
          <div className="h-8 w-1/3 bg-zinc-800 rounded" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-zinc-800 rounded" />
            <div className="h-4 w-11/12 bg-zinc-800 rounded" />
            <div className="h-4 w-full bg-zinc-800 rounded" />
            <div className="h-4 w-4/5 bg-zinc-800 rounded" />
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-6 w-1/4 bg-zinc-800 rounded" />
            <div className="h-4 w-full bg-zinc-800 rounded" />
            <div className="h-4 w-5/6 bg-zinc-800 rounded" />
          </div>
        </div>

        {/* Side Panel Metrics Loader */}
        <div className="space-y-6">
          <div className="h-56 rounded-3xl bg-zinc-900/60 border border-zinc-800/40 p-6 space-y-4">
            <div className="h-5 w-1/3 bg-zinc-800 rounded" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-zinc-800/40 p-3" />
              ))}
            </div>
          </div>
          <div className="h-56 rounded-3xl bg-zinc-900/60 border border-zinc-800/40 p-6 space-y-4">
            <div className="h-5 w-1/3 bg-zinc-800 rounded" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-zinc-800 rounded" />
              <div className="h-4 w-5/6 bg-zinc-800 rounded" />
              <div className="h-4 w-2/3 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
