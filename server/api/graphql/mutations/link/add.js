import {
  GraphQLNonNull,
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
    const linkModel = new LinkModel(params.data);

		if(!linkModel.name){
			throw new Error('Error no name for url');
		}
    const linkModelPost = await linkModel.save();

    if (!linkModelPost) {
      throw new Error('Error when mongo tried to add Link');
    }
    return true;
  }
};