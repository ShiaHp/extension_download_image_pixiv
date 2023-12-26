import { Colors } from '../colors';

interface ToastArg {
  title?: string;
  text?: string;
  icon?: string;
  color?: string;
  bgColor?: string;
  enter: 'up' | 'fade' | 'none'
  leave: 'up' | 'fade' | 'none'
  position: 'topCenter' | 'center' | 'mouse'
  stay?: number;
  callback?: () => void;
}

class Toast {
  constructor() {
    this.bindEvents();
  }

  private readonly defaultArg: ToastArg = {
    title: '',
    text: '',
    color: Colors.white,
    bgColor: Colors.bgBrightBlue,
    stay: 1500,
    enter: 'up',
    leave: 'fade',
    position: 'mouse'
  }

  private readonly successArg: ToastArg = {
    title: '',
    text: '',
    color: Colors.white,
    bgColor: Colors.bgSuccess,
    stay: 1500,
    enter: 'up',
    leave: 'fade',
    position: 'mouse',
  }

  private readonly warningArg: ToastArg = {
    title: '',
    text: '',
    color: Colors.white,
    bgColor: Colors.bgError,
    stay: 1500,
    enter: 'up',
    leave: 'fade',
    position: 'mouse',
  }

  private readonly errorArg: ToastArg = {
    title: '',
    text: '',
    color: Colors.white,
    bgColor: Colors.bgError,
    stay: 1500,
    enter: 'up',
    leave: 'fade',
    position: 'mouse',
  }


  private readonly tipClassName = 'xzToast'
  private mousePosition = { x: 0, y: 0}
  private readonly minTop = 20
  private readonly once = 1
  private readonly total = 20

  private bindEvents() {
    window.addEventListener('mousemove', (ev) => {
      this.mousePosition.x = ev.x
      this.mousePosition.y = ev.y
    })
  }

  public show(title: string, text: string, arg: ToastArg) {
    this.create(Object.assign({}, this.defaultArg, arg, { title, text }))
  }

  public success(title: string, text: string, arg: ToastArg = this.defaultArg) {
    this.create(Object.assign({}, this.successArg, arg, { title, text }))
  }

  public warning(title: string, text: string, arg: ToastArg) {
    this.create(Object.assign({}, this.warningArg, arg, { title, text }))
  }

  public error(title: string, text: string, arg: ToastArg) {
    this.create(Object.assign({}, this.warningArg, arg, { title, text }))
  }

  private create(arg: ToastArg) {
    const container = document.createElement('div')

    const span = document.createElement('span')
    span.textContent = arg.title
    span.style.color = arg.color

    if (arg.text) {
      const p = document.createElement('p')
      p.innerHTML = arg.text
      // container.appendChild(p)
    }

    span.style.backgroundColor = arg.bgColor
    span.style.opacity = '0'
    span.classList.add(this.tipClassName)
    // container.appendChild(span);
    document.body.appendChild(span)


    let centerPoint = window.innerWidth / 2

    if (arg.position === 'mouse') {
      centerPoint = this.mousePosition.x
    }

    const rect = span.getBoundingClientRect()

    let left = centerPoint - rect.width / 2
    const minLeft = 0
    const maxLeft = window.innerWidth - rect.width


    if (left > maxLeft) {
      left = maxLeft
    }
    span.style.left = left + 'px'

    let lastTop = 0

    if (arg.position === 'topCenter') {
      lastTop = this.minTop
    }
    if (arg.position === 'center') {
      lastTop = window.innerHeight / 2 - this.minTop
    }
    if (arg.position === 'mouse') {
      let y = this.mousePosition.y - 40
      if (y < this.minTop) {
        y = this.minTop
      }
      lastTop = y
    }

    if (arg.enter === 'none') {
      span.style.top = lastTop + 'px'
      span.style.opacity = '1'
    } else {
      this.enter(span, arg.enter, lastTop)
    }

    window.setTimeout(() => {
      if (arg.leave === 'none') {
        span.remove()
      } else {
        this.leave(span, arg.leave, lastTop)
      }
    }, arg.stay)
  }

  private enter(el: HTMLElement, way: 'up' | 'fade', lastTop: number) {
    const startTop = lastTop + this.total
    const once = 2
    const total = this.total

    let numberOfTimes = 0
    const frame = function (timestamp: number) {
      numberOfTimes++

      const move = once * numberOfTimes

      const opacity = move / total

      if (move <= total && opacity <= 1) {
        if (way === 'up') {
          el.style.top = startTop - move + 'px'
        }

        el.style.opacity = opacity.toString()

        window.requestAnimationFrame(frame)
      }
    }
    window.requestAnimationFrame(frame)
  }

  private leave(el: HTMLElement, way: 'up' | 'fade', lastTop: number) {
    const startTop = lastTop
    const once = this.once
    const total = this.total

    let numberOfTimes = 0

    const frame = function (timestamp: number) {
      numberOfTimes++

      const move = once * numberOfTimes

      const opacity = 1 - move / total

      if (move < total && opacity > 0) {
        if (way === 'up') {
          el.style.top = startTop - move + 'px'
        }

        el.style.opacity = opacity.toString()
        window.requestAnimationFrame(frame)
      } else {

        el.remove()
      }
    }

    window.requestAnimationFrame(frame)
   }
}

const toast = new Toast()
export { toast }
