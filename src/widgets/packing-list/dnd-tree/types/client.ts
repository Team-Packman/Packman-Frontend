import type { RenderItemParams } from '@atlaskit/tree/dist/types/components/TreeItem/TreeItem-types';
import type z from 'zod';

import type { Merge } from '@/shared/types/utility';

import type {
  packingListTreeCategorySchema,
  packingListTreeItemSchema,
  packingListTreePackSchema,
  packingListTreeSchema,
  renderPackingListItemPartialParams,
} from '../model/dnd-item-schema';

type PackingListTreeItem = z.infer<typeof packingListTreeItemSchema>;

type PackingListTree = z.infer<typeof packingListTreeSchema>;

type RenderPackingListItemParams = Merge<
  RenderItemParams,
  z.infer<typeof renderPackingListItemPartialParams>
>;

type RenderPackingListCategoryParams = Merge<
  RenderPackingListItemParams,
  { item: z.infer<typeof packingListTreeCategorySchema> }
>;

type RenderPackingListPackParams = Merge<
  RenderPackingListItemParams,
  { item: z.infer<typeof packingListTreePackSchema> }
>;

export type {
  PackingListTree,
  PackingListTreeItem,
  RenderPackingListCategoryParams,
  RenderPackingListItemParams,
  RenderPackingListPackParams,
};
