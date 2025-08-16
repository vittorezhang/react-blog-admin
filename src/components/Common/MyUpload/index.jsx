import React from 'react'
import { message, Upload } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { useUploadToken } from '../../../request/api/upload'

// const UPLOAD_ADDRESS = 'https://upload-z2.qiniup.com/'
// const CDN_HOST = `https://cdn.boblog.com/`

const UPLOAD_ADDRESS = 'http://upload-z2.qiniup.com/'
const CDN_HOST = `http://imgs.vittoreblog.com/`

export default function MyUpload(props = {}) {
  //   const { data: token = '' } = useUploadToken()
  // 配置密钥对
  // const accessKey = '41Od8VTHD0Xyiuu1U4h8GfjcwO7KPTKCglR7VYtq'
  // const secretKey = '3UNVMbHMJkv1EeQB123nxhTei23U6xkviSFwRD_t'
  // 获取的token 【有效期：默认当前时间 +3600s】TODO 后续调整在服务端获取
  const token =
    '41Od8VTHD0Xyiuu1U4h8GfjcwO7KPTKCglR7VYtq:-V9luXxsAg6_V3X9HQllFC6HdP0=:eyJzY29wZSI6InhnZy1ibG9nIiwiZGVhZGxpbmUiOjE3NTUzMTkwMzEsImRldGVjdE1pbWUiOjF9'

  // 上传props
  const uploadProps = {
    action: UPLOAD_ADDRESS,
    listType: 'picture',
    name: 'file',
    showUploadList: false,
    beforeUpload: file => {
      message.open({
        type: 'loading',
        content: 'Action in progress..',
        duration: 0,
        key: 'upload'
      })
    },
    onChange: info => {
      if (info.file.status === 'done') {
        message.destroy('upload')
        message.success(`file upload successful.`)
        props.onUploadSuccess?.({
          image: CDN_HOST + info.file.response.hash,
          ...info.file.response
        })
      } else if (info.file.status === 'error') {
        message.destroy('upload')
        message.error(`file upload failed.`)
        props.onUploadError?.({
          ...info.file.response,
          image: ''
        })
      }
    }
  }

  return (
    <Upload {...uploadProps} data={{ token }}>
      {props.children || <PictureOutlined color="#2d8cf0" />}
    </Upload>
  )
}
