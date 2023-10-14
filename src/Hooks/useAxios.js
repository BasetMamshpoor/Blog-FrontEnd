import axios from 'axios'
import Cookies from 'js-cookie';
import Token from '../Functions/Token';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const baseURL = 'http://192.168.1.101:8000'


const useAxios = () => {
    const { authTokens, user } = useMemo(() => Token(), [])
    const naviagte = useNavigate()


    const axiosInstance = axios.create({
        baseURL,
        headers: { 'Authorization': `Bearer ${authTokens?.access}` }
    });

    axiosInstance.interceptors.request.use(async req => {

        const isExpired = Date.now() >= user?.exp * 1000
        if (!isExpired) return req

        await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authTokens.refresh
        }).then(res => {
            Cookies.set('authTokens', JSON.stringify({ refresh: authTokens.refresh, ...res.data }))
            req.headers.Authorization = `Bearer ${res.data.access}`
        }).catch(() => {
            // Cookies.remove('authTokens')
            // naviagte('/login')
        });
        return req
    })

    return axiosInstance
}

export default useAxios;