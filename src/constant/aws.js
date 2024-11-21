export const buckets = {
  ACCOUNTS: import.meta.env.REACT_APP_AWS_BUCKET_ACCOUNTS,
  HUB: import.meta.env.REACT_APP_AWS_BUCKET_HUB,
}

export const folders = {
  //TeamTrail Folder
  BANNERS: import.meta.env.REACT_APP_AWS_FOLDER_BANNERS,
}

export const imageUrl = {
  S3ACCOUNTS_URL: `https://${import.meta.env.REACT_APP_AWS_BUCKET_ACCOUNTS}.s3.${import.meta.env.REACT_APP_AWS_REGION}.amazonaws.com/`,
  ACCOUNT_DISPLAY_URL: import.meta.env.REACT_APP_AWS_FOLDER_ACCOUNT_DISPLAY_URL,
  ACCOUNT_THUMBNAIL_URL: `${import.meta.env.REACT_APP_AWS_FOLDER_ACCOUNT_THUMBNAIL_URL}.s3.${import.meta.env.REACT_APP_AWS_REGION}.amazonaws.com/`,
  ACCOUNT_THUMBNAIL_DISPLAY_URL:
    import.meta.env.REACT_APP_AWS_FOLDER_ACCOUNT_THUMB_DISPLAY_URL,

  S3HUB_URL: `https://${import.meta.env.REACT_APP_AWS_BUCKET_HUB}.s3.${import.meta.env.REACT_APP_AWS_REGION}.amazonaws.com/`,
  HUB_DISPLAY_URL: import.meta.env.REACT_APP_AWS_FOLDER_HUB_DISPLAY_URL,
  HUB_THUMBNAIL_URL: `${import.meta.env.REACT_APP_AWS_FOLDER_HUB_THUMBNAIL_URL}.s3.${import.meta.env.REACT_APP_AWS_REGION}.amazonaws.com/`,
  HUB_THUMBNAIL_DISPLAY_URL:
    import.meta.env.REACT_APP_AWS_FOLDER_HUB_THUMB_DISPLAY_URL,
}
