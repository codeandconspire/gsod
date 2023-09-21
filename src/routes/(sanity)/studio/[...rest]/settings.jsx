export default {
  name: 'settings',
  type: 'document',
  title: 'Settings',
  groups: [
    {
      name: 'main',
      title: 'Main'
    },
    {
      name: 'menu',
      title: 'Menu'
    }
  ],
  fields: [
    {
      name: 'menu',
      type: 'array',
      title: 'Menu',
      group: 'main',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }]
        }
      ]
    }
  ]
}
