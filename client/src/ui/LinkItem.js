import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {yellow500} from 'material-ui/styles/colors';
import React, { Component } from 'react';

//GraphQL component
import ApolloClient from 'apollo-client';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';


class LinkItem extends Component {
    link = null;

    onFavorite = async () => {

        const mutation = gql` mutation ($data: LinkInput!) { addFavLink (data: $data) }`;
        var item = {
            "_id":this.props.link._id,
            "favorite":  !this.props.link.favorite
        };
        try{
            let req = await this.updateLink(item, mutation);
            if(!req){
               return;
            }
            this.props.link.favorite = !this.props.link.favorite;
            this.setState({
                link:this.props.link
            });
        }catch(e){
            console.log(e);
        }
    }

     onVote = async (num) => {
        const mutation = gql` mutation ($data: LinkInput!) { voteLink (data: $data) }`;
        var item = {
            "_id":this.props.link._id,
            "vote": this.props.link.vote+num
        };
        try{
            let req = await this.updateLink(item, mutation);
            if(!req){
               return;
            }
            this.props.link.vote = this.props.link.vote+num;
            this.setState({
                link:this.props.link
            });
        }catch(e){
            console.log(e);
        }
        
    }

    updateLink = async (link, mutation) => {
        let promise = new Promise( (resolve, reject) => {
        this.props.client.mutate({
            mutation:mutation,
            variables: {
                data:{
                    "_id":link._id,
                    vote:link.vote,
                    favorite:link.favorite
                }
            }
        }).then(({ data }) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });  
        });
        return promise;
    }


    render() {
        var link = this.props.link;
        if(!link){
            return (
                <br/>
            );
        }
        var iconStyles = {
            padding:0
        },
        iconColor = link.favorite ? yellow500 : "black";
        return (
            <div>
                <div className="list-index"> {link.index}
                </div>
                <div className="list-item" onClick={this.onFavorite.bind(this)}> 
                    <ListItem primaryText={link.name} key={link._id} secondaryText={link.url} leftIcon={
                        <ActionGrade style={iconStyles} color={iconColor} hoverColor={yellow500} />
                    }>
                    </ListItem>
                </div>
                <div className="list-vote">
                    <h3>{link.vote}</h3>
                    <h5>votes</h5>
                </div>
                <div className="list-action">
                    <div className="list-action-btn up" onClick={this.onVote.bind(this, 1)}>
                        UP
                    </div>
                    <div className="list-action-btn down"  onClick={this.onVote.bind(this, -1)}>
                        DOWN
                    </div>
                </div>
                <Divider />
            </div>
        );
    }
}

LinkItem.propTypes = {
  client: React.PropTypes.instanceOf(ApolloClient).isRequired,
}

const LinkItemWithApolo = withApollo(LinkItem);

export default LinkItemWithApolo;