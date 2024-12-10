import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register/usuario_cliente';
import 'bootstrap/dist/css/bootstrap.css';
import { MenuBoot } from './components/MenuBoot';
import { Professionals } from './professionals';
import { Profile } from './profile';
import { Projects } from './projects';
import { ProjectDescription } from './project-description';
import { RegisterProfessional } from './register/usuario_profissional';
import { Copilot } from './register/teste_copilot';
import { RegisterProject } from './register/projeto';
import { AuthProvider } from './AuthProvider';
import { MyProfile } from './profile/my-profile';
import { MyProjects } from './components/Project/my-project';
import { MyProjectsWork } from './components/Project/my-project-work';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <MenuBoot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/copilot" element={<Copilot />} />
          <Route path="/myprojects/:id" element={<MyProjects />} />
          <Route path="/myprojectswork/:id" element={<MyProjectsWork />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/register/professional/:id"
            element={<RegisterProfessional />}
          />
          <Route path="/register/project/:id" element={<RegisterProject />} />
          <Route path="/project/:id" element={<ProjectDescription />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
