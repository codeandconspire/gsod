import { defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'settings',
  type: 'document',
  title: 'Settings',
  preview: {
    prepare() {
      return {
        title: 'Settings'
      }
    }
  },
  groups: [
    {
      name: 'main',
      title: 'Main'
    },
    {
      name: 'menu',
      title: 'Footer menu'
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Site description'
    },
    {
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image'
    },
    {
      name: 'menu',
      type: 'array',
      title: 'Footer link groups',
      group: 'menu',
      of: [
        {
          name: 'item',
          type: 'object',
          title: 'Link group',
          icon: LinkIcon,
          preview: {
            select: {
              children: 'children'
            },
            prepare({ children }) {
              return {
                title: children.map((item) => item.label).join(', ')
              }
            }
          },
          fields: [
            {
              name: 'children',
              type: 'array',
              title: 'Links',
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
                      title: 'Link to a page',
                      to: [
                        { type: 'page' },
                        { type: 'cover' },
                        { type: 'chapter' }
                      ]
                    },
                    {
                      name: 'url',
                      type: 'url',
                      title: 'Link to external URL',
                      validation: (Rule) =>
                        Rule.uri({
                          scheme: ['http', 'https', 'mailto', 'tel']
                        })
                    },
                    {
                      name: 'file',
                      type: 'file',
                      title: 'Link to a file'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
