function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24 text-slate-900">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          React + TypeScript + Tailwind
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          Foundation is ready.
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Start building from <code className="rounded bg-slate-100 px-2 py-1 text-sm">src/App.tsx</code>{' '}
          with Tailwind utilities already configured for Vite.
        </p>
      </div>
    </main>
  )
}

export default App
