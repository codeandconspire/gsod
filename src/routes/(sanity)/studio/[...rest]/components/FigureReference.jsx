import { Card, Box, Flex, Text, Spinner, Autocomplete } from '@sanity/ui'
import { useClient, useFormValue, set, unset } from 'sanity'
import React, { useState, useEffect } from 'react'

import { asText } from '$lib/Text.svelte'

export default function FigureReference({ value, onChange }) {
  const [document, setDocument] = useState(
    /** @type {({ _id: string, modules: any[] }|Error)?} */ (null)
  )
  const client = useClient({ apiVersion: '2023-09-19' })
  const type = useFormValue(['_type'])
  const id = useFormValue(['_id'])

  useEffect(function () {
    client
      .fetch(
        `*[_id == "${id}"][0]{
          _id,
          ${
            type === 'chapter'
              ? `
                modules[] {
                  _type == "figure" => {
                    _key,
                    _type,
                    description,
                    image {
                      asset->{
                        url
                      }
                    }
                  }
                }
              `
              : ''
          }
        }
      `
      )
      .then(setDocument, setDocument)
  }, [])

  if (document instanceof Error) throw new Error(document.message)

  const figures = document?.modules.filter((item) => item._type === 'figure')

  return document ? (
    <Autocomplete
      openButton
      value={value}
      onChange={(value) => onChange(value ? set(value) : unset())}
      fontSize={[2, 2, 3]}
      padding={[3, 3, 4]}
      icon={FigureReferenceIcon}
      id={`${document._id}-modules-autocomplete`}
      placeholder="Type to find figure in this document"
      filterOption={(query, option) =>
        option.key.toLowerCase().includes(query.toLowerCase())
      }
      options={figures?.map((item, index) => ({
        key: `Figure ${index + 1}: ${asText(item.description)}`,
        value: item._key,
        index: index + 1,
        payload: item
      }))}
      renderValue={(value, option) => {
        if (option) return option.key
        if (!figures) return 'Not found'

        const figure = figures.find((item) => item._key === value)
        if (!figure) return 'Not found'

        return `Figure ${figures.indexOf(figure) + 1}: ${asText(
          figure.description
        )}`
      }}
      renderOption={(option) => (
        <Card as="button">
          <Flex align="center">
            {option.payload.image ? (
              <Box paddingLeft={3} paddingY={2}>
                <img
                  alt=""
                  src={option.payload.image.asset.url}
                  style={{ width: '2em', display: 'block' }}
                />
              </Box>
            ) : null}
            <Box flex={1} padding={3}>
              <Text size={[2, 2, 3]}>Figure {option.index}</Text>
            </Box>
          </Flex>
        </Card>
      )}
    />
  ) : (
    <Flex justify="center">
      <Spinner muted />
    </Flex>
  )
}

export function FigureReferenceIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 -960 960 960">
      <path
        fill="currentcolor"
        d="M294.616-290.001h59.999v-259.998h-59.999v259.998Zm155.385 0h59.998v-379.998h-59.998v379.998Zm155.384 0h59.999v-139.998h-59.999v139.998Zm-393.076 150q-30.308 0-51.308-21t-21-51.308v-535.382q0-30.308 21-51.308t51.308-21h535.382q30.308 0 51.308 21t21 51.308v535.382q0 30.308-21 51.308t-51.308 21H212.309Zm0-59.999h535.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-535.382q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H212.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v535.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846ZM200-760V-200-760Z"
      />
    </svg>
  )
}
