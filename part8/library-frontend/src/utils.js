export const updateCache = (cache, query, addedBook) => {
  const uniqByName = a => {
    let seen = new Set()
    return a.filter(item => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  console.log(cache)
  cache.updateQuery(query, obj => {
    console.log(obj)
    const allBooks = obj.allBooks
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}
