import React,{Component} from "react"

export default class State extends Component{

  // 1、如果随便定义一个属性，不在state中，那么数据变了，页面不会重新渲染
  name="妲己"
  changeName(){
    this.name = "王昭君"
    console.log(this.name);
  }
  // 2、state是用来存放数据的，当state的数据发生变化时会引起页面的重新渲染，不能直接修改state中的数据，要通过setState()来修改值
  state = {
    name : "关羽",
    age: 46,
    city: "王者峡谷",
    movie:[{
      title:"我和我的祖国",
      id:0
    },{
      title:"我和我的家乡",
      id:1
    },{
      title:"我和我的爱人",
      id:2
    }],
    obj:{
      name:"李元芳",
      age:16,
      title:"我是李元芳"
    }
  }
  
  changeName2(){
    // 3、setState()是异步的，如果想要取到修改之后的值，需要在回调函数中处理。setState会引起页面的重新渲染。
    this.setState({
      name:"庄周"
    },()=>{
      console.log("回调函数中的打印："+this.state.name);
    })

    console.log("回调函数外的打印："+this.state.name);
  }
  // 6、修改数组
  changeMovie(index){
    // 1、取   2、改  3、放
    const {movie} = this.state
    movie[index].title = "咒怨"
    this.setState({
      movie:movie
    })
  }
  // 7、修改对象
  changeObj(){
    // 第一种方式
    // 1、取  2、改  3、放
    // let {obj} = this.state
    // obj.age = 30
    // this.setState({
    //   obj:obj
    // })

    // 第二种方法
    this.setState({
      obj:{
        ...this.state.obj,
        age:30
      }
    })

  }


  // 4、setState()的调用会引起render()的重新执行。所以不要在render中调用setState，否则会陷入死循环
  render(){
    console.log("页面渲染了");
    // 5、从state中取值，可以使用解构赋值
    let {name,age,city,movie,obj} = this.state
    return(
      <div>
        <h1>this is state</h1>
        <h4>数据不放在state中</h4>
        <p>name：{this.name}</p>
        <button onClick={ ()=>this.changeName() }>点击变成王昭君</button>
        <h4>数据放在state中</h4>
        <p>state.name：{this.state.name}</p>
        <button onClick={ ()=>this.changeName2() }>点击变成庄周</button>
        <h4>使用解构赋值渲染数据</h4>
        <p>name：{name}</p>
        <p>age：{age}</p>
        <p>city：{city}</p>
        <h4>修改数组</h4>
        <ul>
          {
            movie.map((item,index)=>{
              return(
                <li key={item.id} onClick={ ()=>this.changeMovie(index) }>{item.title}</li>
              )
            })
          }
        </ul>
        <h4>修改对象</h4>
        <p>name：{obj.name}</p>
        <p>age：{obj.age}</p>
        <p>title：{obj.title}</p>
        <button onClick={ ()=>this.changeObj() }>点击变成30</button>
      </div>
    )
  }
}