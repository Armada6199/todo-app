import { Flex } from '@mantine/core'
import React from 'react'

export default function Footer() {
    return (
        <Flex
            m={'auto'}
            p={'0'}
            maw="100%"
            ta={'center'}
            bg={'BLACK'}
            h='40px'
            c="white"
            justify={'center'}
            align={'center'}
            style={{color:'white'}}
        >
            &copy;ABDIN
        </Flex>
    )
}
