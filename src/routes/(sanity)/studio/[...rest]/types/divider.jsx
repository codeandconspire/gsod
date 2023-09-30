import { RemoveIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'divider',
  type: 'object',
  title: 'Divider',
  icon: RemoveIcon,
  preview: {
    select: {
      title: 'size',
      subheading: 'visible'
    }
  },
  fields: [
    {
      name: 'size',
      type: 'string',
      title: 'Size',
      initialValue: 'Medium',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' }
        ]
      }
    },
    {
      name: 'visible',
      type: 'boolean',
      title: 'Visible',
      initialValue: false,
      description: 'Show a horizontal rule'
    }
  ]
})
