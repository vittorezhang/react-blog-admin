import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import './Login.scss'
import { useAdminInfo } from '../../hooks/useAdmin'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAdminInfo()

  // 提交登录
  const handleSubmit = adminInfo => {
    setIsLoading(true)
    login(adminInfo)
      .then(() => message.success('登录成功'))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="login-wrap">
      <div className="login-wrap-bg" />
          <div className="login-logo">          
        <img src="http://imgs.vittoreblog.com/FgucVYzV_f0rbYCLszEOhuKz6dQI" alt="vittoreblog" />
      </div>
      <Form className="form-wrap" onFinish={handleSubmit}>
        <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder="邮箱" type="text" id="email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input placeholder="密码" type="password" id="password" />
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} block htmlType="submit" type="primary">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
