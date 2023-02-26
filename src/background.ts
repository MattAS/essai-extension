chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'nobel-overlay') {
    chrome.action.onClicked.addListener((tab) => {
      port.postMessage({ message: 'show' })
    })
  }
})

export {}
