import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';
import AuthService from "../services/auth_service";
import authHeader from '../services/auth_header';
import axios from "axios";
import './SingleProject.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Comment = props => {
  
  const {  name, comment } = props.comment;
  return(
    <li>{name}  :  {comment}</li>
  )
  
}

class Project extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      currentUser:undefined,
      projectId : '',
      projectTitle:'',
      projectPrice:'',
      projectDescription:'',
      projectComments:[],
      comment:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.postComment = this.postComment.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getProductData = this.getProductData.bind(this);
  }
  componentDidMount() {
    document.body.className="singleProjectBody"
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    this.getProductData();
    
  }
  getProductData(){
    const PROJECT=this.props.match.params.PROJECT.split('-');
    const projectId= PROJECT[PROJECT.length-1];
    
    axios.get('http://127.0.0.1:8000/project/'+projectId)
    
    .then(PROJECT => {
      
      this.setState({ 
        projectTitle: PROJECT.data.title,
        projectPrice: PROJECT.data.price,
        projectDescription: PROJECT.data.description,
        projectComments: PROJECT.data.comments
      })
    });
  }
  addToCart(){
    const PROJECT=this.props.match.params.PROJECT.split('-');
    const projectId= PROJECT[PROJECT.length-1];
    
    var postData = {
      userId:this.state.currentUser.id,
      projectId:projectId
    };
    axios.post('http://127.0.0.1:8000/project/addtocart',postData,{ headers: authHeader() })
    .then(response =>console.log(response))
  }
  postComment(){
    const PROJECT=this.props.match.params.PROJECT.split('-');
    const projectId= PROJECT[PROJECT.length-1];
    var postData = {
      name:this.state.currentUser.name,
      comment: this.state.comment,
    };
    axios.post('http://127.0.0.1:8000/project/'+projectId+'/addcomment',postData,{ headers: authHeader() })
    .then(response =>{
      console.log(response);
      this.getProductData();
    })
  }
  handleChange(event) {
    const stateToBeChanged = event.target.name;
    const valueToBeChanged = event.target.value;
    
    this.setState({ [stateToBeChanged] : valueToBeChanged });
  }
  
  render() {
    const isLoggedIn = this.state.currentUser
    if(isLoggedIn){
      var commentBox = <div>
                      <textarea name="comment" id="comment" rows="4" cols="50" onChange={this.handleChange} ></textarea>
                      <br />
                      <br />
                      <Button variant="light" onClick={this.postComment}>Comment</Button>
                      </div> 
      var addToCart = <div><Button variant="primary" onClick={this.addToCart}>Add To Cart</Button></div>
    }
    return (
      <div>
        <Helmet>
          <title>{ this.state.projectTitle }</title>
        </Helmet>
        <div className="project" style={{ display:'inline-block',width:300,margin:50 }}>
          <h3>Title : {this.state.projectTitle}</h3>
          <h4>Price: {this.state.projectPrice}</h4>
          {addToCart}
          <p>Description : {this.state.projectDescription}</p>
        </div> 
        <div className="commentArea">
          {commentBox}
        </div>
        <div className="comments">
          {
            this.state.projectComments.map(COMMENT=>{
              return(
                <Comment key={COMMENT._id} comment={COMMENT} />
              )
            })
          }
        </div>
      </div>
    )

  }
}

export default Project;
