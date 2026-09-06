import { NavLink, Link } from 'react-router';
import logo from '../assets/images/logo-faminas-white.png';
import { navigation, routes } from '../constants/routes.js';
import { usePreviewProfile } from '../hooks/usePreviewProfile.js';

export default function Sidebar({ onNavigate }) {
  const { profile } = usePreviewProfile();

  return (
    <aside className="sidebar" id="main-menu">
      <Link to={routes.painel} className="sidebar__brand" onClick={onNavigate}>
        <img src={logo} alt="FAMINAS" />
        <span>Campos de Estágio</span>
      </Link>
      <nav aria-label="Navegação principal">
        {navigation.map((group) => (
          <div className="sidebar__group" key={group.title}>
            <p>{group.title}</p>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar__link${isActive ? ' is-active' : ''}`
                }
                onClick={onNavigate}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar__footer">
        <div>
          <strong>{profile}</strong>
          <span>Perfil de demonstração</span>
        </div>
        <Link to={routes.login} onClick={onNavigate}>
          Voltar ao início
        </Link>
      </div>
    </aside>
  );
}
