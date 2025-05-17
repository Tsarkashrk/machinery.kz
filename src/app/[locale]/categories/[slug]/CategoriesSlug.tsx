'use client'

import Card from '@/shared/components/Cards/Card/Card'
import Button from '@/shared/ui/Buttons/Button'
import { Input } from '@/shared/ui/Input/Input'
import Label from '@/shared/ui/Label/Label'
import React from 'react'

const brands = ['Bosch', 'NeBosch']

const CategoriesSlug = () => {
  return (
    <section className="categories-slug">
      <div className="categories-slug__wrapper">
        <Card>
          <div className="categories-slug__filters">
            <h2 className="categories-slug__filters-title">Price, KZT</h2>
            <div className="categories-slug__prices">
              <Input id="from" type="text" placeholder="from 7 990" />
              <Input id="to" type="text" placeholder="to 34 990" />
            </div>
            <hr />
            <h2 className="categories-slug__filters-title">Brand</h2>
            <div className="categories-slug__brands">
              {brands.map((item) => (
                <p key={item} className="categories-slug__brand">
                  {item}
                </p>
              ))}
            </div>
            <div className="categories-slug__buttons">
              <Button text="Apply" />
              <Button text="Reset" />
            </div>
          </div>
        </Card>
        <Card></Card>
      </div>
    </section>
  )
}

export default CategoriesSlug
