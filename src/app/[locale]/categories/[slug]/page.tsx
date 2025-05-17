import { Metadata } from 'next'
import CategoriesSlug from './CategoriesSlug'
import React from 'react'

export const metadata: Metadata = {
  title: 'Slug',
}

const categoriesSlugPage = () => {
  return <CategoriesSlug />
}

export default categoriesSlugPage
