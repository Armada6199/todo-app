import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Flex } from '@mantine/core'

export default function AppHeader() {
    return (
        <Header bg='black' h='65px'  m='auto'>
            <Flex
                justify="left"
                align='center'
                direction="row"
                gap={'xl'}
                h='65px'
            >
                <Link style={{ color: "white", textDecoration: 'none' }} to='/'>Home</Link>
                <Link  data-testid='go-settings'style={{ color: "white", textDecoration: 'none' }} to='/settings'>Edit Settings</Link>
            </Flex>
        </Header >
    )
}
