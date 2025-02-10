import { Metadata } from 'next'
import React from 'react'
import PurchaseView from './PurchaseView'

const metadata: Metadata = {
  title: 'Purchase',
}

const PurchasePage = () => {
  return (
    <main>
      <PurchaseView />
    </main>
  )
}

export default PurchasePage
