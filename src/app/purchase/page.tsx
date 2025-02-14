import { Metadata } from 'next'
import React from 'react'
import PurchaseView from './PurchaseSection'

const metadata: Metadata = {
  title: 'Purchase',
}

const PurchasePage = () => {
  return (
      <PurchaseView />
  )
}

export default PurchasePage
