type Common = {
  id: number;
  name: string;
  parent: number | null;
  type: 'category' | 'pack';
};

type Category = {
  totalCnt: number;
  checkedCnt: number;
} & Common;

type Pack = {
  isChecked: boolean;
} & Common;

const categories: Category[] = [
  {
    id: 11,
    name: '기본',
    totalCnt: 4,
    checkedCnt: 1,
    type: 'category',
    parent: null,
  },
  {
    id: 12,
    name: '전자기기',
    totalCnt: 4,
    checkedCnt: 2,
    type: 'category',
    parent: null,
  },
];

const packs: Pack[] = [
  {
    id: 1,
    name: '맥북',
    isChecked: true,
    parent: 11,
    type: 'pack',
  },
  {
    id: 2,
    name: '아이폰',
    isChecked: false,
    parent: 11,
    type: 'pack',
  },
];

export { categories, packs };
