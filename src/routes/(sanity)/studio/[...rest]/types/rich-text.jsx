import { BlockContentIcon } from '@sanity/icons'
import { defineType } from 'sanity'

import figureReference from './figure-reference.jsx'
import internalLink from './internal-link.jsx'
import externalLink from './external-link.jsx'
import footnote from './footnote.jsx'

export default defineType({
  name: 'richText',
  type: 'object',
  title: 'Text',
  icon: BlockContentIcon,
  fields: [
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            annotations: [internalLink, externalLink, footnote, figureReference]
          }
        }
      ]
    }
  ]
})
