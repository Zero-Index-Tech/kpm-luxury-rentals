import { useEffect } from 'react'

function upsertMetaTag(selector: string, attributes: Record<string, string>) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector)
  if (existing) {
    Object.entries(attributes).forEach(([key, value]) => existing.setAttribute(key, value))
    return existing
  }

  const element = document.createElement('meta')
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
  document.head.appendChild(element)
  return element
}

function ensureLinkTag(rel: string, href: string) {
  const existing = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (existing) {
    existing.href = href
    return existing
  }

  const element = document.createElement('link')
  element.rel = rel
  element.href = href
  document.head.appendChild(element)
  return element
}

export function usePageMetadata(title: string, description: string) {
  useEffect(() => {
    const fullUrl = `${window.location.origin}${window.location.pathname}`

    document.title = title

    const descriptionMeta = upsertMetaTag('meta[name="description"]', {
      name: 'description',
      content: description,
    })
    descriptionMeta.setAttribute('content', description)

    const ogTitle = upsertMetaTag('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    })
    ogTitle.setAttribute('content', title)

    const ogDescription = upsertMetaTag('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    ogDescription.setAttribute('content', description)

    upsertMetaTag('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    })

    upsertMetaTag('meta[property="og:url"]', {
      property: 'og:url',
      content: fullUrl,
    })

    upsertMetaTag('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: 'KPM Luxury Rentals',
    })

    upsertMetaTag('meta[property="twitter:card"]', {
      property: 'twitter:card',
      content: 'summary_large_image',
    })

    upsertMetaTag('meta[property="twitter:title"]', {
      property: 'twitter:title',
      content: title,
    })

    upsertMetaTag('meta[property="twitter:description"]', {
      property: 'twitter:description',
      content: description,
    })

    ensureLinkTag('canonical', fullUrl)
  }, [title, description])
}