import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ApolloClient from 'apollo-client';
import { withApollo } from 'react-apollo';

//GraphQL component
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


//Custom style
const btnStyle = {
    position:"absolute",
    bottom:"16px",
    right:"16px"
};

class AddPopup extends React.Component {
  //initstate  
  state = {
    open: false,
    urlLink : 'http://'
  };
  
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    //setting state to initial value  
    this.setState({open: false, urlLink:'http://'});
  };
  
  addLink = async () => {
      var urlLink = this.state.urlLink,
      matches = new RegExp(/^(https?:\/\/)/).test(urlLink); //testing if http
      
      if(!matches){
          return;
      }
      try{
        let name = await this.getUrlName(urlLink);
        let request = await this.sendRequest({
          data:{
            url:urlLink,
            name: name
          }
        });
        if(request){
          this.props.handler();
          this.handleClose();
        }else{
          throw new Error("Error during adding link");
        }
      }catch(e){
        console.error(e);
      }
  };
  
  handleChange = (event) => {
    this.setState({
      urlLink: event.target.value,
    });
  };

  getUrlName = async (url) => {
    var promise = new Promise( (resolve, reject) => {
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          var str = request.responseText,
          name = str.substring(str.lastIndexOf("<title")+7,str.lastIndexOf("</title>"));
          name = name.substr(name.lastIndexOf(">")+1);
          resolve(name);
        } else {
          reject("Error");
        }
      };
      request.open('GET', "http://127.0.0.1:9000/proxy/?url="+url);
      request.send();
    });
    return promise;
  }

  sendRequest = async (params) => {
    const mutation = gql` mutation ($data: LinkInput!) { addLink(data: $data) }`
    let promise = new Promise( (resolve, reject) => {
      this.props.client.mutate({
        mutation:mutation,
        variables: params
      }).then(({ data }) => {
        resolve(data.addLink);
      }).catch((error) => {
        reject(error);
      });  
    });
    return promise;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.addLink}
      />
    ];

    return (
      <div>
        <FloatingActionButton onTouchTap={this.handleOpen} style={btnStyle}>
             <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Insert a link"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        Enter URL to add a Link
           <TextField
              hintText="Link url"
              value={this.state.urlLink}
              fullWidth={true}
              onChange={this.handleChange}
            />
        </Dialog>
      </div>
    );
  }
}

AddPopup.propTypes = {
  client: React.PropTypes.instanceOf(ApolloClient).isRequired,
}

const AddPopupWithApollo = withApollo(AddPopup);

export default AddPopupWithApollo;