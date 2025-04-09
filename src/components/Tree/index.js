import {useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';


const TreeNode = ({ imageSrc, node, onClick, level,toggleNode}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const expandedNodes = useSelector((state) => state.knowledge).expandedNodes;  // 获取展开节点的状态

  // 判断当前节点是否展开
  const isOpen = expandedNodes[node._id];
  const toggle = () => {
    // setIsOpen(!isOpen);
    dispatch(toggleNode(node._id));  // 切换当前节点的展开状态
  };

  const articleId = useSelector((state) => state.knowledge).ArticleId;
  return (
    <li key={node._id}>
    { /*  判断是否有子节点，目录和文件的渲染方式不同 */
      node.children && node.children.length > 0 ? 
      <button title={node.title} 
      className="h-8 font-normal w-full overflow-hidden rounded-lg flex justify-start items-center hover:bg-customed-color-hover" 
      onClick={toggle}
      style={{ paddingLeft: `${level * 4}px` }} 
      >
        <img src="/images/bookmark.svg" className="w-4 h-4 mr-2" />
        <span className="text-left truncate mr-auto">{node.title}</span>
        <span
          className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
        >
          {/* 旋转的图标 */}
          <i className="fa fa-chevron-right w-5 h-5" />
        </span>
      </button> :         
      <a className="h-8 font-normal w-full overflow-hidden rounded-lg flex no-underline text-black
      justify-start items-center hover:bg-customed-color-hover"
      href={articleId.find((item) => item.id === node._id)?.url || '#'}
      style={{ paddingLeft: `${level * 4}px` }} 
      >
        <img src="/images/file.svg" className="w-4 h-4 mr-2" />
        <span className="text-left truncate mr-auto">{node.title}</span>  
      </a>
    }


    {isOpen && node.children && node.children.length > 0 && (
      <ul className="mt-2 pl-2 relative before:absolute before:-top-2 before:bottom-0 before:left-2 before:w-[1px] before:bg-layer-content/20 flex flex-col space-y-2">
        {node.children.map(child => (
            <TreeNode key={child._id} node={child} level={level + 1} toggleNode={toggleNode}/>
        ))}
      </ul>
    )}
    </li>
  );
};

const TreeView = ({ treeList,toggleNode }) => {
  return (
    <ul className="flex flex-col space-y-2 p-0 m-0">
      {
        treeList.map(node => (
            <TreeNode key={node._id} node={node} level={1} toggleNode={toggleNode}/>
        ))
      }
    </ul>
  );
};

export default TreeView