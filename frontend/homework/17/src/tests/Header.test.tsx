import { fireEvent, render, screen } from '@testing-library/react'
import Header from '../components/header/Header'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

describe('Header', () => {
  test('Header name Item lister', async () => {
    render( <Provider store={store}><Header /></Provider>)
    const contentResult = await screen.findByText('Item lister');
    expect(contentResult).to.exist;
  });

  test('Search bar is present and place holder has text', () => {
    render(<Provider store={store}><Header /></Provider>);
    const searchBar = screen.getByRole("textbox");
    expect(searchBar).to.exist
    const placeHolder = screen.getByPlaceholderText('Search items...');
    expect(placeHolder).to.exist
  });

  test('search bar input',()=>{
    render(<Provider store={store}><Header /></Provider>);
    const searchBar = screen.getByRole("textbox");
    expect(searchBar).to.exist
    // Simulate typing into the input bar
    fireEvent.change(searchBar,{target:{value:"Test Search"}})
    expect(searchBar).haveOwnProperty("value","Test Search")
  })

})