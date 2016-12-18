import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'LinkInput',
  fields: {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    url: {type: GraphQLString},
    vote: {type: GraphQLInt},
    favorite: {type: GraphQLBoolean}
  }
});