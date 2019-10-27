/* eslint-disable */
let global_callback = null;
let websock = null;
function initWebSocket() { // 初始化weosocket
  // ws地址
  let wsuri = 'wss://cloudfire.citylink.hzcloudtown.com:446/websocket';
  websock = new WebSocket(wsuri);
  websock.onmessage = e => {
    websocketonmessage(e);
  };
  websock.onclose = e => {
    websocketclose(e);
  };
  websock.onopen = () => {
    websocketOpen();
  };
  // 连接发生错误的回调方法
  websock.onerror = () => {
    console.log('WebSocket连接发生错误');
  };
}
// 实际调用的方法
function sendSock(agentData, callback) {
  global_callback = callback;
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData);
  }
  else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(() => {
      sendSock(agentData, callback);
    }, 1000);
  }
  else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(() => {
      sendSock(agentData, callback);
    }, 1000);
  }
}
// 数据接收
function websocketonmessage(e) {
  if (global_callback != null && global_callback !== '' && global_callback !== undefined) {
    global_callback(JSON.parse(e.data));
  }
  // return JSON.parse(e.data);
}

// 数据发送
function websocketsend(agentData) {
  if (typeof agentData === 'string') {
    websock.send(agentData);
  }
  else {
    websock.send(JSON.stringify(agentData));
  }
}
// 关闭
function websocketclose(e) {
  console.log('connection closed (' + e.code + ')');
  initWebSocket();
}
function websocketOpen(e) {
  console.log('连接成功', e);
  // heartbeat();
  // login();
}
initWebSocket();
export { sendSock };
