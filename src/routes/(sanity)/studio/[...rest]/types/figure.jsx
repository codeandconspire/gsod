import { FigureReferenceIcon } from '../components/FigureReference.jsx'
import { defineType } from 'sanity'

import internalLink from './internal-link.jsx'
import externalLink from './external-link.jsx'
import footnote from './footnote.jsx'

export default defineType({
  name: 'figure',
  type: 'object',
  title: 'Figure',
  icon: FigureReferenceIcon,
  preview: {
    select: {
      title: 'description',
      media: 'image'
    }
  },
  fields: [
    {
      name: 'image',
      type: 'attributedImage'
    },
    {
      name: 'embed',
      type: 'object',
      title: 'Embed',
      options: {
        collapsed: true,
        collapsible: true
      },
      description: 'Embed code to display',
      fields: [
        {
          name: 'content',
          type: 'text',
          title: 'Content',
          description: 'Be cautious with pasting code from the Internet'
        }
      ]
    },
    {
      name: 'fill',
      type: 'boolean',
      title: 'Fill',
      initialValue: false,
      description: 'Grow the figure to cover as much space as possible'
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [internalLink, externalLink, footnote]
          }
        }
      ]
    }
  ]
})
