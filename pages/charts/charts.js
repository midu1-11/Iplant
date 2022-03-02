import * as echarts from '../../ec-canvas/echarts'
let chart = null
let chart2 = null
let chart3 = null
var temp_list = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
var moisture_list = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
var lx_list = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
var mqtt=require('../../utils/mqtt.min.js')
var client=null
//var createView=null

Page({
  data: {
    lazyEc:{
      lazyLoad:true
    },
    lazyEc2:{
      lazyLoad:true
    },
    lazyEc3:{
      lazyLoad:true
    }
  },
  onLoad() {
    this.lazyComponent = this.selectComponent('#lazy-mychart-dom')
    this.lazyComponent2 = this.selectComponent('#lazy-mychart-dom2')
    this.lazyComponent3 = this.selectComponent('#lazy-mychart-dom3')
    this.connectmqtt()    
    setTimeout(()=>this.init(),10000)
    setTimeout(()=>this.init2(),10000)
    setTimeout(()=>this.init3(),10000)
  },
  init(){
    this.lazyComponent.init((canvas,width,height,dpr)=>{
      let chart = echarts.init(canvas,null,{
        width:width,
        height:height,
        devicePixelRatio:dpr
      })
      let option = getOption()
      chart.setOption(option)
      this.chart = chart
      return chart
    })
  },
  init2(){
    this.lazyComponent2.init((canvas,width,height,dpr)=>{
      let chart2 = echarts.init(canvas,null,{
        width:width,
        height:height,
        devicePixelRatio:dpr
      })
      let option = getOption2()
      chart2.setOption(option)
      this.chart2 = chart2
      return chart2
    })
  },
  init3(){
    this.lazyComponent3.init((canvas,width,height,dpr)=>{
      let chart3 = echarts.init(canvas,null,{
        width:width,
        height:height,
        devicePixelRatio:dpr
      })
      let option = getOption3()
      chart3.setOption(option)
      this.chart3 = chart3
      return chart3
    })
  },
  connectmqtt:function(){
    var that=this
    const options={
      connectTimeout:4000,
      clientId:'dyp'+Math.ceil(Math.random()*10),
      port:8084,
      username:'783959ae451cc150e4ddb2f7098da1f3',
      password:'duyupeng'
    }
    client=mqtt.connect('wxs://t.yoyolife.fun/mqtt',options)
    client.on('connect',(e)=>{
      console.log('服务器连接成功')
      client.subscribe('/iot/300/dyp',{qos:0},function(err){
        if(!err)
        {console.log('订阅成功')}
      })
    })
    //信息监听事件
    client.on('message',function(topic,message){
      let tem={}
      tem=JSON.parse(message)
      if(tem.mark==1){
      temp_list = tem.temp24
      console.log(temp_list)
      moisture_list = tem.moisture24
      console.log(moisture_list)
      }
      //this.init()
    })
    client.on('reconnect',(error)=>{
      console.log('正在重连中',error)
    })
    client.on('error',(error)=>{
      console.log('连接失败',error)
    })
  }
})

function getOption(){
  return {
    title: {
      text: "温度",
      left: "center",
      textStyle: {
        fontSize: 25
      }
    },
    xAxis: {
        type: 'category',
        name: '小时/h',
        data: ['1', '2', '3', '4', '5', '6', '7','8','9','10', '11', '12', '13', '14', '15', '16','17','18', '19', '20', '21', '22','23','24'],
        nameLocation: "middle",
        nameGap: 25
    },
    yAxis: {
        type: 'value',
        name: '摄氏度/℃'
    },
    series: [{
        data: temp_list,
        type: 'line'
    }]
}
}
function getOption2(){
  return {
    title: {
      text: "湿度",
      left: "center",
      textStyle: {
        fontSize: 25
      }
    },
    color:'#0080FF',
    xAxis: {
        name: '小时/h',
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7','8','9','10', '11', '12', '13', '14', '15', '16','17','18', '19', '20', '21', '22','23','24'],
        nameLocation: "middle",
        nameGap: 25
    },
    yAxis: {
        name: '百分比/%',
        type: 'value'
    },
    series: [{
        data: moisture_list,
        type: 'bar'
    }]
}
}
function getOption3(){
  return {
    title: {
      text: "光照",
      left: "center",
      textStyle: {
        fontSize: 25
      }
    },
    color:'#FFFF37',
    xAxis: {
        name: '小时/h',
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7','8','9','10', '11', '12', '13', '14', '15', '16','17','18', '19', '20', '21', '22','23','24'],
        nameLocation: "middle",
        nameGap: 25
    },
    yAxis: {
        name: '勒克斯/lx',
        type: 'value'
    },
    series: [{
        data: moisture_list,
        type: 'bar'
    }]
}
}