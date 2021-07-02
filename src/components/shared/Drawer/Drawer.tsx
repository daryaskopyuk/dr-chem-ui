import { FunctionComponent, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';

import styles from './Drawer.module.scss';

type PropsType = {
  isOpen: boolean;
  children: JSX.Element[] | JSX.Element;
  onClose: Function;
};

const Drawer: FunctionComponent<PropsType> = ({
  isOpen,
  children,
  onClose,
}: PropsType) => {
  const navContainerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: any) => {
      if (!isOpen || navContainerRef?.current?.contains(e.target)) {
        return;
      }

      onClose(!isOpen);
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return (
    <div className={classNames(styles.container, { [styles.closed]: !isOpen })}>
      <div className={styles.wrapper}>
        <section className={styles.section}>
          <div className={styles.innerContainer}>
            <div
              className={classNames(
                styles.buttonWrapper,
                isOpen ? styles.show : styles.hide
              )}
            >
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => onClose(!isOpen)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div
              className={classNames(
                styles.navContainer,
                isOpen ? styles.open : styles.closed
              )}
              ref={navContainerRef}
            >
              <div className={styles.contentWrapper}>{children}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Drawer;
