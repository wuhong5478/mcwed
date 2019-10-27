/* eslint-disable */
const toAnimation = (id, type) => { // 执行动画
  let obj = document.getElementById(id);
  // obj.style.animation = type + ' 1s linear forwards';
  obj.style.animation = type + ' 1s infinite linear alternate forwards';
  let timer = setTimeout(() => {
    obj.style.animationPlayState = 'paused';
    clearTimeout(timer);
  }, 1000);
};

const toRestore = id => { // 恢复原样
  let obj = document.getElementById(id);
  if (obj.style.animation) obj.style.animationPlayState = 'running';
  // if ( obj.style.animation) obj.style.animation = '';
  let timer = setTimeout(() => {
    obj.style.animation = '';
    obj.style.animationPlayState = '';
    clearTimeout(timer);
  }, 1000);
};

const monthChange = str => { // 小写月份转成大写月份
  let arr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  let index = parseInt(str);
  let month = '';
  if (isNaN(index)) {
    month = str;
  }
  else {
    month = arr[index - 1];
  }
  return month;
};


const addZero = item => {
  item = item < 10 ? '0' + item : item;
  return item;
};
/* 时间戳转换成"yyyy-mm-dd hh:mm:ss"格式 */
const getTime = time => {
  let newTime = new Date();
  if (time && time.indexOf('CST') !== -1) {
    let dateStr = time.split(' ');
    let strGMT = dateStr[0] + ' ' + dateStr[1] + ' ' + dateStr[2] + ' ' + dateStr[5] + ' ' + dateStr[3] + ' GMT+0800';
    newTime = new Date(Date.parse(strGMT));
  }
  else if (time) {
    newTime = new Date(time);
  }
  let Year = newTime.getFullYear();
  let Month = addZero(newTime.getMonth() + 1);
  let Day = addZero(newTime.getDate());
  let Hour = addZero(newTime.getHours());
  let Minute = addZero(newTime.getMinutes());
  let Second = addZero(newTime.getSeconds());

  return `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
};

const ISO8601_DATE_REGEX = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
/* 时间戳转换函数 */
const renderTime = (value = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  // console.log(value);
  const date = toDate(value);

  if (!date) {
    return '';
  }

  // console.log(date);
  return format
    .replace('YYYY', `${date.getFullYear()}`)
    .replace('YY', `${date.getFullYear() % 100}`)
    .replace('MM', `${date.getMonth() + 1}`.padStart(2, '0'))
    .replace('M', `${date.getMonth() + 1}`)
    .replace('DD', `${date.getDate()}`.padStart(2, '0'))
    .replace('D', `${date.getDate()}`)
    .replace('HH', `${date.getHours()}`.padStart(2, '0'))
    .replace('H', `${date.getHours()}`)
    .replace('hh', `${date.getHours() % 12}`.padStart(2, '0'))
    .replace('h', `${date.getHours() % 12}`)
    .replace('mm', `${date.getMinutes()}`.padStart(2, '0'))
    .replace('m', `${date.getMinutes()}`)
    .replace('ss', `${date.getSeconds()}`.padStart(2, '0'))
    .replace('s', `${date.getSeconds()}`)
    .replace('SSS', `${date.getMilliseconds()}`.padStart(3, '0'))
    .replace('SS', `${date.getMilliseconds()}`.padStart(2, '0'))
    .replace('S', `${date.getMilliseconds()}`)
    // Always last
    .replace('A', date.getHours() < 12 ? 'AM' : 'PM')
    .replace('a', date.getHours() < 12 ? 'am' : 'pm');
};
function toDate(value) {
  // Date 类型
  if (isDate(value)) {
    return value;
  }
  // Number 类型
  if (typeof value === 'number' && !isNaN(value)) {
    return new Date(value);
  }
  // String 类型
  if (typeof value === 'string') {
    value = value.trim();
    // 空字符串
    if (value === '') {
      return null;
    }

    const parsedNb = parseFloat(value);

    // any string that only contains numbers, like "1234" but not like "1234hello"
    if (!isNaN(value)) {
      if (/^(\d{14})$/.test(value)) {
        let Year = value.slice(0, 4);
        let Month = value.slice(4, 6);
        let Day = value.slice(6, 8);
        let Hour = value.slice(8, 10);
        let Minute = value.slice(10, 12);
        let Second = value.slice(12, 14);
        return new Date(Year, Month - 1, Day, Hour, Minute, Second);
      }
      return new Date(parsedNb);
    }
    // 2019-1-9
    if (/^(\d{4}-\d{1,2}-\d{1,2})$/.test(value)) {
      const [y, m, d] = value.split('-')
        .map(val => +val);
      return new Date(y, m - 1, d);
    }
    // 2019-1-19 10:10:10
    if (/^(\d{4}-\d{1,2}-\d{1,2}\s+\d{1,2}:\d{1,2}:\d{1,2})$/.test(value)) {
      let [front, end] = value.split(' ');
      const [y, M, d] = front.split('-')
        .map(val => +val);
      const [h, m, s] = end.split(':')
        .map(val => +val);
      return new Date(y, M - 1, d, h, m, s);
    }

    // ISO8601_DATE_REGEX
    let match;
    if (match === value.match(ISO8601_DATE_REGEX)) {
      return isoStringToDate(match);
    }
  }
  function isDate(data) {
    return data instanceof Date && !isNaN(data.valueOf());
  }

  const date = new Date(value);
  if (!isDate(date)) {
    console.warn(`Unable to convert "${value}" into a date`);
    return null;
    // throw new Error(`Unable to convert "${value}" into a date`);
  }
  return date;
}
function isoStringToDate(match) {
  const date = new Date(0);
  let tzHour = 0;
  let tzMin = 0;

  // match[8] means that the string contains "Z" (UTC) or a timezone like "+01:00" or "+0100"
  const dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear;
  const timeSetter = match[8] ? date.setUTCHours : date.setHours;

  // if there is a timezone defined like "+01:00" or "+0100"
  if (match[9]) {
    tzHour = Number(match[9] + match[10]);
    tzMin = Number(match[9] + match[11]);
  }
  dateSetter.call(date, Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const h = Number(match[4] || 0) - tzHour;
  const m = Number(match[5] || 0) - tzMin;
  const s = Number(match[6] || 0);
  const ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
  timeSetter.call(date, h, m, s, ms);
  return date;
}
const getToken = () => {
  const storage = storageMode['localStorage'];
  return storage.$get({
    key: 'tokenId'
  });
};
const setToken = ({
  key,
  parameter,
  date,
  reflush,
  url
}) => {
  const storage = storageMode['localStorage'];
  return storage.$set({
    key,
    parameter,
    date,
    reflush,
    url
  });
};

const removeToken = () => {
  const storage = storageMode['localStorage'];
  return storage.$remove({
    key: 'tokenId'
  });
};
const setStorage = ({
  type,
  key,
  parameter,
  date,
  reflush,
  url
}) => {
  const storage = storageMode[type];
  return storage.$set({
    key,
    parameter,
    date,
    reflush,
    url
  });
};
const getStorage = ({
  type,
  key
}) => {
  const storage = storageMode[type];
  return storage.$get({
    key
  });
};
const removeStorage = ({
  type,
  key
}) => {
  const storage = storageMode[type];
  return storage.$remove({
    key
  });
};
export default {
  toAnimation,
  toRestore,
  monthChange,
  renderTime,
  getTime,
  setToken,
  getToken,
  removeToken,
  setStorage,
  getStorage,
  removeStorage
};
