import { render } from '@redwoodjs/testing/web'

import Estimate from './Estimate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Estimate', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Estimate />)
    }).not.toThrow()
  })
})
