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
      type: 'string',
      title: 'Title',
      group: 'main'
    },
    {
      name: 'subheading',
      type: 'string',
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
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'meta'
    }
  ]
}
