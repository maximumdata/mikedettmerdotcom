const utils = {
  processImages: (selector) => {
    let container = document.querySelector(selector)
    let images = Array.from(container.getElementsByTagName('img'))
    images.forEach((e, a, i) => {
      if (!(e.getAttribute('data-processed'))) {
        let fig = document.createElement('figure')
        fig.innerHTML = `<img data-processed="true" src="${e.src}"><figcaption>${e.alt}</figcaption>`
        e.parentNode.replaceChild(fig, e)
      }
    })
  }
}

let init = () => {
  utils.processImages('.content')
}

document.addEventListener('DOMContentLoaded', function (e) {
  init()
})
