export const productCategories = [
  {
    slug: 'home-furniture',
    label: 'Home Furniture',
    pageTitle: 'Premium Home Furniture Sourced for Refined Residential Spaces',
    pageDescription:
      'From statement living rooms to complete residential interiors, we source premium home furniture from verified factories in China with a focus on quality, finish, and long-term value.',
    highlights: [
      {
        title: 'Living Room Collections',
        description:
          'Sofas, accent chairs, coffee tables, and media units selected for premium comfort and visual impact.',
        palette: 'from-stone-200 via-stone-100 to-white',
      },
      {
        title: 'Bedroom Solutions',
        description:
          'Beds, side tables, wardrobes, and upholstered pieces that support elegant and functional bedrooms.',
        palette: 'from-amber-100 via-stone-50 to-white',
      },
      {
        title: 'Dining and Accent Pieces',
        description:
          'Dining tables, dining chairs, consoles, and decor-supporting furniture curated for complete homes.',
        palette: 'from-slate-200 via-slate-100 to-white',
      },
    ],
    coverage: [
      'Sofas and lounge seating',
      'Beds and bedroom furniture',
      'Dining tables and chairs',
      'Accent furniture and decor support',
      'Storage and wardrobes',
      'Custom residential furniture sourcing',
    ],
  },
  {
    slug: 'office-furniture',
    label: 'Office Furniture',
    pageTitle: 'Premium Office Furniture for Productive and Modern Workspaces',
    pageDescription:
      'We source office furniture for executive cabins, conference rooms, reception spaces, and open work areas, helping businesses build durable and premium work environments directly from China.',
    highlights: [
      {
        title: 'Executive Office Suites',
        description:
          'Executive desks, credenzas, storage, and seating for premium leadership spaces.',
        palette: 'from-neutral-200 via-stone-100 to-white',
      },
      {
        title: 'Conference and Meeting Rooms',
        description:
          'Conference tables, visitor seating, and presentation-friendly furniture for collaborative spaces.',
        palette: 'from-zinc-200 via-stone-100 to-white',
      },
      {
        title: 'Workstations and Support Areas',
        description:
          'Modular workstations, ergonomic seating, storage, and breakout-zone furniture for daily operations.',
        palette: 'from-rose-100 via-stone-50 to-white',
      },
    ],
    coverage: [
      'Executive desks and chairs',
      'Conference room furniture',
      'Reception and waiting area seating',
      'Modular workstations',
      'Ergonomic office chairs',
      'Custom office furniture sourcing',
    ],
  },
] as const

export const productDropdownLinks = productCategories.map((category) => ({
  href: `/products/${category.slug}`,
  label: category.label,
}))
