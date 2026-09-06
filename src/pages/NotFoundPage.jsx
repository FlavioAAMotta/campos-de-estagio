import { Link } from 'react-router';
import { routes } from '../constants/routes.js';

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="eyebrow">404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço não corresponde a uma tela do projeto.</p>
      <Link to={routes.painel}>Voltar ao painel</Link>
    </main>
  );
}
