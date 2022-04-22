import { render } from '@redwoodjs/testing'

import FrontPage from './FrontPage'

describe('FrontPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FrontPage />)
    }).not.toThrow()
  })
})
