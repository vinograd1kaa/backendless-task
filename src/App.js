import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

const LazyDummyChart = lazy(() => import('./components/dummyChart'));
const LazyDummyList = lazy(() => import('./components/dummyList'));
const LazyDummyTable = lazy(() => import('./components/dummyTable'));

const App = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    fetch('./tabs.json')
      .then((response) => response.json())
      .then((data) => setTabs(data));
  }, []);

  return (
    <Router>
      {tabs.length > 0 && (
        <ul>
          {tabs.map(tab => (
            <li key={tab.id}>
              <Link to={`/${tab.id}`}>{tab.title}</Link>
            </li>
          ))}
        </ul>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {tabs.map(tab => (
            <Route key={tab.id} path={`/${tab.id}`} element={<TabContent path={tab.path} obj={tab} />} />
          ))}
          {tabs.length > 0 && <Route path="/" element={<Navigate to={`/${tabs[0].id}`} />} />}
        </Routes>
      </Suspense>
    </Router>
  );
};

function TabContent({ path, obj }) {
  let LazyComponent = null;

  if (path === 'tabs/dummyChart.js') {
    LazyComponent = LazyDummyChart;
  } else if (path === 'tabs/dummyList.js') {
    LazyComponent = LazyDummyList;
  } else if (path === 'tabs/dummyTable.js') {
    LazyComponent = LazyDummyTable;
  }

  return <LazyComponent obj={obj} />;
}

export default App;