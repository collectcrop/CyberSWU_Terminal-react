import { useState,useEffect } from 'react'
import { useLocation, Outlet, useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import Card from '@components/Card'
const TrainingChallenge = () =>{
    const [searchParams] = useSearchParams();
    const challengeId = searchParams.get('challengeId');
    const [data, setData] = useState([]);
    console.log(challengeId);
    useEffect(()=>{
        fetch(`http://localhost:3001/api/challenges/${challengeId}`)
        .then(res => res.json())
        .then(setData)
        .catch(console.error);
    },[])

    console.log(data);
    return(
        <div className="flex flex-col pt-4 pl-20 pr-20">
            <div className="flex flex-row border-b border-gray-300 mb-2 font-bold">
                <Card 
                    text={data.title}
                    disableActive={true}
                />
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
            <div className="flex flex-row mt-8 ml-4">
                {data.description}
            </div>
      </div>
    )
}

export default TrainingChallenge