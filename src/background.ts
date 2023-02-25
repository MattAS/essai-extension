chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id === undefined) return
    console.log(tabs[0].id)
    chrome.tabs.sendMessage(tabs[0].id, { message: 'show' })
  })
})

export {}
