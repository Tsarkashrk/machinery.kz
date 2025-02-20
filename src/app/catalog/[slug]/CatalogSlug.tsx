'use client'

import Card from '@/components/Cards/Card/Card'
import Button from '@/components/ui/Buttons/Button'
import Input from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import React from 'react'

const brands = ['Bosch', 'NeBosch']

const CatalogSlug = () => {
  return (
    <div className="catalog-slug">
      <div className="catalog-slug__wrapper">
        <Card>
          <div className="catalog-slug__filters">
            <h2 className="catalog-slug__filters-title">Price, KZT</h2>
            <div className="catalog-slug__prices">
              <Input id="from" type="text" placeholder="from 7 990" />
              <Input id="to" type="text" placeholder="to 34 990" />
            </div>
            <hr />
            <h2 className="catalog-slug__filters-title">Brand</h2>
            <div className="catalog-slug__brands">
              {brands.map((item) => (
                <p key={item} className="catalog-slug__brand">
                  {item}
                </p>
              ))}
            </div>
            <div className="catalog-slug__buttons">
              <Button text="Apply" />
              <Button text="Reset" />
            </div>
          </div>
        </Card>
        <Card></Card>
      </div>
    </div>
  )
}

export default CatalogSlug
