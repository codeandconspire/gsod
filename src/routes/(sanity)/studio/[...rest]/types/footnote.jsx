import { defineType } from 'sanity'
import React from 'react'

import figureReference from './figure-reference.jsx'
import internalLink from './internal-link.jsx'
import externalLink from './external-link.jsx'

export default defineType({
  name: 'footnote',
  type: 'object',
  title: 'Add footnote',
  icon() {
    return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em">
        <path
          fill="currentcolor"
          d="M420.001-130.001v-245.308L207.462-252.463l-59.999-104.075L360.001-480 147.463-602.462l59.999-104.075 212.539 122.846v-246.308h119.998v246.308l212.539-122.846 59.999 104.075L599.999-480l212.538 123.462-59.999 104.075-212.539-122.846v245.308H420.001Z"
        />
      </svg>
    )
  },
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          marks: {
            annotations: [internalLink, externalLink, figureReference]
          }
        }
      ]
    }
  ]
})
