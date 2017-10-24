import {Operations} from './'
class Node {
    constructor(x, y, walkable, weight) {
        this.x = x
        this.y = y
        this.walkable = (walkable === undefined ? true : walkable)
        this.weight = (weight === undefined ? 1 : weight)
    }

    get opened() {
        return this._opened
    }

    set opened(v) {
        this._opened = v
       Operations.push({
            x: this.x,
            y: this.y,
            attr: 'opened',
            value: v
        })
    }

    get closed() {
        return this._closed
    }
    set closed(v) {
        this._closed = v
        Operations.push({
             x: this.x,
             y: this.y,
             attr: 'closed',
             value: v
        })
    }
    getCost(fromNeighbor){
        if (this.weight > 1){
            debugger
        }
        if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
            return this.weight * Math.SQRT2
        }
        return this.weight
    }
}

export default Node
