export const findBestWay = (squareIndex, nbSquareWidth, blobCoordinates, matrixOfWall, originalArrayOfKnowSquare, slabKeyActived, newSlabKeyActived, greenDoorsAreClose) => {
    const squareCoordinates = findXYByIndexAndWidth(squareIndex, nbSquareWidth)

    if(isDestinationReached(squareCoordinates, blobCoordinates)){
        return [squareCoordinates]
    }

    const arrayOfKnowSquare = [...originalArrayOfKnowSquare, [blobCoordinates.left, blobCoordinates.top]]

    const slabKeyActivedWithoutCurrentBlob = arrayOfKnowSquare.length === 1
        ? setSlabKeyActivedWithoutCurrentBlob(blobCoordinates, nbSquareWidth, matrixOfWall, slabKeyActived)
        : newSlabKeyActived

    const openDirections = newWallAroundSquare(blobCoordinates, nbSquareWidth, matrixOfWall, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose)

    let differentsWay = []
    openDirections.map(e => {
        let newBlobCoordinates;
        switch (e){
            case 'haut':
                newBlobCoordinates = {left: blobCoordinates.left, top: (blobCoordinates.top - 1)}

                if(!includesRemake(arrayOfKnowSquare, newBlobCoordinates.left, newBlobCoordinates.top)){
                    differentsWay.push(findBestWay(squareIndex, nbSquareWidth, newBlobCoordinates, matrixOfWall, arrayOfKnowSquare, slabKeyActived, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose))
                }
                break

            case 'droite':
                newBlobCoordinates = {left: (blobCoordinates.left + 1), top: blobCoordinates.top}

                if(!includesRemake(arrayOfKnowSquare, newBlobCoordinates.left, newBlobCoordinates.top)){
                    differentsWay.push(findBestWay(squareIndex, nbSquareWidth, newBlobCoordinates, matrixOfWall, arrayOfKnowSquare, slabKeyActived, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose))
                }
                break

            case 'bas':
                newBlobCoordinates = {left: blobCoordinates.left, top: (blobCoordinates.top + 1)}

                if(!includesRemake(arrayOfKnowSquare, newBlobCoordinates.left, newBlobCoordinates.top)){
                    differentsWay.push(findBestWay(squareIndex, nbSquareWidth, newBlobCoordinates, matrixOfWall, arrayOfKnowSquare, slabKeyActived, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose))
                }
                break

            case 'gauche':
                newBlobCoordinates = {left: (blobCoordinates.left - 1), top: blobCoordinates.top}

                if(!includesRemake(arrayOfKnowSquare, newBlobCoordinates.left, newBlobCoordinates.top)){
                    differentsWay.push(findBestWay(squareIndex, nbSquareWidth, newBlobCoordinates, matrixOfWall, arrayOfKnowSquare, slabKeyActived, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose))
                }
                break
        }
    })

    let fastestWay
    for(let way of differentsWay){
        if(way != undefined){
            if(fastestWay == undefined) fastestWay = way
            else if(way.length < fastestWay.length) fastestWay = way
        }
    }

    if(fastestWay != undefined){
        return [{x: blobCoordinates.left, y: blobCoordinates.top}].concat(fastestWay)
    }

    return undefined
}

const setSlabKeyActivedWithoutCurrentBlob = (blobCoordinates, nbSquareWidth, matrixOfWall, slabKeyActived) => {
    const index = blobCoordinates.left + blobCoordinates.top * nbSquareWidth
    const slab = matrixOfWall[index][2]
    const slabKey = matrixOfWall[index][4]

    if(slab > 1){
        const indexOf = slabKeyActived.indexOf(slabKey)
        const slabKeyActivedWithoutCurrentBlob = slabKeyActived.filter((e, i) => i !== indexOf)
        return slabKeyActivedWithoutCurrentBlob
    }

    return slabKeyActived
}

const newWallAroundSquare = (blobCoordinates, nbSquareWidth, matrixOfWall, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose) => {
    const blobSquareIndex = blobCoordinates.left + blobCoordinates.top * nbSquareWidth
    let openDirections = []

    const squareOverture = isOpen(matrixOfWall, blobSquareIndex, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose)

    if((blobCoordinates.top != 0) && squareOverture.top) openDirections.push('haut')
    if((blobCoordinates.left !== nbSquareWidth - 1) && isOpen(matrixOfWall, blobSquareIndex + 1, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose).left) openDirections.push('droite')
    if((blobSquareIndex + nbSquareWidth < matrixOfWall.length) && isOpen(matrixOfWall, blobSquareIndex + nbSquareWidth, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose).top) openDirections.push('bas')
    if((blobCoordinates.left !== 0) && squareOverture.left) openDirections.push('gauche')

    return openDirections
}

const isOpen = (matrixOfWall, blobSquareIndex, slabKeyActivedWithoutCurrentBlob, greenDoorsAreClose) => {

    const partOfMatrix = matrixOfWall[blobSquareIndex]

    const colorDoorIsOpenRemake = (codeColor, doorKey, slabIndex) => {

        if(doorKey >= 90 && doorKey <= 99 && greenDoorsAreClose) return false

        if(codeColor === 2){
            return(slabKeyActivedWithoutCurrentBlob.includes(doorKey))
        }
        if(codeColor === 3){
            return(slabKeyActivedWithoutCurrentBlob.filter(e => e === doorKey).length >= 2)
        }

        if(codeColor === 4){
            return(slabKeyActivedWithoutCurrentBlob.filter(e => e === doorKey).length >= matrixOfWall[slabIndex][5])
        }
    }
    
    const isHalfOpen = (axis, partOfMatrix) => {
        const doorKey = partOfMatrix[3]
        const slabKeyList = matrixOfWall.map(e => e[4])

        let slabIndex

        const codeColor = partOfMatrix[axis]

        if(codeColor === 4){
            slabIndex = slabKeyList.findIndex(slabKey => slabKey === doorKey)
        }
        else slabIndex = -1

        if(partOfMatrix[axis] === 0 || ((partOfMatrix[axis] > 1) && colorDoorIsOpenRemake(codeColor, doorKey, slabIndex))){
            return true
        }
        return false
    }

    const left = isHalfOpen(0, partOfMatrix)
    const top = isHalfOpen(1, partOfMatrix)

    return {left, top}
}

const includesRemake = (arrayOfKnowSquare, valueZero, valueOne) => {
    let estTrouve = false
    arrayOfKnowSquare.map(e => {
        if(e[0] == valueZero && e[1] == valueOne) {
            estTrouve = true
        }
    })
    return estTrouve
}

const isDestinationReached = (squareCoordinates, blobCoordinates) => {
    if(squareCoordinates.x === blobCoordinates.left && squareCoordinates.y === blobCoordinates.top){
        return true
    }
    return false
}

const findXYByIndexAndWidth = (squareIndex, nbSquareWidth) => {
    const x = squareIndex % nbSquareWidth
    const y = Math.trunc(squareIndex / nbSquareWidth)

    return {x, y}
}