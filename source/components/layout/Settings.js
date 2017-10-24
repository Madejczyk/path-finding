import React, { Component } from 'react'

class Settings extends Component {
    constructor(props) {
        super(props)
    }

    onAllowDiagonal(event){
        //event.preventDefault()
        this.props.setAllowDiagonal(event.target.checked)
    }

    onChangeAlgorithm(event){
        event.preventDefault()
        this.props.setAlgorithm(document.getElementById("select_algorithm").value)
    }

    onChangeHeuristic(event){
        event.preventDefault()
        this.props.setHeuristic(document.getElementById("select_heuristic").value)
    }

    render(){
        return (
            <div>
                <h4>Algorithm:</h4>
                <select id="select_algorithm" onChange={this.onChangeAlgorithm.bind(this)} defaultValue="BreadthFirstFinder">
                    <option value="AStarFinder">A* Finder</option>
                    <option value="BestFirstFinder">Best First Finder</option>
                    <option value="BiAStarFinder">Bi A* Finder</option>
                    <option value="BiBestFirstFinder">Bi Best First Finder</option>
                    <option value="BiBreadthFirstFinder">Bi Breadth First Finder</option>
                    <option value="BiDijkstraFinder">Bi Dijkstra Finder</option>
                    <option value="BreadthFirstFinder">Breadth First Finder</option>
                    <option value="DijkstraFinder">Dijkstra Finder</option>
                </select>

                <h4>Heuristic:</h4>
                <select id="select_heuristic" onChange={this.onChangeHeuristic.bind(this)} defaultValue="manhattan">
                    <option value="manhattan">Manhattan</option>
                    <option value="euclidean">Euclidean</option>
                    <option value="octile">Octile</option>
                    <option value="chebyshev">Chebyshev</option>
                </select>

                <h4>Options:</h4>
                <label>
                    <input
                        type="checkbox"
                        value="Diagonal"
                        onChange={this.onAllowDiagonal.bind(this)}
                    />
                    Allow Diagonal
                </label>

                <h4>Key:</h4>
                <div><div className="cell" style={{backgroundColor: "#fff"}}></div>Weight of 1</div>
                <div><div className="cell" style={{backgroundColor: "#f0e979"}}></div>Weight of 3</div>
                <div><div className="cell" style={{backgroundColor: "#f0a500"}}></div>Weight of 5</div>
                <div><div className="cell" style={{backgroundColor: "#b64700"}}></div>Wall (Impassable)</div>
            </div>
        )
    }
}

export default Settings