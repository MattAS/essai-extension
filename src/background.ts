chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'nobel-overlay') {
    chrome.action.onClicked.addListener((tab) => {
      port.postMessage({ message: 'show' })
    })
  }
})

chrome.runtime.onUpdateAvailable.addListener((details) => {
  chrome.runtime.reload()
})

export {}
