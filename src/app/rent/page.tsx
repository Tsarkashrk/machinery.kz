import { Metadata } from 'next'
import React from 'react'
import RentView from './RentSection'

export const metadata: Metadata = {
  title: 'Rent',
}

const RentPage = () => {
  return <RentView />
}

export default RentPage
