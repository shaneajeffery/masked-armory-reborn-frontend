'use client';

import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { useMemo, useState, useCallback, ReactNode } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';

import { SettingsContext } from './settings-context';

const STORAGE_KEY = 'settings';

SettingsProvider.propTypes = {
  children: PropTypes.node,
  defaultSettings: PropTypes.object,
};

interface Props {
  children: ReactNode;
  defaultSettings: Record<string, any>;
}

export function SettingsProvider({ children, defaultSettings }: Props) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

  const [openDrawer, setOpenDrawer] = useState(false);

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      canReset,
      onReset: reset,
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [reset, update, state, canReset, openDrawer, onCloseDrawer, onToggleDrawer]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
