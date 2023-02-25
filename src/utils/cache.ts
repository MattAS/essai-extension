interface IHighlight {
  selection: string
  response: string
}

interface ISummary {
  url: string
  response: string
}

interface IQuestionCache {
  question: string
  papers?: any[]
  keywords: string[]
}

const writeToCache = (
  key: string,
  value: IQuestionCache | ISummary | IHighlight,
) => {
  const cache = {
    ...value,
  }
  chrome.storage.local.set({ [key]: cache }, () => {
    console.log('Summary cache written')
  })
}

const readCache = (
  key: string,
): Promise<{
  [key: string]: any
}> => {
  return chrome.storage.local.get([key])
}

export { writeToCache, readCache }
