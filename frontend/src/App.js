import React from 'react';
import axios from "axios";
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      users:[],
      id:0,
      account:'',
      amount:'',
      description:''
    }

  }
  componentDidMount(){
    axios.get("http://localhost:8080/api/")
    .then((res)=>{
      this.setState({
        users:res.data,
        id:0,
        account:'',
        amount:'',
        description:''
      })
    })
  }
  submit(event,id){
    event.preventDefault();
    if(id === 0){
      axios.post("http://localhost:8080/api/",{
        account:this.state.account,
        amount:this.state.amount,
        description:this.state.description
      })
      .then((res)=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/api/",{
        id:this.state.id,
        account:this.state.account,
        amount:this.state.amount,
        description:this.state.description
      }).then(()=>{
        this.componentDidMount();
      })

    }

  }
  delete(id){
    axios.delete(`http://localhost:8080/api/${id}`)
    .then(()=>{
      this.componentDidMount();
    })
  }
  edit(id){
    axios.get(`http://localhost:8080/api/${id}`)
    .then((res)=>{
      console.log(res.data);
      this.setState({
        id:res.data.id,
        account:res.data.account,
        amount:res.data.amount,
        description:res.data.description
      })
    })
  }
  render(){
  return (
    <div className="container" >
    
    <div className="row">
    <div className="col s6">
        <form onSubmit={(e)=>this.submit(e,this.state.id)}>
        <div class="input-field col s12">
          <i class="material-icons prefix">Account</i>
          <input onChange={(e)=>this.setState({account:e.target.value})} value={this.state.account} type="text" id="autocomplete-input" class="autocomplete" required/>
          <label for="autocomplete-input">Account</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">Amount</i>
          <input onChange={(e)=>this.setState({amount:e.target.value})} value={this.state.amount} type="number" id="autocomplete-input" class="autocomplete" required/>
          <label for="autocomplete-input">Amount</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">Description</i>
          <input onChange={(e)=>this.setState({description:e.target.value})} value={this.state.description} type="text" id="autocomplete-input" class="autocomplete" required/>
          <label for="autocomplete-input">Description</label>
        </div>
        <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
          <i class="material-icons right">send</i>
        </button>
        </form>
      </div>
      <div className="col s6">
      <table>
        <thead>
          <tr>
              <th>Account</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {
            this.state.users.map(user=>
              <tr key={user.id}>
                <td>{user.account}</td>
                <td>{user.amount}</td>
                <td>{user.description}</td>
                <td>
                <button onClick={(e)=>this.edit(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                  <i class="material-icons">edit</i>
                </button>
                </td>
                <td>
                <button onClick={(e)=>this.delete(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                  <i class="material-icons">delete</i>
                </button>
                </td>
              </tr>
              )
          }
          
        </tbody>
      </table>
      </div>
    
    </div>
    </div>
  );
  }
  
}

export default App;
