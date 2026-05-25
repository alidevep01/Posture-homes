import rawData from './products.json'

export type ProductItem = {
  slug: string
  name: string
  price: number | null
  images: string[]
  colors: string[]
  description: string
  executiveChairType?: 'cushion' | 'mesh' | 'premium-leather' | 'pu'
  executiveChairTypeLabel?: string
}

export type ProductCategory = {
  slug: string
  label: string
  coverImage: string | null
  items: ProductItem[]
}

export type ProductSection = 'home' | 'office'

const data = rawData as { home: ProductCategory[]; office: ProductCategory[] }

const EXECUTIVE_CHAIR_CATEGORY_SLUGS = [
  'high-back-cushion-chairs',
  'high-back-mesh-chairs',
  'premium-leather-office-chairs',
  'pu-office-chairs',
] as const

const executiveChairTypeByCategory: Record<
  (typeof EXECUTIVE_CHAIR_CATEGORY_SLUGS)[number],
  NonNullable<ProductItem['executiveChairType']>
> = {
  'high-back-cushion-chairs': 'cushion',
  'high-back-mesh-chairs': 'mesh',
  'premium-leather-office-chairs': 'premium-leather',
  'pu-office-chairs': 'pu',
}

const executiveChairTypeLabels: Record<
  NonNullable<ProductItem['executiveChairType']>,
  string
> = {
  cushion: 'Cushion',
  mesh: 'Mesh',
  'premium-leather': 'Premium Leather',
  pu: 'PU',
}

const executiveChairSourceSlugs = new Set<string>(EXECUTIVE_CHAIR_CATEGORY_SLUGS)

function buildExecutiveChairCategory(): ProductCategory {
  const sourceCategories = data.office.filter((category) =>
    executiveChairSourceSlugs.has(category.slug),
  )

  const items = sourceCategories.flatMap((category) => {
    const type = executiveChairTypeByCategory[
      category.slug as (typeof EXECUTIVE_CHAIR_CATEGORY_SLUGS)[number]
    ]
    const typeLabel = executiveChairTypeLabels[type]

    return category.items.map((item) => ({
      ...item,
      slug: `${type}-${item.slug}`,
      name: item.name.includes(typeLabel) ? item.name : `${item.name} ${typeLabel}`,
      executiveChairType: type,
      executiveChairTypeLabel: typeLabel,
    }))
  })

  return {
    slug: 'executive-chairs',
    label: 'Executive Chairs',
    coverImage:
      sourceCategories.find((category) => category.slug === 'premium-leather-office-chairs')
        ?.coverImage ??
      sourceCategories[0]?.coverImage ??
      null,
    items,
  }
}

export function getCategories(section: ProductSection): ProductCategory[] {
  if (section === 'office') {
    const categories = data.office.filter(
      (category) => !executiveChairSourceSlugs.has(category.slug),
    )
    const executiveChairCategory = buildExecutiveChairCategory()
    const insertIndex = categories.findIndex((category) =>
      category.label.localeCompare(executiveChairCategory.label) > 0
    )

    if (insertIndex === -1) return [...categories, executiveChairCategory]

    return [
      ...categories.slice(0, insertIndex),
      executiveChairCategory,
      ...categories.slice(insertIndex),
    ]
  }

  return data[section]
}

export function getCategory(section: ProductSection, slug: string): ProductCategory | undefined {
  return getCategories(section).find((c) => c.slug === slug)
}

export function getItem(
  section: ProductSection,
  categorySlug: string,
  itemSlug: string,
): ProductItem | undefined {
  return getCategory(section, categorySlug)?.items.find((i) => i.slug === itemSlug)
}

export function sectionFromCategorySlug(categorySlug: string): ProductSection | null {
  if (categorySlug === 'home-furniture') return 'home'
  if (categorySlug === 'office-furniture') return 'office'
  return null
}

type CategoryLink = {
  slug: string
  label: string
  href: string
  image: string | null
}

function buildCategoryLinks(section: ProductSection, sectionSlug: string): CategoryLink[] {
  return getCategories(section).map((c) => ({
    slug: c.slug,
    label: c.label,
    href: `/products/${sectionSlug}/${c.slug}`,
    image: c.coverImage,
  }))
}

export const homeCategoryLinks: CategoryLink[] = buildCategoryLinks('home', 'home-furniture')
export const officeCategoryLinks: CategoryLink[] = buildCategoryLinks('office', 'office-furniture')
