import { StringIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'heading',
  type: 'object',
  title: 'Heading',
  icon: StringIcon,
  fields: [
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Heading', value: 'h2' }],
          lists: []
        }
      ]
    }
  ]
})
