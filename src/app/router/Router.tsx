import { AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import { Card } from '@/pages/Card';
import { CreatePackingListPage } from '@/pages/create-packing-list/CreatePackingListPage';
import ManageMembers from '@/pages/manage-members/ManageMembers';
import { NotFound } from '@/pages/not-found';
import { PackingListPage } from '@/pages/packing-list';

import { PATH } from '../../shared/router/routes';

const register = () => {
  let composition = false;

  return {
    onCompositionStart: (e: React.CompositionEvent<HTMLTextAreaElement>) => {
      composition = true;
    },
    onCompositionEnd: (e: React.CompositionEvent<HTMLTextAreaElement>) => {
      composition = true;
    },
    onCompositionUpdate: (e: React.CompositionEvent<HTMLTextAreaElement>) => {
      composition = true;
    },
    onInput: (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (composition) return;
      if (e.currentTarget.value.length > 10) {
        e.currentTarget.value = e.currentTarget.value.slice(0, 10);
      }
    },
  };
};

const AAA = ({ as }: { as: ReactNode }) => {
  console.log('aa');
};

const BBB = () => {
  console.log('BBB');

  return <div>BBB</div>;
};
const Test = () => (
  // const [value, setValue] = useState('');

  <>
    <textarea
      // value={value}
      // maxLength={10}
      style={{ fontSize: 20 }}
      // onKeyDown={e => {
      //   console.log('e :>> ', e);
      //   if (
      //     'inputType' in e.nativeEvent &&
      //     typeof e.nativeEvent.inputType === 'string' &&
      //     e.nativeEvent.inputType.startsWith('insert') &&
      //     e.currentTarget.value.length > 10
      //   ) {
      //     console.log('e.nativeEvent :>> ', e.nativeEvent.inputType);
      //     e.preventDefault();
      //   }
      // }}
      onChange={e => {
        // console.log('e.currentTarget.value :>> ', e.currentTarget.value);
        // if (e.currentTarget.value.length <= 10) {
        //   // e.currentTarget.innerText = e.currentTarget.innerText.slice(0, 10);
        //   e.currentTarget.value = e.currentTarget.value.slice(0, 10);
        // }
      }}
      onBeforeInput={e => {
        const length = e.currentTarget.value.length + 1;

        if (length > 10) {
          console.log('e.currentTarget.value :>> ', e.currentTarget.value);
          e.currentTarget.value = e.currentTarget.value.slice(0, 10);
        }
        // console.log('e.currentTarget.value :>> ', e.currentTarget.value);
        // console.log('before input');
        // console.log(e.nativeEvent.type);
        // console.log('e.currentTarget.value :>> ', e.currentTarget.value);
        // if (e.currentTarget.value.length > 10) {
        // e.currentTarget.innerText = e.currentTarget.innerText.slice(0, 10);
        // e.currentTarget.value = e.currentTarget.value.slice(0, 10);
        // }
      }}
      onKeyDown={e => {
        // console.log('e.currentTarget.value :>> ', e.currentTarget.value);
        // console.log('e.currentTarget.value.length :>> ', e.currentTarget.value.length);

        if (e.currentTarget.value.length > 10) {
          // e.preventDefault();
        }
        // console.dir(e.currentTarget);
      }}
      onInput={e => {
        // console.dir(e);
        // console.log('e.currentTarget.value :>> ', e.currentTarget.value);
        if (e.currentTarget.value.length > 10) {
          // e.currentTarget.innerText = e.currentTarget.innerText.slice(0, 10);
          // e.currentTarget.value = e.currentTarget.value.slice(0, 10);
        }

        // setValue(e.currentTarget.value);
      }}
    >
      {/* zz */}
      {/* {value} */}
    </textarea>
    <p>hi</p>
  </>
);
const AnimatePresenceRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path={PATH.PACKING_LIST} element={<PackingListPage />} />
        <Route path={PATH.CREATE_PACKING_LIST} element={<CreatePackingListPage />} />
        <Route path={PATH.MANAGE_MEMBERS} element={<ManageMembers />} />
        <Route path="test" element={<Test />} />
        <Route path="card" element={<Card />} />
        <Route path={PATH.EXCEPTION} element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const Router = () => (
  <BrowserRouter>
    <AnimatePresenceRoutes />
  </BrowserRouter>
);

export { Router };
