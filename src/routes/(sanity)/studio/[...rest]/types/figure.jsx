import { FigureReferenceIcon } from '../components/FigureReference.jsx'
import { defineType } from 'sanity'

import internalLink from './internal-link.jsx'
import externalLink from './external-link.jsx'
import { asText } from '$lib/Text.svelte'
import footnote from './footnote.jsx'

export default defineType({
  name: 'figure',
  type: 'object',
  title: 'Figure',
  icon: FigureReferenceIcon,
  preview: {
    select: {
      description: 'description',
      media: 'image'
    },
    prepare({ description, media }) {
      return {
        title: asText(description) || 'Figure',
        media
      }
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
    },
    {
      name: 'source',
      type: 'array',
      title: 'Source',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [internalLink, externalLink]
          }
        }
      ]
    }
  ]
})
