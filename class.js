// class.js закомментирован в index.html

class GroupingOfEvents{
    constructor(data){
        this.data = data
        this.pairedEvents = []
        this.groupedEvents = []
        this.endEvent = data.find(e => e.type === 2) || {time: Date.now()}
    }
    pairing(){
        this.data.forEach((el, index, array) => {
            // иттерирую массив по открытым событиям (всегда нечетное число)
            if(el.type % 2 != 0 && el.type>1){
                // поиск пары открытому событию (всегда четное число)
                const couple = array.findIndex(e => el.type + 1 === e.type)
                // если пара есть, группирую в массив, и удаляю из итерируемого массива
                if(couple != -1){
                    this.pairedEvents.push([el, array[couple]])
                    this.data.splice(couple, 1)
                    // если пары нет закрываю событием завершения поездки
                }else{
                    this.pairedEvents.push([el, this.endEvent])
                } 
            }
        })
    }
    grouping(){
        this.pairing()
        // иттерирую массив с парами, группирую в объект
        this.groupedEvents = this.pairedEvents.map( group => {
            return {
                type: group[0].type,
                begin: group[0].time,
                end: group[1].time,
                duration: group[1].time - group[0].time,
            }
        })
        return this.groupedEvents
    }
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
const instance1 = new GroupingOfEvents(arr1)
console.log('grouping1', instance1.grouping())
console.log('pairedEvents1', instance1.pairedEvents)

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
const instance2 = new GroupingOfEvents(arr2)
console.log('grouping2', instance2.grouping())
console.log('pairedEvents2', instance2.pairedEvents)

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
const instance3 = new GroupingOfEvents(arr3)
console.log('grouping3', instance3.grouping())
console.log('pairedEvents3', instance3.pairedEvents)