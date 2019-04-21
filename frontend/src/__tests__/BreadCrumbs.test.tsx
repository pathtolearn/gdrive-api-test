import * as React from 'react'
import { mount } from 'enzyme'
import BreadCrumbs from '../components/breadcrumbs/BreadCrumbs'

it('check bread crumbs array receivied', () => {
  const props = {
      breadCrumbs: ['Home'],
      linkClick: () => {},
    },
    BreadCrumbsComponent = mount(<BreadCrumbs {...props} />)

  expect(BreadCrumbsComponent.prop('breadCrumbs')).toEqual(['Home'])
})
