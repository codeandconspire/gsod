export default {
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
  fields: [
    {
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image'
    }
  ]
}
