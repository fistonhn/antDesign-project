import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { EditOutlined, DeleteFilled, HeartFilled, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { Card, Col, Row, Image, Modal, Form, Input, Spin } from 'antd';

const { Meta } = Card;

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
      setPosts(res.data);
    })
  }, []);

  const showModal = (post) => {

    form.setFieldsValue({
      name: post.name,
      email: post.email,
      phone: post.phone,
      website: post.website
   });

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

  };

  const handleCancel = () => {
    setIsModalOpen(false);

  };

  const handleDelete = (id) => {
    const remainingPosts = posts.filter((pst)=> pst.id !== id)

    setPosts(remainingPosts);
  }

  return (
    <>
    {posts?.length === 0 && (<Spin size="large" />)}
    {posts?.length > 0 && (
      <Row>
        {posts?.map((post)=> (  
          <Col key={post.id} >   
            <Card
              style={{ margin: '10px' }}
              cover={
                <Image src={`https://avatars.dicebear.com/v2/avataaars/${post.username}.svg?options[mood][]=happy`} />
              }
              actions={[
                <HeartFilled style={{ color : 'red', fontSize: '20px' }}/>,
                <EditOutlined key="edit"  style={{ fontSize: '20px' }} onClick={() =>showModal(post)}/>,
                <DeleteFilled tyle={{ fontSize: '20px' }} onClick={()=> handleDelete(post.id)} />,
              ]}
            >
              <Meta
                title={post.name}
                description= {
                  <div>
                    <div> <MailOutlined style={{ fontSize: '20px' }} /> {post.email} </div>
                    <div> <PhoneOutlined style={{ fontSize: '20px' }} /> {post.phone} </div>
                    <div> <GlobalOutlined style={{ fontSize: '20px' }} /> {post.website} </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    )}
      <Modal title="Basic Modal" forceRender open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8, }}
          wrapperCol={{ span: 16, }}
          initialValues={{ remember: false, }}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true } ]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true } ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true } ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Website" name="website" rules={[{ required: true } ]}>
            <Input />
          </Form.Item>

        </Form>
      </Modal>;
    </>

)};


export default Home;


