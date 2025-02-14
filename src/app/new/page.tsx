import { Metadata } from 'next'
import React from 'react'
import NewView from './NewSection'

export const metadata: Metadata = {
  title: 'New',
}

const NewPage = () => {
  return (
      <NewView />
  )
}

export default NewPage
