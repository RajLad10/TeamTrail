import React, {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react"
import { Link } from "react-router-dom"
import { Progress } from "reactstrap"
import { useDropzone } from "react-dropzone"

import { s3 } from "services/aws_helper"
import { imageUrl } from "constants/aws"
import fileIcon from "constants/fileIcon"
import { GalleryImg, DeleteSVGImg } from "constants/importsSVG"
import { attachmentsExtension } from "utils/attachments"

import Delete from "common/CustomModal/Delete"

const CustomAllDropZone = forwardRef(
  (
    {
      handleOnDrop,
      src,
      accept,
      userId,
      folderName,
      bucketName,
      error,
      errorMessage,
      handleRemove = () => {},
      handleStartLoading,
      handleStopLoading,
    },
    ref
  ) => {
    const [progress, setProgress] = useState({
      0: 0,
    })
    const [totalFiles, setTotalFiles] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [attachment, setAttachment] = useState("")
    const [customErrorMessage, setCustomErrorMessage] = useState("")

    const progressValue = useMemo(() => {
      const values = Object.values(progress)
      return values.reduce((a, b) => a + b, 0) / totalFiles
    }, [progress, totalFiles])

    useEffect(() => {
      if (progressValue === 100 && isUploading) {
        setIsUploading(false)
        handleStopLoading()
        setProgress({ 0: 0 })
        setTotalFiles(0)
      }
    }, [progressValue, isUploading, handleStopLoading])

    useImperativeHandle(
      ref,
      () => ({
        isUploading,
      }),
      [isUploading]
    )

    //function that validates the .mkv file
    const validateFile = file => {
      const allowedExtensions = process.env.REACT_APP_EXTENSION_FILE
      const fileExtension = file.name.split(".").pop().toLowerCase()
      if (!allowedExtensions.includes(fileExtension)) {
        setCustomErrorMessage(`File type .${fileExtension} is not supported.`)
        return {
          code: "file-invalid-type",
          message: `File type .${fileExtension} is not supported.`,
        }
      }
      return null
    }

    const onDrop = useCallback(
      acceptedFiles => {
        const files = acceptedFiles

        files.forEach((file, i) => {
          if (!!!file) {
            setIsUploading(false)
            handleStopLoading()
            return
          } else {
            setIsUploading(true)
            handleStartLoading()
            setTotalFiles(acceptedFiles.length)
            const fileName = file.name
              .split(".")
              .slice(0, -1)
              .join(".")
              .replace(" ", "_")

            // const fileExtension = attachmentsExtension(file.name)
            const fileExtension = "." + file.name.split(".").pop()

            const currentTime = file.lastModified

            const fileFullName = fileName + "_" + currentTime + fileExtension

            const params = {
              ACL: "public-read",
              Key: fileFullName,
              ContentType: file.type,
              Body: file,
            }
            setCustomErrorMessage("")
            s3(userId, folderName, bucketName)
              .upload(params)
              .on("httpUploadProgress", function (evt) {
                const value = Math.round((evt.loaded / evt.total) * 100)
                setProgress(prev => ({
                  ...prev,
                  [i]: value,
                }))
              })
              .send(function (err, data) {
                if (err) {
                  return
                }
                if (!!handleOnDrop && typeof handleOnDrop === "function")
                  handleOnDrop(data.Location, file.name)
              })
          }
        })
      },
      [
        userId,
        folderName,
        bucketName,
        handleOnDrop,
        handleStartLoading,
        handleStopLoading,
      ]
    )

    const { getRootProps, getInputProps, fileRejections, isDragActive } =
      useDropzone({
        onDrop,
        multiple: true,
        accept,
        validator: validateFile,
      })

    const handleDeleteClose = () => {
      setDeleteModal(false)
    }

    const handleHubDelete = () => {
      handleRemove(attachment)
      handleDeleteClose()
    }

    return (
      <>
        <div className="mb-3 mt20 dropzone-wrapper">
          <div
            {...getRootProps()}
            className="dropzone dz-clickable"
            style={{
              borderColor:
                error || !!fileRejections.length
                  ? "#F46A6A"
                  : isDragActive
                  ? "rgba(52, 195, 143)"
                  : "#AECF6D",
            }}
          >
            <div className="dz-message c-flex-directionnew mt20 uploadFileIcon">
              <GalleryImg alt="drop files here" className="uploadIcon" />
              <input {...getInputProps()} />
              {(error && !!errorMessage) ||
              !!fileRejections.length ||
              !!customErrorMessage ? (
                <span className="text-danger text-capitalize text-center">
                  {errorMessage ||
                    fileRejections[0]?.errors[0]?.message ||
                    customErrorMessage ||
                    ""}
                </span>
              ) : isDragActive ? (
                <p className="dz-message">Drop here...</p>
              ) : (
                <p className="mb-0 text-center dropzone-font">
                  Drag and drop your image here
                </p>
              )}
            </div>
          </div>

          {isUploading && (
            <div className="mt-1">
              <Progress color="primary" value={progressValue}>
                {progressValue.toFixed(0)}%
              </Progress>
            </div>
          )}

          <div className="pb-0 gap-3 overflow-x-auto">
            {src?.map(item => {
              return item?.attachments.split(".").pop().toLowerCase() ===
                "jpg" ||
                item?.attachments.split(".").pop().toLowerCase() === "jpeg" ||
                item?.attachments.split(".").pop().toLowerCase() === "png" ? (
                <div className="image-container mt-2" key={item.attachments}>
                  <div className="c-flex">
                    <img
                      className="icon-image2 "
                      src={item.attachments.replace(
                        imageUrl.S3HUB_URL,
                        imageUrl.HUB_DISPLAY_URL
                      )}
                      alt="attachment"
                    />
                    <span
                      className="line-dot pl-2 word-break text-eclipse"
                      id="break-word"
                    >
                      {item?.attachment_name === "" ||
                      item?.attachment_name === null
                        ? item?.attachments
                            .substring(item?.attachments.lastIndexOf("/") + 1)
                            .split(".")[0]
                        : item?.attachment_name
                            .substring(
                              item?.attachment_name.lastIndexOf("/") + 1
                            )
                            .split(".")[0]}
                    </span>
                    <span>
                      {attachmentsExtension(
                        item?.attachment_name === "" ||
                          item?.attachment_name === null
                          ? item?.attachments
                          : item?.attachment_name
                      )}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      setDeleteModal(true)
                      setAttachment(item.attachments)
                    }}
                    className="c-icon-square-dash delete-square"
                  >
                    <DeleteSVGImg
                      title="Delete Attachment"
                      alt="delete Attachment icon"
                      className="drop-delete-icon"
                    />
                  </div>
                </div>
              ) : item?.attachments.split(".").pop().toLowerCase() === "doc" ||
                item?.attachments.split(".").pop().toLowerCase() === "docx" ||
                item?.attachments.split(".").pop().toLowerCase() === "docm" ||
                item?.attachments.split(".").pop().toLowerCase() === "pdf" ||
                item?.attachments.split(".").pop().toLowerCase() === "xls" ||
                item?.attachments.split(".").pop().toLowerCase() === "xlt" ||
                item?.attachments.split(".").pop().toLowerCase() === "xlm" ||
                item?.attachments.split(".").pop().toLowerCase() === "xlsx" ||
                item?.attachments.split(".").pop().toLowerCase() === "pptx" ? (
                <div className="image-container  mt-2" key={item.attachments}>
                  <div className="c-flex">
                    <Link
                      to={{ pathname: item?.attachments }}
                      target="_blank"
                      className="icon-image2"
                    >
                      <img
                        src={fileIcon[item.attachments.split(".").pop()]}
                        className="doc-img"
                        alt="attachments"
                      />
                    </Link>
                    <span
                      className="line-dot pl-2 word-break text-eclipse"
                      id="break-word"
                    >
                      {item?.attachment_name === "" ||
                      item?.attachment_name === null
                        ? item?.attachments
                            .substring(item?.attachments.lastIndexOf("/") + 1)
                            .split(".")[0]
                        : item?.attachment_name
                            .substring(
                              item?.attachment_name.lastIndexOf("/") + 1
                            )
                            .split(".")[0]}
                    </span>
                    <span>
                      {attachmentsExtension(
                        item?.attachment_name === "" ||
                          item?.attachment_name === null
                          ? item?.attachments
                          : item?.attachment_name
                      )}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      setDeleteModal(true)
                      setAttachment(item.attachments)
                    }}
                    className="c-icon-square-dash delete-square"
                  >
                    <DeleteSVGImg
                      title="Delete Attachment"
                      alt="delete Attachment icon"
                    />
                  </div>
                </div>
              ) : item?.attachments.split(".").pop().toLowerCase() === "mp4" ||
                item?.attachments.split(".").pop().toLowerCase() === "mov" ? (
                <div
                  className="image-container mr-2 mt-2"
                  key={item.attachments}
                >
                  <div className="c-flex-between video-prev-container">
                    <video controls className="video video-prev mw150 mh100">
                      <source
                        className="icon-image"
                        type={`video/${item?.attachments.split(".").pop()}`}
                        src={item?.attachments}
                      />
                    </video>
                    <span className="line-dot pl-2 word-break text-eclipse">
                      {item?.attachment_name === "" ||
                      item?.attachment_name === null
                        ? item?.attachments
                            .substring(item?.attachments.lastIndexOf("/") + 1)
                            .split(".")[0]
                        : item?.attachment_name
                            .substring(
                              item?.attachment_name.lastIndexOf("/") + 1
                            )
                            .split(".")[0]}
                    </span>
                    <span>
                      {attachmentsExtension(
                        item?.attachment_name === "" ||
                          item?.attachment_name === null
                          ? item?.attachments
                          : item?.attachment_name
                      )}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      setDeleteModal(true)
                      setAttachment(item.attachments)
                    }}
                    className="c-icon-square-dash delete-square"
                  >
                    <DeleteSVGImg
                      title="Delete Attachment"
                      alt="delete Attachment icon"
                    />
                  </div>
                </div>
              ) : null
            })}
          </div>
        </div>

        <Delete
          isOpen={deleteModal}
          onClose={handleDeleteClose}
          handleDelete={handleHubDelete}
          title="Attachment"
        />
      </>
    )
  }
)
export default CustomAllDropZone
