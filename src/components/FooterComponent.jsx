import React, { Component } from 'react'

export default class FooterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">EMERGYS Mexico 2021</span>
                </footer>
            </div>
        )
    }
}
