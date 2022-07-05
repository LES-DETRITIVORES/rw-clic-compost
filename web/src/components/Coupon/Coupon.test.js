import { render } from '@redwoodjs/testing/web'

import Coupon from './Coupon'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Coupon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Coupon />)
    }).not.toThrow()
  })
})
