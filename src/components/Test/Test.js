import React, { Component } from 'react'

class Test extends Component {
  constructor(){
    super();
    this.state={
      title:'',
      body:''
    }
  }
  componentWillMount(){
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(data => 
      {console.log(data);
      this.setState({
      title:data.title,
      body: data.body
    });})
  
  }

  // componentDidMount(){
  //   console.log('component did mount')
  // }
  
  // componentWillUpdate(){
  //   console.log('component will update');
  // }
  // componentDidUpdate(){
  //   console.log('component did update');
  // }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   return {
  //     test:'something'
  //   };
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState){
  //   console.log('component will recieve props');
  // }
  

  render() {
    const {title,body} = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    )
  }
}


export default Test;