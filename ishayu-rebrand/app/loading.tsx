export default function Loading() {
  return (
    <div className="pt-32 pb-20">
      <div className="shell flex flex-col gap-6 max-w-3xl">
        <div className="ishayu-skeleton h-3 w-24" />
        <div className="ishayu-skeleton h-20 w-full" />
        <div className="ishayu-skeleton h-6 w-2/3" />
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="ishayu-skeleton aspect-square" />
          <div className="ishayu-skeleton aspect-square" />
          <div className="ishayu-skeleton aspect-square" />
        </div>
      </div>
    </div>
  );
}
