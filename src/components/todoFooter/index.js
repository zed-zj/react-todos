import React from 'react'
import './index.css'

class TodoFooter extends React.Component {

    showList = (val) => {
        // 展示全部
        // 展示完成
        // 展示未完成
        this.props.showList(val)
    }
    clearCompleted = () => {
        this.props.clearCompleted()
    }

    render() {
        return (
            <footer style={{ display: this.props.list.length !== 0 ? 'block' : 'none' }}>
                <span className="num">{this.props.list.filter(item => !item.done).length}<span>items  left</span></span>
                <button className="All" onClick={() => this.showList('All')}>All</button>
                <button className="Active" onClick={() => this.showList('Active')}>Active</button>
                <button className="Completed" onClick={() => this.showList('Completed')}>Completed</button>
                <button className="ClearCompleted" style={{ display: this.props.list.some(item => item.done === true) ? 'block' : 'none' }} onClick={this.clearCompleted}> Clear completed</button>
            </footer >
        )
    }
}
export default TodoFooter