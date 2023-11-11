"ue client";
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

const Modal = (props: any) => {
  const modalRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {ReactDOM.createPortal(
        <CSSTransition
          nodeRef={modalRef}
          in={props.show}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames={{
            enter: 'modal-enter',
            enterActive: 'modal-enter-active',
            exit: 'modal-exit',
            exitActive: 'modal-exit-active',
          }}
        >
          <div
            ref={modalRef}
            className={`modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-lg shadow-md z-50 md:w-2/3 ${props.className}`}
            style={props.style}
          >
            <header className={`w-full py-4 px-2 bg-[#5865F2] text-black rounded-tl-lg rounded-tr-lg ${props.headerClass}`}>
              <h2 className='m-2 text-white text-lg font-bold'>{props.header}</h2>
            </header>
            <form
              onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}
            >
              <div className={`p-4 py-2 ${props.contentClass}`}>{props.children}</div>
              <footer className={`p-4 py-2 ${props.footerClass}`}>{props.footer}</footer>
            </form>
          </div>
        </CSSTransition>,
        document.getElementById('modal-hook')!
      )}
    </>
  ) : null;
};

export default Modal;
