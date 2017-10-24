import React, { Component } from 'react'

class GridView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.userData,
        }
    }
    
    componentDidMount() {
        console.log(`Grid: componentDidMount`)
        this.drawGrid()
    }

    componentWillReceiveProps(nextProps){
        console.log(`Grid: componentWillReceiveProps`)
        d3.select("svg").remove()
        this.drawGrid(nextProps.userData)
    }

    componentWillUpdate(nextProps, nextState){
        //console.log(`Grid: componentWillUpdate`)
    }
    

    componentDidUpdate(prevProps, prevState){
        //console.log(`Grid: componentDidUpdate`)
    }

    drawGrid(arr = this.state.data) {
        let self = this
        const grid = d3.select("#grid")
            .append("svg")
            .attr("width", (this.props.columnsInGrid * this.props.cellWidth + 2) + "px")
            .attr("height", (this.props.rowsInGrid * this.props.cellHeight + 2) + "px")

        const row = grid.selectAll(".row")
            .data(arr)
            .enter().append("g")
            .attr("class", "row")
        
        const column = row.selectAll(".square")
            .data((d) => {
                return d
            })
            .enter().append("rect")
            .attr("x", (d) => {
                return d.x
            })
            .attr("y", (d) => {
                return d.y
            })
            .attr("rx", (d) => {
                return d.x / 50
            })
            .attr("ry", (d) => {
                return d.y / 50
            })
            .attr("width", (d) => {
                return d.width
            })
            .attr("height", (d) => {
                return d.height
            })
            .attr("weight",(d) => {
                return d.weight
            })
            .attr("rowNr", (d) => {
                return d.rowNr
            })
            .attr("colNr", (d) => {
                return d.colNr
            })
            .style("fill", (d) => {
                if (d.isStart) {
                    return "#05fe7a"
                }
                else if (d.isEnd){
                    return "#ff0055"
                }
                else if (d.isWall){
                    return "#b64700"
                }
                else if (d.inPath){
                    return "#80bdb5"
                }
                else if (d.closed){
                    return "#b6927b"
                }
                else if (d.opened){
                    return "#a5d6a9"
                }
                else if (d.weight > 1){
                    if (d.weight <= 3)
                        return "#f0e979"
                    else
                        return "#f0a500"
                }
                else return "#fff"
            })
            .style("stroke", "#222")
            .on('click', function (d) {
                if (!d.isStart && !d.isEnd) {
                    d.isWall = !d.isWall
                    self.changeValue(d)
                    if (d.isWall){
                        d3.select(this)
                            .transition()
                            .duration(1500)
                            .style("fill", "#b64700")
                    }
                    else{
                        d3.select(this)
                            .transition()
                            .duration(1500)
                            .style("fill", "#fff")
                    }
                }
            })
            .on('mouseover', function (d) {
                d3.select('#gridRef').text(function () {
                    return "row:" + d.rowNr + " | col:" + d.colNr
                })
            })
    }

    changeValue(d){
        const nrRow = d.rowNr-1
        const nrCol = d.colNr-1
        const copy = Object.assign([], this.state.data)
        copy[nrRow][nrCol].isWall = d.isWall
        this.props.grid.setWalkableAt(nrRow, nrCol, !d.isWall)
        this.setState({
            data: copy
        })
        console.log(`Change status isWall at (R:${nrRow} | C:${nrCol}): ${d.isWall}`)
    }

    start(){
        this.props.getData(this.state.data)
        document.getElementById("buttonStart").style.visibility = "hidden"
    }
    clear(){
        //ToDo
    }
    render() {
        return (
            <div id="gridView">
                <div className="headerGrid">
                    <h4 id="gridRef">roll-over grid</h4>
                </div>
                <div id="grid"></div>
                
                <button id="buttonStart" onClick={this.start.bind(this)}>
                    Start
                </button>
{/*                <button onClick={this.clear.bind(this)}>
                    Clear
                </button>*/}
            </div>
        )
    }
}

export default GridView