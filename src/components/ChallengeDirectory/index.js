// components/ChallengeDirectory.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@components/Card';
import TreeView from '@components/Tree';
import ExpandableList from '@components/ExpandbleList';
const ChallengeDirectory = () => {
  const { categoryId } = useParams(); // 路由如 /training/1
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3001/api/challenges/by-category/${categoryId}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);

    fetch('/data/trainingCategories.json')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("加载分类失败", err));

  }, [categoryId]);
  console.log(categories);
  const cat = categories.find(category => category.id === Number(categoryId));
  if (!cat) {
    return <div>加载中...</div>; // 或 return null;
  }

  const transformedData = data.map(category => ({       // 用于渲染左侧可展开目录的数组
    id: category.id,
    title: category.name,
    imageSrc: "/images/book.svg",
    level: 1,
    children: category.children.map(challenge => ({
      id: challenge.id,
      title: challenge.title,
      level: 2,
      url: `/training/${categoryId}?challengeId=${challenge.id}`, // 假设跳转到具体的题目页
    })),
  }));

  return (
    <div>
      <div className="flex flex-row space-y-2 pb-2 pt-2 pl-3 border-b border-gray-300">
        <Card
          key={cat._id} 
          imageSrc={cat.imageSrc} 
          text={cat.name} 
        />
        <div className='ml-auto'>
          <Card
            key={cat._id} 
            imageSrc="/images/back.svg"
            onClick={() => navigate("/training")}
          />
        </div>
        
      </div>
      <div className='pl-3 pr-6 pt-4'>
        <ExpandableList data={transformedData} />
      </div>
    </div>
  );
};

export default ChallengeDirectory;
