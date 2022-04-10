import { render } from '@redwoodjs/testing'

import ThanksPage from './ThanksPage'

describe('ThanksPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThanksPage />)
    }).not.toThrow()
  })
})
