import { EventColor } from './interface'

const colorEvent: EventColor[] = [
  {
    id:1,
    backgroundColor: '#ABF9E0',
    color: '#167E8D',
  },
  {
    id:2,
    backgroundColor: '#FFC5C3',
    color: '#FC105C',
  },
  {
    id:3,
    backgroundColor: '#FFEB95',
    color: '#936D19',
  },
  {
    id:4,
    backgroundColor: '#DDD5FF',
    color: '#584CB7',
  },
  {
    id:5,
    backgroundColor: '#B6DEFC',
    color: '#1F84EB',
  },
  {
    id:6,
    backgroundColor: '#FFEAE4',
    color: '#DB6C56',
  },
]


let currentColor:EventColor

function randomColor():EventColor {
  if(!currentColor){
    currentColor = colorEvent[0]
    return colorEvent[0]
  }else {
    const nextColor = colorEvent.find(o => o.id === currentColor.id + 1);
    if(nextColor) {
      currentColor = nextColor
        return nextColor
    }else {
        currentColor = colorEvent[0]
        return currentColor
    }
  }
}

export default randomColor