import { screen, render, fireEvent, getAllByTestId, getByTestId, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import List from "../Components/List/List";
import Settings from "../context/settings/settings";
import Demo from "../Components/Pagination/Pagination";
import Todo from "../Components/Todo";


describe('lab 31 ', () => {
     it('check if the header exist', () => {
          render(<App />)
          const header = screen.getByText(/To Do List: 3 items pending/i)
          expect(header).toBeInTheDocument()
     })
     it('check if the items exist in the dom', () => {
          render(
               <Settings>
                <List  />
               </Settings>
          )
          const contianer = screen.getByTestId('contianer')
          const item_cont = screen.getAllByTestId('item-cont')

          expect(contianer).toBeInTheDocument()
          expect(item_cont).toHaveLength(3)
          expect(item_cont[0].textContent).toContain('text 1')
     })

     it('check if the pagination work normaly and if the new items has been shown correctly', async () => {
          render(
               <Settings>
                    <Todo/>
                    <List  />
                    <Demo/>
               </Settings>
          )

          const input = screen.getByLabelText(/To Do Item/i)
          fireEvent.change(input, {
               target: { value : 'ehab' }
          })
          
          const submit = screen.getByText(/add item/i)
          waitFor(() => fireEvent.submit(submit)) 

          const btn_2 = screen.getByRole('button', {
               name : 2
          })
         waitFor(() => fireEvent.click(btn_2)) 
          
          const items = screen.getAllByTestId('item-cont')

          expect(btn_2).toBeInTheDocument()
          expect(items).toHaveLength(1)
          expect(items[0].textContent).toContain('ehab')

     })
})