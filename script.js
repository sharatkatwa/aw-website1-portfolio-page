const scroll = new LocomotiveScroll({
  el: document.querySelector('.main'),
  smooth: true,
})

var timeout

const cursor = document.querySelector('#miniCircle')
var halfWidth = cursor.getBoundingClientRect().width / 2
var halfHeight = cursor.getBoundingClientRect().height / 2

function mouseFollower(xscale, yscale) {
  window.addEventListener('mousemove', (dets) => {
    cursor.style.transform = `translate(${dets.clientX - halfWidth}px, ${
      dets.clientY - halfHeight
    }px) scale(${xscale}, ${yscale})`
    // cursor.style.transform =
  })
}
function cursorSqueezer() {
  let xscale = 1
  let yscale = 1

  let xprev = 0
  let yprev = 0

  window.addEventListener('mousemove', (dets) => {
    clearTimeout(timeout)

    let xdiff = dets.clientX - xprev
    let ydiff = dets.clientY - yprev

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff)
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff)

    xprev = dets.clientX
    yprev = dets.clientY

    mouseFollower(xscale, yscale)
    timeout = setTimeout(() => {
      cursor.style.transform = `translate(${dets.clientX - 7.5}px, ${
        dets.clientY - 7.5
      }px) scale(1, 1)`
    }, 100)
  })
}

function heroPageAnimation() {
  const tl = gsap.timeline()

  tl.from('#nav', {
    opacity: 0,
    y: -10,
    duration: 1,
    ease: Expo,
  })
    .to('.boundingElem', {
      y: 0,
      duration: 2,
      ease: Expo.easeOut,
      delay: -1,
      stagger: 0.2,
    })
    .from('#heroFooter', {
      y: -10,
      opacity: 0,
      duration: 1,
      ease: Expo,
      delay: -1.8,
      stagger: 0.3,
    })
}

// mouseFollower()
cursorSqueezer()
heroPageAnimation()

var prevRotate = 0

const elems = document.querySelectorAll('.elems')
elems.forEach((elem) => {
  elem.addEventListener('mousemove', (dets) => {
    const diff = dets.clientY - elem.getBoundingClientRect().top

    const rotateDiff = dets.clientX - prevRotate
    prevRotate = dets.clientX
    gsap.to(elem.querySelector('img'), {
      opacity: 1,
      ease: Expo,
      // top: Math.sign(diff) === 1 ? diff : 0,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-10, 10, rotateDiff),
    })

    gsap.to(elem.querySelector('h1'), {
      x: 25,
      opacity: 0.4,
      duration: 0.5,
      ease: Expo,
    })
    gsap.to(elem.querySelector('h5'), {
      opacity: 0.4,
      duration: 0.5,
      ease: Expo,
    })

    gsap.to(cursor, {
      opacity: 0.8,
      width: '100px',
      height: '100px',
      duration: 0.5,
      ease: Expo,
    })
  })

  elem.addEventListener('mouseleave', (dets) => {
    gsap.to(elem.querySelector('img'), {
      opacity: 0,
      ease: Expo,
      duration: 0.5,
    })

    gsap.to(elem.querySelector('h1'), {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: Expo,
    })
    gsap.to(elem.querySelector('h5'), {
      opacity: 1,
      duration: 0.5,
      ease: Expo,
    })

    gsap.to(cursor, {
      opacity: 1,
      width: '15px',
      height: '15px',
      duration: 0.5,
      ease: Power3,
    })
  })
})

gsap.from(elems, {
  y: 300,
  opacity: 0.2,
  ease: Back.easeOut,
  duration: 1,
  // delay: 3,
  stagger: 0.2,
})
