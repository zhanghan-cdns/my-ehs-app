import _ from 'underscore'
import dayjs from 'dayjs'
// 合并行 el-table
export const getSpanArr = function (tableData, keyValue) {
  let spanArr = []
  let pos = 0
  for (var i = 0; i < tableData.length; i++) {
    if (i === 0) {
      spanArr.push(1);
      pos = 0;
    } else {
      // 判断当前元素与上一个元素是否相同(第1和第2列)
      if (tableData[i][keyValue] === tableData[i - 1][keyValue]) {
        spanArr[pos] += 1;
        spanArr.push(0);
      } else {
        spanArr.push(1);
        pos = i;
      }
    }
  }
  return spanArr
};
//分组公共方法
export const groupByFilter = function (arrary, filter) {
  var list = arrary, flag = 0, wdy, data = [];
  for (var i = 0; i < list.length; i++) {
    var az = '';
    for (var j = 0; j < data.length; j++) {
      if (filter(data[j][0], list[i])) {
        flag = 1;
        az = j;
        break;
      }
    }
    if (flag == 1) {
      data[az].push(list[i]);
      flag = 0;
    } else if (flag == 0) {
      wdy = new Array();
      wdy.push(list[i]);
      data.push(wdy);
    }
  }
  return data
};
export const copyObj = function (object) {
  var clone = _.clone(object);

  _.each(clone, function (value, key) {
    if (_.isObject(value)) {
      clone[key] = copyObj(value);
    }
  });

  return clone;
};
//获取树形数据某个节点的路径节点
export const treeItemPath = function (tree, pathIndex) {
  if (pathIndex) {
    var pathArr = pathIndex.split(',');
    var currentPathIndex = pathArr[0];
    var currentItem = tree[currentPathIndex]
    if (pathArr.length === 1) {
      return [currentItem]
    } else {
      pathArr.splice(0, 1);
      return [currentItem].concat(treeItemPath(currentItem.emrFileDataList, pathArr.join(',')))
    }
  }
}
// 树数据遍历 each遍历处理函数
export const treeDataForEach = function (treeData = [], ecah, childrenKey = 'children', parent) {
  treeData.forEach((item, index) => {
    ecah(item, parent, index)
    if (item[childrenKey] && item[childrenKey].length > 0) {
      treeDataForEach(item[childrenKey], ecah, childrenKey, item)
    }
  })
}

// 树数据遍历 each遍历处理函数
export const treeDataForEachSome = function (treeData = [], ecah, childrenKey = 'children', parent) {
  treeData.forEach((item, index) => {
    let nowStr = ecah(item, parent, index)
    if (nowStr !== 'childrenNoForEach') {
      if (item[childrenKey] && item[childrenKey].length > 0) {
        treeDataForEachSome(item[childrenKey], ecah, childrenKey, item)
      }
    }

  })
}
// 树数据遍历 each遍历处理函数，返回boolean值是否符合条件
export const treeDataFind = function (treeData = [], ecah, childrenKey = 'children', parent) {
  let findItem = null;
  for (let index = 0; index < treeData.length; index++) {
    let item = treeData[index];
    // 如果符合条件，则直接跳出循环，return值，不需要遍历了
    let isfindItem = ecah(item, parent, index);
    if (isfindItem) {
      findItem = item;
      break;
    } else if (item[childrenKey] && item[childrenKey].length > 0) {
      let childrenFindItem = treeDataFind(item[childrenKey], ecah, childrenKey, item);
      if (childrenFindItem) {
        findItem = childrenFindItem;
        break;
      }
    }
  }
  return findItem
}
// 树数据重组,treeData:树数据(Array);reset：重组函数(Function)；deepIndex递归的深度
export const treeDataFormat = function (treeData = [], reset, childrenKey = 'children', resetChildrenKey = '', parent, deepIndex = 0) {
  if (!resetChildrenKey) {
    resetChildrenKey = childrenKey
  }
  return copyObj(treeData).map((item) => {
    const copyItem = copyObj(item)
    if (copyItem[childrenKey] && copyItem[childrenKey].length > 0) {
      const obj = reset(copyItem, parent, deepIndex)
      const nextDeepIndex = deepIndex + 1;
      obj[resetChildrenKey] = treeDataFormat(copyItem[childrenKey], reset, childrenKey, resetChildrenKey, copyItem, nextDeepIndex)
      return obj
    } else {
      return {
        ...reset(copyItem, parent, deepIndex)
      }
    }
  })
}
// 树数据過濾,treeData:树数据(Array);filter：过滤函数(filter)，如果父节点被过滤，子节点也会被过滤
export const treeFilter = function (treeData = [], filter, childrenKey = 'children', parent) {
  var newTree = []
  treeData.forEach((item, index) => {
    if (filter(item, parent, index)) {
      if (item[childrenKey] && item[childrenKey].length > 0) {
        const newTreeItem = copyObj(item)
        newTreeItem[childrenKey] = treeFilter(item[childrenKey], filter, childrenKey, item)
        newTree.push(newTreeItem)
      } else {
        newTree.push(item)
      }
    }
  })
  return newTree
}
// 根据某个节点id查找所有父节点id（包括自身）
export const searchTreeParentId = function (treeData, id) {
  var temp = [];
  var forFn = function (arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (item.id === id) {
        temp.unshift(item);
        forFn(treeData, item.parentId);
        break;
      } else {
        if (item.children) {
          forFn(item.children, id);
        }
      }
    }
  };
  forFn(treeData, id);
  return temp;
}
// 树数据深层過濾,treeData:树数据(Array);filter：过滤函数(filter)，如果父节点被过滤，子节点不会跟随过滤，由自身是否需要被过滤决定
export const treeFilterAll = function (treeData = [], filter, childrenKey = 'children') {
  var newTree = []
  treeData.forEach((item, index) => {
    if (filter(item, parent, index)) {
      if (item[childrenKey] && item[childrenKey].length > 0) {
        const newTreeItem = copyObj(item)
        newTreeItem[childrenKey] = treeFilterAll(item[childrenKey], filter, childrenKey)
        newTree.push(newTreeItem)
      } else {
        newTree.push(item)
      }
    } else {
      // 当前节点不符合，则判断子节点是否符合，符合则开启新过滤，否则继续往下找
      if (item[childrenKey] && item[childrenKey].length > 0) {
        var filterChildren = treeFilterAll(item[childrenKey], filter, childrenKey)
        if (filterChildren.length > 0) {
          newTree = newTree.concat(filterChildren)
        }
      }
    }
  })
  return newTree
}

// 二维数组根据某个字段排序
export const arrSort = function (arr = [], sortBy = '') {
  return arr.sort(function (a, b) {
    return a[sortBy] - b[sortBy]
  })
}

// 生成随机uuId
export const getUuid = function () {
  var len = 32 // 32长度
  var radix = 16 // 16进制
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = [],
    i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    var r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

// transferJson 转化json字符串为json(接收json字符串及转化出错时的默认值)
export const transferJson = function (json_string = '', errorDefault = {}) {
  // 如果已经是对象了，直接返回
  if (typeof json_string === 'object') {
    return json_string || errorDefault
  }
  var json = errorDefault
  try {
    json = JSON.parse(json_string)
  }
  catch (err) {
    // console.log('json转换失败，不过没关系，做了处理了')
  }
  // 发现null在JSON.parse是可以正常转化的，转化出来还是null
  return json || errorDefault
}

// JS计算日期加上指定天数得到新的日期
export function getNewData(dateTemp, days) {
  var dateTemp = dateTemp.split("-");
  var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
  var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
  var rDate = new Date(millSeconds);
  var year = rDate.getFullYear();
  var month = rDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var date = rDate.getDate();
  if (date < 10) date = "0" + date;
  return (year + "-" + month + "-" + date);
}
// JS过去某个时间到现在天数
export function getDays(date) {
  var time = Date.parse(new Date());
  var lasttime = Date.parse(date);
  return parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
}

// JS过去某个时间到指定时间的天数
export function getDaysU(date, appTime) {
  var time = Date.parse(appTime);
  var lasttime = Date.parse(date);
  return parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
}
// 获取DPI
export const conversion_getDPI = function () {
  var arrDPI = new Array()
  if (window.screen.deviceXDPI) {
    arrDPI[0] = window.screen.deviceXDPI
    arrDPI[1] = window.screen.deviceYDPI
  } else {
    var tmpNode = document.createElement('DIV')
    tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
    document.body.appendChild(tmpNode)
    arrDPI[0] = parseInt(tmpNode.offsetWidth)
    arrDPI[1] = parseInt(tmpNode.offsetHeight)
    tmpNode.parentNode.removeChild(tmpNode)
  }
  return arrDPI
}
// mm转换为px
export const mmConversionPx = function (value) {
  var inch = value / 25.4
  var c_value = inch * conversion_getDPI()[0]
  return c_value
}
// px转换为mm
export const pxConversionMm = function (value) {
  var inch = value / conversion_getDPI()[0]
  var c_value = inch * 25.4
  return c_value
}

export const getOpenWindowConfig = function (width = 1000, height = 500, percent = false) {
  var windowW = window.screen.width;
  var windowH = window.screen.height;
  if (percent) {
    width = windowW * width / 100;
    height = windowH * height / 100
  }
  var left = (windowW - width) / 2;
  var top = (windowH - height - 70) / 2;
  return `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=true,status=no`
}

export const getTextFromSuggestion = function (list) {
  let text = ''
  treeDataForEach(list, function (item) {
    if (item.fileIndexDataEntity) {
      //手术名称特殊判断
      // if (item.element.varCode === 'shoushumingcheng' && item.fileIndexDataEntity.dataValue) {
      // 	text = `${text}${item.fileIndexDataEntity.dataValue}；`
      // }
      //数字型且数值不为空，带单位
      if (item.element.type == 2 && item.fileIndexDataEntity.dataValue) {
        text = `${text}${item.fileIndexDataEntity.dataValue}${item.fileIndexDataEntity.unit || item.element.unit || ''}`
      } else if (item.element.type == 5) {
        //勾选型勾选了展示
        if (item.fileIndexDataEntity.dataCode == '0') {
          text = `${text}${item.element.name}`
        } else {
          text = `${text}`
        }
      } else if (item.element.type == 20 || item.fileIndexDataEntity.printIdentification === '1') {
        text = `${text}` + ''
      } else if (item.element.name == '父节点') {
        text = `${text}` + ''
      } else {
        text = `${text}${item.fileIndexDataEntity.dataValue}`
      }
    }
  }, 'emrFileDataList');
  text = text.replace(/父节点/g, "")
  return text.replace('<br>', '')
}

// 监测客户端是否休眠，没有点击、键盘、鼠标移动、滚轮移动，则认为休眠，接收休眠时间变化的回调函数
export function checkIsSleep(sleepTimeChange) {
  var actionFunc = function () {
    if (sleepTimeChange && window.sleepTime !== 0) {
      sleepTimeChange(0)
    }
    window.sleepTime = 0;
  }

  // 初始化
  var body = document.querySelector('html');
  window.sleepTime = 0;
  body.removeEventListener("click", actionFunc);
  body.removeEventListener("keydown", actionFunc);
  body.removeEventListener("mousemove", actionFunc);
  body.removeEventListener("mousewheel", actionFunc);
  if (window.checkIsSleepTimer) {
    clearInterval(window.checkIsSleepTimer)
    window.checkIsSleepTimer = null;
  }


  // 开启定时
  window.checkIsSleepTimer = setInterval(function () {
    try {
      // iframe页面也要监听
      var iframePage = document.querySelector('iframe');
      if (iframePage && iframePage.contentWindow && iframePage.contentWindow.sleepTime && iframePage.contentWindow.sleepTime < window.sleepTime) {
        // 父窗口的休眠时间如果比子窗口的休眠时间大，则取子窗口的时间
        window.sleepTime = iframePage.contentWindow.sleepTime;
      } else {
        window.sleepTime = window.sleepTime + 1000;
      }
    } catch (e) {
      window.sleepTime = window.sleepTime + 1000;
    }

    if (sleepTimeChange) {
      sleepTimeChange(window.sleepTime)
    }
  }, 1000);
  // 绑定监听
  body.addEventListener("click", actionFunc);
  body.addEventListener("keydown", actionFunc);
  body.addEventListener("mousemove", actionFunc);
  body.addEventListener("mousewheel", actionFunc);
}

// 获取规定天数(days)时间范围（截止当前时间
export function getTimeRange(days) {
  let start = new Date();
  let end = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * days);

  start = dayjs(start).format('YYYY-MM-DD');
  end = dayjs(end).format('YYYY-MM-DD');

  return [start, end];
}
