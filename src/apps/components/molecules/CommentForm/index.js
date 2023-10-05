import React from 'react'
import { Form, Input, Rate, Button } from 'antd'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'store/userSlice/userSelector'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const { TextArea } = Input

const CommentForm = ({ onSubmit }) => {
  const { t } = useTranslation()
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
        label={t('PRODUCT_DETAIL.content')}
        rules={[
          {
            required: true,
            message: `${t('PRODUCT_DETAIL.please_enter_comment_content')}!`,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="rating"
        label={t('PRODUCT_DETAIL.rating')}
        rules={[
          {
            required: true,
            message: `${t('PRODUCT_DETAIL.please_rate')}!`,
          },
        ]}
      >
        <Rate allowHalf />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('PRODUCT_DETAIL.post_comment')}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CommentForm
