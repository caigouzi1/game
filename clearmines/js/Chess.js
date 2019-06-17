class Chess {
    constructor(x, y, num) {
        this.x = x
        this.y = y
        this.num = num
        this.init()
    }

    // 执行所有初始化程序
    init() {
        // 创建数组
        this.getChess()
        // 获取地雷位置
        this.getMines()
        // 将地雷位置加入数组中
        this.addMine()
        // 计算地雷数量
        this.count()
    }

    // 初始数组
    getChess() {
        let arr = []
        for (let i = 0; i < this.x; i++) {
            arr[i] = []
            for (let j = 0; j < this.y; j++) {
                arr[i][j] = 0
            }
        }
        this.arr = arr
    }

    // 初始地雷位置数组
    getMines() {
        let i = 0
        let m = new Map()
        while (i < this.num) {
            let xx = (getRandNum(this.x) - 1)
            let yy = (getRandNum(this.y) - 1)
            if (m.has(xx)) {
                let s = m.get(xx)
                if (!s.has(yy)) {
                    i++
                }
                s.add(yy)
            } else {
                let s = new Set()
                s.add(yy)
                let b = m.set(xx, s)
                i++
            }
        }
        this.Mines = m
    }

    // 添加地雷至数组
    addMine() {
        let arr = this.arr
        let mines = this.Mines
        for (var [key, value] of mines) {
            for (let item of value.values()) {
                arr[key][item] = 'x'
            }
        }
        this.arr = arr
    }

    // 给地雷周围的数都加1
    count() {
        let arr = this.arr
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                // 获取地雷的坐标
                if (this.arr[i][j] === 'x') {
                    // 执行加一操作
                    this.plusOne(i, j)
                }
            }
        }
    }

    // 判断坐标是否可执行加一操作
    judgeCondition(i, j) {
        let flag = false
        if (0 <= i && i < this.x) {
            if (0 <= j && j < this.y) {
                flag = true
            }
        }
        return flag
    }

    plusOne(i, j) {
        // 左上加一
        if (this.judgeCondition(i - 1, j - 1)) {
            if (this.arr[i - 1][j - 1] !== 'x') {
                this.arr[i - 1][j - 1] += 1
            }
        }
        // 正上方加一
        if (this.judgeCondition(i - 1, j)) {
            if (this.arr[i - 1][j] !== 'x') {
                this.arr[i - 1][j] += 1
            }
        }
        // 右上加一
        if (this.judgeCondition(i - 1, j + 1)) {
            if (this.arr[i - 1][j + 1] !== 'x') {
                this.arr[i - 1][j + 1] += 1
            }
        }
        // 左边加一
        if (this.judgeCondition(i, j - 1)) {
            if (this.arr[i][j - 1] !== 'x') {
                this.arr[i][j - 1] += 1
            }
        }
        // 右边加一
        if (this.judgeCondition(i, j + 1)) {
            if (this.arr[i][j + 1] !== 'x') {
                this.arr[i][j + 1] += 1
            }
        }
        // 左下加一
        if (this.judgeCondition(i + 1, j - 1)) {
            if (this.arr[i + 1][j - 1] !== 'x') {
                this.arr[i + 1][j - 1] += 1
            }
        }
        // 正下方加一
        if (this.judgeCondition(i + 1, j)) {
            if (this.arr[i + 1][j] !== 'x') {
                this.arr[i + 1][j] += 1
            }
        }
        // 右下加一
        if (this.judgeCondition(i + 1, j + 1)) {
            if (this.arr[i + 1][j + 1] !== 'x') {
                this.arr[i + 1][j + 1] += 1
            }
        }
    }


}