export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-bold text-brand-charcoal mb-4">Authentication Error</h1>
        <p className="text-gray-600">Something went wrong. Please try again.</p>
      </div>
    </div>
  );
}
