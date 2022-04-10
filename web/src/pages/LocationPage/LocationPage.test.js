import { render } from '@redwoodjs/testing'

import LocationPage from './LocationPage'

describe('LocationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LocationPage />)
    }).not.toThrow()
  })
})
