import { defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'button',
  type: 'object',
  title: 'Button',
  description: 'Button in theme color',
  icon: LinkIcon,
  preview: {
    select: {
      title: 'label'
    }
  },
  fields: [
    {
      name: 'link',
      type: 'object',
      title: 'Link',
      fields: [
        {
          name: 'document',
          type: 'reference',
          title: 'Document',
          to: [
            { type: 'chapter' },
            { type: 'page' },
            { type: 'box' },
            { type: 'case' },
            { type: 'cover' }
          ]
        },
        {
          name: 'label',
          type: 'string',
          title: 'Label',
          description: 'Text to display on the link'
        }
      ]
    }
  ]
})
