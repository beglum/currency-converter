export default function () {
  const enter = function (element) {
    const width = getComputedStyle(element).width;

    element.style.width = width;
    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    element.style.height = 'auto';

    const height = getComputedStyle(element).height;

    element.style.width = null;
    element.style.position = null;
    element.style.visibility = null;
    element.style.height = 0;

    getComputedStyle(element).height;

    requestAnimationFrame(() => {
      element.style.height = height;
    });
  };

  const afterEnter = function (element) {
    element.style.height = 'auto';
  };

  const leave = function (element) {
    const height = getComputedStyle(element).height;

    element.style.height = height;

    getComputedStyle(element).height;

    requestAnimationFrame(() => {
      element.style.height = 0;
    });
  };

  return { enter, afterEnter, leave };
}
