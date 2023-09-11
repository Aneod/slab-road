export const findBestWay = (squareIndex: number, nbSquareWidth: number, blobCoordinates: {left: number, top: number}, matrixOfWall: number[][], originalArrayOfKnowSquare: {x: number, y: number}[], slabKeyActived: number[], newSlabKeyActived: number[], greenDoorsAreClose: boolean) => {
    const squareCoordinates = findXYByIndexAndWidth(squareIndex, nbSquareWidth)

    const coordinatesNextTo = arrayOfThe4CoordinatesNextTo(
        {x: blobCoordinates.left, y: blobCoordinates.top},
        nbSquareWidth,
        matrixOfWall.length / nbSquareWidth
    )
    const arrayOfBirdDistanceSorted = birdDistanceSorted(coordinatesNextTo, squareCoordinates)

    const blobCoordinatesXY = {x: blobCoordinates.left, y: blobCoordinates.top}
    const arrayOfKnowSquare = [...originalArrayOfKnowSquare, blobCoordinatesXY]

    const slabKeyActivedWithoutCurrentBlob = arrayOfKnowSquare.length == 1 ? setSlabKeyActivedWithoutCurrentBlob(blobCoordinates.left + blobCoordinates.top * nbSquareWidth, nbSquareWidth, matrixOfWall, slabKeyActived) : newSlabKeyActived

    if(isSameCoordinates(squareCoordinates, blobCoordinatesXY)) return []

    let theNearestPosition: {x: number, y: number} | undefined = undefined
    let nextDestination: any
    for(let i = 0; i < arrayOfBirdDistanceSorted.length; i++){

        if(!theNearestPosition && isCorrectMove(
            blobCoordinatesXY,
            arrayOfBirdDistanceSorted[i],
            arrayOfKnowSquare,
            nbSquareWidth,
            matrixOfWall,
            slabKeyActived,
            newSlabKeyActived,
            greenDoorsAreClose,
            slabKeyActivedWithoutCurrentBlob,
        )){
            nextDestination = findBestWay(
                squareIndex,
                nbSquareWidth,
                {left: arrayOfBirdDistanceSorted[i].x, top: arrayOfBirdDistanceSorted[i].y},
                matrixOfWall,
                arrayOfKnowSquare,
                slabKeyActived,
                slabKeyActivedWithoutCurrentBlob,
                greenDoorsAreClose,
            )
            if(!!nextDestination){
                theNearestPosition = arrayOfBirdDistanceSorted[i]
            }
        }
    }

    if(!!theNearestPosition){

        const finalResult = [theNearestPosition].concat(nextDestination)
        
        let i = -1
        arrayOfBirdDistanceSorted.forEach(coordinates => {
            const indexOfNextTo = finalResult.findIndex(nextCoordinate => isSameCoordinates(nextCoordinate, coordinates))

            i = (indexOfNextTo > i && isCorrectMove(
                blobCoordinatesXY,
                finalResult[indexOfNextTo],
                arrayOfKnowSquare,
                nbSquareWidth,
                matrixOfWall,
                slabKeyActived,
                newSlabKeyActived,
                greenDoorsAreClose,
                slabKeyActivedWithoutCurrentBlob,
            )) ? indexOfNextTo : i
        })
        return i != -1 ? finalResult.slice(i) : finalResult
    }

    return undefined
}

const isCorrectMove = (
    blobCoordinates: {x: number, y: number},
    newBlobPosition: {x: number, y: number},
    arrayOfKnowSquare: {x: number, y: number}[],
    nbSquareWidth: number,
    matrixOfWall: number[][],
    slabKeyActived: number[],
    newSlabKeyActived: number[],
    greenDoorsAreClose: boolean,
    slabKeyActivedWithoutCurrentBlob: number[],
) => {

    const {realtiveX, realtiveY} = coordinatesC1forC2(blobCoordinates, newBlobPosition)
    const direction = !realtiveX ? realtiveY > 0 ? 'forTop' : 'forBottom' : realtiveX > 0 ? 'forRight' : 'forLeft'

    const findIndex = (coordinates: {x: number, y: number}) => coordinates.x + coordinates.y * nbSquareWidth

    let codeWall: number
    let currentSquareIndex: number
    let sens: number
    switch (direction){
        case 'forTop':
            sens = 1
            currentSquareIndex = findIndex(blobCoordinates)
            codeWall = matrixOfWall[currentSquareIndex][1]
            break

        case 'forLeft':
            sens = 0
            currentSquareIndex = findIndex(blobCoordinates)
            codeWall = matrixOfWall[currentSquareIndex][0]
            break

        case 'forRight':
            sens = 0
            currentSquareIndex = findIndex(newBlobPosition)
            codeWall = matrixOfWall[currentSquareIndex][0]
            break

        case 'forBottom':
            sens = 1
            currentSquareIndex = findIndex(newBlobPosition)
            codeWall = matrixOfWall[currentSquareIndex][1]
            break
    }
    
    if(codeWall == 1) return false

    if(codeWall > 1){
        if(sens == 0 && !isOpen(matrixOfWall, currentSquareIndex, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose).x) return false
        if(sens == 1 && !isOpen(matrixOfWall, currentSquareIndex, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose).y) return false
    }

    return !isAlreadyVisited(newBlobPosition, arrayOfKnowSquare)
}

const isAlreadyVisited = (newBlobPosition: {x: number, y: number}, arrayOfKnowSquare: {x: number, y: number}[]) => {

    let knew = false
    arrayOfKnowSquare.forEach(coordinatesKnew => {
        if(isSameCoordinates(newBlobPosition, coordinatesKnew)) knew = true
    })
    return knew
}

const isOpen = (matrixOfWall: number[][], blobSquareIndex: number, slabKeyActivedWithoutCurrentBlob: number[], greenDoorsAreClose: boolean) => {

    const doorIsOpen = (codeColor: number, doorKey: number, slabIndex: number) => {
        if(doorKey >= 90 && doorKey <= 99 && greenDoorsAreClose) return false
        if(codeColor == 2) return(slabKeyActivedWithoutCurrentBlob.includes(doorKey))
        if(codeColor == 3) return(slabKeyActivedWithoutCurrentBlob.filter(e => e === doorKey).length >= 2)
        if(codeColor == 4) return(slabKeyActivedWithoutCurrentBlob.filter(e => e === doorKey).length >= matrixOfWall[slabIndex][5])
    }
    const isHalfOpen = (door: number) => {
        const doorKey = partOfMatrix[3]
        const slabKeyList = matrixOfWall.map(e => e[4])
        const slabIndex = door == 4 ? slabKeyList.findIndex(slabKey => slabKey == doorKey) : -1

        return door == 0 || (door > 1 && doorIsOpen(door, doorKey, slabIndex))
    }

    const partOfMatrix = matrixOfWall[blobSquareIndex]
    const x = isHalfOpen(partOfMatrix[0])
    const y = isHalfOpen(partOfMatrix[1])
    return {x, y}
}

const setSlabKeyActivedWithoutCurrentBlob = (blobCoordinatesIndex: number, nbSquareWidth: number, matrixOfWall: number[][], slabKeyActived: number[]) => {
    const slab = matrixOfWall[blobCoordinatesIndex][2]
    const slabKey = matrixOfWall[blobCoordinatesIndex][4]

    if(slab > 1){
        const indexOf = slabKeyActived.indexOf(slabKey)
        const slabKeyActivedWithoutCurrentBlob = slabKeyActived.filter((e, i) => i !== indexOf)
        return slabKeyActivedWithoutCurrentBlob
    }

    return slabKeyActived
}

const birdDistanceSorted = (coordinatesNextTo: {x: number, y: number}[], squareCoordinates: {x: number, y: number}) => {

    const birdCoordinate = (coordinates: {x: number, y: number}) => {

        const coordinatesForDestination = coordinatesC1forC2(coordinates, squareCoordinates)
        const birdDistance = birdDistanceByRelativesCoordinates(coordinatesForDestination)

        return birdDistance
    }

    return coordinatesNextTo.sort((c1, c2) => birdCoordinate(c1) - birdCoordinate(c2))
}

const findXYByIndexAndWidth = (squareIndex: number, nbSquareWidth: number) => {
    const x = squareIndex % nbSquareWidth
    const y = Math.trunc(squareIndex / nbSquareWidth)

    return {x, y}
}

const coordinatesC1forC2 = (coordinates1: {x: number, y: number}, coordinates2: {x: number, y: number}) => {
    const realtiveX = coordinates2.x - coordinates1.x
    const realtiveY = coordinates1.y - coordinates2.y

    return {realtiveX, realtiveY}
}

const birdDistanceByRelativesCoordinates = (relativesCoordinates: {realtiveX: number, realtiveY: number}) => {
    const realtiveX2 = Math.pow(relativesCoordinates.realtiveX, 2)
    const realtiveY2 = Math.pow(relativesCoordinates.realtiveY, 2)

    const realtiveZ = Math.sqrt(realtiveX2 + realtiveY2)

    return realtiveZ
}

const arrayOfThe4CoordinatesNextTo = (coordinates: {x: number, y: number}, nbSquareWidth: number, nbSquareHeight: number) => {

    const defined: {x: number, y: number}[] = []
    
    if(coordinates.y - 1 >= 0)
        defined.push({x: coordinates.x, y: (coordinates.y - 1)})

    if(coordinates.x + 1 < nbSquareWidth)
        defined.push({x: (coordinates.x + 1), y: coordinates.y})

    if(coordinates.y + 1 < nbSquareHeight)
        defined.push({x: coordinates.x, y: (coordinates.y + 1)})

    if(coordinates.x - 1 >= 0)
        defined.push({x: (coordinates.x - 1), y: coordinates.y})

    return defined
}

const isSameCoordinates = (coordinates1: {x: number, y: number}, coordinates2: {x: number, y: number}) => coordinates1.x == coordinates2.x && coordinates1.y == coordinates2.y