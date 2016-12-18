import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import linkType from '../../types/link';
import getProjection from '../../get-projection';
import LinkModel from '../../../models/link';

export default {
  type: linkType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return LinkModel
      .findById(params.id)
      .select(projection)
      .exec();
  },
  reject (root, params, err){
	  console.log(root,params,err);
  }
};
