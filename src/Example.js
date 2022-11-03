import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Input, Button, Select, Table, Form, Modal, Layout, Menu, Radio } from 'antd';
import _ from 'lodash';
import TransportLayer from './TransportLayer.js';

const { Option } = Select;
const { Header, Sider, Content } = Layout;
const { Search } = Input;

function Example(props) {
    const [visible, setVisible] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (_, x, index) => index + 1
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: (e) => e ? '女' : '男'
        }
    ];

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: '用户管理'
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: '视频管理'
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: '文件管理'
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        minHeight: 280,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Search style={{ marginRight: 10, width: 160 }} placeholder='搜索关键字...' className='example-search' onSearch={props.onSearch} />
                            <Select style={{ width: 140, marginRight: 10 }} placeholder='选择性别' className='example-select' onChange={props.onSelected}>
                                <Option value="all">所有性别</Option>
                                <Option value={false}>男</Option>
                                <Option value={true}>女</Option>
                            </Select>
                        </div>
                        <Button className='add-button' type='primary' onClick={() => setVisible(true)}>新建人员</Button>
                    </div>
                    <Table rowKey={row => row.key} columns={columns} dataSource={props.users} />
                    <UserForm visible={visible} setVisible={setVisible} onSave={props.save} />
                </Content>
            </Layout>
        </Layout>
    )
}

const UserForm = (props) => {
    const [form] = Form.useForm();

    const onOk = () => {
        form.validateFields().then((values) => {
            props.onSave(values);
            props.setVisible(false)
        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <Modal
            title={'新建人员'}
            closable={false}
            centered
            destroyOnClose
            open={props.visible}
            okText='确定'
            cancelText='取消'
            onOk={onOk}
            onCancel={() => props.setVisible(false)}
        >
            <Form
                form={form}
                name="basic"
                initialValues={{
                    age: 18,
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入姓名',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="性别"
                    name="sex"
                    rules={[
                        {
                            required: true,
                            message: '请选择性别',
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value={true}>女</Radio>
                        <Radio value={false}>男</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="年龄"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: '请输入年龄',
                        },
                    ]}
                >
                    <Input type='number' min={0} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

let hoc = (WrappedComponent) => {
    return class EnhancedComponet extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                users: [],
                all: [],
                status: '',
                text: ''
            }
        }

        componentDidMount = async () => {
            this.init();
            await this.getMessage();
        }

        init = () => {
            let all = [
                {
                    key: 1,
                    name: 'John Brown',
                    age: 32,
                    sex: true
                },
                {
                    key: 2,
                    name: 'Jim Green',
                    age: 42,
                    sex: false
                },
                {
                    key: 3,
                    name: 'Joe Black',
                    age: 32,
                    sex: true
                }
            ];

            this.setState({ all }, () => {
                this.load();
            })
        }

        getMessage = async () => {
            try {
               let result = await TransportLayer.instance.getMessage();
               return result.code;
            } catch (error) {
                console.log(error)
                return -1;
            }
        }

        load = () => {
            let { status, text, all } = this.state;

            let users = all;
            if (status === true || status === false) {
                users = _.filter(all, p => p.sex === status);
            }

            if (text) {
                users = _.filter(all, p => _.includes(p.name, text));
            }
            this.setState({ users })
        }

        onSelected = (status) => {
            this.setState({ status }, () => {
                this.load();
            })
        }

        onSearch = (text) => {
            this.setState({ text }, () => {
                this.load()
            })
        }

        save = (user) => {
            let { all } = this.state;
            all.push({ ...user, key: all.length + 1 });
            this.setState({ all }, () => {
                this.load()
            })

            let users = [];
            _.each(this.state.users, p => {
                users.push(p);
            })

            this.setState({ users })
        }

        render() {
            return <WrappedComponent
                {...this.props}
                users={this.state.users}
                onSelected={this.onSelected}
                onSearch={this.onSearch}
                save={this.save}
            />
        }
    }
}

export default hoc(Example);