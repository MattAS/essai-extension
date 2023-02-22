interface ISummary {
  selection: string
  response: string
}

interface IReadSummary {
  selection: string
}

interface IQuestionCache {
  question: string
  papers?: any[]
  keywords: string[]
}

const writeQuestionCache = (question: IQuestionCache) => {
  const questionCache = {
    ...question,
  }
  chrome.storage.local.set({ 'essai-question': questionCache }, () => {
    console.log('Question cache written')
  })
}

const readQuestionCache = ({ question }: IQuestionCache): string | null => {
  let cacheResult = null
  chrome.storage.local.get(['essai-question'], (result) => {
    if (result.question && result.question === question) {
      cacheResult = result
    }
  })

  return cacheResult
}

const writeSummaryCache = (summary: ISummary) => {
  const summaryCache = {
    ...summary,
  }
  chrome.storage.local.set({ 'essai-summary': summaryCache }, () => {
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

export {
  writeSummaryCache,
  readSummaryCache,
  writeQuestionCache,
  readQuestionCache,
}
