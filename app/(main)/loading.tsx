export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Logo */}
      <div className="mb-6 flex items-center space-x-3">
        <img
          src="https://smartfurniture.monamedia.net/wp-content/uploads/2024/11/logo.svg"
          alt="Logo"
          className="h-12 w-12 animate-pulse"
        />
        <span className="text-2xl font-bold text-gray-800">MyApp</span>
      </div>

      {/* Spinner */}
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-gray-600 text-sm animate-pulse">
        Đang tải trải nghiệm của bạn...
      </p>
    </div>
  );
}