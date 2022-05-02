import { render } from '@redwoodjs/testing/web'

import SubscribePage from './SubscribePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SubscribePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubscribePage />)
    }).not.toThrow()
  })
})
