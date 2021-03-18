import React,{Component} from "react"


export default class Base extends Component{

  state = {
    user1:{
      userName:"admin",
      passWord:"123"
    },
    user2:{
      userName:"admin",
      passWord:"123"
    }
  }
  changeUserName(e){
    // 通过e.target.value可以获取到新的值
    this.setState({
      user1:{
        ...this.state.user1,
        userName:e.target.value
      }
    })
  }
  changePassWord(e){
    this.setState({
      user1:{
        ...this.state.user1,
        passWord:e.target.value
      }
    })
  }
  login1(){
    console.log(this.state.user1);
  }


  changeUser2(e,key){
    // 1、要获取到新的值e.target.value     2、需要知道改的是账号还是密码key
    this.setState({
      user2:{
        ...this.state.user2,
        [key]:e.target.value
      }
    })
  }
  login2(){
    console.log(this.state.user2);
    // 下面做请求
  }

  render(){
    let {user1,user2} = this.state
    return(
      <div>
        <h2>this is Base</h2>
        <h4>form第一种</h4>
        {/* 获取：变量 = input.value    设置：input.value = 变量 */}
        <p>账号：<input type="text" value={user1.userName} onChange={ (e)=>this.changeUserName(e) }/></p>
        <p>密码：<input type="text" value={user1.passWord} onChange={ (e)=>this.changePassWord(e) }/></p>
        <button onClick={ ()=>this.login1() }>提交</button>
        <h4>form第二种</h4>
        <p>账号：<input type="text" value={user2.userName} onChange={ (e)=>this.changeUser2(e,"userName") }/></p>
        <p>密码：<input type="text" value={user2.passWord} onChange={ (e)=>this.changeUser2(e,"passWord") }/></p>
        <button onClick={ ()=>this.login2() }>提交</button>
      </div>
    )
  }
}