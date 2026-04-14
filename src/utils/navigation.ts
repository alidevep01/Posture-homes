import { primaryContactPhoneHref } from './contact'

export const navigationLinks = [
  { href: '/', label: 'Home', type: 'route' },
  { href: '/about', label: 'About', type: 'route' },
  { href: '/sourcing', label: 'Sourcing', type: 'route' },
  { href: '/blog', label: 'Blog', type: 'route' },
  { href: primaryContactPhoneHref, label: 'Contact', type: 'anchor' },
]
