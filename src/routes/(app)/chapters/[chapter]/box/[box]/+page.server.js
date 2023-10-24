import { SANITY_API_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

import { createClient } from '$lib/sanity.js'
import { asText } from '$lib/Text.svelte'

export const prerender = true

export async function load({ params, request, parent }) {
  const url = new URL(request.url)
  const client = createClient({
    preview: url.searchParams.has('preview'),
    token: SANITY_API_TOKEN
  })

  const [{ meta }, box] = await Promise.all([
    parent(),
    client.fetch(
      `*[_type == "box" && slug.current == $slug][0]{
        ...,
        featuredImage{
          ...,
          asset->
        },
        modules[]{
          ...,
          _type == 'blurbs' => {
            items[]{
              ...,
              link{
                ...,
                document->{
                  _type,
                  slug,
                  image{
                    ...,
                    asset->
                  }
                }
              }
            }
          },
          _type == "figure" => {
            ...,
            image{
              ...,
              asset->
            },
            description[]{
              ...,
              markDefs[]{
                ...,
                _type == "internalLink" => {
                  ...,
                  reference->{
                    _type,
                    slug
                  }
                },
                _type == "footnote" => {
                  ...,
                  content[]{
                    ...,
                    markDefs[]{
                      ...,
                      _type == "internalLink" => {
                        ...,
                        reference->{
                          _type,
                          slug
                        }
                      }
                    }
                  }
                }
              }
            },
            source[]{
              ...,
              markDefs[]{
                ...,
                _type == "internalLink" => {
                  ...,
                  reference->{
                    _type,
                    slug
                  }
                }
              }
            }
          },
          _type == "teaser" => {
            image{
              ...,
              asset->
            },
            link{
              ...,
              document->{
                _type,
                slug,
                primaryColor,
                secondaryColor,
                darkColor
              }
            }
          },
          _type == "button" => {
            link{
              ...,
              document->{
                _type,
                slug,
                primaryColor,
                secondaryColor,
                darkColor
              }
            }
          },
          _type == "megaList" => {
            link{
              ...,
              document->{
                _type,
                slug,
                primaryColor,
                secondaryColor,
                darkColor
              }
            }
          },
          _type == "richText" => {
            ...,
            content[]{
              ...,
              markDefs[]{
                ...,
                _type == "internalLink" => {
                  ...,
                  reference->{
                    _type,
                    slug
                  }
                },
                _type == "footnote" => {
                  ...,
                  content[]{
                    ...,
                    markDefs[]{
                      ...,
                      _type == "internalLink" => {
                        ...,
                        reference->{
                          _type,
                          slug
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`,
      { slug: params.box }
    )
  ])

  if (!box) throw error(404, 'Box not found')
  const richText = box.modules.find((m) => m._type === 'richText')

  return {
    box,
    meta: {
      ...meta,
      title: `${box.title.replace(/\s+/g, ' ')} – ${meta.title}`,
      description:
        asText(box.description) ||
        asText(richText?.content.slice(0, 1)) ||
        meta.description,
      image: box.featuredImage || meta.image
    }
  }
}
