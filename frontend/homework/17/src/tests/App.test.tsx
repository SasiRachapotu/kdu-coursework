import { render, screen } from '@testing-library/react'
import App from '../App'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

describe('App', () => {
  it('renders the App component', async () => {
    render( <Provider store={store}><App /></Provider>)
    const contentResult = await screen.findByText('Item lister');
    console.log(contentResult);
    expect(contentResult).to.exist;
  })
})