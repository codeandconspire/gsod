import { defineType } from 'sanity'
import { DownloadIcon } from '@sanity/icons'

export default defineType({
  name: 'case',
  type: 'document',
  title: 'Case Study',
  groups: [
    {
      name: 'main',
      title: 'Main'
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
      description: 'The URL slug for this case study',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title'
      }
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'main'
    },
    {
      name: 'image',
      type: 'attributedImage'
    },
    {
      name: 'modules',
      type: 'array',
      title: 'Modules',
      group: 'main',
      description:
        'List of modules that make out the different sections of the page',
      of: [
        { type: 'heading' },
        { type: 'richText' },
        { type: 'button' },
        { type: 'megaList' },
        { type: 'teaser' },
        { type: 'figure' },
        { type: 'divider' },
        { type: 'accordion' },
        { type: 'blurbs' },
        { type: 'video' },
        { type: 'footnotes' }
      ]
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
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'meta'
    }
  ]
})
