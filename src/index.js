import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Game } from './gameModule';

class LevelSelector extends React.Component{
    render(){

        if(this.props.isTutoLevel){

            const title = ['Simples', 'Multiples', 'Exemple', 'Assemblage', 'Déverrouillage', 'Duplication'][this.props.number - 1]
            const color = ['blue', 'darkBlue', 'purple', 'red', 'green', 'yellow'][this.props.number - 1]

            return(
                <div className='levelSelector' onClick={this.props.onClick} style={{background: 'white', width: '350px', fontSize: '36px', border: `${color} solid 5px`}}>
                    {title}
                </div>
            )
        }

        else if(this.props.isTuto){
            return(
                <div className='tutoSelector' onClick={this.props.onClick}>
                    <h1>Didacticiel</h1>
                    <p>Comment jouer ?</p>
                </div>
            )
        }

        else{
            const number = this.props.number - 1
            const borderColor = number < 3 ? 'blue' : number < 6 ? 'darkBlue' : number < 10 ? 'orangered' : number < 14 ? 'red' : 'black'

            return(
                <div className='levelSelector' onClick={this.props.onClick} style={{borderColor}}>
                    {this.props.number}
                </div>
            )
        }
    }
}

class DataLevel extends React.Component{
    render(){
        const scaleYDataLevel = this.props.print ? 1 : 0
        const scaleXDataLevelTuto = this.props.print === 0 ? 1 : 0

        const difficulty = this.props.print < 7 ? 'Facile' : this.props.print < 11 ? 'Moyenne' : this.props.print < 15 ? 'Difficile' : 'Très difficile'
        const couleurRond = this.props.print < 7 ? 'yellow' : this.props.print < 11 ? 'orangered' : this.props.print < 15 ? 'red' : 'black'

        return(
            <div>
                <div className='dataLevel' style={{transform: `scaleY(${scaleYDataLevel})`}}>
                    <button className='dataLevelRetour' onClick={this.props.retour}><p>Retour</p></button>
                    <div className='dataLevelHeader'>
                        <div className='title'>
                            <h1>{'Level ' + this.props.print}</h1>
                            <div className='specific' style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <div className='rondColor' style={{width: '20px', height: '20px', background: couleurRond, borderRadius: '50%', border: 'black 1px solid'}}></div>
                                <p>Difficulté : {difficulty}</p>
                            </div>
                        </div>
                    </div>
                    <div className='img'></div>
                    <button className='dataLevelJouer' onClick={() => this.props.jouer(this.props.print)}>JOUER</button>
                </div>

                <div className='dataLevelTuto' style={{transform: `scaleX(${scaleXDataLevelTuto})`}}>
                    <button className='dataLevelRetour' onClick={this.props.retour}><p>Retour</p></button>
                    <div className='dataLevelHeader'>
                        <div className='title'>
                            <h1>{'Didacticiel'}</h1>
                            <p>Difficulté : inexistante</p>
                        </div>
                    </div>
                    <div className='levelSelection'>
                        {[1, 2, 3, 4, 5, 6].map((number, i) => {
                            return(
                                <LevelSelector
                                    number = {number}
                                    isTuto = {i === 0}
                                    isTutoLevel = {true}
                                    onClick = {() => this.props.test(number)}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

class Menu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataLevelPrint: undefined,
        }
    }

    render(){

        let arrayOfSimpleNumber = []
        for(let i = 0; i < 19; i++){
            arrayOfSimpleNumber.push(i)
        }

        return(
            <div className='menu'>

                <div className='title'>
                    <h1>Slab Road</h1>
                    <p>Jeu d'énigmes</p>
                </div>

                <div className='levelSelection'>
                    {arrayOfSimpleNumber.map((number, i) => {
                        return(
                            <LevelSelector
                                number = {number}
                                isTuto = {i === 0}
                                isTutoLevel = {false}
                                onClick = {() => this.setState({dataLevelPrint: number})}
                            />
                        )
                    })}
                </div>

                <DataLevel
                    print = {this.state.dataLevelPrint}
                    retour = {() => this.setState({dataLevelPrint: undefined})}
                    jouer = {(number) => this.props.jouer(number)}
                    test = {(number) => this.props.jouer(number - 6)}
                />
                
            </div>
        )
    }
}

class SlabRoad extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentDisplay: 'menu'
        }
    }

    render(){

        //left side (0: none, 1: wall, 2: blue, 3: darkBlue, 4: red)
        //top side (0: none, 1: wall, 2: blue, 3: darkBlue, 4: red)
        //slab (0: none, 1: none, 2: blue, 3: darkBlue, 4: bigRed, 5: orangered, 6: yellow: 7: green)
        
        const tuto1 = () => {
            const nbSquareWidth = 3
            const arrayOfAllBlobColors = ['red', 'blue']
            const matrixOfWall = [
                [0, 0, 5, 0, 99], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99],
                [0, 0, 0, 0, 0], [0, 0, 2, 0, 1], [0, 0, 0, 0, 0],
                [0, 2, 0, 2, 0], [0, 1, 2, 0, 2], [0, 2, 0, 1, 0],
                [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 5, 0, 98],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors,
            }
        }

        const tuto2 = () => {
            const nbSquareWidth = 5
            const arrayOfAllBlobColors = ['red', 'blue', 'green']
            const matrixOfWall = [
                [0, 0, 5, 0, 99], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99],
                [0, 0, 0, 0, 0], [0, 0, 3, 0, 1], [0, 0, 0, 0, 0], [0, 0, 3, 0, 1], [0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0], [0, 1, 3, 0, 1], [0, 3, 0, 1, 0], [0, 1, 3, 0, 1], [0, 1, 0, 0, 0],
                [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 5, 0, 98],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const tuto3 = () => {
            const nbSquareWidth = 6
            const arrayOfAllBlobColors = ['red', 'blue', 'purple', 'green']
            const matrixOfWall = [
                [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 2, 0, 3],
                [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 3, 0, 1], [0, 3, 0, 2, 0], [1, 2, 0, 3, 0], [0, 1, 3, 0, 2],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [3, 0, 0, 1, 0], [0, 0, 0, 0, 0],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 3, 0, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 3, 0, 2],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const tuto4 = () => {
            const nbSquareWidth = 8
            const arrayOfAllBlobColors = ['red', 'blue', 'purple', 'green', 'orangered']
            const matrixOfWall = [
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [4, 0, 0, 1, 0], [0, 0, 2, 0, 2], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 4, 0, 1, 4], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99],
                [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 0, 0, 2, 0], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }
        
        const tuto5 = () => {
            const nbSquareWidth = 3
            const arrayOfAllBlobColors = ['red', 'blue']
            const matrixOfWall = [
                [0, 0, 5, 0, 99], [0, 0, 7, 0, 0], [0, 0, 5, 0, 99],
                [0, 0, 0, 0, 0], [0, 0, 2, 0, 90], [0, 0, 0, 0, 0],
                [0, 2, 0, 2, 0], [0, 1, 2, 0, 2], [0, 2, 0, 90, 0],
                [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 5, 0, 98],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const tuto6 = () => {
            const nbSquareWidth = 4
            const arrayOfAllBlobColors = ['red']
            const matrixOfWall = [
                [0, 0, 5, 0, 99], [0, 0, 0, 0, 0], [2, 0, 0, 1, 0], [0, 0, 2, 0, 1],
                [0, 1, 5, 0, 98], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 6, 0, 0, 1],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const level1 = () => {
            const nbSquareWidth = 4
            const arrayOfAllBlobColors = ['red', 'blue', 'green', 'purple', 'orangered']
            const matrixOfWall = [
                [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99],
                [0, 0, 4, 0, 7, 3], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99], [1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 7, 0, 0], [1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [3, 0, 0, 8, 0],
                [0, 4, 0, 7, 0], [0, 1, 3, 0, 8], [0, 1, 3, 0, 8], [0, 2, 0, 6, 0],
                [0, 0, 3, 0, 5], [0, 0, 3, 0, 5], [0, 0, 0, 0, 0], [0, 0, 2, 0, 6],
                [0, 0, 3, 0, 4], [0, 0, 0, 0, 0], [1, 3, 0, 5, 0], [0, 1, 0, 0, 0],
                [0, 3, 0, 4, 0], [0, 4, 0, 3, 0], [1, 0, 4, 0, 3, 3], [0, 0, 0, 0, 0],
                [0, 0, 3, 0, 4], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 2, 0, 90], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 2, 0, 90, 0], [0, 3, 0, 2, 0], [0, 2, 0, 90, 0], [0, 2, 0, 1, 0],
                [0, 0, 5, 0, 98], [0, 0, 3, 0, 2], [0, 0, 3, 0, 2], [0, 0, 2, 0, 1],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const level2 = () => {
            const nbSquareWidth = 12
            const arrayOfAllBlobColors = ['red', 'blue', 'green', 'purple', 'orangered']
            const matrixOfWall = [
                [0, 0, 2, 0, 11], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 2, 0, 9], [2, 0, 0, 14, 0], [0, 0, 0, 0, 0], [2, 0, 0, 14, 0],
                [0, 1, 3, 0, 5], [0, 3, 0, 5, 0], [0, 0, 3, 0, 5], [0, 0, 0, 0, 0], [1, 3, 0, 12, 0], [1, 0, 3, 0, 13], [0, 0, 3, 0, 13], [1, 2, 0, 11, 0], [2, 1, 0, 9, 0], [0, 0, 2, 0, 14], [1, 1, 5, 0, 99], [0, 0, 5, 0, 99],
                [0, 0, 2, 0, 3], [0, 0, 0, 0, 0], [1, 1, 4, 0, 10, 3], [0, 3, 0, 13, 0], [0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 2, 0, 8, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [4, 1, 0, 10, 0], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99],
                [0, 1, 0, 0, 0], [0, 2, 0, 4, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 3, 0, 12], [0, 1, 3, 0, 12], [1, 0, 2, 0, 17], [0, 0, 5, 0, 99],
                [0, 0, 0, 0, 0], [0, 0, 2, 0, 4], [0, 0, 0, 0, 0], [0, 0, 2, 0, 2], [0, 0, 0, 0, 0], [1, 2, 0, 2, 0], [1, 0, 2, 0, 8], [1, 1, 2, 0, 21], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [2, 0, 0, 21, 0], [0, 0, 5, 0, 99],
                [0, 2, 5, 3, 98], [0, 1, 5, 0, 98], [0, 3, 0, 1, 0], [0, 1, 3, 0, 1], [0, 1, 0, 0, 0], [3, 0, 0, 1, 0], [1, 1, 2, 0, 16], [1, 1, 0, 0, 0], [0, 3, 0, 20, 0], [1, 1, 3, 0, 20], [0, 0, 0, 0, 0], [0, 0, 3, 0, 20],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 3, 1, 1], [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [2, 0, 0, 18, 0], [1, 0, 0, 0, 0], [0, 2, 0, 16, 0], [0, 1, 0, 0, 0], [2, 1, 0, 18, 0], [0, 2, 0, 17, 0], [0, 1, 2, 0, 18],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const level3 = () => {
            const nbSquareWidth = 7
            const arrayOfAllBlobColors = ['red', 'blue', 'green', 'purple', 'orangered']
            const matrixOfWall = [
                [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 5, 0, 99], [0, 0, 3, 0, 13], [0, 0, 3, 0, 13], [0, 0, 0, 0, 0], [3, 0, 0, 13, 0], [0, 0, 2, 0, 10], [0, 0, 2, 0, 9],
                [0, 0, 4, 0, 12, 3], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 2, 0, 14], [0, 0, 0, 0, 0], [1, 2, 0, 10, 0], [0, 1, 0, 0, 0], [1, 2, 0, 9, 0],
                [0, 1, 2, 0, 11], [0, 1, 0, 0, 0], [2, 0, 0, 11, 0], [0, 0, 0, 0, 0], [1, 0, 2, 0, 4], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 2, 0, 14, 0], [3, 0, 0, 7, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 2, 0, 8], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 2, 0, 4, 0],
                [0, 1, 3, 0, 7], [0, 2, 0, 8, 0], [0, 1, 2, 0, 6], [1, 1, 0, 0, 0], [1, 2, 0, 6, 0], [0, 1, 0, 0, 0], [0, 0, 2, 0, 4],
                [0, 0, 3, 0, 7], [0, 0, 3, 0, 1], [0, 0, 0, 0, 0], [2, 0, 0, 3, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [2, 0, 0, 2, 0], [0, 0, 0, 0, 0], [0, 0, 2, 0, 3],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 1],
                [0, 1, 0, 0, 0], [0, 3, 0, 1, 0], [1, 1, 3, 0, 5], [0, 1, 0, 0, 0], [0, 3, 0, 5, 0], [0, 4, 0, 12, 0], [0, 1, 5, 0, 98],
                [0, 0, 2, 0, 2], [0, 0, 0, 0, 0], [3, 0, 0, 5, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 5], [0, 0, 0, 0, 0], [0, 0, 5, 0, 98],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const level4 = () => {
            const nbSquareWidth = 7
            const arrayOfAllBlobColors = ['red', 'blue', 'green', 'purple', 'orangered']
            const matrixOfWall = [
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [1, 0, 2, 0, 12], [1, 0, 3, 0, 9],
                [0, 0, 0, 0, 0], [0, 0, 3, 0, 13], [0, 0, 0, 0, 0], [1, 1, 3, 0, 7], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0],
                [0, 0, 2, 0, 11], [0, 0, 3, 0, 13], [0, 0, 0, 0, 0], [3, 0, 0, 13, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 0, 0, 12, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 0], [0, 1, 0, 0, 0], [4, 0, 0, 10, 0], [1, 0, 0, 0, 0],
                [0, 2, 0, 11, 0], [4, 1, 0, 10, 0], [1, 0, 0, 0, 0], [2, 0, 0, 6, 0], [0, 0, 0, 0, 0], [2, 1, 0, 12, 0], [0, 0, 0, 0, 0],
                [0, 0, 3, 0, 9], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [3, 1, 0, 9, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [1, 1, 4, 0, 10, 3], [0, 1, 0, 0, 0], [0, 1, 3, 0, 7], [1, 0, 2, 0, 6], [0, 3, 0, 5, 0], [0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [3, 0, 0, 7, 0], [0, 0, 3, 0, 5], [0, 0, 5, 0, 99],
                [0, 0, 3, 0, 8], [0, 1, 3, 0, 8], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [3, 0, 0, 5, 0], [0, 0, 3, 0, 5], [0, 0, 5, 0, 99],
                [0, 0, 0, 0, 0], [3, 1, 0, 4, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99],
                [0, 1, 3, 0, 4], [0, 1, 0, 0, 0], [1, 3, 0, 8, 0], [0, 3, 0, 1, 0], [0, 2, 0, 6, 0], [0, 4, 0, 3, 0], [1, 0, 5, 0, 99],
                [0, 0, 3, 0, 4], [0, 0, 0, 0, 0], [2, 0, 0, 2, 0], [0, 0, 0, 0, 0], [0, 0, 2, 0, 2], [0, 0, 0, 0, 0], [1, 0, 5, 0, 99],
                [0, 1, 4, 0, 3, 5], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 6, 0, 0, 1],
                [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 1, 0, 2, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 3, 0, 1], [0, 0, 3, 0, 1],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const level5 = () => {
            const nbSquareWidth = 8
            const arrayOfAllBlobColors = ['red', 'blue', 'green', 'purple', 'orangered']
            const matrixOfWall = [
                [0, 0, 6, 0, 0, 1], [0, 0, 0, 0, 0], [2, 0, 0, 15, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 0, 0, 15, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 2, 0, 15], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 11], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 1, 2, 0, 10], [0, 3, 0, 8, 0], [1, 1, 0, 0, 0], [0, 2, 0, 10, 0], [1, 1, 2, 0, 9], [0, 1, 3, 0, 11], [1, 3, 0, 11, 0], [0, 1, 0, 0, 0],
                [0, 0, 3, 0, 8], [0, 0, 0, 0, 0], [1, 0, 3, 0, 8], [0, 0, 0, 0, 0], [2, 0, 0, 9, 0], [0, 0, 0, 0, 0], [2, 0, 0, 12, 0], [0, 0, 2, 0, 12],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 2, 0, 7], [0, 0, 0, 0, 0], [2, 1, 0, 7, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 2, 0, 13],
                [0, 1, 3, 0, 6], [0, 3, 0, 6, 0], [1, 0, 3, 0, 6], [0, 0, 0, 0, 0], [1, 0, 2, 0, 9], [0, 0, 0, 0, 0], [3, 0, 0, 14, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 2, 0, 5], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 2, 0, 13, 0], [0, 1, 3, 0, 14],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 2, 0, 5], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 3, 0, 2], [1, 0, 0, 0, 0], [0, 0, 3, 0, 14],
                [0, 1, 0, 0, 0], [0, 2, 0, 5, 0], [1, 1, 3, 0, 4], [0, 2, 0, 3, 0], [0, 3, 0, 4, 0], [0, 1, 3, 0, 4], [1, 3, 0, 2, 0], [0, 1, 0, 0, 0],
                [0, 0, 2, 0, 3], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 2],
                [0, 1, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 0], [0, 1, 5, 0, 99],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [1, 0, 4, 0, 1, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 5, 0, 99], [0, 0, 5, 0, 99],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [4, 0, 5, 1, 99], [0, 0, 5, 0, 99],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const level6 = () => {
            const nbSquareWidth = 8
            const arrayOfAllBlobColors = ['red', 'blue', 'green', 'purple', 'orangered']
            const matrixOfWall = [
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 2, 0, 10], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 2, 0, 8], [0, 0, 0, 0, 0],
                [0, 0, 4, 0, 11, 3], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 0, 0, 10, 0], [1, 1, 0, 0, 0], [0, 3, 0, 12, 0], [0, 0, 0, 0, 0], [1, 2, 0, 15, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 1, 0, 10, 0], [2, 1, 0, 8, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 2, 0, 15],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 3, 0, 12], [0, 0, 3, 0, 12], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99],
                [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 5, 0, 99], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 2, 0, 6], [0, 1, 0, 0, 0], [1, 2, 0, 6, 0], [1, 0, 5, 0, 99],
                [0, 1, 3, 0, 5], [0, 4, 0, 11, 0], [0, 1, 3, 0, 5], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [1, 1, 0, 0, 0], [3, 0, 0, 5, 0], [0, 3, 0, 7, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [2, 0, 0, 90, 0], [0, 0, 0, 0, 0],
                [0, 0, 2, 0, 90], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 2, 4, 16], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 2, 0, 3], [0, 2, 0, 3, 0], [1, 0, 2, 0, 4], [1, 0, 0, 0, 0], [2, 0, 0, 4, 0], [0, 0, 0, 0, 0],
                [0, 4, 0, 1, 0], [0, 2, 0, 16, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 4, 0, 1, 3], [0, 0, 0, 0, 0], [1, 0, 3, 0, 7], [0, 0, 0, 0, 0],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 2, 0, 2, 0], [0, 1, 5, 0, 98], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 7, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 2, 0, 2], [0, 0, 0, 0, 0], [2, 0, 0, 2, 0], [0, 0, 0, 0, 0], [1, 0, 3, 0, 7], [0, 0, 0, 0, 0],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const level7 = () => {
            const nbSquareWidth = 11
            const arrayOfAllBlobColors = ['red', 'blue', 'green', 'purple', 'orangered']
            const matrixOfWall = [
                [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [3, 0, 0, 13, 0], [0, 0, 2, 0, 17], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 16], [0, 0, 3, 0, 16], [0, 0, 2, 0, 18],
                [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [1, 0, 0, 0, 0], [0, 0, 2, 0, 14], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 0, 0, 18, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 5, 0, 99], [0, 0, 0, 0, 0], [2, 0, 0, 19, 0], [1, 1, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 0], [0, 1, 0, 0, 0], [1, 2, 0, 17, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 2, 0, 1], [1, 1, 0, 0, 0], [0, 3, 0, 20, 0], [1, 1, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 2, 0, 15], [1, 0, 2, 0, 19], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [3, 0, 0, 20, 0], [0, 0, 3, 0, 20], [0, 0, 3, 0, 20],
                [0, 0, 0, 0, 0], [1, 2, 0, 1, 0], [1, 0, 2, 0, 4], [0, 0, 0, 0, 0], [1, 1, 3, 0, 13], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 5, 0, 98],
                [0, 0, 0, 0, 0], [1, 0, 2, 0, 2], [1, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 3, 0, 13], [0, 1, 0, 0, 0], [0, 2, 0, 15, 0], [0, 1, 0, 0, 0], [0, 3, 0, 16, 0], [1, 0, 0, 0, 0], [0, 0, 5, 0, 98],
                [0, 0, 3, 0, 3], [1, 1, 0, 0, 0], [2, 1, 0, 2, 0], [0, 2, 0, 6, 0], [1, 1, 4, 0, 12, 3], [0, 2, 0, 14, 0], [0, 1, 0, 0, 0], [0, 4, 0, 12, 0], [0, 1, 3, 0, 7], [0, 0, 0, 0, 0], [0, 0, 5, 0, 98],
                [0, 0, 0, 0, 0], [3, 0, 0, 3, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 7], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 5, 0, 98],
                [0, 0, 3, 0, 3], [0, 1, 0, 0, 0], [1, 2, 0, 4, 0], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 3, 0, 9, 0], [0, 1, 3, 0, 10], [0, 1, 3, 0, 10], [1, 0, 2, 0, 8], [0, 0, 0, 0, 0], [0, 0, 5, 0, 98],
                [0, 1, 2, 0, 5], [0, 3, 0, 10, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 2, 0, 6], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 3, 0, 9], [0, 0, 0, 0, 0], [0, 0, 3, 0, 9], [0, 0, 0, 0, 0], [2, 1, 0, 8, 0], [0, 3, 0, 7, 0], [0, 2, 0, 5, 0],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const level8 = () => {
            const nbSquareWidth = 8
            const arrayOfAllBlobColors = ['red', 'blue', 'green', 'purple', 'orangered']
            const matrixOfWall = [
                [0, 0, 0, 0, 0], [0, 0, 3, 0, 6], [0, 0, 2, 0, 8], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 2, 0, 8], [0, 0, 0, 0, 0], [0, 0, 3, 0, 9],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 0, 0, 8, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 9],
                [0, 0, 3, 0, 6], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 2, 0, 7], [0, 1, 3, 0, 9], [0, 3, 0, 9, 0], [0, 1, 3, 0, 9],
                [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 2, 0, 7, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 0, 0, 7, 0], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99], [0, 0, 5, 0, 99],
                [0, 0, 2, 0, 5], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 4], [1, 0, 3, 0, 10], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 11],
                [0, 1, 2, 0, 5], [0, 3, 0, 6, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [1, 1, 3, 0, 10], [0, 3, 0, 10, 0], [0, 1, 3, 0, 10], [0, 1, 0, 0, 0],
                [0, 0, 2, 0, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [3, 0, 0, 4, 0], [0, 0, 3, 0, 11], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 2, 0, 5, 0], [0, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 3, 0, 3, 0], [0, 3, 0, 11, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 4], [1, 0, 3, 0, 4], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 3],
                [0, 2, 0, 1, 0], [0, 1, 0, 0, 0], [0, 1, 2, 0, 1], [0, 1, 2, 0, 2], [1, 1, 0, 0, 0], [0, 2, 0, 2, 0], [0, 1, 0, 0, 0], [0, 1, 3, 0, 3],
                [0, 0, 0, 0, 0], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const level9 = () => {
            const nbSquareWidth = 8
            const arrayOfAllBlobColors = ['red', 'blue', 'green', 'purple', 'orangered']
            const matrixOfWall = [
                [0, 0, 6, 0, 0, 1], [0, 0, 0, 0, 0], [2, 0, 0, 11, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 2, 0, 11], [1, 0, 5, 0, 99], [0, 0, 5, 0, 99],
                [0, 0, 0, 0, 0], [1, 1, 3, 0, 15], [0, 0, 3, 0, 15], [0, 0, 0, 0, 0], [3, 0, 3, 15, 12], [0, 0, 0, 0, 0], [2, 0, 0, 11, 0], [0, 0, 5, 0, 99],
                [0, 0, 3, 0, 14], [0, 1, 3, 0, 14], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [3, 0, 0, 12, 0], [0, 0, 0, 0, 0], [1, 0, 5, 0, 99], [0, 0, 5, 0, 99],
                [0, 4, 0, 1, 0], [0, 1, 0, 0, 0], [0, 3, 0, 14, 0], [0, 1, 0, 0, 0], [2, 1, 0, 13, 0], [0, 2, 0, 11, 0], [0, 1, 0, 0, 0], [0, 1, 2, 0, 9],
                [0, 0, 4, 0, 1, 4], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 3, 0, 12], [0, 0, 4, 0, 8, 3], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 2, 0, 13], [1, 0, 2, 0, 7], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 1, 3, 0, 2], [0, 1, 0, 0, 0], [0, 3, 0, 2, 0], [0, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 4, 0, 6, 3], [0, 2, 0, 9, 0],
                [0, 0, 3, 0, 2], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 0, 0, 7, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 3, 0, 3], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [3, 0, 0, 3, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 10],
                [0, 1, 3, 0, 5], [0, 3, 0, 5, 0], [0, 1, 3, 0, 5], [0, 4, 0, 6, 0], [1, 1, 3, 0, 3], [0, 4, 0, 8, 0], [0, 3, 0, 10, 0], [0, 1, 3, 0, 10],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [2, 0, 0, 4, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 5, 0, 98], [0, 0, 2, 0, 4], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
            ]

            return {
                matrixOfWall: doRealMatrixOfWall(matrixOfWall, nbSquareWidth),
                nbSquareWidth: nbSquareWidth,
                nbSquareHeight: matrixOfWall.length / nbSquareWidth,
                arrayOfAllBlobColors: arrayOfAllBlobColors
            }
        }

        const doRealMatrixOfWall = (simpleMatrixOfWall, nbSquareWidth) => {

            let newMatrix = simpleMatrixOfWall

            const listOfBigRedIndex = newMatrix.map((squareData, index) => {
                if(squareData[2] === 4) return index
                return undefined
            })

            const allBigRedIndex = listOfBigRedIndex.filter(index => index != undefined)

            const arrayOfAllRedindex = allBigRedIndex.map(bigRedIndex => {
                const nbOfRequiredBlob = simpleMatrixOfWall[bigRedIndex][5]
                let racine = Math.sqrt(nbOfRequiredBlob)
                let bigRedWidth = racine === Math.floor(racine) ? Math.floor(racine) : Math.floor(racine) + 1
                if(bigRedWidth < 2) bigRedWidth = 2

                let arrayOfAllRedindex = []
                for(let j = 0; j < bigRedWidth; j++){
                    for(let i = bigRedIndex; i < bigRedWidth + bigRedIndex; i++){
                        if(bigRedIndex != i + j) arrayOfAllRedindex.push(i + j * nbSquareWidth)
                    }
                }

                const slabKey = simpleMatrixOfWall[bigRedIndex][4]

                return {slabKey, arrayOfAllRedindex}
            })

            let newMatrixPlus = []
            newMatrix.map((squareData, index) => {

                let isLittleRed = false
                let currentSlabKey
                arrayOfAllRedindex.map(redParameter => {
                    if(redParameter.arrayOfAllRedindex.includes(index)){
                        isLittleRed = true
                        currentSlabKey = redParameter.slabKey
                    }
                })

                newMatrixPlus.push(isLittleRed ? [squareData[0], squareData[1], 8, squareData[3], currentSlabKey] : squareData)
            })

            return newMatrixPlus
        }

        const launchGame = (currentDisplay) => {
            return [tuto1(), tuto2(), tuto3(), tuto4(), tuto5(), tuto6(), level1(), level2(), level3(), level4(), level5(), level6(), level7(), level8(), level9()][currentDisplay - 1 + 6]
        }

        if(this.state.currentDisplay === 'menu'){
            return(
                <Menu
                    jouer = {(levelNumber) => this.setState({currentDisplay: levelNumber})}
                />
            )
        }
        else{
            return(
                <Game
                    levelProperties = {launchGame(this.state.currentDisplay)}
                    retourMenu = {() => this.setState({currentDisplay: 'menu'})}
                />
            )
        }

        return(
            <Game
                levelProperties = {launchGame(9)}
                retourMenu = {() => this.setState({currentDisplay: 'menu'})}
            />
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SlabRoad />);