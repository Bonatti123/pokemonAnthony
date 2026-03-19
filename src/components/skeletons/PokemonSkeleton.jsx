function PokemonSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow animate-pulse">
      <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 mx-auto rounded"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 mt-4 rounded"></div>
    </div>
  );
}

export default PokemonSkeleton;