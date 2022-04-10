import { render } from '@redwoodjs/testing'

import ConnectPage from './ConnectPage'

describe('ConnectPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConnectPage />)
    }).not.toThrow()
  })
})
