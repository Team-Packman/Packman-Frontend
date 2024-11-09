import styled from '@emotion/styled';

import {
  isAllItemForDeletionSelectedSelector,
  isAnyItemForDeletionSelectedSelector,
  isEditModeSelector,
  selectedItemForDeletionCountSelector,
  usePackingList,
  usePackingListActions,
} from '@/shared/stores/packing-list';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

const EditModeRoot = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  font-size: 1.4rem;
  font-weight: 600;
  font-style: normal;
  color: #535353;
  letter-spacing: -0.28px;
`;

const EditStatus = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const SelectAllText = styled.div`
  cursor: pointer;

  padding: 0.4rem;

  font-size: 1.4rem;
  font-weight: 600;
  font-style: normal;
  line-height: 140%;
  color: #121212;
  text-align: center;
  letter-spacing: -0.28px;
`;

const AddCategoryButton = styled.button`
  padding: 0.4rem;

  font-size: 1.4rem;
  font-weight: 600;
  font-style: normal;
  line-height: 140%;
  color: var(--gray-gray5, #535353);
  text-align: center;
  letter-spacing: -0.28px;
`;

const PackModeRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PeepSuppliesButton = styled.button`
  padding: 0.4rem;

  font-size: 1.4rem;
  font-weight: 600;
  font-style: normal;
  line-height: 140%;
  color: var(--gray-gray5, #535353);
  text-align: center;
  letter-spacing: -0.28px;
`;

const DnDTreeController = () => {
  const isEditMode = usePackingList(isEditModeSelector);

  return isEditMode ? <EditModeController /> : <PackModeController />;
};
const EditModeController = () => {
  const isItemForDeletionSelected = usePackingList(isAnyItemForDeletionSelectedSelector);
  const isAllItemForDeletionSelected = usePackingList(isAllItemForDeletionSelectedSelector);
  const selectedItemForDeletionCount = usePackingList(selectedItemForDeletionCountSelector);

  const { selectAllItemsForDeletion, deselectAllItemsForDeletion } = usePackingListActions();

  return (
    <EditModeRoot>
      <Checkbox.Root
        checked={isAllItemForDeletionSelected}
        onCheckedChange={checked =>
          checked ? selectAllItemsForDeletion() : deselectAllItemsForDeletion()
        }
      >
        <SelectAllText>전체 {isAllItemForDeletionSelected ? '해제' : '선택'}</SelectAllText>
      </Checkbox.Root>
      <EditStatus>
        {isItemForDeletionSelected
          ? `${selectedItemForDeletionCount}개 항목 선택됨`
          : '삭제할 항목을 모두 선택해주세요'}
      </EditStatus>
    </EditModeRoot>
  );
};

const PackModeController = () => (
  <PackModeRoot>
    <AddCategoryButton type="button">카테고리 추가</AddCategoryButton>
    <PeepSuppliesButton type="button">준비물 엿보기</PeepSuppliesButton>
  </PackModeRoot>
);

export { DnDTreeController };
