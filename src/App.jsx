import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.less'

function App() {

  const element = useRoutes(routes)

  return (
    <>
      {element}
    </>
  );
}

export default App;
