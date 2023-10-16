import { defineType } from 'sanity'
import React from 'react'

export default defineType({
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  icon() {
    return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em">
        <path
          fill="currentcolor"
          d="M432.307-298.463H281.539q-75.338 0-128.438-53.093-53.1-53.093-53.1-128.422t53.1-128.444q53.1-53.115 128.438-53.115h150.768v59.998H281.539q-50.385 0-85.962 35.577Q160-530.385 160-480q0 50.385 35.577 85.962 35.577 35.577 85.962 35.577h150.768v59.998ZM330.001-450.001v-59.998h299.998v59.998H330.001Zm197.692 151.538v-59.998h150.768q50.385 0 85.962-35.577Q800-429.615 800-480q0-50.385-35.577-85.962-35.577-35.577-85.962-35.577H527.693v-59.998h150.768q75.338 0 128.438 53.093 53.1 53.093 53.1 128.422t-53.1 128.444q-53.1 53.115-128.438 53.115H527.693Z"
        />
      </svg>
    )
  },
  fields: [
    {
      name: 'reference',
      title: 'Link',
      type: 'reference',
      to: [
        { type: 'chapter' },
        { type: 'page' },
        { type: 'box' },
        { type: 'case' },
        { type: 'cover' }
      ]
    }
  ]
})
