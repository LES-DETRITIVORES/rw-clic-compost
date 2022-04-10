import { render } from '@redwoodjs/testing'

import SchedulePage from './SchedulePage'

describe('SchedulePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SchedulePage />)
    }).not.toThrow()
  })
})
