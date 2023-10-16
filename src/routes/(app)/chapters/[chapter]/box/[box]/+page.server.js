import { SANITY_API_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

import { createClient } from '$lib/sanity.js'

export async function load(event) {
  const { params, request } = event
  const url = new URL(request.url)
  const client = createClient({
    preview: url.searchParams.has('preview'),
    token: SANITY_API_TOKEN
  })
  const box = client.fetch(
    `*[_type == "box" && slug.current == $slug][0]{
        ...,
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
  if (!box) throw error(404, 'Box not found')
  return { box }
}
