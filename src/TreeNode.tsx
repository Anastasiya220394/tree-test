import React, { useState } from 'react';
import axios from 'axios';

interface TreeNodeProps {
  node: TreeNode;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string, name: string) => void;
}

interface TreeNode {
  id: string;
  name: string;
  children?: { [key: string]: TreeNode };
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onEdit, onDelete, onAddChild }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'add'>('edit');
  const [name, setName] = useState('');

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEditClick = () => {
    setModalType('edit');
    setName(node.name);
    setIsModalOpen(true);
  };

  const handleAddChildClick = () => {
    setModalType('add');
    setName('');
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    onDelete(node.id);
  };

  const handleModalSubmit = () => {
    if (modalType === 'edit') {
      onEdit(node.id, name);
    } else if (modalType === 'add') {
      onAddChild(node.id, name);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        <span onClick={handleExpandClick}>
          {isExpanded ? '-' : '+'} {node.name}
        </span>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleAddChildClick}>Add Child</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      {isExpanded && node.children && (
        <div style={{ marginLeft: 20 }}>
          {Object.values(node.children).map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <h2>{modalType === 'edit' ? 'Edit Node' : 'Add Child'}</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleModalSubmit}>Submit</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TreeNode;


