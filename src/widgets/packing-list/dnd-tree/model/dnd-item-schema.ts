import z from 'zod';

import { CATEGORY_NAME, PACK_NAME, ROOT_ID } from '../constants/dnd-tree';

const rootIdSchema = z.literal(ROOT_ID);

const itemIdSchema = z.union([z.string().regex(/^(category|pack)-[0-9]+$/), rootIdSchema]);

const categoryIdSchema = z.string().regex(/^(category)-[0-9]+$/);

const packIdSchema = z.string().regex(/^(pack)-[0-9]+$/);

const packingListTreeItemBaseSchema = z.object({
  isExpanded: z.boolean(),
  hasChildren: z.boolean(),
});

const packingListTreeItemRootSchema = packingListTreeItemBaseSchema.extend({
  id: rootIdSchema,
  children: z.array(categoryIdSchema),
  data: z.record(z.string(), z.unknown()),
});

const packingListTreeCategorySchema = packingListTreeItemBaseSchema.extend({
  id: categoryIdSchema,
  children: z.array(packIdSchema),
  data: z.object({
    id: categoryIdSchema,
    name: z.string(),
    parent: rootIdSchema,
    type: z.literal(CATEGORY_NAME),
    totalCnt: z.number().min(0),
    checkedCnt: z.number().min(0),
  }),
});

const packingListTreePackSchema = packingListTreeItemBaseSchema.extend({
  id: packIdSchema,
  children: z.array(packIdSchema),
  data: z.object({
    id: packIdSchema,
    name: z.string(),
    parent: categoryIdSchema,
    type: z.literal(PACK_NAME),
    isChecked: z.boolean(),
  }),
});

const packingListTreeItemSchema = z.union([
  packingListTreeItemRootSchema,
  packingListTreeCategorySchema,
  packingListTreePackSchema,
]);

const packingListTreeSchema = z.object({
  rootId: rootIdSchema,
  items: z.record(itemIdSchema, packingListTreeItemSchema),
});

const renderPackingListItemPartialParams = z.object({
  item: packingListTreeItemSchema,
  onExpand: z.function().args(itemIdSchema).returns(z.void()),
  onCollapse: z.function().args(itemIdSchema).returns(z.void()),
});

export {
  itemIdSchema,
  packingListTreeCategorySchema,
  packingListTreeItemSchema,
  packingListTreePackSchema,
  packingListTreeSchema,
  renderPackingListItemPartialParams,
};
