export default {
  name: 'page',
  type: 'document',
  title: 'Page',
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
          type: 'block'
        }
      ]
    }
  ]
}
