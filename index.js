let player = {
    name: "Player",
    chips: 200
}

let currentBet = 20  // Default bet amount
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let chipEl = document.getElementById("bet-el")


playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (player.chips < currentBet) {
        messageEl.textContent = "Not enough chips to play!"
        return
    }
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        // Pay 2.5x the bet for blackjack
        player.chips += currentBet * 2.5
        playerEl.textContent = player.name + ": $" + player.chips
    } else {
        message = "You're out of the game!"
        isAlive = false
        // Lose the bet
        player.chips -= currentBet
        playerEl.textContent = player.name + ": $" + player.chips
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function increaseBet() {
    if (currentBet + 10 <= player.chips) {
        currentBet += 10
        chipEl.textContent = "Current bet: $" + currentBet
    }
}

function decreaseBet() {
    if (currentBet - 10 >= 10) {
        currentBet -= 10
        chipEl.textContent = "Current bet: $" + currentBet
    }
}

// Change the player's name from the input box and update the UI
function changePlayerName() {
    const input = document.getElementById('player-name')
    if (!input) return
    const newName = input.value.trim()
    if (newName.length === 0) {
        // If empty, don't change name (or optionally reset to default)
        return
    }
    player.name = newName
    if (playerEl) playerEl.textContent = player.name + ": $" + player.chips
    // Optionally clear the input
    // input.value = ''
}

// Minimal hold and reset implementations to avoid runtime errors from UI buttons
function holdCard() {
    if (!isAlive) return
    // Simple hold behavior: stop drawing and evaluate dealer-like outcome
    isAlive = false
    message = "You held — round over."
    messageEl.textContent = message
}

function resetGame() {
    // Reset game state, keep player's chips intact
    cards = []
    sum = 0
    hasBlackJack = false
    isAlive = false
    message = "Want to play a round?"
    if (messageEl) messageEl.textContent = message
    if (cardsEl) cardsEl.textContent = "Cards:"
    if (sumEl) sumEl.textContent = "Sum:"
    // Reset bet display
    currentBet = 20
    if (chipEl) chipEl.textContent = "Current bet: $" + currentBet
    // Reset player's chips to default
    player.chips = 200
    if (playerEl) playerEl.textContent = player.name + ": $" + player.chips
}
