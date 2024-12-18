/* eslint-disable no-param-reassign */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  type ChangeEvent,
  type ChangeEventHandler,
  cloneElement,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type RefObject,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { composeFunctions } from '@/shared/lib/compose-functions';
import { Stack } from '@/shared/ui/stack/Stack';

import DragIcon from './svg/drag-icon.svg';

const refCallback =
  <T extends HTMLElement>(onMount?: (node: T) => void, onUnmount?: (node: null) => void) =>
  (node: T | null) => {
    node ? onMount?.(node) : onUnmount?.(node);
  };

const Spacing = styled.div<{ gap: number }>`
  height: ${({ gap }) => `${gap}px`};
`;

const CardTitle = styled(Stack)`
  flex-shrink: 0;

  padding: 0 8px 0 12px;

  color: var(--s-color-neutral-contents-default, #23242a);

  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 142%; /* 19.88px */
`;

const EditButton = styled.button`
  width: 32px;
  height: 32px;
  margin-left: auto;

  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;

const CardBackground = styled(Stack)`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 4px 4px 4px 8px;

  border-radius: 12px;
  background: var(--s-color-neutral-surface-lightness, rgba(35, 36, 42, 0.05));

  transition: height 0.2s ease-in-out;

  &:hover {
    ${EditButton} {
      opacity: 1;
    }
  }
`;

const ToCBackground = styled(CardBackground)`
  height: 56px;
`;

const CoverTitleWrapper = styled(Stack)`
  width: 100%;
`;

const Test = styled.div`
  color: red;
`;

type TextFieldProps<T extends 'input' | 'textarea'> = {
  as?: T;
  legend?: string;
} & ComponentPropsWithoutRef<T>;

const OutlineCardCover = () => (
  <CardBackground>
    <CoverTitleWrapper alignItems="center" gap={12}>
      <CardTitle gap={8}>
        <div>1</div>
        <div>페이지</div>
      </CardTitle>
      <CoverTextField as="input" />
    </CoverTitleWrapper>
  </CardBackground>
);

const OutlineCardToC = () => (
  <ToCBackground>
    <CardTitle gap={8}>
      <div>2</div>
      <div>아래의 개요를 바탕으로 제작한 목차 페이지 </div>
    </CardTitle>
  </ToCBackground>
);

const OutlineBackground = styled(CardBackground)`
  width: 100%;
  max-height: 100%;

  padding: 12px 8px 8px 8px;
  height: fit-content;
`;

const OutlineHeader = styled(Stack)`
  width: 100%;
`;

const OutlineBody = styled(Stack)<{ editing: boolean }>`
  width: 100%;
  background-color: white;

  padding: 20px 12px 16px 12px;

  width: 100%;

  & > * {
    margin-bottom: 12px;
  }

  & > *:first-child,
  & > *:last-child {
    margin-bottom: 16px;
  }

  ${Test} {
    display: none;
  }

  ${({ editing }) =>
    !editing &&
    css`
      height: 180px;
      overflow-y: scroll;

      &:not(:has(${TextFieldPolymorphic}:not(:placeholder-shown))) {
        ${Test} {
          display: block;
        }

        *:not(${Test}) {
          display: none;
        }
      }
    `}
`;

const OutlineTitle = styled(CardTitle)`
  padding: 0;
`;

const OutlineCardOutline = () => {
  const [editing, setEditing] = useState(false);

  return (
    <OutlineBackground
      tabIndex={-1}
      direction="column"
      gap={4}
      onClick={() => {
        setEditing(true);
      }}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setEditing(false);
        }
      }}
    >
      <OutlineHeader alignItems="center" gap={8}>
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
          }}
          style={{
            width: 32,
            height: 32,
          }}
        >
          O
        </button>
        <OutlineTitle>3 페이지</OutlineTitle>
        <EditButton type="button">X</EditButton>
      </OutlineHeader>
      <OutlineBody direction="column" editing={editing}>
        {editing ? (
          <OutlineTitleTextFieldEditing
            legend="주요 내용"
            placeholder="이 페이지의 내용을 입력해주세요"
          />
        ) : (
          <OutlineTitleTextFieldReadOnly readOnly />
        )}
        <OutlineDetailTextField
          placeholder="세부 항목을 입력해주세요"
          index={1}
          value={11231}
          readOnly={!editing}
        />
        <OutlineDetailTextField
          placeholder="세부 항목을 입력해주세요"
          index={2}
          readOnly={!editing}
        />
        <Test>내용 없으면 페이지 자동 삭제~~</Test>
      </OutlineBody>
    </OutlineBackground>
  );
};

const adjustElementHeight = (node: HTMLInputElement | HTMLTextAreaElement) => {
  const rowCount = node.value.split(/\r\n|\r|\n/).length;

  node.style.height = `${rowCount * 18}px`;
  node.style.height = `${node.scrollHeight}px`;
  //   node.setAttribute('style', `${rowCount * 18}px`);
  //   node.setAttribute('style', `${node.scrollHeight}px`);

  //   node.style.cssText = `height: ${rowCount * 18}px !important`;
  //   node.style.cssText = `height: ${node.scrollHeight}px !important`;
};

const Fieldset = styled.fieldset<{ legend: boolean }>`
  height: auto;
  position: absolute;
  inset: ${({ legend }) => (legend ? '-5px' : '0')} 0 0;

  padding: 0 12px;
  margin: 0;

  border: 1px solid var(--c-input-color-border-enabled, rgba(88, 98, 118, 0.24));
  border-radius: 8px;

  opacity: 0;
  pointer-events: none;

  transition: opacity 0.2s ease-in-out, border 0.2s ease-in-out;
`;

const Legend = styled.legend`
  display: block;
  white-space: nowrap;
  float: unset;
  max-width: 0.01px;
  overflow: hidden;
  opacity: 0;

  transition: opacity 0.2s ease-in-out, max-width 0.2s ease-in-out;
`;

const LegendText = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 4px;

  color: var(--s-color-brand-primary-default, #21afbf);
  font-family: var(--b-fontFamily-body-default, 'Pretendard Variable');
  font-size: var(--b-fontSize-12, 12px);
  font-style: normal;
  font-weight: var(--b-fontWeight-medium, 500);
  line-height: var(--b-lineHeight-rem-12, 16px); /* 133.333% */
`;

const TextFieldRoot = styled.div`
  position: relative;

  // child 높이를 따르도록 제한
  display: flex;

  width: 100%;
`;

const TextFieldPolymorphic = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  border-radius: 8px;
  -webkit-tap-highlight-color: transparent;

  overflow: hidden;
  color: var(--c-input-color-contents-inputValue-enabled, #16181d);
  text-overflow: ellipsis;

  resize: none;

  transition: width 0.2s ease-in-out padding-left 0.2s ease-in-out, font-size 0.2s ease-in-out;

  &:disabled {
    background-color: transparent;
  }

  &:not(:read-only) {
    & + fieldset {
      opacity: 1;
    }

    &:focus {
      & + fieldset {
        border: 1px solid var(--c-input-color-border-focused, #26c7d9);

        & > legend {
          display: default;
          white-space: normal;
          float: none;
          overflow: visible;

          opacity: 1;
          max-width: 100%;
        }
      }
    }
  }
`;

const TextField = <T extends 'input' | 'textarea'>({
  as,
  legend,
  ...restProps
}: TextFieldProps<T>) => {
  const a = 3;

  return (
    <TextFieldRoot>
      {cloneElement(
        <TextFieldPolymorphic as={as} />,
        Object.assign(
          restProps,
          as !== 'input' && {
            ...restProps,
            ref: refCallback(adjustElementHeight),
            onChange: composeFunctions(
              restProps.onChange as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
              (e: ChangeEvent<HTMLElementTagNameMap[T]>) => {
                adjustElementHeight(e.currentTarget);
              },
            ),
          },
        ),
      )}

      <Fieldset legend={!!legend}>
        {legend && (
          <Legend>
            <LegendText>{legend}</LegendText>
          </Legend>
        )}
      </Fieldset>
    </TextFieldRoot>
  );
};

const CoverTextField = styled(TextField)`
  color: var(--s-color-neutral-contents-default, #23242a);

  height: 48px;
  padding: 11px 48px 11px 16px;

  /* b/typography/title/M */
  font-family: 'Pretendard Variable';
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 146%; /* 26.28px */
`;

const OutlineTitleTextFieldReadOnly = styled(TextField)`
  min-height: 26px;
  padding: 0;

  font-family: 'Pretendard Variable';
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 146%; /* 26.28px */
`;
const OutlineTitleTextFieldEditing = styled(TextField)`
  height: 48px;

  padding: 12px 18px;

  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 153%; /* 24.48px */
`;

const DetailTextField = styled(TextField)`
  height: 20px;
  padding: 0;

  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 142%; /* 19.88px */

  &:focus {
    color: var(--s-color-neutral-contents-default, #23242a);
  }

  &:not(:read-only) {
    height: 40px;
    padding: 10px 18px;

    font-family: 'Pretendard Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 146%; /* 20.44px */

    transition: height 0s;
  }
`;

const DetailTextFieldBullet = styled.div<{ index: number }>`
  position: relative;

  border-radius: 8px;
  flex-shrink: 0;

  width: 0px;

  color: var(--c-commonButton-color-contents-neutralLight-ghost-default, #70798f);
  text-align: center;
  /* c/commonButton/typography/S */
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 146%; /* 20.44px */

  transition: width 0.2s ease-in-out;

  &:has(+ * > ${DetailTextField}:read-only) {
    width: 16px;

    color: black;

    &::before {
      content: '•';
    }
  }

  &:has(+ * > ${DetailTextField}:not(:read-only)) {
    width: 32px;

    &:has(+ * > ${DetailTextField}:focus) {
      &::before {
        color: var(--c-input-color-border-focused, #26c7d9);
      }
    }

    &::before {
      content: '${({ index }) => index}';

      transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    }

    &:hover,
    &:active {
      height: 32px;

      &:has(+ * > ${DetailTextField}:focus) {
        background: var(--s-color-brand-primary-surface, rgba(33, 175, 191, 0.1));
      }

      &:before {
        content: url(${DragIcon});
      }
    }
  }
`;

const OutlineDetailTextFieldRoot = styled(Stack)`
  width: 100%;
  gap: 4px;

  &:has(${DetailTextField}:read-only:placeholder-shown) {
    display: none;
  }
`;

const OutlineDetailTextField = (props: TextFieldProps<'textarea'> & { index: number }) => (
  <OutlineDetailTextFieldRoot alignItems="center">
    <DetailTextFieldBullet index={props.index} />
    <DetailTextField {...props} />
  </OutlineDetailTextFieldRoot>
);

const Card = () => {
  const [show, setShow] = useState(true);

  const ref = useOnClickOutsideV2<HTMLDivElement, MouseEvent<HTMLDivElement>>(
    e => {
      e.currentTarget;
      console.log('callback');
      setShow(true);
    },
    { enabled: !show },
  );

  const ref2 = (n: HTMLDivElement) => {};

  return (
    <div
      ref={ref2}
      onClick={e => {
        const kk = e.currentTarget;
        console.log('onclick');
        setShow(false);
      }}
    >
      {show ? <div>show</div> : <input defaultValue="hi" />}
    </div>
  );
};

type Options<T> = {
  ref?: RefObject<T> | RefObject<T>[];
  events?: string[];
  enabled?: boolean;
};

export const useOnClickOutsideV2 = <
  T extends HTMLElement = HTMLElement,
  E extends SyntheticEvent<T> = SyntheticEvent<T>,
>(
  callback: (e: E) => void,
  { ref = [], events = ['click', 'touchstart'], enabled = true }: Options<T> = {},
) => {
  const [refs, setRefs] = useState<RefObject<T>[]>([ref].flat());
  const callbackRef = useRef(callback);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _ref = useCallback(
    refCallback((node: T) => setRefs([...refs, { current: node }])),
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      console.log(refs[0].current?.contains(e.target), e.target);
      if (refs.every(({ current }) => !current?.contains(e.target)) && enabled) {
        callbackRef.current(e);
      }
    };

    const removeEventListeners = () => {
      events.forEach(type => {
        document.removeEventListener(type, handler, true);
      });
    };

    events.forEach(type => {
      document.addEventListener(type, handler, true);
    });

    return removeEventListeners;
  }, [refs, enabled, ...events]);

  return _ref;
};
export { Card };
