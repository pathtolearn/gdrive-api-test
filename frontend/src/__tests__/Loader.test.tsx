import * as React from 'react'
import { mount } from 'enzyme'
import Loader from '../components/loader/Loader'

it('check loader component is receiving the props', () => {
  const props = {
      isLoading: true,
    },
    LoaderComponent = mount(<Loader {...props} />)

  expect(LoaderComponent.prop('isLoading')).toEqual(true)
})
