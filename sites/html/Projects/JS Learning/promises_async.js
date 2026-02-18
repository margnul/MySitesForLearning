
const makeRequest = (url, onSuccess) => {}

const sellerId = 154

// makeRequest(`/api/sellers/${sellerId}`, (seller) => {
//   const firstProductId = seller.productIds[0]

//   makeRequest(`api/products/${firstProductId}`, (product) => {
//     const firstReviewId = prodict.reviewIds[0]

//     makeRequest(`api/reviws/${firstReviewId}`, (review) => {
//       const userName = review.author.name
//     })
//   })
// })


// Variant 1

const callPromise = (askingData) => {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1){
        fulfill('fulfilled' + askingData)
      }else{
        reject('rejected' + askingData)
      }
    }, 3000)
  })
}

callPromise("1")
    .then((successData1) => {
      console.log("успех, " + successData1)

      return(callPromise("2"))
    })
    .then((successData2) => {
      console.log("успех, " + successData2)

      return(callPromise("3"))
    })
    .then((successData3) => {
      console.log("успех, " + successData3)
    })
    .catch((errorData) => {
      console.log("не успех, " + errorData)
    })
    .finally((errorData) => {
      console.log("всё")
    })


// Variant 2

const callPromise2 = async (askingData) => {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1){
        fulfill('fulfilled' + askingData)
      }else{
        reject('rejected' + askingData)
      }
    }, 3000)
  })
}

try{
  const successData1 = await callPromise2("1")
  console.log(successData1)
  const successData2 = await callPromise2("2")
  console.log(successData2)
  const successData3 = await callPromise2("3")
  console.log(successData3)
} catch {
  console.log("error happened")
} finally {
  console.log("всё 2")
}