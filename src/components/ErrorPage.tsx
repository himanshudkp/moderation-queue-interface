export default function ErrorPage() {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn't exist. Please refresh the
          page.
        </p>
        <p className="text-gray-600 mb-6"></p>
      </div>
    </div>
  );
}
