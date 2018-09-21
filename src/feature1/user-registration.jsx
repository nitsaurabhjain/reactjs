import React from 'react';
class UserRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name:'',
            age: '',
            profile:''
        };
      this.profileChanged = this.profileChanged.bind(this);
    }
    profileChanged(e){
        var value = e.target.value;
        switch(e.target.id){
            case 'name':
                this.setState({name:value});
                break;
            case 'age':
                this.setState({age: value});
                 break;
            case 'profile':
                 this.setState({profile: value});
                 break;
        }
    }

    render() {
        return (
            <div>
           <span>Name: {this.state.name}</span>
           <span>Age: {this.state.age}</span>
           <span>Profile: {this.state.profile}</span>
           <br/>
           Enter Name: 
           <input type = 'text' name = 'name' id ='name' value = {this.state.name} onChange = {this.profileChanged}/><br/>
           Enter Age: 
           <input type = 'text' name = 'age'  id = 'age'  value = {this.state.age} onChange = {this.profileChanged}/><br/>
           Enter profile:
           <input type = 'text' name = 'profile' id = 'profile' value = {this.state.profile} onChange = {this.profileChanged}/>
          </div>
        );
    }
}
export default UserRegistration;