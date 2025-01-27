'use client';

import { useEffect } from 'react';
import { updateAuthExpiration } from './updateAuthExpiration';

export const AuthRefresh = () => {
  useEffect(() => {
    void updateAuthExpiration();
  }, []);

  return null;
};
