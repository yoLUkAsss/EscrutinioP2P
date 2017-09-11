import React, { Component } from 'react'

class Error404 extends Component {

    render() {
        return (
            <div>
                <h1> Will be covered </h1>

                <div className="wrap">
                    <div className="logo">
                    <h1>404</h1>
                        <p>El lugar al que esta intentando acceder no existe</p>
                        <div className="sub">
                            <p><a href="/">Inicio</a></p>
                        </div>
                    </div>
                </div>
                    
                <div className="footer">
                    Design by-<a href="http://w3layouts.com">W3Layouts</a>
                </div>
            </div>
        )
    }
}

export default Error404