import { defineType } from 'sanity'

export default defineType({
  name: 'attributedImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'alt',
      title: 'Alt Description',
      type: 'string'
    },
    {
      name: 'attribution',
      title: 'Attribution',
      type: 'string'
    }
  ]
})
