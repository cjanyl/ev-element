'use strict';
const core = function (param) {
  console.log(param);
  return new Promise((resolve) => {
    resolve();
  });
};

core.path = (function () {
  let obj = {}, key;
  for (key in location) {
    if (typeof location[key] !== 'function') {
      obj[key] = location[key];
    }
  }
  obj.contextPath = '';
  obj.apiPath = '/api';
  obj.publicPath = obj.apiPath + '/uploadFiles';
  return obj;
})();

core.download = (fileName, filePath) => {
  // 创建隐藏的可下载链接
  let eleLink = document.createElement('a');
  eleLink.download = fileName;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  eleLink.href = encodeURI(filePath);

  if (document.all) {
    eleLink.click();
  } else {
    let evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    eleLink.dispatchEvent(evt);
  }
};
core.getFileSize = (num, unit) => {
  num = num || 0;
  unit = unit || 'B';
  let units = ['B', 'K', 'M', 'G'];

  let i = units.findIndex(function (u) {
    return u === unit;
  });
  for (; i < units.length && num > 1024; i++) {
    num = num / 1024;
  }

  return num.toFixed(2) + units[i];
};
core.hideMiddle = (str, prefix = 3, suffix = 4) => {
  let string = str + '';
  let repeatNumber = string.length - prefix - suffix;
  if (repeatNumber <= 0) {
    return string;
  } else {
    return string ? string.substr(0, prefix) + '*'.repeat(repeatNumber) + string.substr(-suffix) : '';
  }
};

core.copy = (text) => {
  let textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    let successful = document.execCommand('copy');
    let msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板，请手动复制。';
    if (successful) {
      if (window.$Ev) {
        window.$Ev.$message({
          message: msg,
          type: 'success',
        });
      } else {
        alert(msg);
      }
    } else {
      throw new Error('该浏览器不支持点击复制到剪贴板');
    }
  } catch (err) {
    let msg = '该浏览器不支持点击复制到剪贴板，请手动复制。';
    if (window.$Ev) {
      window.$Ev.$message.error(msg);
    } else {
      alert(msg + text);
    }
  }

  document.body.removeChild(textArea);
};

core.debounce = (fuc, delay) => {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fuc.apply(this, arguments);
    }, delay || 0)
  }
};

core.validate = {};
core.validate.isEmail = (val) => {
  return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(val);
};

// 滚动条控制
core.doAnimation = (startValue, endValue, duration, el) => {
  console.log(startValue, endValue, duration, el);
  //使用闭包保存变量dy和step(每次动画滚动的距离)
  let dy = 0;
  let step = (endValue - startValue) / (duration / 10);
  return function (interval) {
    dy += step;
    //这里改成使用绝对值判断
    if (Math.abs(dy) >= Math.abs(endValue - startValue)) {
      clearInterval(interval);
    }
    el.scrollTop += step;
  }
}
core.scrollToTop = (el) => {
  console.log(el);
  if (!el) {
    return null;
  }
  //原始值
  let startTop = el.scrollTop || el.screenY;
  //最终值
  let endTop = 0;
  //生成一个动画控制函数
  let scrollAnimationFn = core.doAnimation(startTop, endTop, 300, el);
  //执行动画，每10ms执行一次
  let interval = setInterval(() => {
    scrollAnimationFn(interval)
  }, 10)
}


export default core;
