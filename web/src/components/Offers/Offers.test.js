import { render } from '@redwoodjs/testing/web'

import Offers from './Offers'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Offers', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Offers />)
    }).not.toThrow()
  })
})
