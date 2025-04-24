import { useState,useEffect } from 'react'
import { useLocation, Outlet, useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import Card from '@components/Card'
import InputBox from '@components/InputBox'

const Challenge = () =>{
    const [searchParams] = useSearchParams();
    const challengeId = searchParams.get('challengeId');
    const [data, setData] = useState([]);
    const [author, setAuthor] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:3001/api/challenges/${challengeId}`)
        .then(res => res.json())
        .then(challengeData => {
            setData(challengeData);
        
            // 等第一个请求成功后，再根据 challengeData.author_id 发起第二个请求
            return fetch(`http://localhost:3001/api/user/${challengeData.author_id}`);
        })
        .then(res => res.json())
        .then(setAuthor)
        .catch(console.error);
    },[challengeId])

    // console.log(author);
    return(
        <div className="flex flex-col pt-4 pl-20 pr-20">
            <div className="flex flex-row justify-between items-center border-b border-gray-300 mb-2 font-bold">
                <Card 
                    text={data.title}
                    disableActive={true}
                />
                <div className="flex flex-row gap-4">
                    <Card 
                        imageSrc="/images/people.svg" 
                        text={author.username} 
                    />
                    <Card 
                        text={"solved: " + data.solved_count} 
                    />
                </div>
            </div>
            <div className="flex flex-row border-b border-gray-300 mb-2 font-bold">
                <Card 
                    text="附件:"
                    disableActive={true}
                />
                <Card 
                    imageSrc="/images/file.svg" 
                    text={data.attachment_name} 
                    onClick={() => window.open(data.attachment_url)}
                />
            </div>
            <div className="flex flex-row mt-8 ml-4 h-80 overflow-auto whitespace-pre-line leading-relaxed">
                {data.description}
            </div>

            <div>
                <InputBox 
                challengeId={challengeId} 
                submitUrl={`http://localhost:3001/api/challenges/validate-flag`}
                textPlaceholder="请输入Flag" 
                buttonText="提交Flag"
                />
            </div>
      </div>
    )
}

export default Challenge