import React from 'react'
import { Form, Input, Rate, Button } from 'antd'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'store/userSlice/userSelector'
import { useNavigate } from 'react-router-dom'

const { TextArea } = Input

const CommentForm = ({ onSubmit }) => {
  const [form] = Form.useForm()
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()

  const onFinish = (values) => {
    if (!currentUser) {
      navigate('/login')
    } else if (values.rating === 0) {
      form.setFields([
        {
          name: 'rating',
          errors: ['Vui lòng đánh giá!'],
        },
      ])
    } else {
      onSubmit(values)
      form.resetFields()
    }
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="comment"
        label="Nội dung"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập nội dung comment!',
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="rating"
        label="Đánh giá "
        rules={[
          {
            required: true,
            message: 'Vui lòng đánh giá!',
          },
        ]}
      >
        <Rate allowHalf />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng comment
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CommentForm
