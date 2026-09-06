import { useState } from 'react';
import { profiles } from '../constants/preview.js';
import { PreviewContext } from './PreviewContext.js';

export default function PreviewProvider({ children }) {
  const [profile, setProfile] = useState(profiles[0]);

  return (
    <PreviewContext.Provider value={{ profile, setProfile }}>
      {children}
    </PreviewContext.Provider>
  );
}
