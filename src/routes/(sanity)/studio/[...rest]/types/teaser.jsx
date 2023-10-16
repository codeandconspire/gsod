import { defineType } from 'sanity'
import React from 'react'

export default defineType({
  name: 'teaser',
  type: 'object',
  title: 'Teaser',
  description: 'Image with text',
  icon() {
    return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em">
        <path
          fill="currentcolor"
          d="M140.001-433.076v59.998H440v-59.998H140.001Zm0 153.076v59.999H440V-280H140.001Zm0-306.922v59.998H440v-59.998H140.001Zm0-153.077V-680H440v-59.999H140.001ZM600-680v400-400Zm-59.999-59.999h279.998v519.998H540.001v-519.998ZM600-680v400h160v-400H600Z"
        />
      </svg>
    )
  },
  fields: [
    {
      name: 'image',
      type: 'attributedImage'
    },
    {
      name: 'flip',
      type: 'boolean',
      title: 'Flip direction',
      description: 'Switch the image and text sides'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [],
          lists: []
        }
      ]
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
            { type: 'chapter' },
            { type: 'page' },
            { type: 'box' },
            { type: 'case' },
            { type: 'cover' }
          ]
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
})
