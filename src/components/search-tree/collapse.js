const elTransition =
  "0.3s width ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out";
const Transition = {
  "before-enter"(el) {
    el.style.transition = elTransition;
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;

    el.style.width = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },

  enter(el) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollwidth !== 0) {
      el.style.width = el.scrollwidth + "px";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.width = "0";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = "hidden";
  },

  "after-enter"(el) {
    el.style.transition = "";
    el.style.width = "";
    el.style.overflow = el.dataset.oldOverflow;
  },

  "before-leave"(el) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.width = el.scrollwidth + "px";
    el.style.overflow = "hidden";
  },

  leave(el) {
    if (el.scrollwidth !== 0) {
      el.style.transition = elTransition;
      el.style.width = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },

  "after-leave"(el) {
    el.style.transition = "";
    el.style.width = "";
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  }
};

export default {
  name: "collapseTransition",
  functional: true,
  render(h, { children }) {
    const data = {
      on: Transition
    };
    return h("transition", data, children);
  }
};