import { Metadata } from 'next'
import React from 'react'
import NewView from './NewView'

export const metadata: Metadata = {
  title: 'New',
}

const NewPage = () => {
  return (
    <main>
      <NewView />
    </main>
  )
}

export default NewPage
