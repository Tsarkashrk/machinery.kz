import { Metadata } from 'next'
import React from 'react'
import BrandsSection from './BrandsSection'

export const metadata: Metadata = {
  title: 'Brands',
}

const BrandsPage = () => {
  return <BrandsSection />
}

export default BrandsPage
