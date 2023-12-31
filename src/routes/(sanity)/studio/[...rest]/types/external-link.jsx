import { defineType } from 'sanity'
import React from 'react'

export default defineType({
  name: 'externalLink',
  type: 'object',
  title: 'Exernal link',
  icon() {
    return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em">
        <path
          fill="currentcolor"
          d="M212.309-140.001q-30.308 0-51.308-21t-21-51.308v-535.382q0-30.308 21-51.308t51.308-21h252.305V-760H212.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v535.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h535.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-252.305h59.999v252.305q0 30.308-21 51.308t-51.308 21H212.309Zm176.46-206.615-42.153-42.153L717.847-760H560v-59.999h259.999V-560H760v-157.847L388.769-346.616Z"
        />
      </svg>
    )
  },
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Link URL',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        })
    }
  ]
})
