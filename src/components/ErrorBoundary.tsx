import { Component, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Something went wrong</h2>
          <p className="mt-3 text-base leading-8 text-slate-600">
            An unexpected error occurred. Please refresh the page or return to the homepage.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:border-slate-900 hover:bg-slate-50"
          >
            Go to homepage
          </a>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
