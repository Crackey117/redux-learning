import React from "react"


class Message extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clickCount: 0,
      message: this.props.message
    }

    this.incrementCount = this.incrementCount.bind(this);
  }

  incrementCount(event){
    event.preventDefault()

    const newClickCount = this.state.clickCount + 1
    this.setState({clickCount: newClickCount})
  }

  render() {
    return(
      <div onClick={this.incrementCount}>
        <h1>Component Message: {this.state.message}</h1>
        <h1>Component Click Count: {this.state.clickCount}</h1>
      </div>
    )
  }
}

export default Message
