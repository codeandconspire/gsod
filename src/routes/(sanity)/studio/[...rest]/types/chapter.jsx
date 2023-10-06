import { defineType } from 'sanity'

import Color from '../components/Color.jsx'

export default defineType({
  name: 'chapter',
  type: 'document',
  title: 'Chapter',
  preview: {
    select: {
      subheading: 'subheading',
      shortname: 'shortname',
      title: 'title'
    },
    prepare({ shortname, title, subheading }) {
      return {
        title: shortname || title,
        subtitle: subheading
      }
    }
  },
  groups: [
    {
      name: 'main',
      title: 'Main'
    },
    {
      name: 'modules',
      title: 'Modules'
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
      description: 'The URL slug for this chapter',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'shortname'
      }
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      group: 'main',
      options: {
        list: ['Chapter', 'Foreword', 'Region'],
        layout: 'dropdown'
      }
    },
    {
      name: 'shortname',
      type: 'string',
      title: 'Shortname',
      group: 'main',
      description: 'Short name used for summaries and references'
    },
    {
      name: 'title',
      type: 'text',
      title: 'Title',
      group: 'main'
    },
    {
      name: 'subheading',
      type: 'text',
      title: 'Subheading',
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
      name: 'modules',
      type: 'array',
      title: 'Modules',
      group: 'main',
      description:
        'List of modules that make out the different sections of the chapter',
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
