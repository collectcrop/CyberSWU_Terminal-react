const Title = () =>{
    return(
        <div className="flex flex-1 flex-col justify-start pt-40  items-center bg-customed-color">
            <div className="text-4xl font-bold text-center mb-10">
                <span> [ CyberSWU CTF 终端 ] </span>
            </div>
            <div className="text-2xl text-center text-red-600 mt-2">
                <span> 西南大学开源与网络安全协会 </span>
            </div>
        </div>

            
        
    )
}
const Home = () =>{
    return(
        <Title />
    )
}

export default Home