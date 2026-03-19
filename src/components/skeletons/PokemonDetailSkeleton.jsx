function PokemonDetailSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
    bg-gradient-to-br from-blue-100 to-purple-200 
    dark:from-gray-800 dark:to-gray-900 animate-pulse">

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-80 text-center">

        <div className="w-32 h-32 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>

        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mx-auto mb-2"></div>

        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>

      </div>

    </div>
  );
}

export default PokemonDetailSkeleton;