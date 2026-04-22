import { Link } from 'react-router'
import Seo from '../components/Seo'

function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Seo
        title="Page Not Found | Posture India"
        description="The page you're looking for doesn't exist. Browse our home and office furniture collections."
        canonicalPath="/404"
      />
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">404</p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
        We couldn't find the page you're looking for. It may have moved or the link may be incorrect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800"
        >
          Go to homepage
        </Link>
        <Link
          to="/products/home-furniture"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:border-slate-900 hover:bg-slate-50"
        >
          Browse home furniture
        </Link>
        <Link
          to="/products/office-furniture"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:border-slate-900 hover:bg-slate-50"
        >
          Browse office furniture
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
