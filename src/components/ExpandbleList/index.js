import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 组件：单级可展开列表项
const ExpandableList = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const navigate = useNavigate();
  // 切换展开状态
  const toggleItem = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <ul className="flex flex-col space-y-2 p-0 m-0">
      {data.map(item => (
        <li key={item.id} className="relative">
          <button
            onClick={() => toggleItem(item.id)}
            className="h-8 font-normal w-full overflow-hidden rounded-lg flex justify-start items-center hover:bg-customed-color-hover"
            style={{ paddingLeft: `${item.level * 4}px` }} // 根据 level 控制缩进
          >
            <img src={item.imageSrc} className="w-4 h-4 mr-2" />
            <span className="text-left truncate mr-auto">{item.title}</span>
            {item.children && (
              <span
                className={`transition-transform duration-300 ${expandedItems.has(item.id) ? 'rotate-90' : ''}`}
              >
                <i className="fa fa-chevron-right w-5 h-5" />
              </span>
            )}
          </button>

          {/* 展开后显示子项 */}
          {expandedItems.has(item.id) && item.children && (
            <ul className="mt-2 pl-4" style={{ paddingLeft: `${item.level * 4}px` }}>
              {item.children.map(child => (
                <li key={child.id}>
                  <button
                    onClick={() => navigate(child.url)}
                    className="block h-8 w-full font-normal rounded-lg hover:bg-customed-color-hover 
                            flex items-center px-4 text-black text-left"
                  >
                    <img src="/images/flag.svg" className="w-4 h-4 mr-2" />
                    <span className="text-black">{child.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

// 用法：传入 data（可以是来自后端的数据）
export default ExpandableList;
