const compositionsList = document.getElementById('content')

function removeItem(){
    this.parentNode.parentNode.remove()
}

function createItem(){

    let row = document.createElement('tr')
    compositionsList.appendChild(row)

    let piece = document.createElement('td')
    let composer = document.createElement('td')
    let buttons = document.createElement('td')

    let pieceInput = document.createElement('input')
    piece.appendChild(pieceInput)
    let pieceText = document.createElement('span')
    piece.appendChild(pieceText)
    pieceText.style.display = 'none'

    let composerInput = document.createElement('input')
    composer.appendChild(composerInput)
    let composerText = document.createElement('span')
    composer.appendChild(composerText)
    composerText.style.display = 'none'

    let remove = document.createElement('button')
    remove.textContent = 'remove'
    buttons.appendChild(remove)
    remove.style.display = 'inline'
    remove.onclick = removeItem

    let save = document.createElement('button')
    save.textContent = 'save'
    buttons.appendChild(save)
    save.style.display = 'inline'

    let edit = document.createElement('button')
    edit.textContent ='edit'
    buttons.appendChild(edit)
    edit.style.display = 'none'

    row.appendChild(piece)
    row.appendChild(composer)
    row.appendChild(buttons)

    save.onclick = function(){
        pieceText.innerText = pieceInput.value
        composerText.innerText = composerInput.value
        pieceInput.style.display = 'none'
        pieceText.style.display = 'inline'
        composerInput.style.display = 'none'
        composerText.style.display = 'inline'
        save.style.display = 'none'
        edit.style.display = 'inline'
    }

    edit.onclick = function(){
        pieceInput.textContent = pieceText.value
        composerInput.textContent = composerText.value
        pieceText.style.display = 'none'
        pieceInput.style.display = 'inline'
        composerText.style.display = 'none'
        composerInput.style.display = 'inline'
        edit.style.display = 'none'
        save.style.display = 'inline'
    }

}