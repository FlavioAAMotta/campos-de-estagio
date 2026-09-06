import { useContext } from 'react';
import { PreviewContext } from '../contexts/PreviewContext.js';

export function usePreviewProfile() {
  const context = useContext(PreviewContext);

  if (!context) {
    throw new Error(
      'usePreviewProfile precisa estar dentro de PreviewProvider.',
    );
  }

  return context;
}
