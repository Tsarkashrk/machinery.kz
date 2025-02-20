'use client'

import Card from '@/components/Cards/Card/Card'
import Button from '@/components/ui/Buttons/Button'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Input from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import TextMuted from '@/components/ui/TextMuted/TextMuted'
import { ICON_SIZE } from '@/constants/constants'
import { Plus } from 'lucide-react'
import React from 'react'

const NewSection = () => {
  return (
    <section className="new-section">
      <div className="new-section__wrapper">
        <div className="new-section__cards">
          <Card>
            <div className="new-section__header">
              <div className="new-section__header-text">
                <h1 className="new-section__title">Create New Listing</h1>
                <TextMuted text="Please fill in all the details to get approval for listing creation." />
              </div>
              <div className="new-section__header-buttons">
                <Button text="Previous" variant="outlined" icon={<ChevronLeft size={ICON_SIZE} />} />
                <Button text="Next" icon={<ChevronRight size={ICON_SIZE} />} />
              </div>
            </div>
          </Card>
          <Card>
            <h1 className="new-section__title">Upload Images</h1>
            <hr />
            <div className="new-section__images">
              <img className="new-section__image" src="assets/GSR12V-30.webp" alt="" />
            </div>
            <Button icon={<Plus size={ICON_SIZE} />} text="Add Pictures" variant="new" width="100%" />
          </Card>
          <Card>
            <h1 className="new-section__title">Equipment information</h1>
            <hr />
            <div className="new-section__info">
              <div className="new-section__info-blocks">
                <div className="new-section__info-block">
                  <Label text="Brand" forElement="brand" />
                  <Input id="brand" type="text" placeholder='Bosch'/>
                </div>
                <div className="new-section__info-block">
                  <Label text="Model" forElement="model" />
                  <Input id="model" type="text" placeholder='GSR 12V-30'/>
                </div>
              </div>
              <div className="new-section__info-blocks">
                <div className="new-section__info-block">
                  <Label text="Category" forElement="category" />
                  <Input id="category" type="text" placeholder='Driller'/>
                </div>
                <div className="new-section__info-block">
                  <Label text="Condition" forElement="condition" />
                  <Input id="condition" type="text" placeholder='New'/>
                </div>
              </div>
              <div className="new-section__info-blocks">
                <div className="new-section__info-block">
                  <Label text="Description" forElement="description" />
                  <Input id="description" type="text" placeholder='Very powerfull machine'/>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default NewSection
