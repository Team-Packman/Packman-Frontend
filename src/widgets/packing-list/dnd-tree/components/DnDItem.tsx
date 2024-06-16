import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';

import { Carat } from '@/entities/packing-list/carat/ui/Carat';
import { DeleteCheckbox } from '@/entities/packing-list/delete-checkbox/DeleteCheckbox';
import { PackCheckbox } from '@/entities/packing-list/pack-checkbox/ui/PackCheckbox';
import HamburgerIcon from '@/shared/assets/images/svg/hamburger-icon.svg';
import {
  isEditModeSelector,
  selectedItemsForDeletionSelector,
  usePackingList,
  usePackingListActions,
} from '@/shared/stores/packing-list';
import { Stack } from '@/shared/ui/stack/Stack';

import { Editable } from '../../components/Editable';
import { packingListTreeCategorySchema, packingListTreePackSchema } from '../model/dnd-item-schema';
import type {
  RenderPackingListCategoryParams,
  RenderPackingListItemParams,
  RenderPackingListPackParams,
} from '../types/client';
import { AddPackButton } from './AddPackButton';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: 100%;
`;

const ItemLeft = styled(Stack)();

const ItemRight = styled(Stack)`
  align-items: center;

  margin-left: auto;
`;

const PackCount = styled.div<{
  isAllPacked: boolean;
}>`
  flex-shrink: 0;

  font-size: 1.4rem;
  font-weight: 600;
  line-height: 140%;
  color: ${({ isAllPacked }) => (isAllPacked ? '#ff307b' : '#bcbcbc')};
  letter-spacing: -0.28px;
`;

const ItemRoot = styled.article<{ isDragging: boolean }>`
  width: 100%;

  font-size: 1.4rem;
  color: #121212;
  letter-spacing: -0.28px;

  &:hover {
    background: #f7f8f9;
  }

  ${({ isDragging }) =>
    isDragging &&
    css`
      & > * {
        opacity: 0.25;
      }
    `}
`;

const CategoryRoot = styled(ItemRoot)<{ isEditMode: boolean; hasChildren: boolean }>`
  margin-top: 1.2rem;

  font-weight: 600;

  background: var(--gray-gray1, #f2f2f2);
  border: 1px solid #f2f2f2;
  border-radius: 8px 8px 0 0;

  &:not(:has(+ .pack), :has(+ .add-pack-button)) {
    border-radius: 8px;
  }

  ${({ isDragging }) =>
    isDragging &&
    css`
      border: 1px solid #f7f8f9;
      border-radius: 8px;
    `}

  ${({ isEditMode, hasChildren }) =>
    !isEditMode &&
    hasChildren &&
    css`
      cursor: pointer;
    `}
`;

const PackRoot = styled(ItemRoot)`
  font-weight: 500;

  border-right: 1px solid #f7f8f9;
  border-left: 1px solid #f7f8f9;

  ${({ isDragging }) => {
    if (isDragging) {
      return css`
        border: 1px solid #f7f8f9;
        border-radius: 8px;
      `;
    }

    /**  @description 드래그 중 마지막 아이템 */
    /**  @description 각 카테고리의 마지막 아이템 */
    /**  @description 드래그 하지 않을 때 마지막 아이템 */
    return css`
      &:has(+ [data-react-beautiful-dnd-placeholder]),
      &:has(+ .category),
      &:last-child {
        border-bottom: 1px solid #f7f8f9;
        border-radius: 0 0 8px 8px;
      }
    `;
  }}
`;

type DnDItemProps = RenderPackingListItemParams;

/** @TODO hook 분리  */
/** @TODO useTinyMemo  */
/** @TODO dnd + checkbox 유한상태머신 고려  */
/** @TODO edit mode 분리  */
/** @TODO selector 컨벤션 통일  */
/** @TODO 전체 삭제 한 경우 UI 대응  */
const DnDItem = (props: DnDItemProps) => {
  const { success: isCategory, data: categoryItem } = packingListTreeCategorySchema.safeParse(
    props.item,
  );
  const { success: isPack, data: packItem } = packingListTreePackSchema.safeParse(props.item);

  if (isCategory) {
    return <Category {...{ ...props, item: categoryItem }} />;
  }

  if (isPack) {
    return <Pack {...{ ...props, item: packItem }} />;
  }

  throw new Error('Invalid dnd item');
};

type DnDCategoryProps = RenderPackingListCategoryParams;

const Category = (props: DnDCategoryProps) => {
  const { item, onExpand, onCollapse, provided, snapshot } = props;

  const { isEditMode, selectedItemsForDeletion, tree } = usePackingList(
    ({ isEditMode, selectedItemsForDeletion, tree }) => ({
      isEditMode,
      selectedItemsForDeletion,
      tree,
    }),
  );

  const { selectItemForDeletion, deselectItemForDeletion } = usePackingListActions();

  const isAllPacked = item.data.totalCnt === item.data.checkedCnt;

  const toggleExpansion = item.isExpanded ? onCollapse : onExpand;

  const toggleExpansionOnPackMode = !isEditMode ? () => toggleExpansion(item.id) : () => {};

  const selectAllItemsForDeletion = () => {
    selectItemForDeletion(item.id);
    tree.items[item.id].children.forEach(selectItemForDeletion);
  };

  const deselectAllItemsForDeletion = () => {
    deselectItemForDeletion(item.id);
    tree.items[item.id].children.forEach(deselectItemForDeletion);
  };

  const toggleAllSelectingDeletion = (checked: boolean) =>
    (checked ? selectAllItemsForDeletion : deselectAllItemsForDeletion)();

  /** @description 빈 카테고리에 최초로 아이템을 삽입하는 경우 expand */
  useLayoutEffect(() => {
    if (!item.isExpanded && item.hasChildren) {
      onExpand(item.id);
    }
  }, [item.hasChildren]);

  useLayoutEffect(() => {
    const allChildItemsSelected = item.children.every(packId =>
      selectedItemsForDeletion.has(packId),
    );

    if (!item.hasChildren) return;

    if (!selectedItemsForDeletion.has(item.id) && allChildItemsSelected) {
      selectItemForDeletion(item.id);
    }

    if (selectedItemsForDeletion.has(item.id) && !allChildItemsSelected) {
      deselectItemForDeletion(item.id);
    }
  });

  return (
    <>
      <CategoryRoot
        {...provided.draggableProps}
        ref={provided.innerRef}
        className={item.data.type}
        isDragging={snapshot.isDragging}
        isEditMode={isEditMode}
        hasChildren={item.hasChildren}
      >
        <ItemContainer>
          <ItemLeft gap={9}>
            {isEditMode && (
              <DeleteCheckbox
                checked={selectedItemsForDeletion.has(item.id)}
                onCheckedChange={toggleAllSelectingDeletion}
              />
            )}
            <Editable enabled={!isEditMode}>{item.data.name}</Editable>
          </ItemLeft>
          <ItemRight gap={12}>
            {isEditMode ? (
              <img src={HamburgerIcon} alt="짐 재정렬 아이콘" {...provided.dragHandleProps} />
            ) : (
              <>
                <PackCount isAllPacked={isAllPacked}>
                  {item.data.checkedCnt}/{item.data.totalCnt}
                </PackCount>
                {item.hasChildren && (
                  <Carat isExpanded={item.isExpanded} onClick={toggleExpansionOnPackMode} />
                )}
              </>
            )}
          </ItemRight>
        </ItemContainer>
      </CategoryRoot>
      {!item.hasChildren && !isEditMode && <AddPackButton />}
    </>
  );
};

type DnDPackProps = RenderPackingListPackParams;

const Pack = (props: DnDPackProps) => {
  const { item, provided, snapshot } = props;

  const isEditMode = usePackingList(isEditModeSelector);
  const tree = usePackingList(state => state.tree);

  const selectedItemsForDeletion = usePackingList(selectedItemsForDeletionSelector);

  const { selectItemForDeletion, deselectItemForDeletion } = usePackingListActions();

  const toggleSelectingForDeletion = (checked: boolean) =>
    (checked ? selectItemForDeletion : deselectItemForDeletion)(item.id);

  const isLastPack = tree.items[item.data.parent].children.at(-1) === item.id;

  return (
    <>
      <PackRoot
        {...provided.draggableProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        className={`${item.data.type} parent-${item.data.parent}`}
      >
        <ItemContainer>
          <ItemLeft gap={9}>
            {isEditMode ? (
              <DeleteCheckbox
                checked={selectedItemsForDeletion.has(item.id)}
                onCheckedChange={toggleSelectingForDeletion}
              />
            ) : (
              <PackCheckbox />
            )}
            <Editable enabled={!isEditMode}>{item.data.name}</Editable>
          </ItemLeft>
          <ItemRight gap={12}>
            {isEditMode && (
              <img src={HamburgerIcon} alt="짐 재정렬 아이콘" {...provided.dragHandleProps} />
            )}
          </ItemRight>
        </ItemContainer>
      </PackRoot>
      {isLastPack && !isEditMode && <AddPackButton />}
    </>
  );
};

export { DnDItem };
