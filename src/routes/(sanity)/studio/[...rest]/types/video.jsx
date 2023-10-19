import { DocumentVideoIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'video',
  type: 'object',
  title: 'Video',
  icon: DocumentVideoIcon,
  preview: {
    prepare() {
      return { title: 'Video' }
    }
  },
  fields: [
    {
      name: 'video',
      type: 'url',
      title: 'Video',
      description: 'URL to video, e.g. https://youtu.be/xkEhnV9_eSM'
    }
  ]
})
