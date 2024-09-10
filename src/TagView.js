import React, { useState } from 'react';

const TagView = ({ node, updateTree }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [tagName, setTagName] = useState(node.name);
  const [editingName, setEditingName] = useState(false);
  const [data, setData] = useState(node.data || '');
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const addChild = () => {
    if (!node.children) {
      node.children = [];
    }
    node.children.push({ name: 'New Child', data: 'Data' });
    delete node.data;
    updateTree();
  };

  const handleNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleDataChange = (e) => {
    setData(e.target.value);
    node.data = e.target.value;
    updateTree();
  };

  const handleNameEdit = () => {
    setEditingName(true);
  };

  const handleNameSubmit = (e) => {
    if (e.key === 'Enter') {
      node.name = tagName;
      setEditingName(false);
      updateTree();
    }
  };

  return (
    <div style={{ marginLeft: 20, border: '1px solid #007bff', padding: 10, backgroundColor: '#e1ecf7', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={toggleCollapse} style={{ marginRight: 5 }}>
          {collapsed ? '>' : 'v'}
        </button>
        {editingName ? (
          <input
            type="text"
            value={tagName}
            onChange={handleNameChange}
            onKeyDown={handleNameSubmit}
            onBlur={() => setEditingName(false)}
          />
        ) : (
          <span onClick={handleNameEdit} style={{ fontWeight: 'bold', cursor: 'pointer' }}>{tagName}</span>
        )}
        <button onClick={addChild} style={{ marginLeft: 'auto' }}>
          Add Child
        </button>
      </div>
      {!collapsed && (
        <div>
          {node.data ? (
            <input
              type="text"
              value={data}
              onChange={handleDataChange}
              placeholder="Data"
              style={{ marginTop: 5, width: '100%' }}
            />
          ) : (
            node.children && node.children.map((child, index) => (
              <TagView key={index} node={child} updateTree={updateTree} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TagView;
