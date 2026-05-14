import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate()
  return (
    <section className=' px-4 sm:px-20 xl:px-32 inline-flex flex-col justify-center w-full bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>
        <div className=' text-center mb-6'>
            <h1 className=' text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Create amazing content <br /> with <span className=' text-primary'>AI tools</span></h1>
            <p className=' mt-4 max-w-sm sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>Transform your content creation with our suite of integrated AI tools. Write articles, generate images and enhance your workflow</p>
        </div>

        <div className=' flex flex-wrap justify-center items-center gap-4 text-sm max-sm:text-xs'>
            <button onClick={()=> navigate("/ai")} className=' bg-primary text-white px-10 py-3 cursor-pointer rounded-lg hover:scale-102 active:scale-95 transition'>Start Creating Now</button>
            <a href='https://drive.google.com/file/d/1h8W0eWgsDf26Q-AZssI_PcTFRd9rZhui/view?usp=sharing' target='_blank' className='border border-gray-300 bg-white px-10 py-3 cursor-pointer rounded-lg hover:scale-102 active:scale-95 transition'>Watch Demo</a>
        </div>
    </section>
  )
}

export default Hero