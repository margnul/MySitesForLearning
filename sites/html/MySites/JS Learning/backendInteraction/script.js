const loadPostFormElement = document.querySelector('.load-post-form')
const postIdInputElement = document.querySelector('#post-id')
const resultElement = document.querySelector('.result')

loadPostFormElement.addEventListener('submit', (event) => {
  event.preventDefault()

  fetch(`http://localhost:3000/posts/${postIdInputElement.value}`)
      .then((response) => {
        console.log(response)

        if (!response.ok){
          const errorMessage = response.status === 404
          ? 'Пост по указанному ID не найден'
          : 'something went wrong :('

          throw new Error(errorMessage)
        }

        return response.json()
      })
      .then(json => {
        console.log(json)

        const {title, views} = json

        resultElement.innerHTML = `
        <p>${title}, views: ${views}</p>
        `
      })
      .catch((error) => {
        console.log("error: ", error)

        resultElement.innerHTML = 'something went wrong' + error.message
      })
})

const createPostFormElement = document.querySelector('.create-post-form')

createPostFormElement.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(createPostFormElement)
  const formDataObject = Object.fromEntries(formData)

  fetch('http://localhost:3000/posts', {
    method: 'post',
    body: JSON.stringify({
      ...formDataObject, 
      views: 0,
    })
  })
  .then((response) => {
    console.log('response: ', response)

    return response.json()
  })
  .then((json) => {
    console.log('json: ', json)
  })
})

const searchPostsFormElement = document.querySelector('.search-post-form')
const postViewsInputElement = document.querySelector('#post-views')

searchPostsFormElement.addEventListener('submit', (event) => {
  event.preventDefault()

  fetch(`http://localhost:3000/posts?views_gte=${postViewsInputElement.value}`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json)

    resultElement.innerHTML = json
      .map(({title, views}) => `<p>${title}, views: ${views}</p>`)
      .join('')
  })
})