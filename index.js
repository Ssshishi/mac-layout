// 1. 使用 position: sticky 将内容固定在可视区
// 2. 监听滚动进度设置效果

// 最终可封装成库，配置效果即可使用

const section1Height = 3000;
const section2Height = 4000;
const section3Height = 5000;

const container = document.querySelector(".container");
const intro = document.querySelector(".intro");
const imageMacDesktop = document.querySelector(".image-mac-desktop");
const imageMacMap = document.querySelector(".image-mac-map");
const imageMacSafari = document.querySelector(".image-mac-safari");
const imageMacDesktop2 = document.querySelector(".image-mac-desktop2");
const bodyHeight = document.querySelector("body").offsetHeight;

container.addEventListener("scroll", (e) => {
  const scrollTop = container.scrollTop;
  // section1 第一个盒子 通过滚动高度在盒子高度的位置比例，设置属性opacity
  if (scrollTop < section1Height - bodyHeight) {
    const progress = scrollTop / (section1Height - bodyHeight);
    if (progress > 1) {
      return;
    }

    const opacity = 1 - progress;

    intro.setAttribute("style", `opacity: ${opacity}`);
  } else if (scrollTop < section1Height + section2Height) {
    // section2  第二个盒子 滚动高度比例
    const progress =
      (scrollTop - section1Height) / (section2Height - bodyHeight);
    if (progress > 1) {
      return;
    }

    // 给第一个图片 加上缩放
    const minScale = 0.8;
    const scale = 1 - (1 - minScale) * progress;
    imageMacDesktop.setAttribute("style", `transform: scale(${scale})`);

    // 给第二个图片 左上方的 下移 右移
    const targetTop = 200;
    const targetLeft = 200;
    const translateY1 =
      (targetTop + imageMacMap.height) * progress - imageMacMap.height;
    const translateX1 =
      (targetLeft + imageMacMap.width) * progress - imageMacMap.width;
    imageMacMap.setAttribute(
      "style",
      `transform: translate3d(${translateX1}px, ${translateY1}px, 0)`
    );

    //  给第三个图片 右下方   左移 上移
    const targetBottom = 100;
    const targetRight = 350;
    const translateY =
      (targetBottom + imageMacSafari.height) * progress - imageMacSafari.height;
    const translateX =
      (targetRight + imageMacSafari.width) * progress - imageMacSafari.width;
    imageMacSafari.setAttribute(
      "style",
      `transform: translate3d(${-translateX}px, ${-translateY}px, 0)`
    );
  } else {
    // section3  第三个盒子 根据比例给盒子加上移动属性
    const progress =
      (scrollTop - section1Height - section2Height) /
      (section3Height - bodyHeight);
    if (progress > 1) {
      return;
    }

    const maxTranslate = 500;
    const translate = progress * maxTranslate;
    imageMacDesktop2.setAttribute(
      "style",
      `transform: translate3d(${translate}px, 0, 0)`
    );
  }
});
