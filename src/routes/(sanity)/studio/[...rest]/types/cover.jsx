import { LinkIcon, DownloadIcon } from '@sanity/icons'
import { defineType } from 'sanity'

import Color from '../components/Color.jsx'

export default defineType({
  name: 'cover',
  type: 'document',
  title: 'Cover',
  preview: {
    prepare() {
      return {
        title: 'Cover Page'
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
      title: 'Menu'
    },
    {
      name: 'highlights',
      title: 'Highlights'
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
      description: 'The URL slug for this report',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title'
      }
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
          lists: []
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
          lists: []
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
          lists: []
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
      name: 'darkColor',
      type: 'string',
      title: 'Dark Complement Color',
      group: 'main',
      components: {
        input: Color
      }
    },
    {
      name: 'downloads',
      type: 'array',
      title: 'Downloads',
      group: 'main',
      of: [
        {
          type: 'object',
          title: 'Item',
          icon: DownloadIcon,
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description'
            },
            {
              type: 'file',
              name: 'file',
              title: 'File'
            },
            {
              type: 'image',
              name: 'thumbnail',
              title: 'Thumbnail'
            }
          ]
        }
      ]
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      group: 'highlights',
      of: [
        {
          name: 'item',
          type: 'object',
          title: 'Item',
          fields: [
            {
              name: 'text',
              type: 'array',
              title: 'Text',
              of: [
                {
                  type: 'block',
                  styles: [],
                  lists: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'featuredChapter',
      type: 'object',
      title: 'Featured Chapter',
      group: 'chapters',
      fields: [
        {
          name: 'link',
          type: 'reference',
          title: 'Chapter',
          to: [{ type: 'chapter' }]
        },
        {
          name: 'image',
          type: 'image'
        },
        {
          name: 'heading',
          type: 'array',
          title: 'Heading',
          of: [
            {
              type: 'block',
              styles: [],
              lists: []
            }
          ]
        },
        {
          name: 'subheading',
          type: 'array',
          title: 'Subheading',
          of: [
            {
              type: 'block',
              styles: [],
              lists: []
            }
          ]
        },
        {
          name: 'label',
          type: 'string',
          title: 'Link label',
          description: 'Text shown in the link to the chapter'
        }
      ]
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
})
