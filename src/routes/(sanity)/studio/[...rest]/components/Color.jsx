import React from 'react'

import styles from './styles.module.css'

export default function Color({ elementProps }) {
  const onblur = (event) => {
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
    }
  }
  return (
    <fieldset className={styles['color-group']}>
      <input {...elementProps} type="color" />
      <input
        {...elementProps}
        type="text"
        onBlur={onblur}
        placeholder="#abc123"
        pattern="#[0-9a-fA-Z]{6}"
        className={styles.colorinput}
      />
    </fieldset>
  )
}
