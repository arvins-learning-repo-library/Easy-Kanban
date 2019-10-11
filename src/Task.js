import React from 'react'

class Task extends React.Component {
    render() {
        return <draggable><div>
            <h5><span role="img" class="drag_icon">🗿</span> {this.props.text}</h5>
        </div></draggable>
    }
}

export default Task;