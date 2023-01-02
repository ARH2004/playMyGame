const game = (() => {
    let isPause = false
    let animationId = null

    const snake = document.querySelector('.snake')
    const trees = document.querySelectorAll('.derevo')
    const gameButton = document.querySelector('.btn')
    const speed = 3
    const snakeCoords = getCoord(snake)
    const carMove = {
        top: null,
        bottom: null,
        left: null,
        right: null
    }


    const treesCoordsObj = []
    for (let i = 0; i < trees.length; i++) {
        const tree = trees[i]
        const coordsTree = getCoord(tree)

        treesCoordsObj.push(coordsTree)
    }

    document.addEventListener('keydown', (event) => {
        const code = event.code
        if (!isPause) {
            if (code === 'ArrowUp' && carMove.top === null) {
                carMove.top = requestAnimationFrame(snakeMoveTop)
            } else if (code === 'ArrowDown' && carMove.bottom === null) {
                carMove.bottom = requestAnimationFrame(snakeMoveBottom)
            } else if (code === 'ArrowLeft' && carMove.left === null) {
                carMove.left = requestAnimationFrame(snakeMoveLeft)
            } else if (code === 'ArrowRight' && carMove.right === null) {
                carMove.right = requestAnimationFrame(snakeMoveRight)
            } f
        }
    })

    document.addEventListener('keyup', (event) => {
        const code = event.code
        if (code === 'ArrowUp') {
            cancelAnimationFrame(carMove.top)
            carMove.top === null
        } else if (code === 'ArrowDown') {
            cancelAnimationFrame(carMove.bottom)
            carMove.top === null
        } else if (code === 'ArrowLeft') {
            cancelAnimationFrame(carMove.left)
            carMove.top === null
        } else if (code === 'ArrowRight') {
            cancelAnimationFrame(carMove.right)
            carMove.top === null
        }
    })

    const snakeMove = ((x, y) => {
        snake.style.transform = `translate(${x}px, ${y}px)`
    })

    function snakeMoveTop() {
        const newY = snakeCoords.y - 5
        snakeCoords.y = newY
        snakeMove(snakeCoords.x, newY)
        carMove.top = requestAnimationFrame(snakeMoveTop)
    }
    function snakeMoveBottom() {
        const newY = snakeCoords.y + 5
        snakeCoords.y = newY
        snakeMove(snakeCoords.x, newY)
        carMove.bottom = requestAnimationFrame(snakeMoveBottom)
    }
    function snakeMoveLeft() {
        const newX = snakeCoords.x - 5
        snakeCoords.x = newX
        snakeMove(newX, snakeCoords.y)
        carMove.left = requestAnimationFrame(snakeMoveLeft)
    }
    function snakeMoveRight() {
        const newX = snakeCoords.x + 5
        snakeCoords.x = newX
        snakeMove(newX, snakeCoords.y)
        carMove.right = requestAnimationFrame(snakeMoveRight)
    }

    animationId = requestAnimationFrame(startGame)
    function startGame() {
        // console.log('test', animationId)
        treesAnimations()
        animationId = requestAnimationFrame(startGame)
    }

    function treesAnimations() {
        for (let i = 0; i < trees.length; i++) {
            const tree = trees[i]
            const coords = treesCoordsObj[i]
            let newYCoord = coords.y + speed

            if (newYCoord > window.innerHeight) {
                newYCoord = -tree.height
            }

            treesCoordsObj[i].y = newYCoord
            tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`
        }
    }

    function getCoord(el) {
        const matrix = window.getComputedStyle(el).transform
        const array = matrix.split(' ')
        const y = parseFloat(array[array.length - 1])
        const x = parseFloat(array[array.length - 2])
        return { x: x, y: y }
    }
    gameButton.addEventListener('click', () => {
        isPause = !isPause
        if (isPause) {
            gameButton.children[0].style.display = 'none'
            gameButton.children[1].style.display = 'initial'
            cancelAnimationFrame(animationId)

        } else {
            gameButton.children[0].style.display = 'initial'
            gameButton.children[1].style.display = 'none'
            requestAnimationFrame(startGame)
        }
    })
})
game()