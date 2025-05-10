import { Metadata } from 'next'
import CatalogSlug from './CatalogSlug'
import React from 'react'

export const metadata: Metadata = {
  title: 'Slug'
}

const CatalogSlugPage = () => {
  return <CatalogSlug />
}

export default CatalogSlugPage
