import React, { Component } from 'react'

class Results extends Component {
    render(){
        return (
            <div id="results">
                {this.props.operationCount > 0 &&
                    <div>
                        <h4>Path: {this.props.lengthOfPath} including end cell</h4>
                        <h4>Cost: {this.props.costOfPath}</h4>
                        <h4>Operations: {this.props.operationCount}</h4>
                        <h4>Spent time: {this.props.timeSpent}ms</h4>
                        <h4>Closed: {this.props.closed} / {this.props.all} [{this.props.closed * 100 / this.props.all} %]</h4>
                        <h4>Opened: {this.props.opened} / {this.props.all} [{this.props.opened * 100 / this.props.all} %]</h4>
                        <h4>Difference: {this.props.opened - this.props.closed}</h4>
                    </div>
                }
            </div>
        )
    }
}

export default Results