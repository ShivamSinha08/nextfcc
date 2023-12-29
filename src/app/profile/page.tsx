"use client"

import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
export default function Profile(){
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
            try {
                axios.get('/api/users/logout')
                toast.success('Logout Successful')
                router.push("/login")
            } catch (error: any) {
                console.log(error.message);

                toast.error(error.mesage)
            }
    }
    const getUSerDetails =async () => {
        const res = await axios.get('api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1>Profile</h1>
            <hr />
            <p>Profile page</p> 
            <h2 className="p-1 rounded bg-orange-500">{data === 'nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
<button
onClick={logout}
className="bg-green-300 mt-4 hover:bg-green-700 text-black font-bold py-2 px-4 rounded">Logout</button>
<button
onClick={getUSerDetails}
className="bg-blue-300 mt-4 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded">Get User Details</button>

        </div>
    )
}