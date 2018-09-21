import React from 'react';
import ReactDOM from 'react-dom';
class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.loadSetting = this.loadSetting.bind(this);
        this.state = {
            viewSetting:null
        };
    }
    loadSetting(){
        import("./viewSetting.jsx").then(viewSettingMod => {
              console.log(viewSettingMod.default());
              this.setState(()=>{ 
                  return {viewSetting: viewSettingMod.default().props.children}
              }) 
        });
    }
    render() {
        return (
        <div>
           <button onClick = {this.loadSetting}>Activate Lasers</button>
           {this.state.viewSetting}
        </div>
        );
    }
}
export default Setting