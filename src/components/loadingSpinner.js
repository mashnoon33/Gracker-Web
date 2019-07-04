import React from 'react'
import { Box, Button, Grommet, Text, Layer, Clock } from 'grommet'
import { get, some } from 'lodash'

import { isLoaded, isEmpty } from 'react-redux-firebase'
import { branch, renderComponent } from 'recompose'

export const LoadingSpinner = () => (
  <Box alignSelf="center" align="center" width="full" height="full">
    <Clock type="digital" />
  </Box>
)

export const renderWhile = (condition, component) =>
  branch(condition, renderComponent(component))

// HOC that shows loading spinner component while list of propNames are loading
export const spinnerWhileLoading = propNames =>
  renderWhile(
    props => some(propNames, name => !isLoaded(get(props, name))),
    LoadingSpinner
  )

export const renderIfEmpty = (propsNames, component) =>
  renderWhile(
    // Any of the listed prop name correspond to empty props (supporting dot path names)
    props =>
      some(propsNames, name => {
        const propValue = get(props, name)
        return isLoaded(propValue) && isEmpty(propValue)
      }),
    component
  )

export default LoadingSpinner
