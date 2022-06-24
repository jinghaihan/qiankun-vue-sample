let event = {
  // 触发事件
  dispatch (event, data) {
    let customEvent = new CustomEvent(event, {
      detail: data
    })
    window.dispatchEvent(customEvent)
  }
}

export default event
