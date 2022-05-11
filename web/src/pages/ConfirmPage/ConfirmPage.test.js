import { render } from '@redwoodjs/testing/web'

import ConfirmPage from './ConfirmPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ConfirmPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConfirmPage />)
    }).not.toThrow()
  })
})
