import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Consumer} from'../../context';
import { Link } from 'react-router-dom';



// const Contact=(props)=>{
//   const state = {};
//   const {name,email,phone,address} = props.contact;
//   const onShowClick=()=>{
//     console.log(state);
//   }
//   return(
//       <div className="card card-body mb-3">
//       <h1>{name} <i onClick={onShowClick().bind(this)} className="fas fa-sort-down"/></h1>
//       <ul className="list-group ">
//         <li className="list-group-item">{email}</li>
//         <li className="list-group-item">{phone}</li>
//         <li className="list-group-item">{address}</li>
//       </ul>
//       </div>
//       )

      
//   }


class Contact extends Component {
  constructor(){
    super();
    this.state ={
      showContactInfo:false,

    };
    
    

    // this.onShowClick = this.onShowClick.bind(this);
  }


  render(){
    const {id,name,email,phone} = this.props.contact;
    const { showContactInfo } = this.state;
  return(
    <Consumer>
      {value =>{
        const {dispatch} = value;
        return(

          
            <div className="card card-body mb-3"  >
              <h3>{name} {' '}
              <i 
                onClick={()=>this.setState({showContactInfo:!this.state.showContactInfo})} 
                className="fas fa-sort-down" 
                style={{cursor:'pointer'}}/ >
              <i 
                className="fas fa-times" 
                style={{cursor:'pointer',float:'right',color:'red'}} 
                onClick={onDeleteClick.bind(this,id,dispatch)}></i>
                <Link to={`contact/edit/${id}`} >
                <i className="fas fa-pencil-alt" style={{cursor:'pointer',float:'right',color:'black'}}></i>
                </Link>  
              </h3>
              {showContactInfo?(<ul className="list-group ">
              <li className="list-group-item">{email}</li>
              <li className="list-group-item">{phone}</li>
              
              </ul>):null}
          
            </div>
        )
      }}
    </Consumer>


      
      )
    
  }
}

 
Contact.propTypes={
  contact:PropTypes.object.isRequired
}

const contactStyle = {
  color:'red',fontSize:'25px',fontFamily:'serif'
}

const onDeleteClick = async (id,dispatch)=>{
  try{await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  dispatch({type:'DELETE_CONTACT',payload:id});
  
  }catch(e){
  dispatch({type:'DELETE_CONTACT',payload:id});
  
  }
    
}




export default Contact ;