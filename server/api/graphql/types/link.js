import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
    name : 'Link',
    fields : {
        _id : {
            type : new GraphQLNonNull(GraphQLID)
        },
        name : {
            type : GraphQLString
        },
        url : {
            type : GraphQLString
        },
        vote : {
            type : GraphQLInt
        },
        favorite: {
            type: GraphQLBoolean
        }
    }
});
