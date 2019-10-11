import React from 'react'

class Task extends React.Component {
    render() {
        return <div>
            <h3><span class="drag_icon">🗿</span> {this.props.text}</h3>
        </div>
    }
}

export default Task;