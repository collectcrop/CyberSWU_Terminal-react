import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequireAuth from '@components/RequireAuth';
import {useAuth} from '@contexts/AuthContext';
const ChallengeManage = () => { 
  const [categories, setCategories] = useState([]);     // 一级分类
  const [activeTab, setActiveTab] = useState(null);     // 当前选中的一级分类id
  const [newCategoryName, setNewCategoryName] = useState('');       // 新一级分类名称
  const [newSubCategoryName, setNewSubCategoryName] = useState('');   // 新二级分类名称
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, category: null });
  const [subCategoryMap, setSubCategoryMap] = useState({});       // 存二级分类，用于缓存
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);     // 当前选中的二级分类id，用于新建题目
  const [selectedDifficulty, setSelectedDifficulty] = useState('');     // 新题目难度
  const [newChallengeName, setNewChallengeName] = useState('');   // 新题目名称
  const [newChallengePoints, setNewChallengePoints] = useState(500);    // 新题目分数
  const [newChallengeDescription, setNewChallengeDescription] = useState('');     // 新题目描述
  const [flagType, setFlagType] = useState('static');       // 新题默认静态flag
  const [staticFlag, setStaticFlag] = useState('');         // 静态flag
  const [attachmentURL, setAttachmentURL] = useState('');   // 新题附件
  const [attachmentName, setAttachmentName] = useState(''); // 新题附件名称
  
  const { user } = useAuth();

  useEffect(() => {
    console.log("SubcategoryId:",selectedSubcategoryId);
  }, [selectedSubcategoryId]);

  useEffect(() => {
    // 初始加载分类列表
    axios.get('http://localhost:3001/api/categories').then(res => {
      setCategories(res.data);
      setActiveTab(res.data[0]?.id);
    });
    const handleClickOutside = () => {
        setContextMenu((prev) => ({ ...prev, visible: false }));
      };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);
  
  useEffect(() => {     // 懒加载二级分类
    if (!activeTab) return;
  
    // 如果缓存中已有该分类数据，就不请求
    if (subCategoryMap[activeTab]) return;
  
    // 请求后端获取二级分类和题目
    axios.get(`http://localhost:3001/api/challenges/by-category/${activeTab}`)
      .then(res => {
        setSubCategoryMap(prev => ({
          ...prev,
          [activeTab]: res.data
        }));
      });
  }, [activeTab]);

  // console.log(subCategoryMap);
  const handleAddCategory = async () => {     // 添加一级分类
    if (!newCategoryName.trim()) return;

    const res = await axios.post('http://localhost:3001/api/categories/add', { name: newCategoryName });
    setCategories(prev => [...prev, res.data]);
    setNewCategoryName('');
    setActiveTab(res.data.id);
  };

  const handleAddSubCategory = async () => {     // 添加二级分类
    if (!newSubCategoryName.trim()) return;

    const res = await axios.post('http://localhost:3001/api/categories/add-subcategories', { 
      name: newSubCategoryName,
      from: activeTab
    });
    setSubCategoryMap(prev => {
      const currentList = prev[activeTab] || []; // 如果还没这个分类，默认空数组
      return { ...prev, 
        [activeTab]: [...currentList, res.data[0]] // 在原数组后面添加新项 
        };
    }
    );
    console.log(subCategoryMap);
    setNewSubCategoryName('');
  };
  const handleContextMenu = (e, category) => {      // 右键菜单
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      category: category,
    });
  };

  const handleDeleteCategory = (id) => {      
    axios.post('http://localhost:3001/api/categories/delete', { id: id })   // 删除对应一级分类
    .then(() => {
      setCategories(prevCategories =>
        prevCategories.filter(category => category.id !== id)
      );
      if (activeTab === id) {         // 如果目前选中的是该一级分类，则切换到第一个分类
        setActiveTab(prevCategories =>
          prevCategories.length > 0 ? prevCategories[0].id : null
        );
      }
    })
    .catch(error => {
      console.error('删除分类失败:', error);
    })
  };

  const checkParams = () => { 
    if (!selectedSubcategoryId || !selectedDifficulty || !newChallengeName || !newChallengePoints || !newChallengeDescription
      || (flagType === 'dynamic' && !staticFlag) || !attachmentURL || !attachmentName
    ) {
      alert('请填写完整信息');
      return false;
    }
    return true;
  };
  const handleAddNewChallenge = async () => {
    if (!checkParams()) return;
    const res = await axios.post('http://localhost:3001/api/challenges/add', {
      title: newChallengeName,
      score: newChallengePoints,
      description: newChallengeDescription,
      flagType: flagType,
      flag: flagType === 'static' ? staticFlag : '',
      attachment_url: attachmentURL,
      attachment_name: attachmentName,
      subcategory_id: selectedSubcategoryId,
      category_id: activeTab,
      difficulty: selectedDifficulty,
      author_id: user.id,
    })
    .catch(error => {
      console.error('添加题目失败:', error);
    });
    console.log(res);
    if (res.data.success) {
      alert('添加成功');
    }
  };

  return (
    <RequireAuth>
      <div className="p-4">
        <div className='text-lg font-bold pb-3'>
          一级分类
        </div>
        {/* 横向 Tabs */}
        <div className="flex items-center space-x-2 border-b pb-2 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-1 rounded-t-md border ${
              activeTab === category.id
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-100 text-gray-800 border-transparent'
            }`}
            onClick={() => setActiveTab(category.id)}
            onContextMenu={(e) => handleContextMenu(e, category)}
          >
            {category.name}
            {contextMenu.visible && (
            <div
                className="absolute bg-white border shadow rounded p-2 z-50"
                style={{ top: contextMenu.y, left: contextMenu.x }}
                onClick={() => setContextMenu({ ...contextMenu, visible: false })}
            >
                <button
                className="text-red-600 hover:underline"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(contextMenu.category.id);
                    setContextMenu({ ...contextMenu, visible: false });
                }}
                >
                删除分类
                </button>
            </div>
            )}
          </button>
        ))}

          {/* 添加分类 */}
          <div className="flex items-center ml-2">
              <input
              type="text"
              className="border px-2 py-1 text-sm rounded mr-1 w-28"
              value={newCategoryName}
              placeholder="新分类"
              onChange={e => setNewCategoryName(e.target.value)}
              />
              <button
              onClick={handleAddCategory}
              className="px-3 py-1 bg-green-500 text-white rounded"
              >
              +
              </button>
          </div>
        </div>
    
        {/* 当前分类内容 */}
        <div className="mt-4">
          <h4 className="text-lg font-bold">
            当前分类：{categories.find(c => c.id === activeTab)?.name}
          </h4>
          {/* 横向 Tabs */}
          <div className="flex items-center space-x-2 border-b pb-2 overflow-x-auto">
            {subCategoryMap[activeTab] && subCategoryMap[activeTab].map(category =>(
              <div key={category.id} className="px-4 py-1 rounded-t-md border bg-gray-100 text-gray-800 border-transparent">
                {category.name}
              </div>
              )
            )}
            {/* 添加二级分类 */}
            <div className="flex items-center ml-2">
                <input
                type="text"
                className="border px-2 py-1 text-sm rounded mr-1 w-28"
                value={newSubCategoryName}
                placeholder="新分类"
                onChange={e => setNewSubCategoryName(e.target.value)}
                />
                <button
                onClick={handleAddSubCategory}
                className="px-3 py-1 bg-green-500 text-white rounded"
                >
                +
                </button>
            </div>

          </div>
          <div className="flex items-center space-x-2 overflow-x-auto mt-4 mb-2">
            <h4 className="text-lg font-bold">新增题目</h4>
            <button
              onClick={handleAddNewChallenge}
              className="px-3 py-1 bg-green-500 text-white rounded"
              >
              +
            </button>
          </div>
          <div className='flex flex-col space-y-8 bg-gray-100 p-4 mr-20 rounded-md border'>
            <div className='flex flex-row justify-start'>
              <div className='flex flex-row'>
                <div className='text-base font-semibold'>题目名称</div>
                <input 
                className='border px-2 py-1 text-sm rounded ml-3 mr-6 w-36' 
                type='text' 
                placeholder='请输入题目名称'
                value={newChallengeName}
                onChange={(e) => setNewChallengeName(e.target.value)}
                />
              </div>
              <div className='flex flex-row'>
                <div className='text-base font-semibold'>二级分类</div>
                <select
                  className='border px-2 py-1 text-sm rounded ml-3 mr-6 w-36'
                  value={selectedSubcategoryId || ''}
                  onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                >
                  <option value="" disabled>请选择二级分类</option>
                  {subCategoryMap[activeTab]?.map((subcat) => (
                    <option key={subcat.id} value={subcat.id}>
                      {subcat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex flex-row'>
                <div className='text-base font-semibold'>难度</div>
                <select
                  className='border px-2 py-1 text-sm rounded ml-3 mr-6 w-36'
                  value={selectedDifficulty || ''}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="" disabled>请选择难度</option>
                  <option value="Checkin">Checkin</option>
                  <option value="Easy">Easy</option>
                  <option value="Normal">Normal</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                  <option value="Extreme">Extreme</option>
                 
                </select>
              </div>

              <div className='flex flex-row'>
                <div className='text-base font-semibold'>分数</div>
                <input 
                className='border px-2 py-1 text-sm rounded ml-3 mr-6 w-36' 
                type='text' 
                placeholder='请输入题目分数'
                value={newChallengePoints}
                onChange={(e) => setNewChallengePoints(e.target.value)}
                />
              </div>
            </div>
            
            <div className='flex flex-row justify-start'>
              <div className='flex flex-row flex-shrink-0'>
                <div className='text-base font-semibold'>flag类型</div>
                <label>
                  <input
                    className='ml-4'
                    type="radio"
                    name="flagType"
                    value="static"
                    checked={flagType === 'static'}
                    onChange={(e) => setFlagType(e.target.value)}
                  />
                  静态
                </label>
                <label style={{ marginLeft: '1em' }}>
                  <input
                    type="radio"
                    name="flagType"
                    value="dynamic"
                    checked={flagType === 'dynamic'}
                    onChange={(e) => setFlagType(e.target.value)}
                  />
                  动态
                </label>
              </div>

              {flagType === 'static' && (
              <div className='flex flex-row ml-14 w-full'>
                <div className='text-base font-semibold'>静态flag</div>
                <input 
                className='flex-grow border px-2 py-1 text-sm rounded ml-3 mr-8' 
                type='text' 
                placeholder='请输入flag'
                value={staticFlag}
                onChange={(e) => setStaticFlag(e.target.value)}
                />
              </div>
              )}
            </div>

            <div className='flex flex-row justify-start'>
              <div className='flex flex-row'>
                <div className='text-base font-semibold'>附件链接</div>
                <input 
                className='border px-2 py-1 text-sm rounded ml-3 mr-6 w-72' 
                type='text' 
                placeholder='请输入附件URL'
                value={attachmentURL}
                onChange={(e) => setAttachmentURL(e.target.value)}
                />
              </div>
              <div className='flex flex-row ml-24'>
                <div className='text-base font-semibold'>附件名字</div>
                <input 
                className='border px-2 py-1 text-sm rounded ml-3 mr-6 w-72' 
                type='text' 
                placeholder='请输入附件显示名字'
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                />
              </div>

            </div>

            <div className='flex flex-col justify-start'>
              <div className='text-base font-semibold mb-2'>题目描述</div>
              <textarea
                className='border px-2 py-1 text-sm rounded mr-6 w-full h-40'
                placeholder='请输入题目描述'
                value={newChallengeDescription}
                onChange={(e) => setNewChallengeDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
    );
    
};

export default ChallengeManage;