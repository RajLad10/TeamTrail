import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"
import { useDropzone } from "react-dropzone"
import { Progress } from "reactstrap"

import loadingGIF from "assets/images/loading_20X20.gif"
import { getCloudFrontImgUrl } from "constants/cloudFront"
import { GalleryImg } from "constants/importsSVG"
import { s3 } from "services/aws_helper"
//import Delete from "components/common/CommonModal/Delete"

const CustomDropZone = forwardRef(
  (
    {
      handleOnDrop,
      src,
      multiple = false,
      accept = "image/*",
      folderName,
      type = "image",
      bucketName,
      error,
      errorMessage,
      userId,
      subMessage = "",
      withBottomMargin = true,
    },
    ref
  ) => {
    const [totalFiles, setTotalFiles] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [fileData, selectedFileData] = useState([])
    const [progress, setProgress] = useState({
      0: 0,
    })
    const [customError, setCustomError] = useState("")

    useImperativeHandle(
      ref,
      () => ({
        isUploading,
      }),
      [isUploading]
    )

    const progressValue = useMemo(() => {
      const values = Object.values(progress)
      return values.reduce((a, b) => a + b, 0) / totalFiles
    }, [progress, totalFiles])

    // useEffect(() => {
    //   if (progressValue === 100 && isUploading) {
    //     setIsUploading(false)
    //     setProgress({ 0: 0 })
    //     setTotalFiles(0)
    //   }
    // }, [progressValue, isUploading])

    const formatBytes = bytes => {
      var kb = 1024
      var ndx = Math.floor(Math.log(bytes) / Math.log(kb))
      var fileSizeTypes = [
        "bytes",
        "kb",
        "mb",
        "gb",
        "tb",
        "pb",
        "eb",
        "zb",
        "yb",
      ]

      return {
        size: +(bytes / kb / kb).toFixed(2),
        type: fileSizeTypes[ndx],
      }
    }

    const getSize = url => {
      var xhr = new XMLHttpRequest()

      xhr.open("HEAD", url, true)

      xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
          const fsize = xhr.getResponseHeader("Content-Length")
            ? formatBytes(parseInt(xhr.getResponseHeader("Content-Length")))
            : 0
          if (fsize) {
            selectedFileData(prev => ({
              ...prev,
              size: fsize.size + " " + fsize.type,
            }))
          }
        }
      }
      xhr.send()
    }

    useEffect(() => {
      if (!!src) {
        selectedFileData(prev => ({
          ...prev,
          fileName: src?.substring(src?.lastIndexOf("/") + 1),
        }))
        getSize(src)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src])

    const onDrop = useCallback(
      acceptedFiles => {
        const file = acceptedFiles[0]
        if (!!!file) return
        if (type === "csv") {
          const validExtensions = [".csv", ".xls", ".xlsx"]
          const fileExtension = "." + file.name.split(".").pop()
          if (!validExtensions.includes(fileExtension)) {
            setCustomError("File type must be .csv,.xls,.xlsx")
            return
          }
        }

        setTotalFiles(acceptedFiles.length)
        setIsUploading(true)
        setCustomError("")

        const fileExtension = "." + file.name.split(".").pop()
        const currentTime = file.lastModified
        const fileName = file.name
          .split(".")
          .slice(0, -1)
          .join(".")
          .replace(" ", "_")

        const fileFullName = fileName + "_" + currentTime + fileExtension
        const getSize = formatBytes(file.size)
        const fileDetails = {
          fileName: fileName + "." + fileExtension,
          size: getSize.size + " " + getSize.type,
        }
        selectedFileData(fileDetails)

        const params = {
          ACL: "public-read",
          Key: fileFullName,
          ContentType: file.type,
          Body: file,
        }
        s3(userId, folderName, bucketName)
          .upload(params)
          .on("httpUploadProgress", function (evt) {
            const value = Math.round((evt.loaded / evt.total) * 100)
            setProgress({ 0: value })
          })
          .send(function (err, data) {
            if (err) {
              return
            }
            handleOnDrop(data.Location)
            setIsUploading(false)
          })
      },
      [folderName, userId, bucketName, handleOnDrop]
    )

    const { getRootProps, getInputProps, fileRejections, isDragActive } =
      useDropzone({
        onDrop,
        multiple,
        accept,
      })

    return (
      <>
        <div
          className={`${withBottomMargin ? "mb-3" : ""} ${
            !!isUploading || !!src ? "uploadBox" : ""
          }`}
        >
          <div className="d-flex align-items-center ">
            {!!isUploading && type !== "music" ? (
              <div className="image-container me-2">
                <div className="loadingImg">
                  <img
                    src={loadingGIF}
                    alt="loading"
                    className="icon-image imgLoading"
                    style={{ width: "20px" }}
                  />
                </div>
              </div>
            ) : !!src ? (
              type === "image" ? (
                <div className="image-container me-2">
                  <div className="loadingImg">
                    <img
                      className="icon-image"
                      src={getCloudFrontImgUrl(src)}
                      alt="icon"
                    />
                  </div>
                </div>
              ) : type === "csv" ? (
                <div className="csv-container me-2">
                  {src.substr(src.lastIndexOf(".") + 1) === "csv" ? (
                    <i className="fas fa-file-csv fa-6x" />
                  ) : (
                    <i className="fas fa-file-excel fa-6x" />
                  )}
                </div>
              ) : null
            ) : null}
            {!!isUploading || !!src ? (
              <div
                className={`${type === "music" ? "audiobox" : "filebox"}`}
                style={{ paddingLeft: type === "music" ? "20px" : "" }}
              >
                <div className="filelbl">
                  <span className="mediaName">{fileData.fileName}</span>
                  <button
                    type="button"
                    className="delete-icon"
                    onClick={() => {
                      handleOnDrop("")
                    }}
                  >
                    <i className="bx bx-trash" />
                  </button>
                </div>
                {!isUploading && !!error && !!errorMessage && (
                  <span className="text-danger text-capitalize text-center">
                    {errorMessage}
                  </span>
                )}
                <div className="mediaSize">{fileData?.size}</div>

                {!!isUploading && (
                  <div className="mt-1 progressBox">
                    <Progress
                      value={progressValue}
                      className="progress-xl"
                    ></Progress>
                    <span className="progressPer">
                      {progressValue.toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            ) : (
              !src && (
                <div
                  {...getRootProps()}
                  className="dropzone dz-clickable w-100"
                  style={{
                    borderColor:
                      error || !!fileRejections.length
                        ? "#F46A6A"
                        : isDragActive
                        ? "rgba(52, 195, 143)"
                        : "#aecf6d",
                  }}
                >
                  <div className="dz-message c-flex-directionnew mt20">
                    <GalleryImg alt="gallery" className="uploadIcon" />
                    <input {...getInputProps()} />
                    {(error && !!errorMessage) ||
                    !!fileRejections.length ||
                    !!customError ? (
                      <span className="text-danger text-capitalize text-center">
                        {errorMessage ||
                          fileRejections[0]?.errors[0]?.message ||
                          customError ||
                          ""}
                      </span>
                    ) : isDragActive ? (
                      <p className="dz-message">Drop {type} here</p>
                    ) : (
                      <p className="mb-0 text-center dropzone-font dropzone-text">
                        Drag and drop your {type} here
                      </p>
                    )}
                    {subMessage && (
                      <div className="form-group modal_my_footer">
                        <small className="form-text text-muted">
                          <p>{subMessage}</p>
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </>
    )
  }
)
export default CustomDropZone
