import { defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
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
