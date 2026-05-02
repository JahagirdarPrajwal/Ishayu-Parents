export default function Loading() {
  return (
    <div className="pt-32 pb-20">
      <div className="shell grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="ishayu-skeleton h-3 w-24" />
          <div className="ishayu-skeleton h-16 w-3/4" />
          <div className="ishayu-skeleton h-6 w-2/3" />
          <div className="flex gap-3">
            <div className="ishayu-skeleton h-12 w-12 rounded-full" />
            <div className="ishayu-skeleton h-12 w-12 rounded-full" />
            <div className="ishayu-skeleton h-12 w-12 rounded-full" />
          </div>
        </div>
        <div className="md:col-span-4 ishayu-skeleton aspect-square" />
        <div className="md:col-span-3 ishayu-skeleton h-72" />
      </div>
    </div>
  );
}
