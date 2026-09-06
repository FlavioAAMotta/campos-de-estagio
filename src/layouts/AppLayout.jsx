import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { navigation, routes } from '../constants/routes.js';
import { usePreviewProfile } from '../hooks/usePreviewProfile.js';
import Button from '../components/ui/Button.jsx';
import Sidebar from './Sidebar.jsx';

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { profile } = usePreviewProfile();
  const group = navigation.find(({ items }) =>
    items.some(({ to }) => pathname === to || pathname.startsWith(`${to}/`)),
  );
  const item = group?.items.find(
    ({ to }) => pathname === to || pathname.startsWith(`${to}/`),
  );
  const title =
    pathname === routes.campoExemplo
      ? 'Ficha do Campo'
      : pathname === routes.preceptorExemplo
        ? 'Ficha do Preceptor'
        : item?.label;

  return (
    <div className={`app-layout${menuOpen ? ' menu-open' : ''}`}>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <Sidebar onNavigate={() => setMenuOpen(false)} />
      <div className="app-layout__main">
        <header className="app-header">
          <Button
            variant="secondary"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Fechar menu' : 'Abrir menu'}
          </Button>
          <div>
            <span className="eyebrow">{group?.title}</span>
            <h1>{title}</h1>
          </div>
          <span className="badge profile-badge">{profile}</span>
        </header>
        <div className="preview-banner">
          Prévia do projeto · Os dados e as ações estarão disponíveis após a
          integração.
        </div>
        <main id="main-content" className="page-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
