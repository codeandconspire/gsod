import { OlistIcon } from '@sanity/icons'
import { defineType } from 'sanity'

import figureReference from './figure-reference.jsx'
import internalLink from './internal-link.jsx'
import externalLink from './external-link.jsx'
import footnote from './footnote.jsx'

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
          lists: [{ title: 'Number', value: 'number' }],
          marks: {
            annotations: [internalLink, externalLink, footnote, figureReference]
          }
        }
      ]
    },
    {
      name: 'link',
      type: 'object',
      title: 'Page to get colors from',
      fields: [
        {
          name: 'document',
          type: 'reference',
          title: 'Document',
          to: [{ type: 'chapter' }, { type: 'page' }]
        }
      ]
    }
  ]
})
