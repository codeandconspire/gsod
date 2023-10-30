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

  const [{ meta }, chapter] = await Promise.all([
    parent(),
    client.fetch(
      `*[_type == "chapter" && slug.current == $slug][0]{
      ...,
      featuredImage{
        ...,
        asset->
      },
      authorImage{
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
      },
      "cover": *[_type == "cover" && references(^._id)][0]{
        _type,
        slug,
        menu[]{
          label,
          link->{
            _type,
            slug
          },
          children[]{
            label,
            link->{
              _type,
              slug
            }
          }
        }
      }
    }`,
      { slug: params.chapter }
    )
  ])

  if (!chapter) throw error(404, 'Page not found')

  return {
    chapter,
    meta: {
      ...meta,
      title: `${chapter.title.replace(/\s+/g, ' ')} – ${meta.title}`,
      description: asText(chapter.description) || meta.description,
      image: chapter.featuredImage || meta.image
    }
  }
}
