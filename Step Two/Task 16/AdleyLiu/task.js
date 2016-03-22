/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var oIptCity = document.getElementById('aqi-city-input');
  var oIptAqi = document.getElementById('aqi-value-input');
  var regTrim = /\s+/g;
  var regCity = /^[a-zA-Z\u4E00-\u9FA5]+$/;
  var regAqi = /^[1-9]\d+$/;
  var sCity = oIptCity.value;
  var iAqi = oIptAqi.value;

  //去空格
  sCity = sCity.replace(regTrim, '');
  iAqi = parseFloat(iAqi.replace(regTrim, ''));
  //验证
  var boolCity = regCity.test(sCity);
  var boolAqi = regAqi.test(iAqi);
  if(!boolCity){
    oIptCity.style.border = '1px solid red';
    oIptCity.placeholder = '请填写正确的中文或者英文';
  }else{
    oIptCity.style.border = '';
    oIptCity.placeholder = '';
  }
  if(!boolAqi){
    oIptAqi.style.border = '1px solid red';
    oIptAqi.placeholder = '请填写一个整数';
  }else{
    oIptAqi.style.border = '';
    oIptAqi.placeholder = '';
  }
  if(boolCity && boolAqi){
    aqiData[sCity] = iAqi;
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var oAqiTab = document.getElementById('aqi-table');
  oAqiTab.innerHTML = '';
  for(var i in aqiData){
    var oTr = document.createElement('tr');
    var oTd1 = document.createElement('td');
    oTd1.innerHTML = i;
    oTr.appendChild(oTd1);
    var oTd2 = document.createElement('td');
    oTd2.innerHTML = aqiData[i];
    oTr.appendChild(oTd2);
    var oTd3 = document.createElement('td');
    oTd3.innerHTML = '<button>删除</button>';
    oTr.appendChild(oTd3);
    oAqiTab.appendChild(oTr);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var oAqiTab = document.getElementById('aqi-table');
  oAqiTab.removeChild(this.parentNode.parentNode);
}

function init() {
  var oAddBtn = document.getElementById('add-btn');
  var oAqiTab = document.getElementById('aqi-table');
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  oAddBtn.onclick = function(){
    addBtnHandle();
    var aButton = oAqiTab.getElementsByTagName('button');
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    for(var i=0; i<aButton.length; i++){
      (function(i){
        aButton[i].onclick = delBtnHandle;
      })(i)
    }
  }
}

window.onload = function(){
  init();
}