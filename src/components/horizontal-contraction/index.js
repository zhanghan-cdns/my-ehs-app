import {addClass, removeClass} from 'element-ui/src/utils/dom';

export default {
  //水平收缩组件
  name: 'HorizontalContraction',
  functional: true,
  render(h, {children}) {
    const data = {
      on: {
        beforeEnter(el) {
          addClass(el, 'drawer-transition')
          if (!el.dataset) el.dataset = {}

          el.dataset.oldPaddingLeft = el.style.paddingLeft
          el.dataset.oldPaddingRight = el.style.paddingRight

          el.style.width = '0'
          el.style.paddingLeft = 0
          el.style.paddingRight = 0
        },
        enter(el) {
          el.dataset.oldOverflow = el.style.overflow
          if (el.scrollWidth !== 0) {
            el.style.width = el.scrollWidth + 'px'
            el.style.paddingLeft = el.dataset.oldPaddingLeft
            el.style.paddingRight = el.dataset.oldPaddingRight
          } else {
            el.style.width = ''
            el.style.paddingLeft = el.dataset.oldPaddingLeft
            el.style.paddingRight = el.dataset.oldPaddingRight
          }
          el.style.overflow = 'hidden'
        },
        afterEnter(el) {
          removeClass(el, 'drawer-transition')
          el.style.width = ''
          el.style.overflow = el.dataset.oldOverflow
        },
        beforeLeave(el) {
          if (!el.dataset) el.dataset = {}
          el.dataset.oldPaddingLeft = el.style.paddingLeft
          el.dataset.oldPaddingRight = el.style.paddingRight
          el.dataset.oldOverflow = el.style.overflow

          el.style.width = el.scrollWidth + 'px'
          el.style.overflow = 'hidden'
        },
        leave(el) {
          if (el.scrollWidth !== 0) {
            addClass(el, 'drawer-transition')
            el.style.width = 0
            el.style.paddingLeft = 0
            el.style.paddingRight = 0
          }
        },
        afterLeave(el) {
          removeClass(el, 'drawer-transition')
          el.style.width = ''
          el.style.overflow = el.dataset.oldOverflow
          el.style.paddingLeft = el.dataset.oldPaddingLeft
          el.style.paddingRight = el.dataset.oldPaddingRight
        }
      }
    };
    return h('transition', data, children);
  }
};
