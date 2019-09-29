// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const rp = require("request-promise");
exports.main = async (event,context)=>{
  var url = `http://api.douban.com/v2/movie/in_theaters`;
  url += `?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  url +=`&start=${event.start}`;
  url += `&count=${event.count}`;
  //发送ajax
  return rp(url).then(res=>{
    return res;
  }).catch(err=>{
    console.log(err);
  })
}


// 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }