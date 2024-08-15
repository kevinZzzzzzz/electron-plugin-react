import { notification } from "antd";
const errorMap = {}; // 错误文件映射

let lastEvent;
export function behaviorMoniter() {
  ["click", "touchstart", "mousedown", "keydown", "mouseover"].forEach(
    (eventType) => {
      document.addEventListener(
        eventType,
        (event) => {
          // console.log(event, 123123)
          lastEvent = event;
        },
        {
          capture: true, // 是在捕获阶段还是冒泡阶段执行
          passive: true, // 默认不阻止默认事件
        }
      );
    }
  );
}
function getSelectors(path) {
  // 反转 + 过滤 + 映射 + 拼接
  return path
    .reverse()
    .filter((element) => {
      return element !== document && element !== window;
    })
    .map((element) => {
      // console.log("element", element.nodeName);
      let selector = "";
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`;
      } else if (element.className && typeof element.className === "string") {
        return `${element.nodeName.toLowerCase()}.${element.className}`;
      } else {
        selector = element.nodeName.toLowerCase();
      }
      return selector;
    })
    .join(" ");
}
function getSelector(pathsOrTarget) {
  if (Array.isArray(pathsOrTarget)) {
    return getSelectors(pathsOrTarget);
  } else {
    const path = [];
    while (pathsOrTarget) {
      path.push(pathsOrTarget);
      pathsOrTarget = pathsOrTarget.parentNode;
    }
    return getSelectors(path);
  }
}

// 对每一个错误详情，生成一串编码
export const getErrorUid = (ErrMsg: string) => {
  return window.btoa(unescape(encodeURIComponent(ErrMsg)));
};
function getLines(stack) {
  return stack
    .split("\n")
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ""));
}
// js错误类
class ErrorJsObj {
  type = ""; // 错误大类
  errorType = "jsError"; // 错误类型
  url = ""; // 页面路由
  message = ""; // 错误信息
  tagName = ""; // 标签名
  timeStamp = ""; // 时间
  stack = ""; // 错误发送文件
  selector = ""; // 选择器
  constructor(event) {
    // this.kind = 'stability'
    this.type = event?.type || "";
    // this.errorType = "jsError"
    this.url =
      event?.target?.src || event?.target?.href || event?.filename || "";
    this.tagName = event?.target?.tagName || "";
    this.message = event?.message || "";
    this.timeStamp = event?.timeStamp || "";
    this.stack = event?.error?.stack ? getLines(event?.error.stack) : "";
    this.selector = lastEvent ? getSelector(lastEvent.path) : "";
  }
}
export function injectJsError() {
  window.addEventListener("error", (event) => {
    console.log(event);
    event.preventDefault();
    if (!errorMap[getErrorUid(event.message)]) {
      errorMap[getErrorUid(event.message)] = new ErrorJsObj(event);
      // console.log(event, errorMap[getErrorUid(event.message)], "event=>>>>>>>");
    }
  });
}
// 网络请求类
class ErrorNetWorkObj {
  type = ""; // 错误大类
  errorType = "networkError"; // 错误类型
  uri = ""; // 接口路径
  message = ""; // 错误信息
  timeStamp = ""; // 时间
  response = null; // 接口返回
  request = null; // 请求参数
  status = ""; // 请求状态
  method = ""; // 请求方式
  constructor(event) {
    this.type = event.type;
    this.errorType = "networkError";
    this.uri = event.uri;
    this.message = event.message;
    this.timeStamp = event.timeStamp;
    this.response = event.response;
    this.request = event.request;
    this.status = event.status;
    this.method = event.method;
  }
}
export function unhandledReject() {
  function handleUrl(url: string) {
    const obj = {
      uri: "",
      param: "",
    };
    if (url.includes("?")) {
      obj.uri = url.split("?")[0];
      obj.param = url.split("?")[1];
    } else {
      obj.uri = url;
    }
    return obj;
  }
  window.addEventListener("unhandledrejection", (event: any) => {
    const { reason } = event;
    const { uri, param } = handleUrl(reason?.config?.url);
    if (!errorMap[getErrorUid(event.url)]) {
      const eventObj = {
        type: "xhrError",
        errorType: "networkError",
        uri: uri,
        message: reason?.data?.msg,
        timeStamp: event?.timeStamp,
        response: reason?.data,
        request: param,
        status: reason?.status,
        method: reason?.config?.method,
      };
      errorMap[getErrorUid(event.url)] = new ErrorNetWorkObj(eventObj);
      console.log(eventObj, errorMap[getErrorUid(event.url)], "event=>>>>>>>");
    }
  });
}
