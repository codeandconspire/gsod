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

  const [{ meta }, _case] = await Promise.all([
    parent(),
    client.fetch(
      `*[_type == "case" && slug.current == $slug][0]{
        ...,
        downloads[]{
          ...,
          file{
            asset->
          },
          thumbnail{
            asset->
          }
        },
        image{
          ...,
          asset->
        },
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
      { slug: params.case }
    )
  ])

  if (!_case) throw error(404, 'Case not found')
  const richText = _case.modules.find((m) => m._type === 'richText')

  // Find first paragaph that is not an em (used for author name)
  const firstParagraph = richText.content.find(
    (block) =>
      block.style === 'normal' &&
      (block.children.length > 1 || !block.children[0].marks.length)
  )

  return {
    case: _case,
    meta: {
      ...meta,
      title: `${_case.title.replace(/\s+/g, ' ')} – ${meta.title}`,
      description: firstParagraph ? asText([firstParagraph]) : meta.description,
      image: _case.featuredImage || _case.image || meta.image
    }
  }
}
