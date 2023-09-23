import { Button, Center, Flex, Input } from '@mantine/core'
import React, { useContext, useState } from 'react'
import  {LoginContext}  from '../Context/LoginContext';
import { When } from 'react-if';
import axios from 'axios';

export default function SignUp() {
    const [usernameS, setUsernameS] = useState('')
    const [passwordS, setPasswordS] = useState('')
    const [role, setRole] = useState('')
    const { login, loginData } = useContext(LoginContext);
    async function handleSignupSub(e) {
        e.preventDefault();
        try {
            let res = await axios.post('https://basic-auth-qwan.onrender.com/', {
                username: usernameS,
                password: passwordS,
                role: role
            })
            console.log(res);
            alert(`Welcome on board :${usernameS}`)
        } catch (err) {
            alert(err);
        }
        login(usernameS, passwordS);
        setPasswordS('')
        setUsernameS('')
        setRole('')
    }
    function handlePwChange(e) {
        setPasswordS(e.target.value);
    }
    function handleUnChange(e) {
        setUsernameS(e.target.value);
    }
    function handleRoleChange(e) {
        setRole(e.target.value);
    }
    return (
        <>

            <When condition={!loginData.loggedIn}>

                <form onSubmit={handleSignupSub}>
                    <Flex direction={'column'} m={'20px'} gap={'10px'} justify={Center} align={Center}>
                        <Input onChange={handleUnChange} placeholder='username' required />
                        <Input onChange={handlePwChange} placeholder='password' required type='password' />
                        <Input onChange={handleRoleChange} placeholder='role(admin,writer,editor,user)' required type='text' />
                        <Button type='submit'>SignUp</Button>
                    </Flex>
                </form>
            </When >
        </>
    )
}