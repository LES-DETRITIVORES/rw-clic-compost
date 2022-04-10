import { render } from '@redwoodjs/testing'

import WelcomePage from './WelcomePage'

describe('WelcomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WelcomePage />)
    }).not.toThrow()
  })
})
