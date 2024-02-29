import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register';
import 'bootstrap/dist/css/bootstrap.css';
import { MenuBoot } from './components/MenuBoot';
import { Professionals } from './professionals';
import { Profile } from './profile';
import { Projects } from './projects';
import { ProjectDescription } from './project-description';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuBoot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project/:id" element={<ProjectDescription />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
