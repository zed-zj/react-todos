import React from 'react'
import './index.css'
class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
        this.state = {
            isShow: 'none'
        }
    }

    // 点击复选框切换状态
    checkChange = (id, done) => {
        this.props.checkChange(id, !done)
    }

    // 删除
    deleteItem = (id) => {
        this.props.deleteItem(id)
    }
    // 双击显示input并自动聚焦
    showInput = () => {
        this.setState({
            isShow: 'block'
        }, () => {
            this.inputRef.current.focus()
        })
    }
    // 按下回车后完成修改
    editText = (e, id) => {
        const { value } = e.target
        if (e.keyCode === 13 && value.trim() !== '') {
            this.props.editText(id, value.trim())
            this.setState({
                isShow: 'none'
            })
        }
    }
    //    失焦后修改值并隐藏input
    inputBlur = (e, id) => {
        this.setState({
            isShow: 'none'
        })
        const { value } = e.target
        if (value.trim() !== '') {
            this.props.editText(id, value)
        } else {
            this.deleteItem(id)
        }
    }

    render() {
        const { id, done, value } = this.props.list
        return (
            < li className="listItem" key={id}  >
                <input
                    className="check"
                    type="checkbox"
                    checked={done}
                    onChange={this.checkChange.bind(this, id, done)} />
                <label
                    autosize="false"
                    className={done === true ? 'text complate' : 'text'}
                    onDoubleClick={() => this.showInput()}
                >
                    {value}
                </label>
                <input className='changVal' style={{ display: this.state.isShow }} ref={this.inputRef} type="text" defaultValue={value} onKeyUp={(e) => { this.editText(e, id) }} onBlur={(e) => this.inputBlur(e, id)} />
                <button className="del" onClick={() => this.deleteItem(id)} >删除</button>
            </li>
        )
    }
}
export default TodoItem