import PostureHomesLogo from './PostureHomesLogo'
import SectionReveal from './SectionReveal'
import { useCurrentYear } from '../hooks/useCurrentYear'

function Footer() {
  const year = useCurrentYear()

  return (
    <SectionReveal className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <PostureHomesLogo />
          <p>&copy; {year} Posture Homes. Crafted for calm living.</p>
        </div>
      </div>
    </SectionReveal>
  )
}

export default Footer
