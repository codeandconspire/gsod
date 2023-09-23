import {
  CommentIcon,
  OlistIcon,
  RemoveIcon,
  StringIcon,
  ImageIcon,
  BlockContentIcon
} from '@sanity/icons'

import Color from './components/Color.jsx'

export default {
  name: 'chapter',
  type: 'document',
  title: 'Chapter',
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
      source: 'shortname',
      description: 'The URL slug for this chapter',
      validation: (Rule) => Rule.required()
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
      type: 'string',
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
      group: 'modules',
      description:
        'List of modules that make out the different sections of the chapter',
      of: [
        {
          name: 'heading',
          type: 'object',
          title: 'Heading',
          icon: StringIcon,
          fields: [
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'H5', value: 'h5' },
                    { title: 'H6', value: 'h6' }
                  ],
                  lists: []
                }
              ]
            }
          ]
        },
        {
          name: 'richText',
          type: 'object',
          title: 'Text',
          icon: BlockContentIcon,
          fields: [
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'H5', value: 'h5' },
                    { title: 'H6', value: 'h6' },
                    { title: 'Quote', value: 'blockquote' }
                  ],
                  marks: {
                    annotations: [
                      {
                        name: 'footnote',
                        type: 'object',
                        title: 'Footnote',
                        icon: CommentIcon,
                        fields: [
                          {
                            title: 'Content',
                            name: 'content',
                            type: 'array',
                            of: [{ type: 'block', styles: [] }]
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'megaList',
          type: 'object',
          title: 'Mega List',
          icon: OlistIcon,
          preview: {
            select: {
              content: 'content'
            },
            prepare({ content }) {
              return {
                title: content
                  .flatMap((field) =>
                    field.content.flatMap(
                      (item, index) =>
                        `${index + 1}. ${item.children.map(
                          (child) => child.text
                        )}`
                    )
                  )
                  .join(' ')
              }
            }
          },
          fields: [
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [
                {
                  name: 'item',
                  type: 'object',
                  title: 'Item',
                  fields: [
                    {
                      name: 'content',
                      type: 'array',
                      title: 'Content',
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
            }
          ]
        },
        {
          name: 'graph',
          type: 'object',
          title: 'Graph',
          icon: ImageIcon,
          fields: [
            { name: 'image', type: 'image' },
            {
              name: 'fill',
              type: 'boolean',
              title: 'Fill',
              initialValue: false,
              description: 'Fill the entire width of the screen'
            },
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [
                {
                  type: 'block',
                  styles: [],
                  lists: []
                }
              ]
            }
          ]
        },
        {
          name: 'divider',
          type: 'object',
          title: 'Divider',
          icon: RemoveIcon,
          preview: {
            select: {
              title: 'size',
              subheading: 'visible'
            }
          },
          fields: [
            {
              name: 'size',
              type: 'string',
              title: 'Size',
              initialValue: 'Medium',
              options: {
                list: ['Small', 'Medium', 'Large']
              }
            },
            {
              name: 'visible',
              type: 'boolean',
              title: 'Visible',
              initialValue: false,
              description: 'Show a horizontal rule'
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
}
