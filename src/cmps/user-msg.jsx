import React from 'react'

import { eventBusService } from '../services/event-bus.service.js'


export class UserMsg extends React.Component {

  removeEvent;

  state = {
    msg: null
  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      console.log('we have an order', msg)
      this.setState({ msg })
      setTimeout(()=>{
        this.setState({ msg : null })
      }, 2500)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
    if (!this.state.msg) return <span></span>
    const msgClass = this.state.msg.type || ''
    // 
    return (
      <section className={'user-msg success'}>
        <h1>You got a reservation</h1>
        {/* <button onClick={() => {
          this.setState({ msg: null })
        }}>x</button>
        {this.state.msg.txt} */}
      </section>
    )
  }
}