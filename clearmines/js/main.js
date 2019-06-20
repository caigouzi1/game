
// 判断该位置并显示
function setNode(arr, x, y) {
    let node = document.getElementById(`${x}x${y}`)
    let num = arr[x][y]
    classname = `x${num}`
    if (num > 6) {
        classname = `x6`
    } else if (num === 'x') {
        classname = `x`
    }
    if (num == 0) {
        node.classList.add(classname)
        node.classList.add('isup')
    } else {
        node.classList.add(classname)
        node.classList.add('showfont')
        node.classList.add('isup')
    }

}

// 生成html页面并插入到网页中
function insertHtml(arr) {
    let html = ''
    for (let i = 0; i < arr.length; i++) {
        var line = ''
        for (let j = 0; j < arr[i].length; j++) {
            line += `<div id = "${i}x${j}" class = 'cell' data-x ='${i}' data-y = '${j}'>${arr[i][j]}</div>`
        }
        html += line
    }
    html = `<div id = 'bigcell'>${html}</div>`
    return html
}

// 递归显示结果
function open(chess, intx, inty) {
    let x = Number(intx)
    let y = Number(inty)
    let arr = chess.arr
    setNode(arr, x, y)
    let node = document.getElementById(`${x}x${y}`)
    node.classList.add('isup')
    let isUp = node.classList.contains('up')
    if (isUp) {
        return
    } else {
        node.classList.add('up')
        if (arr[x][y] == 0) {
            for (let i = x - 1; i < x + 2; i++) {
                for (let j = y - 1; j < y + 2; j++) {
                    if (chess.judgeCondition(i, j)) {
                        let isFlag = document.getElementById(`${i}x${j}`).classList.contains('flag')
                        if ((i !== x || j !== y) && !isFlag) {
                            setNode(arr, i, j)
                            if (arr[i][j] === 0) {
                                open(chess, i, j)
                            }
                        }
                    }
                }
            }
        } else {
            return
        }
    }
}

// 遍历所有地雷
function getAllMines(chess, callback) {
    let mines = chess.Mines
    for (var [key, value] of mines) {
        for (let item of value.values()) {
            callback(key, item)
        }
    }
}

// 显示所有炸弹
function showAllBoom(chess) {
    getAllMines(chess, function (x, y) {
        setNode(chess.arr, x, y)
    })
}

function init(row, line, num) {
    var chess = new Chess(row, line, num)
    var divChess = e('#div-id-chess')
    var arr = chess.arr
    var html = insertHtml(arr)

    // 找出地雷的个数
    var findMineNum = 0
    // 标记地雷的个数
    var flagMineNum = 0

    appendHtml(divChess, html)
    appendHtml(e('#count'), `剩余地雷&nbsp${chess.num}&nbsp`)

    // 鼠标左击事件
    var leftClick = function (event) {
        let target = event.target
        if (event.target.className === 'cell') {
            let data = target.dataset

            // 判断是否爆炸
            if (chess.arr[data.x][data.y] === 'x') {
                target.classList.add(`x`)
                showAllBoom(chess)
                alert('你失败了，下次加油')

                // 解绑事件
                divChess.removeEventListener("click", leftClick);
                divChess.removeEventListener("mousedown", rightClick);
            }

            open(chess, data.x, data.y)
        }
    }
    // 绑定左击事件
    bindEvent(divChess, 'click', leftClick)

    // 鼠标右击事件
    var rightClick = function (event) {
        // 禁止右键弹出选项卡
        divChess.oncontextmenu = function (e) {
            return false;
        }
        let target = event.target

        // 判断是否为右击操作
        if (event.button == 2) {
            cell = target.classList.contains('cell')
            isup = target.classList.contains('isup')
            if (!isup) {
                if (cell) {
                    toggleClass(target, 'flag')
                }

                // 判断是否找出地雷并计数
                let data = target.dataset
                if (target.classList.contains('flag')) {
                    flagMineNum++
                    if (chess.arr[data.x][data.y] === 'x') {
                        findMineNum++
                    }
                } else {
                    flagMineNum--
                    if (chess.arr[data.x][data.y] === 'x') {
                        findMineNum--
                    }
                }
                if (flagMineNum == chess.num) {
                    if (findMineNum == chess.num) {
                        showAllBoom(chess)
                        alert('恭喜你成功了')
                    } else {
                        // 全部标记但是有错误
                        // alert('有错误')
                    }
                } else if (flagMineNum > chess.num) {
                    alert('game over')
                    // 解绑事件
                    divChess.removeEventListener("click", leftClick);
                    divChess.removeEventListener("mousedown", rightClick);
                }
                countNum = chess.num - flagMineNum
                if (countNum <= 0) {
                    countNum = 0
                }
                document.getElementById('count').innerHTML = `剩余地雷&nbsp${countNum}&nbsp`
            }
        }
    }
    // 绑定右击事件
    bindEvent(divChess, 'mousedown', rightClick)
}

function getbackground(mydiv){
    let imgs = [
        'background1.jpg',
        'background2.jpg',
        'background3.jpg',
        'background4.jpg',
        'background5.jpg'
    ]
    let rand = getRandNum(imgs.length) - 1
    background = imgs[rand]
    mydiv.style.backgroundImage= `url(./img/${background})`
}

function shouye(){
    let bigcell = e('#bigcell')
    let myclick = function(){
        getbackground(bigcell)
        let cell = es('.cell')
        for(i = 0; i < cell.length; i++){
            cell[i].style.display = "inline-block"
        }
        bigcell.removeEventListener("click", myclick);
    }
    bindEvent(bigcell,'click',myclick)
}

function main() {
    
    init(9, 9, 6)
    shouye()
    // getbackground(bigcell)
}

main()