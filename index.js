// первый вариант
function groupingOfEvents(data){
    const pairedEvents = []
    const endEvent = data.find(e => e.type === 2)

    data.forEach((el, index, array) => {
        if(el.type % 2 != 0 && el.type>1){
            const couple = array.findIndex(e => el.type+1 === e.type)

            if(couple != -1){
                pairedEvents.push([el, array[couple]])
                data.splice(couple, 1)
            }else{
                if(endEvent != undefined){
                    pairedEvents.push([el, endEvent])
                }else{
                    pairedEvents.push([el, {time: Date.now()}])
                }
            } 
        }
    })

    return pairedEvents
}

function grouping(data){
    const eventGroups = groupingOfEvents(data)
    const groupedEvents = eventGroups.map((group, index)=>{
        return {
            type: group[0].type,
            begin: group[0].time,
            end: group[1].time,
            duration: group[1].time - group[0].time,
        }
    })
    return groupedEvents
}

// массив с двумя одинаковыми открытыми группами(первое событие имеет пару, второе не имеет пары)
const arr1 =[
    { type: 1, time: 1577811600000 },
    { type: 3, time: 1577811660000 },
    { type: 5, time: 1577811720000 },
    { type: 4, time: 1577811780000 },
    { type: 7, time: 1577811840000 },
    { type: 3, time: 1577811550000 },
    { type: 8, time: 1577811940000 },
    { type: 2, time: 1577812200000 },
]
console.log('arr1', groupingOfEvents(arr1))
console.log('arr1', grouping(arr1))

// массив с двумя одинаковыми открытыми группами(обе имеют пару)
const arr2 =[
    { type: 1, time: 1577811600000 },
    { type: 3, time: 1577811660000 },
    { type: 5, time: 1577811720000 },
    { type: 4, time: 1577811780000 },
    { type: 7, time: 1577811840000 },
    { type: 3, time: 1577811550000 },
    { type: 8, time: 1577811940000 },
    { type: 4, time: 1577811784444 },
    { type: 2, time: 1577812200000 },
]
console.log('arr2', groupingOfEvents(arr2))
console.log('arr2', grouping(arr2))

// массив без события завершения поездки 
const arr3 =[
    { type: 1, time: 1577811600000 },
    { type: 3, time: 1577811660000 },
    { type: 5, time: 1577811720000 },
    { type: 4, time: 1577811780000 },
    { type: 7, time: 1577811840000 },
    { type: 3, time: 1577811550000 },
    { type: 4, time: 1577811784444 },
    { type: 8, time: 1577811940000 },
]
console.log('arr3', groupingOfEvents(arr3))
console.log('arr3', grouping(arr3))