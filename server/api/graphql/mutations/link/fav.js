import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import LinkInput from '../../types/link-input';
import LinkModel from '../../../models/link';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(LinkInput)
    }
  },
  async resolve (root, params, options) {
    const updatedModel = await LinkModel
    .findOne({ '_id': params.data._id }, function (err, link){
      link.favorite = params.data.favorite;
      link.save();
    }).exec();

    if (!updatedModel) {
      throw new Error('Error when updating model');
    }
    return true;
  }
};
