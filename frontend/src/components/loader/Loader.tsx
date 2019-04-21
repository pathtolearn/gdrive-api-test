import * as React from 'react'

interface Props {
  isLoading: boolean
}

const Loader = (props: Props) => {
  const { isLoading } = props
  return <>{isLoading && <div className="preloader"></div>}</>
}

export default Loader
