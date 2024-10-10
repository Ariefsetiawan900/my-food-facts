import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('@/pages/Home'));
const Login = React.lazy(() => import('@/pages/Login'));
const Detail = React.lazy(() => import('@/pages/Detail'));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/detail/:id_product" element={<Detail />} />
    </Routes>
  );
};

export default Routing;
