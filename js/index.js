document.addEventListener('DOMContentLoaded', () => {
  const userList = document.querySelector('ul#user-list')
  const reposList = document.querySelector('ul#repos-list')
  const form = document.querySelector('form')

  form.addEventListener('submit', e => {
    e.preventDefault()
    userList.innerHTML = ''
    reposList.innerHTML = ''
    const searchName = e.target.search.value
    fetch(`https://api.github.com/search/users?q=${searchName}`)
    .then(res => res.json()).then(data => {
      for(const p of data.items) {
        renderProfile(p)
      }
    })
    form.reset()
  })

  const renderProfile = profile => {
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <div>
        <h2>${profile.login}</h2>
        <img src=${profile.avatar_url} class='profile-picture'/>
      </div>
    `
    card.addEventListener('click', () => {
      reposList.innerHTML = ''
      const repos = []
      fetch(profile.repos_url).then(res => res.json())
      .then(repos => {
        const list = renderAllRepos(repos)
        reposList.appendChild(list)
      })
    })
    userList.appendChild(card)
  }

  const renderAllRepos = list => {
    const div = document.createElement('div')
    
    if(list.length === 0) {
      const h3 = document.createElement('h3')
      h3.textContent = 'There is no repo!'
      div.appendChild(h3)
    } else {
      const ol = document.createElement('ol')
      for(const item of list) {
        const li = document.createElement('li')
        li.className = 'repo'
        li.textContent = item.name
        ol.appendChild(li)
      }
      div.appendChild(ol)
    }    
    return div
  }
})