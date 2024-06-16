import styled from '@emotion/styled';

const Root = styled.div`
  width: 100%;
  height: 4.3rem;
  padding: 0.8rem 1.2rem !important;

  border: 1px solid #f7f8f9;
  border-top: none;
  border-radius: 0 0 8px 8px;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;

  font-size: 2rem;
  color: #909090;

  border: 1px dashed var(--gray-gray2, #ddd);
  border-radius: 4px;

  &:hover {
    background: #f7f8f9;
  }
`;

const AddPackButton = () => (
  <Root className="add-pack-button">
    <Button type="button">﹢</Button>
  </Root>
);

export { AddPackButton };
