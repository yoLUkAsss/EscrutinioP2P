import React, { Component } from 'react';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import ComponentTitle from './utils/ComponentTitle.js'

import Center from 'react-center'

class About extends Component {

    render() {
        return (
            <Center>
            <div>

                <ComponentTitle title='Sobre Nosotros'/>

                <p>
                    Somos estudiantes de la Tecnicatura en Programación Informática y Licenciatura en Informática de
                    la Universidad Nacional de Quilmes.
                </p>

                <p>
                    Nos encontramos desarrollando una aplicación web como Trabajo de Inserción Profesional en el marco de
                    material final de Tecnicatura.
                </p>

                <p>
                    Ante cualquier información comunicarse con <strong>sandoval.lucasj@gmail.com</strong> o <strong>laimejesu@gmail.com</strong>.
                </p>
            </div>
            </Center>
        )
    }
}

export default About
