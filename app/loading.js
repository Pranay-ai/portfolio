import Spinner from "./components/Spinner";

export default function Loading() {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <Spinner className="text-gray-500 h-8 w-8" />
    </div>
  );
}
