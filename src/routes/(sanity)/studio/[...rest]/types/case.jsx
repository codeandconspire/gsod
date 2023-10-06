import { defineType } from 'sanity'

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
        { type: 'megaList' },
        { type: 'teaser' },
        { type: 'figure' },
        { type: 'divider' },
        { type: 'accordion' },
        { type: 'blurbs' },
        { type: 'footnotes' }
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
