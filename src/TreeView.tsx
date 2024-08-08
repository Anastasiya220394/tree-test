import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TreeNode from './TreeNode';

interface ITreeNode {
  id: string;
  name: string;
  children?: { [key: string]: TreeNode };
}

const TreeView: React.FC = () => {
  const [tree, setTree] = useState<ITreeNode | null>(null);

  useEffect(() => {
    fetchTree();
  }, []);

  const fetchTree = async () => {
    try {
      const response = await axios.get('https://test.vmarmysh.com/api.user.tree.get?treeName=blabla');
      setTree(response.data);
    } catch (error) {
      console.error('Error fetching tree:', error);
    }
  };

  const handleEdit = async (id: string, name: string) => {
    try {
      await axios.post(`https://test.vmarmysh.com/api.user.tree.node.rename?treeName=blabla&nodeId=${id}&newNodeName=${name}`);
      fetchTree();
    } catch (error) {
      console.error('Error editing node:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.post(`https://test.vmarmysh.com/api.user.tree.node.delete?treeName=blabla&nodeId=${id}`);
      fetchTree();
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  const handleAddChild = async (parentId: string, name: string) => {
    try {
      await axios.post(`https://test.vmarmysh.com/api.user.tree.node.create?treeName=blabla&parentNodeId=${parentId}&nodeName=${name}`);
      fetchTree();
    } catch (error) {
      console.error('Error adding child:', error);
    }
  };

  return (
    <div>
      {tree && (
        <TreeNode
          node={tree}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddChild={handleAddChild}
        />
      )}
    </div>
  );
};

export default TreeView;

