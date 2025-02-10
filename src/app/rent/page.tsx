import { Metadata } from 'next'
import React from 'react'
import RentView from './RentView'

export const metadata: Metadata = {
  title: 'Rent',
}

const RentPage = () => {
  return (
    <main>
      <RentView />
    </main>
  )
}

export default RentPage
