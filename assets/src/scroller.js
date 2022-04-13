import locomotiveScroll from "locomotive-scroll";



export default function initScroller() {
  const scroll = new locomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });
  
}

