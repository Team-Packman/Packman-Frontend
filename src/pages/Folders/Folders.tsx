import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { composeFunctions } from '@/shared/lib/compose-functions';
import { useTinyMemo } from '@/shared/stores/middlewares/useTinyMemo';
import {
  isAnyItemForDeletionSelectedSelector,
  usePackingList,
  usePackingListActions,
} from '@/shared/stores/packing-list';
import { AppScreen } from '@/shared/ui/app-screen/AppScreen';
import { BackArrow } from '@/shared/ui/back-arrow/BackArrow';
import { Button } from '@/shared/ui/button/Button';
import { FixedBottomCTA } from '@/shared/ui/fixed-bottom-cta/FixedBottomCTA';
import { DnDTree } from '@/widgets/packing-list/dnd-tree/DnDTree';

const ModeToggleButton = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
`;

const EditButton = styled(ModeToggleButton)();

const SaveButton = styled(ModeToggleButton)<{ isDirty?: boolean }>`
  ${({ isDirty }) => {
    if (isDirty) {
      return css`
        color: black;
      `;
    }
    return css`
      cursor: default;

      color: #ddd;
    `;
  }}
`;

const Folders = () => {
  const { isDirty, isEditMode } = usePackingList(
    useTinyMemo(({ isDirty, isEditMode }) => ({
      isDirty,
      isEditMode,
    })),
  );

  const {
    activateEditMode,
    deactivateEditMode,
    dirty,
    clean,
    deselectAllItemsForDeletion,
    deleteItems,
    revertTree,
  } = usePackingListActions();

  const cancelEditMode = composeFunctions(
    clean,
    deactivateEditMode,
    deselectAllItemsForDeletion,
    revertTree,
  );

  const saveChange = composeFunctions(clean, deactivateEditMode);

  const deleteSelectedItems = composeFunctions(dirty, deleteItems);

  const isItemForDeletionSelected = usePackingList(isAnyItemForDeletionSelectedSelector);

  return (
    <AppScreen
      appBar={{
        left: <BackArrow onClick={cancelEditMode} disableRouting={isEditMode} />,
        right: isEditMode ? (
          <SaveButton type="button" isDirty={isDirty} onClick={saveChange} disabled={!isDirty}>
            저장
          </SaveButton>
        ) : (
          <EditButton type="button" onClick={activateEditMode}>
            편집
          </EditButton>
        ),
      }}
    >
      <DnDTree />
      {isItemForDeletionSelected && (
        <FixedBottomCTA.TypeA>
          <Button variant="contained" onClick={deleteSelectedItems}>
            선택 삭제
          </Button>
        </FixedBottomCTA.TypeA>
      )}
    </AppScreen>
  );
};

export { Folders };
