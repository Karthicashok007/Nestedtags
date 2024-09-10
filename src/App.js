import React, { useState } from 'react';
import TagView from './TagView';

const App = () => {
  const [tree, setTree] = useState({
    name: 'root',
    children: [
      {
        name: 'child1',
        children: [
          { name: 'child1-child1', data: 'c1-c1 Hello' },
          { name: 'child1-child2', data: 'c1-c2 JS' }
        ]
      },
      { name: 'child2', data: 'c2 World' }
    ]
  });

  const updateTree = () => {
    setTree({ ...tree });
  };

  const exportTree = () => {
    const exportData = JSON.stringify(tree, null, 2);
    console.log(exportData);
    alert(exportData);
  };

  return (
    <div style={{ padding: 20 }}>
      <TagView node={tree} updateTree={updateTree} />
      <button onClick={exportTree} style={{ marginTop: 20 }}>
        Export
      </button>
    </div>
  );
};

export default App;
