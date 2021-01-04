import './index.css'
import React from 'react'
class TodoHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  // 设置全选
  setCheckAll = () => {
    this.props.setCheckAll(!this.props.isAllChecked)
  }

  // 按回车后添加数据增加列表
  enterdown(e) {
    if (e.keyCode !== 13) {
      return
    }
    var text = e.target.value.trim()
    if (!text) return
    this.props.addList(text)
    e.target.value = ''
  }

  render() {
    const { isAllChecked } = this.props
    return (
      <div className="todo-header">
        <header>
          <h1 className="top">todos</h1>
          <input className="checkAll" type="checkbox" checked={isAllChecked} onChange={this.setCheckAll} />
          <input className="add" type="text" onKeyUp={e => this.enterdown(e)} placeholder="What needs to be done?" />
        </header>
      </div>
    )
  }
}
export default TodoHeader