const heightSquare = '150px'

export const styleBlob = (color: string, blobPosition: {left: number, top: number}, blobActived: string) => {

    let zIndex = 10
    if(['red', 'blue', 'green', 'purple', 'orangered'].includes(color)){
        zIndex = 11
    }

    return {
        left: `calc(${heightSquare} * ${blobPosition.left})`,
        top: `calc(${heightSquare} * ${blobPosition.top})`,
        zIndex: zIndex
    }
}