chrome.contextMenus.create({
  id: 'essai',
  title: 'Explain selection',
  contexts: ['selection'],
})
chrome.contextMenus.onClicked.addListener(function (sel, tab) {
  console.log(tab)
  chrome.scripting.executeScript(
    {
      target: { tabId: tab?.id as number },
      func: function () {
        return document.head.innerHTML
      },
    },
    function (result) {
      // Parse head inner html
      console.log(result)
    },
  )
})

export {}
