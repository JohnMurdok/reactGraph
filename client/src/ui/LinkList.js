import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {yellow500} from 'material-ui/styles/colors';
import React, { Component, Proptypes } from 'react';
import LinkItem from "./LinkItem";

function renderList(links) {
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

class LinkList extends Component {
    render() {
        const links = renderList(this.props.links);
        const styleList = {
            position:"relative",
            width:"50%",
            "maxHeight":"100%",
            "marginLeft":"25%",
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
}

export default LinkList;