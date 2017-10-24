import React, { Component } from 'react'
import {GridView, Results, Settings}  from './'
import LabirynthOne from './LabyrinthOne'
import LabirynthTwo from './LabyrinthTwo'
import LabyrinthThree from './LabyrinthThree'
import WeightMatrix from './WeightMatrix'
import {AStarFinder, BestFirstFinder, BreadthFirstFinder, BiAStarFinder, BiBestFirstFinder,
    BiBreadthFirstFinder, BiDijkstraFinder, DijkstraFinder, Grid, Operations, Heuristic, Util} from '../custom'

const ROWS = 30
const COLS = 30
const CELL_SIZE = (ROWS > 35 ? 10 : 25)
const VERSION = 0
class Root extends Component {
    constructor() {
        super()
        this.state = {
            rowsInGrid : ROWS,
            columnsInGrid : COLS,
            cellWidth : CELL_SIZE,
            cellHeight: CELL_SIZE,
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            userData:[],
            grid: new Grid(ROWS, COLS),
            operationCount: 0,
            timeSpent: 0,
            algorithm: "BreadthFirstFinder",
            closed: 0,
            opened: 0,
            allowDiagonal: false,
            lengthOfPath: 0,
            heuristic: Heuristic.manhattan,
            costOfPath: 0
        }
        this.getData = this.getData.bind(this)
        this.setAllowDiagonal = this.setAllowDiagonal.bind(this)
        this.setAlgorithm = this.setAlgorithm.bind(this)
        this.setHeuristic = this.setHeuristic.bind(this)
    }
    componentWillMount(){
        console.log(`Root: componentWillMount`)
        const startCell = this.setStartCell(4,4)
        const endCell = this.setEndCell(25,25)

        const init = this.initData(startCell, endCell)

        const grid = this.state.grid
        if (VERSION > 0)
            this.drawWall(init, startCell, endCell, grid)

        this.setWeight(init, grid)
        this.setState({
            userData: init,
        })
    }
    drawWall(init, startCell, endCell, grid){

        if (VERSION === 1){
            for (let row = 0; row < init.length; row++) {
                for (let column = 0; column < init[row].length; column++) {
                    if (column === startCell[1] + 2 && row >= startCell[0] + 2 && row < endCell[0] - 1 && row % 3 > 0){
                        init[row][column].isWall = true
                        grid.setWalkableAt(row, column, false)
                    }

                    if (column === endCell[1] - 2 && row >= startCell[0] + 2 && row < endCell[0] - 1) {
                        init[row][column].isWall = true
                        grid.setWalkableAt(row, column, false)
                    }

                    if (row === startCell[0] + 2 && column >= startCell[1] + 2 && column < endCell[1] - 1 && column % 3 > 0){
                        init[row][column].isWall = true
                        grid.setWalkableAt(row, column, false)
                    }

                    if (row === endCell[0] - 2 && column >= startCell[1] + 2 && column < endCell[1] - 1) {
                        init[row][column].isWall = true
                        grid.setWalkableAt(row, column, false)
                    }
                }
            }
        }
        else if (VERSION === 2){
            for (let row = 0; row < init.length; row++) {
                for (let column = 0; column < init[row].length; column++) {
                    if (LabirynthOne[row][column] === 1){
                        init[row][column].isWall = true
                        grid.setWalkableAt(row, column, false)
                    }
                }
            }
        }
        else if (VERSION === 3){
            for (let row = 0; row < init.length; row++) {
                for (let column = 0; column < init[row].length; column++) {
                    if (LabirynthTwo[row][column] === 1){
                        init[row][column].isWall = true
                        grid.setWalkableAt(row, column, false)
                    }
                }
            }
        }
        else if (VERSION === 4){
            for (let row = 0; row < init.length; row++) {
                for (let column = 0; column < init[row].length; column++) {
                    if (LabyrinthThree[row][column] === 1){
                        init[row][column].isWall = true
                        grid.setWalkableAt(row, column, false)
                    }
                }
            }
        }
    }
    setWeight(init, grid){
        for (let row = 0; row < init.length; row++) {
            for (let column = 0; column < init[row].length; column++) {
                    let weight = WeightMatrix[row][column]
                    if (weight > 1) {
                        init[row][column].weight = weight
                        grid.setWeightAt(row, column, weight)
                    }
            }
        }
    }
    setStartCell(x = 0, y = 0){
        if (x > this.state.rowsInGrid - 1 || x < 0)
            x = 0

        if (y > this.state.columnsInGrid - 1 || y < 0)
            y = 0

        this.setState({
            startX: x,
            startY: y
        })
        return [x,y]
    }
    setEndCell(x = this.state.rowsInGrid - 1, y = this.state.columnsInGrid - 1){
        if (x > this.state.rowsInGrid - 1 || x < 0)
            x = this.state.rowsInGrid - 1

        if (y > this.state.columnsInGrid - 1 || y < 0)
            y = this.state.columnsInGrid - 1

        if (x !== this.state.startX && y !== this.state.startY) {
            this.setState({
                endX: x,
                endY: y
            })
        }
        return [x,y]
    }
    initData(startCell = [this.state.startX, this.state.startY], endCell = [this.state.endX, this.state.endY]) {
        const cellWidth = this.state.cellWidth
        const cellHeight = this.state.cellHeight
        const data = []
        let xpos = 1
        let ypos = 1

        for (let row = 0; row < this.state.rowsInGrid; row++) {
            data.push([]);
            for (let column = 0; column < this.state.columnsInGrid; column++) {
                let isStart = false
                let isEnd = false
                
                if (startCell[0] === row && startCell[1] === column)
                    isStart = true
                
                if (endCell[0] === row && endCell[1] === column)
                    isEnd = true
                
                data[row].push({
                    rowNr: row + 1,
                    colNr: column + 1,
                    x: xpos,
                    y: ypos,
                    width: cellWidth,
                    height: cellHeight,
                    isWall: false,
                    inPath: false,
                    isStart: isStart,
                    isEnd: isEnd,
                    opened: false,
                    closed: false,
                    weight: 1
                })
                xpos += cellWidth
            }
            xpos = 1
            ypos += cellHeight
        }
        return data
    }
    getFinder(){
        let finder = null
        switch (this.state.algorithm){
            case "AStarFinder":
                finder = new AStarFinder({allowDiagonal: this.state.allowDiagonal, dontCrossCorners: false, heuristic: this.state.heuristic})
                break
            case "BestFirstFinder":
                finder = new BestFirstFinder({allowDiagonal: this.state.allowDiagonal, dontCrossCorners: false, heuristic: this.state.heuristic})
                break

            case "BiAStarFinder":
                finder = new BiAStarFinder({allowDiagonal: this.state.allowDiagonal, dontCrossCorners: false, heuristic: this.state.heuristic})
                break

            case "BiBestFirstFinder":
                finder = new BiBestFirstFinder({allowDiagonal: this.state.allowDiagonal, dontCrossCorners: false, heuristic: this.state.heuristic})
                break

            case "BiBreadthFirstFinder":
                finder = new BiBreadthFirstFinder({allowDiagonal: this.state.allowDiagonal, dontCrossCorners: false})
                break

            case "BiDijkstraFinder":
                finder = new BiDijkstraFinder({allowDiagonal: this.state.allowDiagonal, dontCrossCorners: false})
                break

            case "BreadthFirstFinder":
                finder = new BreadthFirstFinder({allowDiagonal: this.state.allowDiagonal, dontCrossCorners: false})
                break

            case "DijkstraFinder":
                finder = new DijkstraFinder({allowDiagonal: this.state.allowDiagonal, dontCrossCorners: false})
                break
        }
        return finder

    }
    getData(param){
        if (param != null && Array.isArray(param)){

            console.log(`Generating new data`)
            const copy = param
            const timeStart = window.performance ? performance.now() : Date.now()
            debugger
            const grid = this.state.grid.clone()

            const finder = this.getFinder()

            const path = finder.findPath(this.state.startX, this.state.startY, this.state.endX, this.state.endY, grid)
            debugger
            let costOfPath = 0
            const lengthOfPath = Util.pathLength(path) //path.length
            if (lengthOfPath > 0){
                path.forEach((element) => {
                    costOfPath += element[2]
                    copy[element[0]][element[1]].inPath = true
                })
            }
            const operationCount = Operations.length

            let opened = 0
            let closed = 0
            if (operationCount > 0){
                Operations.forEach(element => {
                    if (element.attr === "opened") {
                        copy[element.x][element.y].opened = element.value
                        opened++
                    }
                    else if (element.attr === "closed") {
                        copy[element.x][element.y].closed = element.value
                        closed++
                    }
                })
            }
            const timeEnd = window.performance ? performance.now() : Date.now();
            const timeSpent = (timeEnd - timeStart).toFixed(4);
            this.setState({
                userData: copy,
                timeSpent,
                operationCount,
                closed,
                opened,
                lengthOfPath,
                costOfPath
            })

        }
        else
            console.log(`getData is null`)
    }
    setAllowDiagonal(allowDiagonal){
        console.log(`Allow Diagonal: ${allowDiagonal}`)
        this.setState({
            allowDiagonal
        })
    }
    setAlgorithm(algorithm){
        console.log(`Algorithm: ${algorithm}`)
        this.setState({
            algorithm
        })
    }
    setHeuristic(heuristic){
        console.log(`Heuristic: ${heuristic}`)
        this.setState({
            heuristic: Heuristic[heuristic]
        })
    }
    render(){
        return(
            <div>
                <Settings
                    setAllowDiagonal={this.setAllowDiagonal}
                    setAlgorithm={this.setAlgorithm}
                    setHeuristic={this.setHeuristic}
                />
                <GridView
                    rowsInGrid={this.state.rowsInGrid}
                    columnsInGrid={this.state.columnsInGrid}
                    cellWidth={this.state.cellWidth}
                    cellHeight={this.state.cellHeight}
                    userData={this.state.userData}
                    getData={this.getData}
                    grid={this.state.grid}
                />
                <Results
                    lengthOfPath={this.state.lengthOfPath}
                    operationCount={this.state.operationCount}
                    timeSpent={this.state.timeSpent}
                    opened={this.state.opened}
                    closed={this.state.closed}
                    all={ROWS * COLS}
                    costOfPath={this.state.costOfPath}
                />
            </div>
        )
    }
}

export default Root
