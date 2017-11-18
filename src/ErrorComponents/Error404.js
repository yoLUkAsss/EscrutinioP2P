import React, { Component } from 'react'

class Error404 extends Component {

    render() {
        return (
            <div>
                <div className="wrap">
                    <div className="logo">
                    <h1>Error 404</h1>
                        <p>El lugar al que esta intentando acceder no existe</p>
                        <div className="sub">
                            <p><a href="/">Volver a Inicio</a></p>
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