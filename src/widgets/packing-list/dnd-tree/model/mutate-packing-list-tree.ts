import { mutateTree } from '@atlaskit/tree';

import { packingListTreeSchema } from './dnd-item-schema';

const mutatePackingListTree = (...args: Parameters<typeof mutateTree>) =>
  packingListTreeSchema.parse(mutateTree(...args));

export { mutatePackingListTree };
