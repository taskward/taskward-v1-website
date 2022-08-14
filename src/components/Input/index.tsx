export default function Input({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <div className={className}>
      <label className="block mb-1 text-sm font-medium">Email</label>
      <input
        type="email"
        className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Enter your email address"
      />
    </div>
  );
}
