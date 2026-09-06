import { useNavigate } from 'react-router';
import logo from '../../assets/images/logo-faminas-white.png';
import Button from '../../components/ui/Button.jsx';
import { Field } from '../../components/ui/Field.jsx';
import { profiles } from '../../constants/preview.js';
import { routes } from '../../constants/routes.js';
import { usePreviewProfile } from '../../hooks/usePreviewProfile.js';

export default function LoginPage() {
  const { profile, setProfile } = usePreviewProfile();
  const navigate = useNavigate();

  return (
    <main className="login-page">
      <section className="login-brand">
        <img src={logo} alt="FAMINAS" />
        <div className="stack">
          <span className="eyebrow">Coordenação de Medicina</span>
          <h1>Gestão de Campos de Estágio</h1>
          <p>
            Qualificação de campos e preceptores, registro central de contratos
            e vínculos, painel de indicadores e simulação de cenários de
            contratação.
          </p>
          <div className="inline-actions">
            <span className="badge">Módulo 1 · Qualificação</span>
            <span className="badge">Módulo 2 · Gerenciamento</span>
          </div>
        </div>
        <small>Desenvolvimento de APIs · Base para os projetos da turma</small>
      </section>
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-form stack">
          <div>
            <h2 id="login-title">Entrar na Plataforma</h2>
            <p className="muted">Conheça as telas do projeto.</p>
          </div>
          <Field
            label="E-mail institucional"
            type="email"
            placeholder="nome@faminas.edu.br"
            disabled
          />
          <Field
            label="Senha"
            type="password"
            placeholder="Disponível após a integração"
            disabled
          />
          <fieldset className="profile-picker">
            <legend>Perfil de acesso</legend>
            <div className="profile-picker__options">
              {profiles.map((item) => (
                <Button
                  key={item}
                  variant="secondary"
                  aria-pressed={profile === item}
                  onClick={() => setProfile(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </fieldset>
          <Button onClick={() => navigate(routes.painel)}>
            Explorar a prévia
          </Button>
          <p className="login-note">
            Modo de demonstração, sem autenticação. O perfil selecionado apenas
            identifica a navegação; todas as telas ficam acessíveis.
          </p>
        </div>
      </section>
    </main>
  );
}
