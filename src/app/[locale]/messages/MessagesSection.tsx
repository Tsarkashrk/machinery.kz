'use client'

import { ChatWindow } from '@/3-widgets/chat-window'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { Title } from '@/6-shared/ui/Title/Title'
import React from 'react'

const MessagesSection = () => {
  return (
    <section className="messages-section">
      <div className="messges-section__wrapper">
        <SectionWithContent>
          <Title>Чаты</Title>
          <ChatWindow />
        </SectionWithContent>
      </div>
    </section>
  )
}

export default MessagesSection
