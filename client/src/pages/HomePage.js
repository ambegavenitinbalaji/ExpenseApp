import React, { useState, useEffect } from 'react'
import { Form, Input, message, Modal, Select, Table, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from 'moment'
import Analytics from '../components/Analytics'
const { RangePicker } = DatePicker

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransaction, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState("7")
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')

  // Table Data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => {
        return <span>{moment(text).format("DD-MM-YYYY")}</span>
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Actions',
    },
  ]

  // Get All Transactions

  // UseEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        console.log(user)
        const res = await axios.post("/transaction/get-transaction", { userID: user._id, frequency, selectedDate, type })
        console.log(res)
        setLoading(false)
        setAllTransaction(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error('Failed to get Transactions')
      }
    };
    getAllTransactions()
  }, [frequency, selectedDate, type]);

  // Form Submission
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      await axios.post("/transaction/add-transcation", { userID: user._id, ...values })
      setLoading(false)
      message.success("Transaction Created Successfully")
      setShowModal(false)
    } catch (error) {
      setLoading(false)
      message.error('Failed to Create Transaction')
    }
  }
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="180">Last 6 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
        </div>
        <div className='switch-icon'>
          <UnorderedListOutlined className={`mx-3 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
          <AreaChartOutlined className={`mx-3 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>
        </div>
      </div>
      <div className="content">
        {viewData === 'table' ? <Table columns={columns} dataSource={allTransaction} /> : (<Analytics allTransaction = {allTransaction}/>)}
      </div>
      <Modal title="Add Transaction" open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="foods">Foods</Select.Option>
              <Select.Option value="transportation">Transportation</Select.Option>
              <Select.Option value="housing">Housing</Select.Option>
              <Select.Option value="personal Care">Personal Care</Select.Option>
              <Select.Option value="health and wellness">Health and Wellness</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="debt payments">Debt Payments</Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className='btn btn-primary'>Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
