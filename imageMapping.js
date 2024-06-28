export const imageMap = new Map()

addMapping([0,1], "clear")
addMapping([2], "cloud-sun")
addMapping([3], "cloud")
addMapping([45,48], "fog")
addMapping([51,53,55,56,57,61,63,65,66,67,80,81,82], "cloud-shower-heavy")
addMapping([71,73,75,77,85,86], "snow")
addMapping([95,96,99], "cloud-bolt")

function addMapping(value, image){
    value.forEach(value => {
        imageMap.set(value, image)
    })
}