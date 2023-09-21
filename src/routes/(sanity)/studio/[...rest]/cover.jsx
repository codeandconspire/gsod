import { LinkIcon } from '@sanity/icons'

import Color from './components/Color.jsx'

export default {
  name: 'cover',
  type: 'document',
  title: 'Cover',
  groups: [
    {
      name: 'main',
      title: 'Main'
    },
    {
      name: 'menu',
      title: 'Menu'
    },
    {
      name: 'chapters',
      title: 'Chapters'
    },
    {
      name: 'meta',
      title: 'Meta'
    }
  ],
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'meta',
      source: 'title',
      description: 'The URL slug for this report',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      group: 'main',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ]
    },
    {
      name: 'subheading',
      type: 'array',
      title: 'Subheading',
      group: 'main',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'main',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ]
    },
    {
      name: 'primaryColor',
      type: 'string',
      title: 'Primary Color',
      group: 'main',
      components: {
        input: Color
      }
    },
    {
      name: 'secondaryColor',
      type: 'string',
      title: 'Secondary Color',
      group: 'main',
      components: {
        input: Color
      }
    },
    {
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      group: 'chapters',
      of: [
        {
          type: 'reference',
          to: [{ type: 'chapter' }]
        }
      ]
    },
    {
      name: 'menu',
      type: 'array',
      title: 'Menu',
      group: 'menu',
      of: [
        {
          name: 'item',
          type: 'object',
          title: 'Item',
          icon: LinkIcon,
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label'
            },
            {
              name: 'link',
              type: 'reference',
              title: 'Link',
              to: [{ type: 'page' }, { type: 'cover' }, { type: 'chapter' }]
            },
            {
              name: 'children',
              type: 'array',
              title: 'Children',
              of: [
                {
                  name: 'item',
                  type: 'object',
                  title: 'Item',
                  fields: [
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Label'
                    },
                    {
                      name: 'link',
                      type: 'reference',
                      title: 'Link',
                      to: [
                        { type: 'page' },
                        { type: 'cover' },
                        { type: 'chapter' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'meta'
    }
  ]
}
