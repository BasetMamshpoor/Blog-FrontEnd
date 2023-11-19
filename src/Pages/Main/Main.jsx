import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../images/200.gif'
import { ToastContainer } from 'react-toastify';
import Token from '../../Functions/Token'
import Blog from '../../Components/Blog/Blog';
import useRequest from '../../Hooks/useRequest';



const Main = ({ type }) => {
    const { user: token } = Token()
    const navigate = useNavigate()
    const [blogs, setBlogs, isFetching, end, loading] = useRequest(type)

    useEffect(() => {
        if (type === 'post' && !token) navigate('/explore')
    }, [type, token])

    const Blogs = blogs.length ? blogs.map(item => {
        if (item.author === token?.username) {
            return (
                <Blog
                    key={item.id}
                    data={item}
                    setBlogs={setBlogs}
                    link={true}
                    from={type}
                />
            )
        } else {
            return (
                <Blog
                    key={item.id}
                    data={item}
                    link={true}
                    from={type}
                />
            )
        }
    }) : <div className='text-xl tracking-widest font-semibold'>There is no post!</div>


    return (
        <>
            <div className='mb-12'>
                <div className='container'>
                    <main className='flex flex-col items-center gap-4 w-full'>
                        {loading ? <div className='-mt-8 mx-auto w-[140]'><img src={Loading} alt="" /></div> : Blogs}
                    </main>
                    {isFetching && !end && <div className='-mt-8 mx-auto w-[140]'><img src={loading} alt='loading' /></div>}
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Main;