import React from 'react'

class Task extends React.Component {
    render() {
        return <div>
            <h5><span role="img" class="drag_icon">🗿</span> {this.props.text}</h5>
        </div>
    }
}

export default Task;