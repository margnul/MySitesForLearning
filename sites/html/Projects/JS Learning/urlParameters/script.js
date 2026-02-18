const fitlerFormElement = document.querySelector('#form-search-parameters')

fitlerFormElement.addEventListener('submit', (event) => {
  event.preventDefault()
})

fitlerFormElement.addEventListener('change', () => {
  const formData = new FormData(fitlerFormElement)
  const formDataObj = Object.fromEntries(formData)
  // const paramsString = Object.entries(formDataObj)
  //   .map(([key, value]) => `${key}=${value}`)
  //   .join('&')
  const params = new URLSearchParams(formDataObj)
  const paramsString = params.toString()


  window.history.replaceState({},
    '',
    `${window.location.pathname}?${paramsString}`
  )
})

// window.location.search
//   .replace('?', '')
//   .split('&')
//   .forEach((queryParam) => {
//     const [name, value] = queryParam.split('=')

//     fitlerFormElement[name].value = value
//   })
const paramsFromUrl = new URLSearchParams(window.location.search)

paramsFromUrl.forEach((value, name) => {
  fitlerFormElement[name].value = value
})
