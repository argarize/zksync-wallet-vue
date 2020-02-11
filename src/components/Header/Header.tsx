import React, { useCallback, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import { useRootData } from '../../hooks/useRootData';

import { HEADER_ITEMS } from '../../constants/header';

import Modal from '../Modal/Modal';

import './Header.scss';

const Header: React.FC = (): JSX.Element => {
  const { ethId, path, setModal, setPath, zkWallet } = useRootData(({ ethId, path, setModal, setPath, zkWallet }) => ({
    ethId: ethId.get(),
    path: path.get(),
    setModal,
    setPath,
    zkWallet: zkWallet.get(),
  }));

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    inputRef.current!.select();
    document.execCommand('copy');
  };

  const handleLogOut = useCallback(() => {
    window.location.pathname = '/';
  }, []);

  useEffect(() => console.log(path));

  return (
    <div className="menu-wrapper">
      <div className="menu-top">
        <Link className="menu-logo" to="/"></Link>
        {zkWallet?.address() && (
          <>
            <button type="button" className="menu-wallet" onClick={() => setModal('wallet')}>
              <p>{ethId}</p>
              <img src="../../images/randomImage.png" alt="wallet" />
            </button>
            <Modal visible={false} background={true} classSpecifier="wallet" cancelAction={() => null}>
              <div className="wallet-title">
                {zkWallet?.address().replace(zkWallet?.address().slice(6, zkWallet?.address().length - 3), '...')}
              </div>
              <div className="copy-block">
                <input
                  onChange={() => console.log(null)}
                  className="copy-block-input"
                  value={zkWallet?.address()}
                  ref={inputRef}
                />
                <p>{zkWallet.address()}</p>
                <button className="copy-block-button" onClick={handleCopy}></button>
              </div>
              <div className="horizontal-line"></div>
              <div className="wallet-buttons">
                <button>
                  <span className="icon-qr"></span>Show QR code
                </button>
                <div className="horizontal-line"></div>
                <button>
                  <span className="icon-edit"></span>Rename wallet
                </button>
                <div className="horizontal-line"></div>
                <button onClick={() => handleLogOut()}>
                  <span className="icon-disconnect"></span>Disconnect wallet
                </button>
                <div className="horizontal-line"></div>
              </div>
            </Modal>
          </>
        )}
      </div>
      <div className="menu-routes">
        {zkWallet?.address() &&
          HEADER_ITEMS.map(({ title, link }) => (
            <div className="menu-route-wrapper" key={title}>
              <Link
                onClick={() => setPath(window?.location.pathname)}
                className={`menu-route ${link === path ? 'active' : ''}`}
                to={link}
              >
                {title}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Header;