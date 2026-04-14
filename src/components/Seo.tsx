import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  canonicalPath?: string
  image?: string
  imageAlt?: string
  keywords?: string[]
  author?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

const siteUrl = 'https://postureindia.in'

function updateMeta(
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string,
) {
  const selector = `meta[${attributeName}="${attributeValue}"]`
  let tag = document.head.querySelector<HTMLMetaElement>(selector)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attributeName, attributeValue)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function updateCanonical(canonicalPath?: string) {
  const existing = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"][data-seo-managed="true"]',
  )

  if (!canonicalPath) {
    existing?.remove()
    return
  }

  const href = `${siteUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`

  if (existing) {
    existing.setAttribute('href', href)
    return
  }

  const tag = document.createElement('link')
  tag.rel = 'canonical'
  tag.href = href
  tag.setAttribute('data-seo-managed', 'true')
  document.head.appendChild(tag)
}

function updateJsonLd(jsonLd?: SeoProps['jsonLd']) {
  document.head
    .querySelectorAll('script[data-seo-jsonld="true"]')
    .forEach((script) => script.remove())

  if (!jsonLd) {
    return
  }

  const entries = Array.isArray(jsonLd) ? jsonLd : [jsonLd]

  entries.forEach((entry) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-jsonld', 'true')
    script.textContent = JSON.stringify(entry)
    document.head.appendChild(script)
  })
}

function Seo({
  title,
  description,
  canonicalPath,
  image,
  imageAlt,
  keywords,
  author = 'Posture India',
  type = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    document.title = title

    updateMeta('name', 'description', description)
    updateMeta('name', 'author', author)
    updateMeta('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow')

    if (keywords?.length) {
      updateMeta('name', 'keywords', keywords.join(', '))
    }

    updateMeta('property', 'og:title', title)
    updateMeta('property', 'og:description', description)
    updateMeta('property', 'og:type', type)
    updateMeta('property', 'og:site_name', 'Posture India')

    updateMeta('name', 'twitter:card', 'summary_large_image')
    updateMeta('name', 'twitter:title', title)
    updateMeta('name', 'twitter:description', description)

    if (canonicalPath) {
      const href = `${siteUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
      updateMeta('property', 'og:url', href)
      updateCanonical(canonicalPath)
    }

    if (image) {
      const href = image.startsWith('http') ? image : `${siteUrl}${image}`
      updateMeta('property', 'og:image', href)
      updateMeta('name', 'twitter:image', href)
      updateMeta('property', 'og:image:alt', imageAlt ?? title)
    }

    if (publishedTime) {
      updateMeta('property', 'article:published_time', publishedTime)
    }

    if (modifiedTime) {
      updateMeta('property', 'article:modified_time', modifiedTime)
    }

    updateJsonLd(jsonLd)
  }, [
    author,
    canonicalPath,
    description,
    image,
    imageAlt,
    jsonLd,
    keywords,
    modifiedTime,
    noIndex,
    publishedTime,
    title,
    type,
  ])

  return null
}

export default Seo
