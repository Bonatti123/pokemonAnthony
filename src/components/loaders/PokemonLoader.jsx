function PokeLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">

      <div className="relative w-32 h-32 animate-spin-slow">

        <div className="absolute top-0 w-full h-1/2 bg-red-500 rounded-t-full"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full"></div>

        <div className="absolute top-1/2 left-0 w-full h-2 bg-black -translate-y-1/2"></div>

        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      </div>

    </div>
  );
}

export default PokeLoader;