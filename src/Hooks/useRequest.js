import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import Token from "../Functions/Token"
import useAxios from "./useAxios"

function useRequest(type = 'post') {
    const api = useAxios()
    const { user: token } = Token()

    const location = useLocation()

    const [loading, setLoading] = useState(true)
    const [Blogs, setBlogs] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [end, setEnd] = useState(false)


    async function getPosts() {

        if (type === 'post') return await api.get(`/posts/post`)

        else if (type === 'explore' && token) return await api.get(`/posts/explore`)

        else return await axios.get(`/posts/explore`)

    }

    async function getNewPosts() {
        const params = { offset: Blogs.length }
        if (type === 'post') return await api.get(`/posts/post`, { params })

        else if (type === 'explore' && token) return await api.get(`/posts/explore`, { params })

        else return await axios.get(`/posts/explore`, { params })
    }

    useEffect(() => {
        const get = async () => {
            await getPosts()
                .then(({ data }) => {
                    setLoading(false)
                    setBlogs(data.results)
                    if (data.next === null) setEnd(true)
                    else setEnd(false)
                }).catch(() => { setLoading(false); toast.error('something went wrong!') })
        }
        get()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location])

    useEffect(() => {
        if (isFetching && Blogs.length && !end) {
            fetchMoreListItems();
        }
    }, [isFetching, Blogs, end]);

    async function fetchMoreListItems() {
        await getNewPosts()
            .then(({ data }) => {
                setBlogs(prev => prev.concat(data.results))
                if (data.next === null) setEnd(true)
                setIsFetching(false);
            }).catch(() => {
                setIsFetching(false);
                toast.error('something went wrong!')
            })
    }

    function handleScroll() {
        if ((document.scrollingElement.scrollHeight - window.innerHeight) <= (document.documentElement.scrollTop.toFixed())) {
            setIsFetching(true);
        }
    }

    return [Blogs, setBlogs, isFetching, end, loading]
}

export default useRequest

