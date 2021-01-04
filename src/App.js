import React from 'react'
import TodoHeader from "./components/todoHeader";
import Todos from './components/totoTodos'
import TodoFooter from './components/todoFooter'

class App extends React.Component {
    state = {
        list: [
            { id: 1, value: '沙发', done: true },
            { id: 2, value: '板凳', done: false },
        ],
        type: 'All',
        isAllChecked: ''
    }
    componentDidMount = () => {
        const { list } = this.state
        const localList = window.localStorage.getItem('list') ? JSON.parse(window.localStorage.getItem('list')) : []
        this.setState({
            list: localList,
            // isAllChecked: this.state.list.every(item => item.done === true) ? true : false
            isAllChecked: localList.every(item => item.done === true) ? true : false
        })
    }

    // 全选
    setCheckAll = (val) => {
        const { list } = this.state
        const newList = list.map((item) => {
            return { ...item, done: val }
        })
        this.setState({
            list: newList,
            isAllChecked: val
        }, () => {
            this.save(newList)
        })
    }

    // 本地存储
    save = (list) => {
        window.localStorage.setItem('list', JSON.stringify(list))
    }
    //增加
    addList = (text) => {
        const { list } = this.state
        this.setState({
            list: [{
                id: Math.random(),
                value: text,
                done: false,
            },
            ...list]
        }, () => {
            this.save(this.state.list)
        })
    }
    // 反选
    Inverse = () => {
        if (this.state.list.filter(item => item.done === true).length === this.state.list.length) {
            this.setState({
                isAllChecked: true
            })
        } else {
            this.setState({
                isAllChecked: false
            })
        }
    }
    // 切换状态
    checkChange = (id, down) => {
        const { list } = this.state
        const newList = list.map((item) => {
            if (item.id === id) return { ...item, done: down }
            else return item
        })
        this.setState({
            list: newList
        }, () => {
            this.save(this.state.list)
            console.log(this.state.list.filter(item => item.done === true).length)
            this.Inverse()
        })
    }

    //  触发修改
    editText = (id, val) => {
        const valtext = val.trim()
        const { list } = this.state
        const newList = list.map(item => {
            if (item.id === id) return { ...item, value: valtext }
            else return item
        })
        this.setState({
            list: newList
        }, () => {
            this.save(this.state.list)
        })
    }

    //删除
    deleteItem = (id) => {
        const { list } = this.state
        const newList = list.filter(item => {
            return item.id !== id
        })
        this.setState({
            list: newList
        }, () => {
            this.save(this.state.list)
        })
    }
    // 展示全部
    showList = (val) => {
        this.setState({
            type: val
        })
    }
    // 清除已完成
    clearCompleted = () => {
        const { list } = this.state
        const newList = list.filter(item => {
            return item.done === false
        })
        this.setState({
            list: newList
        }, () => {
            this.save(this.state.list)
        })
    }


    render() {
        return (
            <div className="box">
                <TodoHeader list={this.state.list} isAllChecked={this.state.isAllChecked} addList={this.addList} setCheckAll={this.setCheckAll}  ></TodoHeader>
                <Todos type={this.state.type} list={this.state.list} deleteItem={this.deleteItem} checkChange={this.checkChange} editText={this.editText} >  </Todos>
                <TodoFooter list={this.state.list} showList={this.showList} clearCompleted={this.clearCompleted}></TodoFooter>
            </div>
        )
    }
}
export default App