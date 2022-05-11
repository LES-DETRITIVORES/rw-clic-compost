import { render } from '@redwoodjs/testing'

import AppLayout from './ConfirmLayout'

describe('AppLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppLayout />)
    }).not.toThrow()
  })
})
