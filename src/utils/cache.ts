interface IHighlight {
  selection: string
  response: string
}

interface ISummary {
  url: string
  response: string
}

interface IQuestionCache {
  keyword: string
  papers: any[]
  definition: string
  searchQueries: any[]
  question: string
}

const writeToCache = (
  key: string,
  value: IQuestionCache | ISummary | IHighlight | any,
) => {
  console.log(value)
  const cache = {
    ...value,
  }
  console.log(cache)
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
