import React from 'react'
import TodoItem from './TodoItem'
import './index.css'

class Todos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  // 点击复选框切换状态
  checkChange = (id, done) => {
    this.props.checkChange(id, done)
  }

  // 删除
  deleteItem = (id) => {
    this.props.deleteItem(id)
  }

  // 按下回车后完成修改
  editText = (id, val) => {
    this.props.editText(id, val)
  }

  render() {
    let { list } = this.props
    if (this.props.type === 'All') {
      list = list
    }
    if (this.props.type === 'Active') {
      list = list.filter(item => item.done === false)
    }
    if (this.props.type === 'Completed') {
      list = list.filter(item => item.done === true)
    }
    return (
      <ul className="todos" type={this.props.type} >
        {
          list.map(item => {
            return <TodoItem key={item.id} list={item} checkChange={this.checkChange} deleteItem={this.deleteItem} editText={this.editText}  ></TodoItem>
          })
        }

      </ul>
    )
  }
}
export default Todos