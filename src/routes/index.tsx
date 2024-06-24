import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login";
import { HOME, LOGIN, RISORSE, CLIENTI, SKILLS, COMMESSE, ATTIVITA, ORDINI, FORNITORI, FATTURADIACQUISTO, FATTURADIACQUISTOATTIVITA,FATTUREVENDITA, SCADENZE, PIANIFICAZIONE, SKILLSRISORSE, UTENTI, TIPIDIPAGAMENTO, INSERIMENTOVELOCE, TIMESHEET, REPORT } from "../utils/constants";
import HomePage from "../pages/home";
import Layout from "../components/molecules/layout";
import Clienti from "../pages/clienti";
import Risorse from "../pages/anagrafiche/risorse";
import Skills from "../pages/anagrafiche/skillsRisorse";
import RequiredAuth from "./requiredAuth";
import Commesse from "../pages/Commesse/commesse";
import Attività from "../pages/Commesse/Attività";
import Ordini from "../pages/Commesse/Ordini";
import Fornitori from "../pages/anagrafiche/fornitori";
import FatturaDiAcquisto from "../pages/acquisti/fatturaDiAcquisto";
import FatturaDiAcquistoAttività from "../pages/acquisti/fatturaDiAcquistoAttività";
import FattureVendita from "../pages/vendite/fattureVendite";
import Scadenze from "../pages/scadenziario/scadenze";
import Pianificazione from "../pages/scadenziario/pianificazione";
import SkillsRisorse from "../pages/anagrafiche/skillsRisorse";
import Utenti from "../pages/impostazioni/utenti";
import TipiDiPagamento from "../pages/impostazioni/tipiDiPagamento";
import InserimentoVeloce from "../pages/inserimentoVeloce/inserimentoVeloce";
import Timesheet from "../pages/timesheet/timesheet";
import Report from "../pages/timesheet/report";

const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={LOGIN} element={<LoginPage />} />
                <Route element = {<RequiredAuth/>}>
                    <Route element={<Layout />}>
                        <Route path={HOME} element={<HomePage />} />
                        <Route path={INSERIMENTOVELOCE} element={<InserimentoVeloce />} />
                        <Route path={RISORSE} element={<Risorse />} />
                        <Route path={COMMESSE} element={<Commesse />} />
                        <Route path={ATTIVITA} element={<Attività />} />
                        <Route path={SKILLSRISORSE} element={<SkillsRisorse />} />
                        <Route path={ORDINI} element={<Ordini />} />
                        <Route path={FATTURADIACQUISTO} element={<FatturaDiAcquisto />} />
                        <Route path={FATTURADIACQUISTOATTIVITA} element={<FatturaDiAcquistoAttività />} />
                        <Route path={FORNITORI} element={<Fornitori />} />
                        <Route path={CLIENTI} element={<Clienti />} />
                        <Route path={SKILLS} element={<Skills />} />
                        <Route path={TIPIDIPAGAMENTO} element={<TipiDiPagamento />} />
                        <Route path={UTENTI} element={<Utenti />} />
                        <Route path={SCADENZE} element={<Scadenze />} />
                        <Route path={PIANIFICAZIONE} element={<Pianificazione />} />
                        <Route path={FATTUREVENDITA} element={<FattureVendita />} />
                        <Route path={TIMESHEET} element={<Timesheet />} />
                        <Route path={REPORT} element={<Report />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesComponent;
