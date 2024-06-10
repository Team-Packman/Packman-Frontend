import type { RenderItemParams, TreeData } from '@atlaskit/tree';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';

import { Carat } from '@/entities/packing-list/carat/ui/Carat';
import { DeleteCheckbox } from '@/entities/packing-list/delete-checkbox/DeleteCheckbox';
import { PackCheckbox } from '@/entities/packing-list/pack-checkbox/ui/PackCheckbox';
import HamburgerIcon from '@/shared/assets/images/svg/hamburger-icon.svg';
import { isEditModeSelector, usePackingList } from '@/shared/stores/packing-list';
import { Stack } from '@/shared/ui/stack/Stack';

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

const PackCount = styled.div`
  flex-shrink: 0;

  font-size: 1.4rem;
  font-weight: 600;
  line-height: 140%;
  color: #bcbcbc;
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

const CategoryRoot = styled(ItemRoot)<{
  isEditMode: boolean;
  hasChildren: boolean;
}>`
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

type DnDItemProps = RenderItemParams & { tree: TreeData };

/** @TODO zod - item validation */
const DnDItem = (props: DnDItemProps) => {
  const isCategory = props.item.data.type === 'category';

  return isCategory ? <Category {...props} /> : <Pack {...props} />;
};

const Category = (props: DnDItemProps) => {
  const { item, onExpand, onCollapse, provided, snapshot } = props;
  const isEditMode = usePackingList(isEditModeSelector);

  const hasChildren = item.children && item.children.length > 0;

  const toggle = item.isExpanded ? onCollapse : onExpand;

  const expand = !isEditMode ? () => toggle(item.id) : () => {};

  /** @description 빈 카테고리에 최초로 아이템을 삽입하는 경우 expand */
  useLayoutEffect(() => {
    if (!item.isExpanded && item.hasChildren) {
      onExpand(item.id);
    }
  }, [item.hasChildren]);

  return (
    <>
      <CategoryRoot
        {...provided.draggableProps}
        ref={provided.innerRef}
        className={item.data.type}
        isDragging={snapshot.isDragging}
        isEditMode={isEditMode}
        hasChildren={hasChildren}
        onClick={expand}
      >
        <ItemContainer>
          <ItemLeft gap={9}>
            {isEditMode && <DeleteCheckbox />}
            {item.data.name}
          </ItemLeft>
          <ItemRight gap={12}>
            {isEditMode ? (
              <img src={HamburgerIcon} alt="짐 재정렬 아이콘" {...provided.dragHandleProps} />
            ) : (
              <>
                <PackCount>
                  {item.data.checkedCnt}/{item.data.totalCnt}
                </PackCount>
                {hasChildren && <Carat isExpanded={item.isExpanded} />}
              </>
            )}
          </ItemRight>
        </ItemContainer>
      </CategoryRoot>
      {!hasChildren && !isEditMode && <AddPackButton />}
    </>
  );
};
const Pack = (props: DnDItemProps) => {
  const { item, provided, snapshot, tree } = props;

  const isEditMode = usePackingList(isEditModeSelector);

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
            {isEditMode ? <DeleteCheckbox /> : <PackCheckbox />}
            {item.data.name}
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
