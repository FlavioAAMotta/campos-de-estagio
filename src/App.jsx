import { BrowserRouter, Route, Routes } from 'react-router';
import { routes } from './constants/routes.js';
import PreviewProvider from './contexts/PreviewProvider.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import PainelPage from './pages/painel/PainelPage.jsx';
import CamposPage from './pages/campos/CamposPage.jsx';
import CampoPage from './pages/campos/CampoPage.jsx';
import PreceptoresPage from './pages/preceptores/PreceptoresPage.jsx';
import PreceptorPage from './pages/preceptores/PreceptorPage.jsx';
import VinculosPage from './pages/vinculos/VinculosPage.jsx';
import ContratosPage from './pages/contratos/ContratosPage.jsx';
import DistribuicaoPage from './pages/distribuicao/DistribuicaoPage.jsx';
import SimuladorPage from './pages/simulador/SimuladorPage.jsx';
import MapaPage from './pages/mapa/MapaPage.jsx';
import AvaliacoesPage from './pages/avaliacoes/AvaliacoesPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <PreviewProvider>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path={routes.painel} element={<PainelPage />} />
            <Route path={routes.campos} element={<CamposPage />} />
            <Route path={routes.campoExemplo} element={<CampoPage />} />
            <Route path={routes.preceptores} element={<PreceptoresPage />} />
            <Route path={routes.preceptorExemplo} element={<PreceptorPage />} />
            <Route path={routes.vinculos} element={<VinculosPage />} />
            <Route path={routes.contratos} element={<ContratosPage />} />
            <Route path={routes.distribuicao} element={<DistribuicaoPage />} />
            <Route path={routes.simulador} element={<SimuladorPage />} />
            <Route path={routes.mapa} element={<MapaPage />} />
            <Route path={routes.avaliacoes} element={<AvaliacoesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PreviewProvider>
    </BrowserRouter>
  );
}
