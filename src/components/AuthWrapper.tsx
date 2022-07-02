import React from 'react'
import { useSession } from "next-auth/react";

interface Props {
    children: React.ReactNode
}

const AuthWrapper = ({children}: Props) => {
    const {status} = useSession();
    if(status=== 'loading') return null
    return (
        <>
            {children}
        </>
    )
}

export default AuthWrapper