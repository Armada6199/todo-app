
import { useContext, useEffect, useState } from 'react';
import { Pagination , Group } from '@mantine/core';
import { settingsProvider } from '../../context/settings/settings';

export default function Demo() {
     const [activePage, setPage] = useState(1);
     const number = useContext(settingsProvider)
     let total = Math.ceil(number.state.length / 3)

     
     useEffect(() => {
          number.change(activePage)
     },[activePage])
     
  return <Pagination value={activePage} onChange={setPage}  total={total}  />;
}

