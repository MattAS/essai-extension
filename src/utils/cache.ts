interface ISummary {
  selection: string
  response: string
}

interface IReadSummary {
  selection: string
}

const writeSummaryCache = (summary: ISummary) => {
  const summaryCache = {
    ...summary,
  }
  chrome.storage.local.set({ 'essai-summary': summaryCache }, () => {
    chrome.storage.local.get(['essai-summary'], (result) => {
      console.log(result)
    })
    console.log('Summary cache written')
  })
}

const readSummaryCache = ({ selection }: IReadSummary): string | null => {
  let cacheResult = null
  chrome.storage.local.get(['essai-summary'], (result) => {
    console.log(result)
    if (result.response && result.response.selection === selection) {
      cacheResult = result.response
    }
  })

  return cacheResult
}

export { writeSummaryCache, readSummaryCache }
