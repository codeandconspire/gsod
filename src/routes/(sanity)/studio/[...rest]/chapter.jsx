import React from 'react'

import {
  CommentIcon,
  OlistIcon,
  RemoveIcon,
  StringIcon,
  ImageIcon,
  BlockContentIcon,
  DashboardIcon
} from '@sanity/icons'

import Color from './components/Color.jsx'

export default {
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
                  styles: [{ title: 'Heading', value: 'h2' }],
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
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'H5', value: 'h5' },
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
            }
          },
          fields: [
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [
                {
                  type: 'block',
                  styles: []
                }
              ]
            }
          ]
        },
        {
          name: 'teaser',
          type: 'object',
          title: 'Teaser',
          description: 'Image with text',
          icon() {
            return (
              <svg height="1em" viewBox="0 -960 960 960" width="1em">
                <path
                  fill="currentcolor"
                  d="M140.001-433.076v59.998H440v-59.998H140.001Zm0 153.076v59.999H440V-280H140.001Zm0-306.922v59.998H440v-59.998H140.001Zm0-153.077V-680H440v-59.999H140.001ZM600-680v400-400Zm-59.999-59.999h279.998v519.998H540.001v-519.998ZM600-680v400h160v-400H600Z"
                />
              </svg>
            )
          },
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Description',
                  type: 'string'
                },
                {
                  name: 'attribution',
                  title: 'Attribution',
                  type: 'string'
                }
              ]
            },
            {
              name: 'flip',
              type: 'boolean',
              title: 'Flip direction',
              description: 'Switch the image and text sides'
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description'
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
            },
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                {
                  name: 'document',
                  type: 'reference',
                  title: 'Document',
                  to: [{ type: 'chapter' }, { type: 'page' }]
                },
                {
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                  description: 'Text to display on the link'
                }
              ]
            }
          ]
        },
        {
          name: 'figure',
          type: 'object',
          title: 'Figure',
          icon: ImageIcon,
          preview: {
            select: {
              title: 'description',
              media: 'image'
            }
          },
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              description: 'Image to display',
              options: {
                collapsed: true,
                collapsible: true
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Description',
                  type: 'string'
                },
                {
                  name: 'attribution',
                  title: 'Attribution',
                  type: 'string'
                }
              ]
            },
            {
              name: 'embed',
              type: 'object',
              title: 'Embed',
              options: {
                collapsed: true,
                collapsible: true
              },
              description: 'Embed code to display',
              fields: [
                {
                  name: 'content',
                  type: 'text',
                  title: 'Content',
                  description: 'Be cautious with pasting code from the Internet'
                }
              ]
            },
            {
              name: 'fill',
              type: 'boolean',
              title: 'Fill',
              initialValue: false,
              description: 'Grow the figure to cover as much space as possible'
            },
            {
              name: 'description',
              type: 'array',
              title: 'Description',
              of: [
                {
                  type: 'block',
                  styles: [],
                  lists: [],
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
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' }
                ]
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
