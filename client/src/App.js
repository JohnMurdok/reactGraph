import React, { Component, Proptypes } from 'react';
import { connect, withApollo} from 'react-apollo';
import ApolloClient from 'apollo-client';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

//GraphQL component
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

//List
import LinkList from './ui/LinkList';

import {
  AppBar
} from 'material-ui';

import AddPopup from './ui/AddPopup';
import './App.css';

class App extends Component {
  updateRequired = true;

  constructor(props){
    super(props);
    this.updateListEvent = () =>{
      this.setState({updateRequired: true});
    };
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  
  updateList() {
      const query = gql`query { links { _id, name, url, vote, favorite } }`;
      const links = ({data}) => {
        console.log(data);
        return (
         <LinkList links={data.links} handler={this.updateListEvent}/>
        );
      }
      //Refreshing all 3 seconds
      const ViewWithData = graphql(query, { options: { pollInterval: 3000 } })(links);
      return (
          <ViewWithData />
      );
  }
  
  
  render() {
   
    return (
      <div className="app">
        <AppBar title="Convargo App" />
        <AddPopup handler={this.updateListEvent} />
        { this.updateList() }
      </div>
    );
  }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};


App.propTypes = {
  client: React.PropTypes.instanceOf(ApolloClient).isRequired,
}

const AppWithApollo = withApollo(App);

export default AppWithApollo;
