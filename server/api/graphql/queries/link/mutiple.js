import {
  GraphQLList
} from 'graphql';

import linkType from '../../types/link';
import LinkModel from '../../../models/link';

export default {
  type: new GraphQLList(linkType),
  args: {},
  resolve (root, params, options) {
    //Sort by favorite then by vote
    return LinkModel
      .find()
	  .sort({
	      favorite:-1,
	      vote: -1
	   })
      .exec();
  }
};
