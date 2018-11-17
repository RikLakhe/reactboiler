import React, { Component } from 'react';
import {Consumer} from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
  constructor(){
    super();
    this.state = {
      name:'',
      email:'',
      phone:'',
      
      error:{}
    }
    this.onChange= this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onEmailChange= this.onEmailChange.bind(this);
    // this.onAddressChange= this.onAddressChange.bind(this);
    // this.onPhoneChange= this.onNameChange.bind(this);
  }

  async componentDidMount(){
    const {id} = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = res.data;

    this.setState({
      name:contact.name,
      email:contact.email,
      phone:contact.phone
    })
  }
  // onNameChange(e){
  //     this.setState({name:e.target.value});
  //   }
  //   onEmailChange(e){
  //     this.setState({email:e.target.value});
  //   }
  //   onAddressChange(e){
  //     this.setState({address:e.target.value});
  //   }
  //   onPhoneChange(e){
  //     this.setState({phone:e.target.value});
  //   }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  async onSubmit(dispatch,e){
      e.preventDefault();
      // console.log(this.state);
      const {name,email,phone} = this.state;

      if(name===''){this.setState({error:{name:'Name is required'}});return;};
      if(email===''){this.setState({error:{email:'Email is required'}});return;};
      if(phone===''){this.setState({error:{phone:'Phone is required'}});return;};
      // if(address===''){this.setState({error:{address:'Address is required'}});return;};



      const updContact ={
        name,email,phone
      }
      

      const {id} = this.props.match.params;
      const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updContact);

      dispatch({type:'UPDATE_CONTACT',payload:res.data});




      this.setState ({
        name:'',
        email:'',
        phone:'',
        
        error:{}
      })

      this.props.history.push('/');
    }

  render() {
    const {name,email,phone,error} = this.state;

    return(
      <Consumer>
        {value=>{
  const { dispatch } = value;
  return(
    <div className="card mb-3">
    <div className="card-header">Edit Contact for {name} </div>
    <form onSubmit={this.onSubmit.bind(this,dispatch)} >
      <TextInputGroup label="Name" name="name" placeholder="Enter the NAME" value={name} onChange={this.onChange} error={error.name}/>

      <TextInputGroup label="Email" name="email" placeholder="Enter the EMAIL" value={email} onChange={this.onChange} type="email" error={error.email}/>

      <TextInputGroup label="Phone Number" name="phone" placeholder="Enter the PHONE NUMBER" value={phone} onChange={this.onChange} error={error.phone}/>

      

      
      <input type="submit" value="Edit Contact" className="btn btn-light btn-block"/>
      </form>
        
    </div>

  )
}}
      </Consumer>

    )
   
  }

  // onChange(e){
  //   this.setState({e.target.name:e.target.value})
  // }
}

// let onChange = (e)=>{
//   this.setState({[e.target.name]:e.target.value});
// }
// let onSubmit =(e)=>{
//   e.preventDefault();
//   console.log(this.state);
// }
export default EditContact;