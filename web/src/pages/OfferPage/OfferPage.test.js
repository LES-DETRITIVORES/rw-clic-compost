import { render } from '@redwoodjs/testing/web'

import OfferPage from './OfferPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OfferPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OfferPage />)
    }).not.toThrow()
  })
})
