function PokemonSkeleton() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">

      {/* EFECTO SHIMMER */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

      <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 dark:bg-gray-600"></div>

      <div className="h-4 mt-4 w-3/4 mx-auto bg-gray-300 dark:bg-gray-600 rounded"></div>

      <div className="h-3 mt-2 w-1/2 mx-auto bg-gray-200 dark:bg-gray-500 rounded"></div>

    </div>
  );
}

export default PokemonSkeleton; 