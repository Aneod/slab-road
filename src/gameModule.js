import React from 'react';
import { styleBlob } from './styleBlob';
import { findBestWay } from './bestWay';

class Square extends React.Component{
    render(){
        return(
            <div
                className='square'
            ></div>
        )
    }
}

class AntiLink extends React.Component{
    render(){
        return(
            <div
                className='antiLink'
                onClick={this.props.onClick}
                style={{
                    left: this.props.position.x * 150 + 'px',
                    top: this.props.position.y * 150 + 'px',
                }}
            ></div>
        )
    }
}

class Wall extends React.Component{
    render(){

        let left = 150 * this.props.coordinates.x - 2
        let top = 150 * this.props.coordinates.y - 2

        let wallStyle = {}
        if(this.props. isHorizontal){
            wallStyle = {
                rotate: '-90deg',
                marginTop: '2px',
                marginLeft: '-2px',
                left: left + 'px',
                top: top + 'px',
            }
        }
        else{
            wallStyle = {
                left: left + 'px',
                top: top + 'px',
            }
        }

        return(
            <div
                className='wall'
                style={wallStyle}
            ></div>
        )
    }
}

class Door extends React.Component{
    render(){

        let left = 150 * this.props.coordinates.x - 8
        let top = 150 * this.props.coordinates.y - 2

        let color = (this.props.color === 'bigRed' || this.props.color === 'littleRed') ? 'red' : this.props.color

        function defineDoorStyle(isHorizontal) {
            let doorStyle = {}
            if(isHorizontal){
                doorStyle = {
                    rotate: '-90deg',
                    marginTop: '2px',
                    marginLeft: '-2px',
                    left: left + 'px',
                    top: top + 'px',
                    backgroundColor: color,
                }
            }
            else{
                doorStyle = {
                    left: left + 'px',
                    top: top + 'px',
                    backgroundColor: color,
                }
            }
            return doorStyle
        }

        function defineOpeningStyle(isOpen) {
           let openingStyle = {}
            if(isOpen){
                openingStyle = {
                    top: '10%',
                    height: '80%',
                    opacity: '100%',
                }
            }
            else{
                openingStyle = {
                    top: '50%',
                    height: '0%',
                    opacity: '0%',
                }
            }
            return openingStyle
        }
        
        return(
            <div className='door' style={defineDoorStyle(this.props.isHorizontal)}>
                <div className='opening' style={defineOpeningStyle(this.props.isOpen)}>
                    <div className='trait' />
                </div>
            </div>
        )
    }
}

class Slab extends React.Component{
    render(){

        let left = 150 * this.props.coordinates.x
        let top = 150 * this.props.coordinates.y

        let color = this.props.color
        let text

        const nbOfRequiredBlob = this.props.nbOfRequiredBlob

        if(color === 'yellow'){

            if(this.props.yellowIsUsed){
                color = 'white'
            }
            else text = nbOfRequiredBlob
        }
        else if(color === 'orangered'){
            if(this.props.slabKey === 99) text = 'A'
            else text = 'D'
        }
        else if(color === 'green'){
            if(!this.props.greenDoorsAreClose){
                color = 'white'
            }
        }

        if(color === 'bigRed'){
            const nbOfWorkerBlob = this.props.nbOfWorkerBlob > nbOfRequiredBlob ? nbOfRequiredBlob : this.props.nbOfWorkerBlob

            return(
                <div
                    className='bigSlab'
                    style = {{
                        left: left + 'px',
                        top: top + 'px',
                        width: 150 * this.props.bigRedWidth - 150 * 0.2,
                        height: 150 * this.props.bigRedWidth - 150 * 0.2,
                    }}
                    onClick={this.props.onClick}
                >
                    <div className='bigSlabText'>{nbOfRequiredBlob - nbOfWorkerBlob}</div>
                </div>
            )
        }

        if(color === 'littleRed'){
            return(
                <div
                    className='littleRed'
                    style = {{
                        left: left + 'px',
                        top: top + 'px',
                    }}
                    onClick={this.props.onClick}
                ></div>
            )
        }

        let doorStyle = {
            left: left + 'px',
            top: top + 'px',
            backgroundColor: color,
        }

        return(
            <div
                className='slab'
                style = {doorStyle}
                onClick={this.props.onClick}
            >
                <div className='slabText'>{text}</div>
            </div>
        )
    }
}

class Blob extends React.Component{
    render(){

        let currentColor = this.props.color
        if(!['red', 'blue', 'green', 'purple', 'orangered'].includes(currentColor)){
            currentColor = 'gray'
        }
        
        if(currentColor === 'gray'){
            return(
                <div
                    className='blob cloneBlob'
                    onClick={this.props.onClick}
                    style={this.props.styleBlob}
                >
                    <div className='visualBlob clone' style={{backgroundColor: '#222'}}>
                        <div className='croix oeilGauche'>
                            <div className='croixTraitGauche'></div>
                            <div className='croixTraitDroite'></div>
                        </div>
                        <div className='croix oeilDroit'>
                            <div className='croixTraitGauche'></div>
                            <div className='croixTraitDroite'></div>
                        </div>
                    </div>
                </div>
            )
        }

        else{
            const opacityIndicator = currentColor === this.props.blobActived ? '1' : '0'

            return(
                <div
                    className='blob'
                    onClick={this.props.onClick}
                    style={this.props.styleBlob}
                >
                    <div className='visualBlob' id={currentColor} style={{backgroundColor: currentColor}}>
                        <div className='oeil oeilGauche'></div>
                        <div className='oeil oeilDroit'></div>
                        <div className='indicator' style={{opacity : opacityIndicator}}></div>
                    </div>
                </div>
            )
        }
    }
}

class Link extends React.Component{
    render(){

        const linkStyle = this.props.style

        return(
            <div className='link' style={linkStyle}></div>
        )
    }
}

class Settings extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const scaleY = this.props.settingsOpen ? 1 : 0
        const scale = this.props.isDisplay ? 0 : 1

        return(
            <div>
                <div className='panel panelSettings' style={{transform: `scaleY(${scaleY})`}}>
                    <h1>Navigation</h1>
                    <button onClick={this.props.recommencer}>Recommencer</button>
                    <button onClick={this.props.quitter}>Quitter</button>
                    <button onClick={this.props.revenir}>Revenir au jeu</button>
                </div>

                <div className='buttonPanel buttonSettings' onClick={this.props.settings} style={{transform: `scale(${scale})`}}>
                    <div className='barrette'></div>
                    <div className='barrette'></div>
                    <div className='barrette'></div>
                </div>
            </div>
        )
    }
}

class Helper extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){

        const scaleY = this.props.helperOpen ? 1 : 0
        const scale = this.props.isDisplay ? 0 : 1

        return(
            <div>
                <div className='panel panelHelper' style={{transform: `scaleY(${scaleY})`}}>
                    <h1>Règles du jeu</h1>
                    <p>
                    Slab Road est un jeu solo de résolution de puzzles, dans lequel on fait avancer cinq "blobs" à travers des plateaux remplis
                    de dalles et de portes de différents types qui constituent un puzzle complexe.
                    </p>
                    <p>
                    Si vous n'avez jamais jouer à ce jeu, il suffit de cliquer sur un blob pour le selectionner, puis de cliquer sur une case du plateau pour qu'il commence à s'y rendre.
                    Bien-sûr ils ne peuvent traverser les murs ou les portes fermées.
                    </p>
                    <p>
                    Dalles et portes <span style = {{color: 'blue'}}>bleues</span>: <br /><br />
                        Une seule dalle suffit pour ouvrir une telle porte.
                    </p>
                    <p>
                    Dalles et portes <span style = {{color: 'darkBlue'}}>bleues foncées</span>: <br /><br />
                        Cette fois, deux dalles sont nécessaires pour ouvrir une porte de ce types.
                    </p>
                    <p>
                    Dalles et portes <span style = {{color: 'red'}}>rouges</span>: <br /><br />
                        Une seule très grande dalle est nécessaire pour ouvrir une porte rouge, mais il faudra y amener le nombre de blob indiqué sur la dalle.
                    </p>
                    <p>
                    Dalles <span style = {{color: 'yellow'}}>jaunes</span>: <br /><br />
                        Lorsqu'un blob vas dessus, il fait apparaître sur la dalle un ou plusieurs <span style = {{color: 'gray'}}>faux blobs</span>. Le nombre de blobs qui apparaîssent est indiqué sur la dalle.
                    </p>
                    <p>
                    Dalles et portes <span style = {{color: 'green'}}>vertes</span>: <br /><br />
                        Lorsqu'un blob vas dessus, il déverrouille toutes les portes jusqu'alors vertes sur le plateau. Une porte verte ne peut être ouverte tant qu'aucune dalle verte n'a été pressée.
                    </p>
                    <p>
                    Dalles <span style = {{color: 'orangered'}}>oranges</span>: <br /><br />
                        Avec un D comme "Départ", ce sont les dalles où les blobs commencent.
                        <br />
                        Avec un A comme "Arrivée", ce sont les dalles où les blobs doivent se rendrent TOUS pour finir le niveau. Il est à noter que les faux blobs ne peuvent se subsituer aux vrais blobs pour finir un niveeau. Ce sont uniquement les blobs originaux qui peuvent finir le niveau.
                    </p>
                    <button onClick={this.props.fermer}>Revenir au jeu</button>
                </div>

                <div className='buttonPanel buttonHelper' onClick={this.props.helper} style={{transform: `scale(${scale})`}}>?</div>
            </div>
        )
    }
}

class EndBoard extends React.Component{
    render(){

        const scaleY = this.props.isDisplay ? 1 : 0

        return(
            <div className='endBoard' style={{transform: `scaleY(${scaleY})`}}>
                <div className='title'>
                    <h1>Résolu</h1>
                    <h2>Puzzle terminé</h2>
                </div>
                <div className='infos'>
                    <p>{`Nombre de coups: ${this.props.coups}`}</p>
                    <p>{this.props.temps}</p>
                </div>
                <button onClick={this.props.onClick}>Menu</button>
            </div>
        )
    }
}

export class Game extends React.Component{
    constructor(props){
        super(props)
        this.state={
            blobActived: 'any',
            redBlobPosition: {left: -1, top: -1},
            blueBlobPosition: {left: -1, top: -1},
            greenBlobPosition: {left: -1, top: -1},
            purpleBlobPosition: {left: -1, top: -1},
            orangeredBlobPosition: {left: -1, top: -1},
            arrayOfAllBlobColors: this.props.levelProperties.arrayOfAllBlobColors,
            gray1BlobPosition: {left: -1, top: -1},
            gray2BlobPosition: {left: -1, top: -1},
            gray3BlobPosition: {left: -1, top: -1},
            gray4BlobPosition: {left: -1, top: -1},
            gray5BlobPosition: {left: -1, top: -1},
            gray6BlobPosition: {left: -1, top: -1},
            gray7BlobPosition: {left: -1, top: -1},
            gray8BlobPosition: {left: -1, top: -1},
            gray9BlobPosition: {left: -1, top: -1},
            gray10BlobPosition: {left: -1, top: -1},
            gray11BlobPosition: {left: -1, top: -1},
            gray12BlobPosition: {left: -1, top: -1},
            gray13BlobPosition: {left: -1, top: -1},
            gray14BlobPosition: {left: -1, top: -1},
            gray15BlobPosition: {left: -1, top: -1},
            matrixOfWall: this.props.levelProperties.matrixOfWall,
            slabKeyActived: [],
            yellowSlabKeyActived: [],
            canMove: true,
            greenDoorsAreClose: true,
            nbCoups: 0,
            date: new Date(),
            isOver: false,
            tempsFinal: '',
            settingsOpen: false,
            helperOpen: false,
        }
    }

    render(){
        const nbSquareWidth = this.props.levelProperties.nbSquareWidth
        const nbSquareHeight = this.props.levelProperties.nbSquareHeight
        const nbSquare = nbSquareWidth * nbSquareHeight

        let leftWallsList = this.state.matrixOfWall.map(e => e[0])
        let topWallsList = this.state.matrixOfWall.map(e => e[1])
        let slabList = this.state.matrixOfWall.map(e => e[2])
        let doorKeyList = this.state.matrixOfWall.map(e => e[3])
        let slabKeyList = this.state.matrixOfWall.map(e => e[4])

        let tableauForMap = []
        for(let i=0; i<nbSquare; i++){
            tableauForMap.push(i)
        }

        const findIndexPosition = (index) => {
            let x = index % nbSquareWidth
            let y = Math.trunc(index / nbSquareWidth)

            return({x, y})
        }

        const resetGame = () => {
            this.setState({
                blobActived: 'any',
                redBlobPosition: {left: -1, top: -1},
                blueBlobPosition: {left: -1, top: -1},
                greenBlobPosition: {left: -1, top: -1},
                purpleBlobPosition: {left: -1, top: -1},
                orangeredBlobPosition: {left: -1, top: -1},
                arrayOfAllBlobColors: this.props.levelProperties.arrayOfAllBlobColors,
                gray1BlobPosition: {left: -1, top: -1},
                gray2BlobPosition: {left: -1, top: -1},
                gray3BlobPosition: {left: -1, top: -1},
                gray4BlobPosition: {left: -1, top: -1},
                gray5BlobPosition: {left: -1, top: -1},
                gray6BlobPosition: {left: -1, top: -1},
                gray7BlobPosition: {left: -1, top: -1},
                gray8BlobPosition: {left: -1, top: -1},
                gray9BlobPosition: {left: -1, top: -1},
                gray10BlobPosition: {left: -1, top: -1},
                gray11BlobPosition: {left: -1, top: -1},
                gray12BlobPosition: {left: -1, top: -1},
                gray13BlobPosition: {left: -1, top: -1},
                gray14BlobPosition: {left: -1, top: -1},
                gray15BlobPosition: {left: -1, top: -1},
                slabKeyActived: [],
                yellowSlabKeyActived: [],
                canMove: true,
                greenDoorsAreClose: true,
                nbCoups: 0,
                date: new Date(),
                isOver: false,
                tempsFinal: '',
                settingsOpen: false,
            })
        }

        const blobOnOrangered = () => {
            const listOfOrangeredD = slabKeyList.map((slabKey, index) => {
                if(slabKey === 98) return index
                else return undefined
            })

            const listOfOrangeredDOnly = listOfOrangeredD.filter(slabKey => slabKey != undefined)
            const positionsOfOrangeredD = listOfOrangeredDOnly.map(slabIndex => {
                const left = findIndexPosition(slabIndex).x
                const top = findIndexPosition(slabIndex).y

                return {left, top}
            })

            this.setState({
                redBlobPosition: positionsOfOrangeredD[0],
                blueBlobPosition: positionsOfOrangeredD[1],
                greenBlobPosition: positionsOfOrangeredD[2],
                purpleBlobPosition: positionsOfOrangeredD[3],
                orangeredBlobPosition: positionsOfOrangeredD[4],
            })
        }

        if(this.state.redBlobPosition.left === -1) blobOnOrangered() //Cannot update during an existing state ICI

        const findBlobPosition = (color) => {
            switch(color){
                case 'red': return this.state.redBlobPosition
                case 'blue': return this.state.blueBlobPosition
                case 'green': return this.state.greenBlobPosition
                case 'purple': return this.state.purpleBlobPosition
                case 'orangered': return this.state.orangeredBlobPosition
                case 'gray1': return this.state.gray1BlobPosition
                case 'gray2': return this.state.gray2BlobPosition
                case 'gray3': return this.state.gray3BlobPosition
                case 'gray4': return this.state.gray4BlobPosition
                case 'gray5': return this.state.gray5BlobPosition
                case 'gray6': return this.state.gray6BlobPosition
                case 'gray7': return this.state.gray7BlobPosition
                case 'gray8': return this.state.gray8BlobPosition
                case 'gray9': return this.state.gray9BlobPosition
                case 'gray10': return this.state.gray10BlobPosition
                case 'gray11': return this.state.gray11BlobPosition
                case 'gray12': return this.state.gray12BlobPosition
                case 'gray13': return this.state.gray13BlobPosition
                case 'gray14': return this.state.gray14BlobPosition
                case 'gray15': return this.state.gray15BlobPosition
                default: console.error('findBlobPosition: BLOB INEXISTANT')
            }
        }

        const replaceBlob = (squareIndex) => {

            const blobActived = this.state.blobActived
            if(blobActived === 'any') return

            if(!this.state.canMove) return
            this.setState({canMove: false})

            this.setState({
                nbCoups: this.state.nbCoups += 1
            })

            let blobPosition = findBlobPosition(blobActived)
            const movesArray = (
                findBestWay(
                    squareIndex,
                    nbSquareWidth,
                    blobPosition,
                    this.state.matrixOfWall,
                    [],
                    this.state.slabKeyActived,
                    this.state.slabKeyActived,
                    this.state.greenDoorsAreClose
                ))
            
            if(movesArray == undefined){
                this.setState({canMove: true})
                return
            }
            
            const moves = (blob, x, y) => {
                switch(blob){
                    case 'red':
                        this.setState({redBlobPosition: {left: x, top: y}})
                        break

                    case 'blue':
                        this.setState({blueBlobPosition: {left: x, top: y}})
                        break

                    case 'green':
                        this.setState({greenBlobPosition: {left: x, top: y}})
                        break

                    case 'purple':
                        this.setState({purpleBlobPosition: {left: x, top: y}})
                        break

                    case 'orangered':
                        this.setState({orangeredBlobPosition: {left: x, top: y}})
                        break

                    case 'gray1':
                        this.setState({gray1BlobPosition: {left: x, top: y}})
                        break

                    case 'gray2':
                        this.setState({gray2BlobPosition: {left: x, top: y}})
                        break

                    case 'gray3':
                        this.setState({gray3BlobPosition: {left: x, top: y}})
                        break

                    case 'gray4':
                        this.setState({gray4BlobPosition: {left: x, top: y}})
                        break

                    case 'gray5':
                        this.setState({gray5BlobPosition: {left: x, top: y}})
                        break

                    case 'gray6':
                        this.setState({gray6BlobPosition: {left: x, top: y}})
                        break

                    case 'gray7':
                        this.setState({gray7BlobPosition: {left: x, top: y}})
                        break

                    case 'gray8':
                        this.setState({gray8BlobPosition: {left: x, top: y}})
                        break

                    case 'gray9':
                        this.setState({gray9BlobPosition: {left: x, top: y}})
                        break

                    case 'gray10':
                        this.setState({gray10BlobPosition: {left: x, top: y}})
                        break

                    case 'gray11':
                        this.setState({gray11BlobPosition: {left: x, top: y}})
                        break

                    case 'gray12':
                        this.setState({gray12BlobPosition: {left: x, top: y}})
                        break

                    case 'gray13':
                        this.setState({gray13BlobPosition: {left: x, top: y}})
                        break

                    case 'gray14':
                        this.setState({gray14BlobPosition: {left: x, top: y}})
                        break

                    case 'gray15':
                        this.setState({gray15BlobPosition: {left: x, top: y}})
                        break
                }
            }

            const levelFinished = () => {

                setTimeout(() => this.setState({
                    canMove: false,
                }), 200)

                this.setState({
                    isOver: true,
                })
                
                console.log('Nombre de coups: ' + this.state.nbCoups)

                const dateFinish = new Date()

                const secondesBrutes = dateFinish.getSeconds() - this.state.date.getSeconds()
                const secondes = secondesBrutes >= 0 ? secondesBrutes : 60 - Math.abs(secondesBrutes)
                
                const minutesBrutes = dateFinish.getMinutes() - this.state.date.getMinutes()
                let minutes = minutesBrutes >= 0 ? minutesBrutes : 60 - Math.abs(minutesBrutes)
                if(dateFinish.getSeconds() < this.state.date.getSeconds()) minutes--

                const heuresBrutes = dateFinish.getHours() - this.state.date.getHours()
                let heures = heuresBrutes >= 0 ? heuresBrutes : 24 - Math.abs(heuresBrutes)
                if(dateFinish.getMinutes() < this.state.date.getMinutes()) heures--

                let timePrinted = ''
                if(heures > 0) timePrinted += heures + 'h '
                if(minutes > 0) timePrinted += minutes + 'm '
                if(secondes > 0) timePrinted += secondes + 's'

                this.setState({
                    tempsFinal: 'Temps de complétion: ' + (dateFinish.getDay() != this.state.date.getDay() ? 'Trop longtemps...' : timePrinted)
                })
            }

            const activetheNextFalseBlob = (numberOfNewBlob, blobPosition) => {
                let newBlobMade = 0
                let grayConcated = []

                let gray1BlobPosition = this.state.gray1BlobPosition
                let gray2BlobPosition = this.state.gray2BlobPosition
                let gray3BlobPosition = this.state.gray3BlobPosition
                let gray4BlobPosition = this.state.gray4BlobPosition
                let gray5BlobPosition = this.state.gray5BlobPosition
                let gray6BlobPosition = this.state.gray6BlobPosition
                let gray7BlobPosition = this.state.gray7BlobPosition
                let gray8BlobPosition = this.state.gray8BlobPosition
                let gray9BlobPosition = this.state.gray9BlobPosition
                let gray10BlobPosition = this.state.gray10BlobPosition
                let gray11BlobPosition = this.state.gray11BlobPosition
                let gray12BlobPosition = this.state.gray12BlobPosition
                let gray13BlobPosition = this.state.gray13BlobPosition
                let gray14BlobPosition = this.state.gray14BlobPosition
                let gray15BlobPosition = this.state.gray15BlobPosition
                
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray1').left === -1){
                    newBlobMade++
                    gray1BlobPosition = blobPosition
                    grayConcated.push('gray1')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray2').left === -1){
                    newBlobMade++
                    gray2BlobPosition = blobPosition
                    grayConcated.push('gray2')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray3').left === -1){
                    newBlobMade++
                    gray3BlobPosition = blobPosition
                    grayConcated.push('gray3')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray4').left === -1){
                    newBlobMade++
                    gray4BlobPosition = blobPosition
                    grayConcated.push('gray4')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray5').left === -1){
                    newBlobMade++
                    gray5BlobPosition = blobPosition
                    grayConcated.push('gray5')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray6').left === -1){
                    newBlobMade++
                    gray6BlobPosition = blobPosition
                    grayConcated.push('gray6')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray7').left === -1){
                    newBlobMade++
                    gray7BlobPosition = blobPosition
                    grayConcated.push('gray7')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray8').left === -1){
                    newBlobMade++
                    gray8BlobPosition = blobPosition
                    grayConcated.push('gray8')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray9').left === -1){
                    newBlobMade++
                    gray9BlobPosition = blobPosition
                    grayConcated.push('gray9')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray10').left === -1){
                    newBlobMade++
                    gray10BlobPosition = blobPosition
                    grayConcated.push('gray10')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray11').left === -1){
                    newBlobMade++
                    gray11BlobPosition = blobPosition
                    grayConcated.push('gray11')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray12').left === -1){
                    newBlobMade++
                    gray12BlobPosition = blobPosition
                    grayConcated.push('gray12')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray13').left === -1){
                    newBlobMade++
                    gray13BlobPosition = blobPosition
                    grayConcated.push('gray13')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray14').left === -1){
                    newBlobMade++
                    gray14BlobPosition = blobPosition
                    grayConcated.push('gray14')
                }
                if(newBlobMade < numberOfNewBlob && findBlobPosition('gray15').left === -1){
                    newBlobMade++
                    gray15BlobPosition = blobPosition
                    grayConcated.push('gray15')
                }

                this.setState({
                    gray1BlobPosition: gray1BlobPosition,
                    gray2BlobPosition: gray2BlobPosition,
                    gray3BlobPosition: gray3BlobPosition,
                    gray4BlobPosition: gray4BlobPosition,
                    gray5BlobPosition: gray5BlobPosition,
                    gray6BlobPosition: gray6BlobPosition,
                    gray7BlobPosition: gray7BlobPosition,
                    gray8BlobPosition: gray8BlobPosition,
                    gray9BlobPosition: gray9BlobPosition,
                    gray10BlobPosition: gray10BlobPosition,
                    gray11BlobPosition: gray11BlobPosition,
                    gray12BlobPosition: gray12BlobPosition,
                    gray13BlobPosition: gray13BlobPosition,
                    gray14BlobPosition: gray14BlobPosition,
                    gray15BlobPosition: gray15BlobPosition,
                    arrayOfAllBlobColors: this.state.arrayOfAllBlobColors.concat(grayConcated)
                })
            }

            const setSlabActived = () => {
                let blobPosition = findBlobPosition(this.state.blobActived)
                let currentSquare = this.state.matrixOfWall[blobPosition.left + blobPosition.top * nbSquareWidth]
    
                if(currentSquare[2] > 1){

                    const newSlabKeyActived = this.state.slabKeyActived.concat([currentSquare[4]])

                    this.setState({
                        slabKeyActived: newSlabKeyActived
                    })

                    if(currentSquare[2] === 5){
                        const listeOfOrangeredIndex = this.state.matrixOfWall.map((e, index) => {
                            if(e[4] === 99) return index
                            return undefined
                        })

                        const listeOfOnlyOrangeredIndex = listeOfOrangeredIndex.filter(index => index != undefined)

                        let nbOfFinisherBlob = 0
                        this.state.arrayOfAllBlobColors.forEach(color => {
                            let blobPosition = findBlobPosition(color)
                            let blobIndex = blobPosition.left + blobPosition.top * nbSquareWidth

                            if(['red', 'blue', 'green', 'purple', 'orangered'].includes(color) && listeOfOnlyOrangeredIndex.includes(blobIndex)){
                                nbOfFinisherBlob ++
                            }
                        })
                        const slabListOrangered = slabKeyList.filter(e => e === 99)

                        if(nbOfFinisherBlob === slabListOrangered.length) levelFinished()
                    }

                    else if(currentSquare[2] == 6 && !this.state.yellowSlabKeyActived.includes(currentSquare[4])){

                        const newYellowSlabKeyActived = this.state.yellowSlabKeyActived.concat([currentSquare[4]])

                        this.setState({
                            yellowSlabKeyActived: newYellowSlabKeyActived
                        })

                        setTimeout(() => activetheNextFalseBlob(currentSquare[5], blobPosition), 100)
                    }

                    else if(currentSquare[2] == 7){
                        if(this.state.greenDoorsAreClose){
                            this.setState({ greenDoorsAreClose: false })
                        }
                    }
                }
            }

            const setSlabDisactived = () => {
                let blobPosition = findBlobPosition(this.state.blobActived)
                let currentSquare = this.state.matrixOfWall[blobPosition.left + blobPosition.top * nbSquareWidth]
    
                if(currentSquare[2] > 1){
                    let slabKey = this.state.slabKeyActived.indexOf(currentSquare[4])

                    const newSlabKeyActived = this.state.slabKeyActived.filter((e, index) => index !== slabKey)

                    this.setState({
                        slabKeyActived: newSlabKeyActived
                    })
                }
            }

            setTimeout(() => setSlabDisactived(), 300)
            let i = 0
            const action = () => {
                moves(blobActived, movesArray[i].x, movesArray[i].y)
                i++
        
                if(i < movesArray.length){
                    setTimeout(() => action(), 300)
                }
                else{
                    setTimeout(() => setSlabActived(), 200)
                    setTimeout(() => this.setState({canMove: true}), 200)
                }
            }
            action()
        }

        const colorChoice = (codeColor) => {
            switch (codeColor){
                case 2: return 'blue'
                case 3: return 'darkBlue'
                case 4: return 'bigRed'
                case 5: return 'orangered'
                case 6: return 'yellow'
                case 7: return 'green'
                case 8: return 'littleRed'
            }
        }

        const colorDoorIsOpen = (codeColor, doorKey, slabIndex) => {
            if(doorKey >= 90 && doorKey <= 99){
                if(this.state.greenDoorsAreClose) return false
            }

            if(codeColor === 2){
                return(this.state.slabKeyActived.includes(doorKey))
            }

            if(codeColor === 3){
                return(this.state.slabKeyActived.filter(e => e === doorKey).length >= 2)
            }

            if(codeColor === 4){
                return(this.state.slabKeyActived.filter(e => e === doorKey).length >= this.state.matrixOfWall[slabIndex][5])
            }
        }

        const changeBlobActived = (newColor) => {
            if(this.state.canMove){
                this.setState({blobActived:
                    this.state.blobActived == newColor ? 'any' : newColor
                })
            }
        }
        
        const doLinkBetweenDoorAndSlab = (doorIndexSquare, slabIndexSquare, isHorizontal, color, currentOpacity) => {
            const doorSquarePosition = findIndexPosition(doorIndexSquare)
            const slabSquarePosition = findIndexPosition(slabIndexSquare)

            const doorInLeft = slabSquarePosition.x - doorSquarePosition.x >= 0
            const doorInTop = doorSquarePosition.y - slabSquarePosition.y > 0

            let linkDoorHeight, linkDoorTop, linkDoorLeft, linkSlabTop, linkSlabWidth, linkSlabLeft

            if(isHorizontal){
                linkDoorHeight = doorInTop ? Math.abs(doorSquarePosition.y - slabSquarePosition.y) * 150 - 75 : Math.abs(doorSquarePosition.y - slabSquarePosition.y) * 150 + 75
                linkDoorTop = doorInTop ? (doorSquarePosition.y * 150 - linkDoorHeight) : doorSquarePosition.y * 150
                linkDoorLeft  = doorSquarePosition.x * 150 + 75
                linkSlabTop = doorInTop ? linkDoorTop : (linkDoorTop + linkDoorHeight)
                linkSlabWidth = Math.abs(doorSquarePosition.x - slabSquarePosition.x) * 150
                linkSlabLeft = doorInLeft ? linkDoorLeft : (linkDoorLeft - linkSlabWidth + 4)
            }

            else{
                linkSlabTop = doorSquarePosition.y * 150 + 75
                linkSlabWidth = doorInLeft ? Math.abs(doorSquarePosition.x - slabSquarePosition.x) * 150 + 75 : Math.abs(doorSquarePosition.x - slabSquarePosition.x) * 150 - 75
                linkSlabLeft = doorInLeft ? doorSquarePosition.x * 150 : doorSquarePosition.x * 150 - linkSlabWidth
                
                linkDoorHeight = doorInTop ? Math.abs(doorSquarePosition.y - slabSquarePosition.y) * 150 : Math.abs(doorSquarePosition.y - slabSquarePosition.y) * 150
                linkDoorTop = doorInTop ? linkSlabTop - linkDoorHeight + 4 : linkSlabTop
                linkDoorLeft  = doorInLeft ? linkSlabLeft + linkSlabWidth : slabSquarePosition.x * 150 + 75
            }

            const linkDoorStyle = {
                left: linkDoorLeft + 'px',
                top: linkDoorTop + 'px',
                width: '4px',
                height: linkDoorHeight + 'px',
                backgroundColor: color,
                opacity: currentOpacity,
            }

            const linkSlabStyle = {
                left: linkSlabLeft + 'px',
                top: linkSlabTop + 'px',
                width: linkSlabWidth + 'px',
                height: '4px',
                backgroundColor: color,
                opacity: currentOpacity,
            }

            return {linkDoorStyle, linkSlabStyle}
        }

        const isThereBlobOnSquare = (slabIndex) => {
            let blobHere = false
            this.state.arrayOfAllBlobColors.map(color => {
                const blobPosition = findBlobPosition(color)
                const blobIndex = blobPosition.left + blobPosition.top * nbSquareWidth
                
                if(blobIndex === slabIndex) blobHere = true
            })
            return blobHere
        }

        const doCurrentOpacity = (currentColor, slabIndex, doorIndex, doorKey, isHorizontal) => {
            const codeColor = isHorizontal ? topWallsList[doorIndex] : leftWallsList[doorIndex]

            switch (currentColor){
                case 'red': return colorDoorIsOpen(codeColor, doorKey, slabIndex) ? .2 : 1
                case 'green': return 1
                default: return isThereBlobOnSquare(slabIndex) ? .2 : 1
            }
        }

        const paramGamePosition = () => {

            if(window.innerWidth > '768px'){
                const justifyContent = window.innerWidth - 200 < 150 * nbSquareWidth ? 'start' : 'center'
                const alignItems = window.innerHeight - 200 < 150 * nbSquareHeight ? 'start' : 'center'
                const width = window.innerWidth - 200 < 150 * nbSquareWidth ? 'calc(100% + 100px)' : 'calc(100vw - 100px * 2)'
                const height = window.innerHeight - 200 < 150 * nbSquareHeight ? '100%' : 'calc(100vh - 100px * 2)'

                return {justifyContent, alignItems, width, height}
            }
            else{
                return {justifyContent: 'start', alignItems: 'start', width: 'auto', height: 'auto'}
            }
        }

        return(
            <div className='displayGame' style={paramGamePosition()}>
            
                <div className='game' style={{gridTemplateColumns: `repeat(${nbSquareWidth}, 1fr)`}}>

                    {tableauForMap.map((e, index) => {
                        return(
                            <Square
                                key={e}
                            />
                        )
                    })}

                    {tableauForMap.map((e, index) => {
                        return(
                            <AntiLink
                                key={e}
                                position = {findIndexPosition(index)}
                                onClick = {() => replaceBlob(index)}
                            />
                        )
                    })}

                    {this.state.arrayOfAllBlobColors.map(color => {

                        return(
                            <Blob
                                key={color}
                                color = {color}
                                styleBlob = {styleBlob(color, findBlobPosition(color), this.state.blobActived)}
                                onClick = {() => changeBlobActived(color)}
                                blobActived = {this.state.blobActived}
                            />
                        )
                    })}

                    {leftWallsList.map((e, index) => {
                        let wallPosition = findIndexPosition(index)

                        if(e === 1){
                            return(
                                <Wall
                                    key = {index}
                                    isHorizontal = {false}
                                    coordinates = {wallPosition}
                                />
                            )
                        }

                        if(e > 1){
                            const isGreenDoorKey = doorKeyList[index] >= 90 && doorKeyList[index] <= 99
                            const isGreenClose = isGreenDoorKey && this.state.greenDoorsAreClose
                            let codeColor = isGreenClose ? 7 : e

                            const doorKey = doorKeyList[index]

                            let slabIndex
                            if(codeColor === 4){
                                slabIndex = slabKeyList.findIndex(slabKey => slabKey === doorKey)
                            }
                            else slabIndex = -1

                            return(
                                <Door
                                    key = {index}
                                    isOpen = {colorDoorIsOpen(e, doorKey, slabIndex)}
                                    isHorizontal = {false}
                                    coordinates = {wallPosition}
                                    color = {colorChoice(codeColor)}
                                />
                            )
                        }
                    })}

                    {topWallsList.map((e, index) => {
                        let wallPosition = findIndexPosition(index)

                        if(e === 1){
                            return(
                                <Wall
                                    key = {index}
                                    isHorizontal = {true}
                                    coordinates = {wallPosition}
                                />
                            )
                        }

                        if(e > 1){

                            const isGreenDoorKey = doorKeyList[index] >= 90 && doorKeyList[index] <= 99
                            const isGreenClose = isGreenDoorKey && this.state.greenDoorsAreClose
                            let codeColor = isGreenClose ? 7 : e

                            const doorKey = doorKeyList[index]

                            let slabIndex
                            if(codeColor === 4){
                                slabIndex = slabKeyList.findIndex(slabKey => slabKey === doorKey)
                            }
                            else slabIndex = -1

                            return(
                                <Door
                                    key = {index}
                                    isOpen = {colorDoorIsOpen(e, doorKeyList[index], slabIndex)}
                                    isHorizontal = {true}
                                    coordinates = {wallPosition}
                                    color = {colorChoice(codeColor)}
                                />
                            )
                        }
                    })}

                    {slabList.map((e, index) => {

                        if(e > 1){
                            let wallPosition = findIndexPosition(index)

                            let slabKey = slabKeyList[index]
                            let nbOfWorkerBlob = this.state.slabKeyActived.filter(e => e === slabKey).length

                            let nbOfRequiredBlob = this.state.matrixOfWall[index][5]
                            let racine = Math.sqrt(nbOfRequiredBlob)
                            let bigRedWidth = racine === Math.floor(racine) ? Math.floor(racine) : Math.floor(racine) + 1

                            let yellowIsUsed = this.state.yellowSlabKeyActived.includes(slabKeyList[index])

                            return(
                                <Slab
                                    key = {index}
                                    slabKey = {slabKey}
                                    coordinates = {wallPosition}
                                    color = {colorChoice(e)}
                                    bigRedWidth = {bigRedWidth}
                                    nbOfRequiredBlob = {nbOfRequiredBlob}
                                    nbOfWorkerBlob = {nbOfWorkerBlob}
                                    yellowIsUsed = {yellowIsUsed}
                                    onClick = {() => replaceBlob(index)}
                                    gray1BlobPosition = {this.state.gray1BlobPosition}
                                    greenDoorsAreClose = {this.state.greenDoorsAreClose}
                                />
                            )
                        }
                    })}

                    {slabList.map((e, slabIndex) => {
                        if(e >= 2 && e <= 4){

                            return(
                                doorKeyList.map((doorKey, doorIndex) => {
                                    if(slabKeyList[slabIndex] === doorKey && (topWallsList[doorIndex] > 1 || leftWallsList[doorIndex] > 1)){

                                        const assumedColor = colorChoice(e)

                                        let currentColor
                                        if(this.state.greenDoorsAreClose && (doorKey >= 90 && doorKey <= 99)) currentColor = 'green'
                                        else if(assumedColor === 'bigRed' || assumedColor === 'littleRed') currentColor = 'red'
                                        else currentColor = colorChoice(e)
                                        
                                        if(leftWallsList[doorIndex] > 1 && topWallsList[doorIndex] > 1){

                                            let leftCurrentOpacity = doCurrentOpacity(currentColor, slabIndex, doorIndex, doorKey, false)
                                            let topCurrentOpacity = doCurrentOpacity(currentColor, slabIndex, doorIndex, doorKey, true)

                                            let leftLinkStyle = doLinkBetweenDoorAndSlab(doorIndex, slabIndex, false, currentColor, leftCurrentOpacity)
                                            let topLinkStyle = doLinkBetweenDoorAndSlab(doorIndex, slabIndex, true, currentColor, topCurrentOpacity)

                                            return(
                                                <div key={doorIndex}>
                                                    <Link style = {leftLinkStyle.linkDoorStyle}/>
                                                    <Link style = {leftLinkStyle.linkSlabStyle}/>
                                                    <Link style = {topLinkStyle.linkDoorStyle}/>
                                                    <Link style = {topLinkStyle.linkSlabStyle}/>
                                                </div>
                                            )
                                        }
                                        else if(leftWallsList[doorIndex] > 1){

                                            let currentOpacity = doCurrentOpacity(currentColor, slabIndex, doorIndex, doorKey, false)
                                            let linkStyle = doLinkBetweenDoorAndSlab(doorIndex, slabIndex, false, currentColor, currentOpacity)

                                            return(
                                                <div key={doorIndex}>
                                                    <Link style = {linkStyle.linkDoorStyle}/>
                                                    <Link style = {linkStyle.linkSlabStyle}/>
                                                </div>
                                            )
                                        }
                                        else if(topWallsList[doorIndex] > 1){

                                            let currentOpacity = doCurrentOpacity(currentColor, slabIndex, doorIndex, doorKey, true)
                                            let linkStyle = doLinkBetweenDoorAndSlab(doorIndex, slabIndex, true, currentColor, currentOpacity)

                                            return(
                                                <div key={doorIndex}>
                                                    <Link style = {linkStyle.linkDoorStyle}/>
                                                    <Link style = {linkStyle.linkSlabStyle}/>
                                                </div>
                                            )
                                        }
                                    }
                                })
                            )
                        }
                    })}

                </div>

                <EndBoard
                    coups = {this.state.nbCoups}
                    temps = {this.state.tempsFinal}
                    isDisplay = {this.state.isOver}
                    onClick = {this.props.retourMenu}
                />

                <Settings
                    settings = {() => this.setState({settingsOpen: !this.state.settingsOpen, helperOpen: false})}
                    settingsOpen = {this.state.settingsOpen}
                    isDisplay = {this.state.isOver}
                    recommencer = {(() => resetGame())}
                    quitter = {this.props.retourMenu}
                    revenir = {() => this.setState({settingsOpen: false})}
                />

                <Helper
                    helper = {() => this.setState({helperOpen: !this.state.helperOpen, settingsOpen: false})}
                    helperOpen = {this.state.helperOpen}
                    fermer = {() => this.setState({helperOpen: false})}
                    isDisplay = {this.state.isOver}
                />
            </div>
        )
    }
}