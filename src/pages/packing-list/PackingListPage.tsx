import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useState } from 'react';

import { Divider } from '@/pages/packing-list/components/Divider';
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
import { Spacing } from '@/shared/ui/spacing/Spacing';
import { DnDTree } from '@/widgets/packing-list/dnd-tree/DnDTree';
import { PackingListInfo } from '@/widgets/packing-list/packing-list-info/PackingListInfo';

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

const PackingListPage = () => {
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
        title: <PackingTypeToggleSwitch />,
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
      {!isEditMode && (
        <>
          <PackingListInfo />
          <Spacing gap={12} />
          <Divider />
        </>
      )}
      <Spacing gap={12} />
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

const PackingTypeToggleSwitch = () => {
  const [packingType, setPackingType] = useState<'alone' | 'together'>('alone');

  return (
    <RadioGroup.Root
      defaultValue={packingType}
      value={packingType}
      onValueChange={value => setPackingType(value as typeof packingType)}
    >
      <SwitchBackground>
        <RadioGroup.Item value="alone" asChild>
          <Option>혼자 패킹</Option>
        </RadioGroup.Item>
        <RadioGroup.Item value="together" asChild>
          <Option>함께 패킹</Option>
        </RadioGroup.Item>
        <ActiveSwitch active={packingType} />
      </SwitchBackground>
    </RadioGroup.Root>
  );
};

const SwitchBackground = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 16rem;
  height: 2.5rem;

  /* padding: 0.2rem; */

  font-size: 1.2rem;
  font-weight: 500;
  font-style: normal;

  /* line-height: 140%; */

  background: var(--gray-gray1, #f2f2f2);
  border-radius: 5px;
`;

const Option = styled.label`
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50%;
  height: 100%;

  font-size: 1.2rem;
  font-weight: 500;
  font-style: normal;
  letter-spacing: -0.24px;

  transition: color 0.2s;

  &[data-state='unchecked'] {
    cursor: pointer;

    color: var(--gray-gray3, #bcbcbc);
  }

  &[data-state='checked'] {
    color: var(--gray-white, #fff);
  }
`;

const ActiveSwitch = styled.div<{ active: 'alone' | 'together' }>`
  position: absolute;
  transform: ${({ active }) => (active === 'alone' ? 'translateX(-50%)' : 'translateX(50%)')};

  width: 7.8rem;
  height: 2.1rem;

  background: var(--gray-gray5, #535353);
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 15%);

  transition: transform 0.2s;
`;

export { PackingListPage };
