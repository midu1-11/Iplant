// index.js
var mqtt=require('../../utils/mqtt.min.js')
var client=null

Page({
  data: {
    tempo:'0',
    moisture:'0',
    lx:'0',
    led:'false',
    pump:'false'
  },
  // 事件处理函数
 
  onLoad() {
    this.connectmqtt()    
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
      if(tem.mark==1)
      {
        that.setData({
          tempo:tem.temp,
          moisture:tem.moisture,
          lx:tem.lx
        })
      }
      
      console.log('收到'+message.toString())
    })
    client.on('reconnect',(error)=>{
      console.log('正在重连中',error)
    })
    client.on('error',(error)=>{
      console.log('连接失败',error)
    })
  },
  onledchange:function(event){
    console.log(event.detail)
    let sw=event.detail.value
    console.log(event.detail.value)
    if(sw)
    {
     client.publish('/iot/300/cc','l1',function(err){
       if(!err)
       {
         console.log('成功发送指令-开')
       }
     })
    }
    else{
      client.publish('/iot/300/cc','l0',function(err){
        if(!err)
        {
          console.log('成功发送指令-关')
        }
      })
    }
  },
  onpumpchange:function(event){
    console.log(event.detail)
    let sw=event.detail.value
    console.log(event.detail.value)
    if(sw)
    {
     client.publish('/iot/300/cc','p1',function(err){
       if(!err)
       {
         console.log('成功发送指令-开')
       }
     })
    }
    else{
      client.publish('/iot/300/cc','p0',function(err){
        if(!err)
        {
          console.log('成功发送指令-关')
        }
      })
    }
  }
  
})
