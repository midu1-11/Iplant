# Iplant植物种植小程序  
## 一.项目简介  
本项目是大二暑假基于微信开发者工具开发的，小程序主要实现了植物状态检测，控制硬件浇水开灯，植物百科，打卡记录功能。主要是通过mqtt服务器与硬件实现联调，硬件部分可以查看另一个开源项目。目前小程序已经发布，可以在微信小程序搜索Iplant。  
## 二.开源链接
演示视频:  未发布 
  
ec-canvas文件夹中是echarts包  

icon文件夹中是一些小程序中用到的图片，当然所有的图片都被放在图床上供小程序访问，因为小程序有大小限制，超过限制可以分包但是就相对麻烦了  

pages文件夹中是各种页面文件  

utils文件夹中是mqtt包  
  
用到的包(具体版本请自行查看):   
· mqtt  
· echarts  
## 三.开发环境
微信开发者工具    
## 四.功能展示
图1 首页  
![首页](https://s4.ax1x.com/2022/03/02/b87I10.jpg)  

图2 指南界面  
![指南界面](https://s4.ax1x.com/2022/03/02/b87OAJ.jpg)  

图3 指南详情界面  
![指南详情界面](https://s4.ax1x.com/2022/03/02/b87jhR.jpg)  

图4 图表界面  
![图表界面](https://s4.ax1x.com/2022/03/02/b8HSc6.jpg)  

图5 打卡界面  
![打卡界面](https://s4.ax1x.com/2022/03/02/b8HPBD.jpg)  

## 五.技术详情  
1. 使用mqtt服务器和硬件实现联调，小程序端和硬件端都可以在某一主题下实现发布和订阅  
  
2. 前端界面均使用微信开发者工具设计(以后可能会使用一些方便的前端框架)  
  
3. 图表通过调用echarts包实现  
  
4. 小程序没有实现后端的数据库，所有的数据均由硬件存储并实时发送给小程序显示，植物指南信息则直接存储在js文件中  
## 六.项目的不足  
1. 没有后端服务器  
  
2. 有时会从服务器断线重连(这个不影响，一般都能马上连上) 
  
3. 由于mqtt服务器只支持实时传输的特点，在硬件没有没有打开的情况下，小程序端无法显示数据  
  
4. 感谢b站杰叔叔捣鼓提供的mqtt服务器  
