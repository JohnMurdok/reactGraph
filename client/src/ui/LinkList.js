import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import LinkItem from "./LinkItem";

class LinkList extends Component {
    render = () => {
        const links = this.renderList(this.props.links);
        const styleList = {
            position:"relative",
            width:"70%",
            "maxHeight":"100%",
            "marginLeft":"15%",
            "overflowY":"auto",
            "zindex":0,
            "padding":0
        };
        return (
            <List style={styleList}>
                { links }
                <Divider />
            </List>
        );
    }
    
    renderList = (links) => {
        if (!!links && links.length > 0) {      
            return links.map((link, index) =>{
                link.index = index+1;
                return (
                <LinkItem key={index} link={link} />
                )   
            } 
            );
        }
        else return [];
    }

}

export default LinkList;