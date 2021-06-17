import React from 'react'
import { Box, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import LandingImage from 'components/LandingImage'
import { useIsDarkMode } from 'state/user/hooks'

const useStyles = makeStyles(({ palette }) => ({
  daoContainer: {
    height: '100%'
  }
}))

const Dao: React.FC = () => {
  const { palette, breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })

  return (
    <Box style={mobile ? { backgroundColor: palette.background.paper } : {}}>
      <LandingImage url={'HOME > DAO'} title={'DAO'} />
    </Box>
  )
}

export default Dao
