import { Metadata } from 'next'
import React from 'react'
import CatalogSection from './CatalogSection'

const metadata: Metadata = {
  title: 'Catalog',
}

const CatalogPage = () => {
  return <CatalogSection />
}

export default CatalogPage
