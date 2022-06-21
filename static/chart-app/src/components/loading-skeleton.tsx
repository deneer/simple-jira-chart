function LoadingSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center h-full justify-center space-y-2 p-2 aspect-square w-2/5 border-2 rounded-md mx-auto">
      <div className="w-full bg-gray-300 h-6 rounded-md "></div>
      <div className="w-full bg-gray-300 h-full rounded-md"></div>
      <div className="w-full bg-gray-300 h-6 rounded-md "></div>
    </div>
  );
}

export default LoadingSkeleton;
