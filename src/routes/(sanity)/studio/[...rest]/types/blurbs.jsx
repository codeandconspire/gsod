import { defineType } from 'sanity'
import React from 'react'

export default defineType({
  name: 'blurbs',
  type: 'object',
  title: 'Blurbs',
  icon() {
    return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em">
        <path
          fill="currentcolor"
          d="M140.001-520v-299.999H440V-520H140.001Zm0 379.999V-440H440v299.999H140.001ZM520-520v-299.999h299.999V-520H520Zm0 379.999V-440h299.999v299.999H520ZM200-579.999h180.001V-760H200v180.001Zm379.999 0H760V-760H579.999v180.001Zm0 379.999H760v-180.001H579.999V-200ZM200-200h180.001v-180.001H200V-200Zm379.999-379.999Zm0 199.998Zm-199.998 0Zm0-199.998Z"
        />
      </svg>
    )
  },
  preview: {
    select: {
      items: 'items'
    },
    prepare({ items }) {
      return {
        title: 'Blurbs',
        subtitle: items.map((item) => item.title).join(', ')
      }
    }
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [
        {
          name: 'item',
          type: 'object',
          title: 'Item',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title'
            },
            {
              name: 'subheading',
              type: 'string',
              title: 'Subheading'
            },
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                {
                  name: 'document',
                  type: 'reference',
                  title: 'Document',
                  to: [
                    { type: 'cover' },
                    { type: 'chapter' },
                    { type: 'page' },
                    { type: 'case' }
                  ]
                },
                {
                  name: 'popup',
                  type: 'boolean',
                  title: 'Popup',
                  description: 'Open the link in a popup window'
                },
                {
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                  description: 'Text to display on the link'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
