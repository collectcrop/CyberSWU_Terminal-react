import {useState} from 'react';
const TreeNode = ({ imageSrc, node, onClick, level}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li key={node._id}>
    <button title={node.title} 
    className="h-8 font-normal w-full overflow-hidden rounded-lg flex justify-start items-center hover:bg-customed-color-hover" 
    onClick={toggle}
    style={{ paddingLeft: `${level * 16}px` }} 
    >
      { /*  判断是否有子节点，如果有则显示文件夹图标，否则显示文件图标 */
      node.children && node.children.length > 0 ? 
      <img src="/images/bookmark.svg" className="w-4 h-4 mr-2" /> : 
      <img src="/images/file.svg" className="w-4 h-4 mr-2" />}

      <span className="text-left truncate mr-auto">{node.title}</span>

      { /*  判断是否有子节点，如果有则显示旋转图标，否则不显示 */
        node.children && node.children.length > 0 && <span
            className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          >
            {/* 旋转的图标 */}
            <i className="fa fa-chevron-right w-5 h-5" />
        </span>
      }


    </button>
    {isOpen && node.children && node.children.length > 0 && (
      <ul className="mt-2 pl-2 relative before:absolute before:-top-2 before:bottom-0 before:left-2 before:w-[1px] before:bg-layer-content/20 flex flex-col space-y-2">
        {node.children.map(child => (
          <li key={child._id}>
            <TreeNode key={child._id} node={child} level={level + 1}/>
          </li>
        ))}
      </ul>
    )}
    </li>
  );
};

const TreeView = ({ treeList }) => {
  return (
    <ul className="flex flex-col space-y-2 p-0 m-0">
      {
        treeList.map(node => (
            <TreeNode key={node._id} node={node} level={1}/>
        ))
      }
    </ul>
  );
};

export default TreeView