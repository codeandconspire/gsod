import { OlistIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'megaList',
  type: 'object',
  title: 'Mega List',
  icon: OlistIcon,
  preview: {
    select: {
      title: 'content'
    }
  },
  fields: [
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [{ title: 'Number', value: 'number' }]
        }
      ]
    }
  ]
})
