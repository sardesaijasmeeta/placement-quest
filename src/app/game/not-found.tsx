export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-extrabold mb-3">404</h1>
      <p className="text-lg text-gray-400 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all duration-300"
      >
        Go Home
      </a>
    </div>
  );
}
