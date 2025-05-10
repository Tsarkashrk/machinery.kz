import { Metadata } from 'next'
import React from 'react'
import NewSection from './NewSection'

export const metadata: Metadata = {
  title: 'New',
}

const NewPage = () => {
  return <NewSection />
}

export default NewPage
