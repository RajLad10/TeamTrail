import React from "react"
import { useDropzone } from "react-dropzone"

const Dropzone = ({ rootClass, inputClass, children, ...rest }) => {
  const { getRootProps, getInputProps } = useDropzone({
    ...rest,
  })

  return (
    <div {...getRootProps()} className={rootClass}>
      <input {...getInputProps()} className={inputClass} />
      {children}
    </div>
  )
}

export default Dropzone
